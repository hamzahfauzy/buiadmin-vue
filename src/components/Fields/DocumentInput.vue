<script setup>
import { useId } from 'vue';
import DocumentService from '@/libraries/services/document.service';
const props = defineProps({
  modelValue: [File, String], // bisa File (baru upload) atau String (URL lama)
  field: Object
})
const emit = defineEmits(["update:modelValue"])
const elId = props.field.name + '-' + useId()

async function onFileChange(e) {
  const file = e.target.files[0] || null
  const document = await DocumentService.singleUpload(file)
  const path = props.field?.srcValue ?? 'storage_path'
  emit("update:modelValue", document[path])
}
</script>
<template>
    <div class="mb-2">
        <label v-if="field?.label" class="form-label" :for="elId">
        {{ field.label }}
        </label>
        <input :id="elId" type="file" v-bind="field?.props ?? {}" :accept="field?.accept || '*/*'" @change="onFileChange" :required="field?.required" class="form-control">
    </div>
</template>