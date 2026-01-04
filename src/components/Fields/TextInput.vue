<script setup>
import { useId } from 'vue';
const props = defineProps({
  modelValue: String,
  field: Object
})
const emit = defineEmits(["update:modelValue"])
const elId = props.field.name + '-' + useId()
</script>
<template>
    <div class="mb-3">
        <label v-if="field?.label" :for="elId" class="form-label">
            {{ field.label }}
        </label>
        <input type="text" :id="elId" :placeholder="field?.placeholder || ''" :value="modelValue" :required="field?.required" v-bind="field?.props ?? {}" @input="emit('update:modelValue', $event.target.value)" class="form-control">
    </div>
</template>