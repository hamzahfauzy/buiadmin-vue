<script setup>
defineProps({
  modelValue: [String, Number],
  field: Object
})
const emit = defineEmits(["update:modelValue"])
</script>
<template>
    <div>
        <label for="" class="mb-1" v-if="field.label">{{ field?.label }}</label>
        <select :id="field?.key" :value="modelValue" @change="emit('update:modelValue', $event.target.value);" class="form-select">
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