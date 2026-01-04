<script setup>
import { ref } from 'vue';
import { useId } from 'vue';

const props = defineProps({
  modelValue: [String, Number],
  field: Object
})
const emit = defineEmits(["update:modelValue"])
const elId = props.field.name +'-'+ useId()
const isOptionSelected = ref(false)
</script>
<template>
    <div class="mb-3">
        <label v-if="field?.label" :for="elId" class="form-label">
            {{ field.label }}
        </label>
        <select :id="elId" v-bind="field?.props ?? {}" :value="modelValue" @change="emit('update:modelValue', $event.target.value);" :required="field?.required" class="form-select">
            <option value="">
                {{ field?.placeholder || "Pilih..." }}
            </option>
            <option
                v-for="opt in field?.options || []"
                :key="opt.value"
                :value="opt.value"
            >
                {{ opt.label }}
            </option>
        </select>
    </div>
</template>