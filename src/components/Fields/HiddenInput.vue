<script setup>
import { useId } from 'vue';
const props = defineProps({
  modelValue: null,
  field: Object
})
const emit = defineEmits(["update:modelValue"])
const elId = props.field.name +'-'+ useId()
</script>
<template>
    <input type="hidden" :id="elId" :placeholder="field?.placeholder || ''" :value="modelValue" v-bind="field?.props ?? {}" @input="emit('update:modelValue', $event.target.value)">
</template>