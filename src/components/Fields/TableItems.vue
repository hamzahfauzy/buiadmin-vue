<script setup>
import { computed } from "vue"
import inputComponents from "../../libraries/input-components"

const props = defineProps({
  modelValue: {
    type: Array,
    default: () => []
  },
  field: Object
})

const emit = defineEmits(['update:modelValue'])

/* =========================
   Reactive Items (v-model)
========================= */
const items = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
})

/* =========================
   Formula Evaluator
========================= */
function evaluateFormula(formula, row) {
  try {
    const safeRow = {}

    Object.keys(row).forEach(key => {
      safeRow[key] = Number(row[key]) || 0
    })

    return new Function(
      ...Object.keys(safeRow),
      `return ${formula}`
    )(...Object.values(safeRow))

  } catch {
    return 0
  }
}

/* =========================
   Add Item
========================= */
function addItems() {
  const newRow = {}

  props.field?.columns.forEach(column => {
    newRow[column.name] = null
  })

  items.value = [...items.value, newRow]
}

/* =========================
   Remove Item
========================= */
function removeItem(index) {
  const clone = [...items.value]
  clone.splice(index, 1)
  items.value = clone
}

/* =========================
   Update Cell + Recalculate
========================= */
function updateCell(rowIndex, field, value) {

  const clone = [...items.value]
  const row = { ...clone[rowIndex] }

  row[field.name] = value

  // hitung ulang formula
  props.field.columns.forEach(col => {
    if (col.formula) {
      const result = evaluateFormula(col.formula, row)

      if (row[col.name] !== result) {
        row[col.name] = result
      }
    }
  })

  clone[rowIndex] = row
  items.value = clone
}
</script>
<template>
  <div class="mb-2">
    <div class="table-responsive">
      <table class="table table-bordered">
        <thead>
          <tr>
            <th style="width:1%;">
              <button type="button" class="btn btn-primary btn-sm" @click="addItems">
                <i class="ft ft-plus"></i>
              </button>
            </th>

            <th v-for="column in field?.columns"
                :key="column.name"
                style="min-width: 100px;"
                class="text-nowrap">
              {{ column.columnLabel }}
            </th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="(row, rowIndex) in items" :key="rowIndex">
            <td>
              <button type="button"
                      class="btn btn-danger btn-sm"
                      @click="removeItem(rowIndex)">
                <i class="ft ft-minus"></i>
              </button>
            </td>

            <td v-for="field in props.field?.columns"
                :key="field.name"
                :style="field.style"
                class="text-nowrap">

              <component
                :is="inputComponents[field.type]"
                :field="field"
                class="col-12"
                :class="field.className ?? ''"
                :modelValue="row[field.name]"
                @update:modelValue="val => updateCell(rowIndex, field, val)"
              />

            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>