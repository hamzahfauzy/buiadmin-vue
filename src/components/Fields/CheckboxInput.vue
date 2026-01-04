<script setup>
import { ref } from 'vue';
import { useId } from 'vue';

const props = defineProps({
  modelValue: { type: [Boolean, String, Number], default: false },
  field: Object
})
const emit = defineEmits(["update:modelValue"])
const checkboxToggle = ref(false)

const elId = props.field?.name + '-' + useId()

function toggle(e) {
    const checked = e.target.checked
    emit("update:modelValue", checked ? (props.field.value ?? true) : false)
    checkboxToggle.value = checked
}
</script>

<template>
    <div class="mb-3">
        <div class="form-check">
            <input type="checkbox" :id="elId" v-bind="field?.props ?? {}" :checked="modelValue === (field.value ?? true)" class="form-check-input" @change="toggle">
            <label :for="elId" class="form-check-label">{{ field.label }}</label>
        </div>
    </div>
</template>