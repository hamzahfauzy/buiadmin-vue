<script setup>
import { ref, watch } from 'vue'
import { useId } from 'vue';
const props = defineProps({
  modelValue: String,
  field: Object
})
const emit = defineEmits(["update:modelValue"])
const textareaRef = ref(null)
const text = ref(props.modelValue || '')
const elId = props.field.name +'-'+ useId()

watch(
  () => props.modelValue,
  (val) => {
    if (val !== text.value) text.value = val || ''
  }
)

// Fungsi untuk menambahkan variabel
const addVariableToTextarea = (variable) => {
  const textarea = textareaRef.value
  if (!textarea) return

  const cursorPos = textarea.selectionStart
  const v = text.value
  const textBefore = v.substring(0, cursorPos)
  const textAfter = v.substring(cursorPos, v.length)

  text.value = textBefore + `{${variable}}` + textAfter

  emit('update:modelValue', text.value)

  // Fokus & geser kursor ke posisi baru
  textarea.focus()
  const newPos = cursorPos + variable.length + 2 // 2 = '{}'
  textarea.setSelectionRange(newPos, newPos)
}
</script>

<template>
    <div class="mb-3">
        <label v-if="field?.label" :for="elId" class="form-label">
            {{ field.label }}
        </label>
        <textarea :id="elId" ref="textareaRef" v-bind="field?.props ?? {}" :placeholder="field?.placeholder || ''" @input="emit('update:modelValue', $event.target.value)" :value="modelValue" :required="field?.required" rows="6" class="form-control"></textarea>

        <div class="mt-2 variable-group d-flex gap-2 flex-wrap" v-if="field?.variables">
            <button type="button" v-for="variable in field.variables" @click="addVariableToTextarea(variable)" class="btn btn-secondary">
                {{ variable }}
            </button>
        </div>
    </div>
</template>