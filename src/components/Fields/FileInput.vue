<script setup>
import { useId } from 'vue';
const props = defineProps({
  modelValue: [File, String], // bisa File (baru upload) atau String (URL lama)
  field: Object
})
const emit = defineEmits(["update:modelValue"])
const elId = props.field.name + '-' + useId()

function onFileChange(e) {
  const file = e.target.files[0] || null
  emit("update:modelValue", file)
}
</script>
<template>
    <div class="mb-3">
        <label v-if="field?.label" class="form-label" :for="elId">
        {{ field.label }}
        </label>
        <input :id="elId" type="file" v-bind="field?.props ?? {}" :accept="field?.accept || '*/*'" @change="onFileChange" :required="field?.required" class="form-control">
    </div>
</template>