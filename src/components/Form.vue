<script setup>
import inputComponents from "../libraries/input-components"
import { reactive, computed, watch } from "vue"

const props = defineProps({
  fields: { type: Array, default: () => ([]) },
  modelValue: { type: Object, default: () => ({}) },
  submitLabel: { type: String, default: 'Submit' },
  hasSubmitButton: { type: Boolean, default: true }
})

const emit = defineEmits(['submit', 'update:modelValue'])

/* =========================
   v-model Proxy
========================= */
const form = computed({
  get: () => props.modelValue,
  set: val => emit('update:modelValue', val)
})

/* =========================
   State
========================= */
const state = reactive({
  isSubmiting: false,
  submitBtnLabel: props.submitLabel,
  isDisable: false
})

/* =========================
   Show If
========================= */
const evaluateCondition = (condition, formData) => {
  if (!condition) return true

  if (condition.type === 'or') {
    return condition.conditions.some(c => evaluateCondition(c, formData))
  }

  if (condition.type === 'and') {
    return condition.conditions.every(c => evaluateCondition(c, formData))
  }

  const { field, operator, value } = condition
  const current = formData[field]

  switch (operator) {
    case 'equals': return current === value
    case 'not_equals': return current !== value
    default: return true
  }
}

/* =========================
   Root Formula Engine
========================= */
function evaluateRootFormula(formula, state, fields) {
  try {
    if (!formula) return 0

    let expression = formula

    /* =========================
       1️⃣ Replace ALL sum(...)
    ========================= */
    expression = expression.replace(/sum\((.*?)\)/g, (_, inside) => {
      if (inside.startsWith('items.')) {
        const field = inside.split('.')[1]

        const subtotal = (state.items || []).reduce((sum, row) => {
          return sum + (Number(row[field]) || 0)
        }, 0)

        return subtotal
      }
      return 0
    })

    /* =========================
       2️⃣ Build Scope
    ========================= */
    const scope = {}

    fields.forEach(field => {
      if (field.type === 'tableItems') return

      const value = state[field.name]

      // IMPORTANT: jangan pakai Number() untuk string seperti discount_type
      scope[field.name] =
        isNaN(value) || value === null
          ? value ?? 0
          : Number(value)
    })

    /* =========================
       3️⃣ Evaluate Expression
    ========================= */
    return new Function(
      ...Object.keys(scope),
      `return ${expression}`
    )(...Object.values(scope))

  } catch (err) {
    console.error('Formula error:', err)
    return 0
  }
}

/* =========================
   Recalculate Root Formulas
========================= */
function recalculateForm() {
  props.fields.forEach(field => {

    if (field.type === 'tableItems') return
    if (!field.formula) return

    const result = evaluateRootFormula(
      field.formula,
      form.value,
      props.fields
    )

    if (form.value[field.name] !== result) {
      form.value[field.name] = result
    }
  })
}

/* =========================
   Watch Deep Changes
========================= */
let isRecalculating = false

watch(
  () => form.value,
  () => {
    if (isRecalculating) return

    isRecalculating = true
    recalculateForm()
    isRecalculating = false
  },
  { deep: true }
)

/* =========================
   Submit
========================= */
const handleSubmit = async (e) => {
  e.preventDefault()

  state.isSubmiting = true
  state.isDisable = true

  const fd = new FormData()

  Object.entries(form.value).forEach(([key, val]) => {
    if (val == null) return

    if (val instanceof FileList) {
      for (let i = 0; i < val.length; i++) {
        fd.append(`${key}[]`, val[i])
      }
    } else {
      fd.append(key, val)
    }
  })

  emit('submit', {
    payload: fd,
    callback: () => {
      state.submitBtnLabel = "Submitted..."
      state.isSubmiting = false

      document.querySelectorAll('input[type=file]')
        .forEach(el => el.value = "")

      setTimeout(() => {
        state.submitBtnLabel = props.submitLabel
        state.isDisable = false
      }, 2000)
    }
  })
}
</script>

<template>
  <form @submit="handleSubmit">
    <div class="row">
      <template v-for="field in fields">
        <component
          :key="field.name"
          :is="inputComponents[field.type]"
          v-model="form[field.name]"
          v-if="!field.show_if || evaluateCondition(field.show_if, form)"
          :field="field"
          class="col-12"
          :class="field.className ?? ''"
          :formData="form"
        />
      </template>

      <slot></slot>

      <div>
        <button v-if="hasSubmitButton" :disabled="state.isDisable" class="btn btn-primary">
          {{ state.isSubmiting ? 'Please wait...' : state.submitBtnLabel }}
        </button>
      </div>
    </div>
  </form>
</template>
