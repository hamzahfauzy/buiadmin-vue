<script setup>
import { useId } from 'vue';
const props = defineProps({
  modelValue: String,
  field: Object
})

const elId = props.field?.name + '-' + useId()
const emit = defineEmits(["update:modelValue"])
</script>
<template>
    <div class="mb-3">
        <label v-if="field?.label" :for="elId" class="form-label">
            {{field.label}}
        </label>
        <input type="date" :id="elId" v-bind="field?.props ?? {}" :placeholder="field?.placeholder || ''" :value="modelValue" @input="emit('update:modelValue', $event.target.value)" :required="field?.required" class="form-control" onclick="this.showPicker()">
    </div>
</template>