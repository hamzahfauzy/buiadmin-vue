<script setup>
import { useId } from 'vue';
const props = defineProps({
  modelValue: String,
  field: Object
})
const emit = defineEmits(["update:modelValue"])
const elId = props.field.name +'-'+ useId()
</script>
<template>
    <div class="mb-3">
        <label v-if="field?.label" :for="elId" class="form-label">
            {{field.label}}
        </label>
        <input type="time" :id="elId" :placeholder="field?.placeholder || ''" v-bind="field?.props ?? {}" :value="modelValue" @input="emit('update:modelValue', $event.target.value)" :required="field?.required" class="form-control">
    </div>
</template>