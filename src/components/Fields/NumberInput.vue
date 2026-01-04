<script setup>
import { useId } from 'vue';
const props = defineProps({
    modelValue: [Number, String],
    field: Object
})
const emit = defineEmits(["update:modelValue"])
const elId = props.field.name +'-'+useId()
</script>
<template>
    <div :class="field?.label ? 'mb-3' : ''">
        <label v-if="field?.label" :for="elId" class="form-label">
            {{ field.label }}
        </label>
        <input type="number" :id="elId" :placeholder="field?.placeholder || ''" :value="modelValue"
            :required="field?.required" @input="emit('update:modelValue', $event.target.value)"
            v-bind="field?.props ?? {}" class="form-control">
    </div>
</template>