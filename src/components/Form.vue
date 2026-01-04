<script setup>
import inputComponents from "../libraries/input-components"
import { reactive, ref } from "vue"

const props = defineProps({
  fields: { type: Array, default: () => ([]) },
  modelValue: { type: Object, default: () => ({}) },
  submitLabel: { type: String, default: 'Submit' },
  hasSubmitButton: { type: Boolean, default: true }
})

const state = reactive({
  isSubmiting: false,
  submitBtnLabel: props.submitLabel,
  isDisable: false
})

const emit = defineEmits(['submit'])
const isSubmiting = ref(false)

const getModelValue = key => {
    return props.modelValue[key]
}

const handleSubmit = async (e) => {
  e.preventDefault()
  state.isSubmiting = true
  state.isDisable = true


  const fd = new FormData()
  Object.entries(props.modelValue).forEach(([key, val]) => {
    if (val == null) return
    if (val instanceof FileList) {
      for (let i = 0; i < val.length; i++) fd.append(`${key}[]`, val[i])
    } else {
      fd.append(key, val)
    }
  })

  emit('submit', {
    payload: fd,
    callback: function () {
      state.submitBtnLabel = "Data telah disubmit"
      state.isSubmiting = false

      document.querySelectorAll('input[type=file]').forEach(el => { el.value = "" })

      setTimeout(e => {
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
        <component :key="field.name" :is="inputComponents[field.type]" v-model="modelValue[field.name]"
          v-if="field?.conditional ? field.conditional() : true" :field="field" class="col-12" :class="field.className ?? ''" />
      </template>

      <slot></slot>
      <button v-if="hasSubmitButton" :disabled="state.isDisable" class="btn btn-primary">
        {{ state.isSubmiting ? 'Silahkan Tunggu...' : state.submitBtnLabel }}
      </button>
    </div>
  </form>
</template>
