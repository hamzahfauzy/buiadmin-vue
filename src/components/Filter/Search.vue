<script setup>
defineProps({
    modelValue: String
})
const emit = defineEmits(["update:modelValue"])
</script>
<template>
    <div class="position-relative">
        <span class="search-icon">
            <i class="ft ft-search"></i>
        </span>
        <input id="data-table-search" type="text" class="form-control search-input" placeholder="Search..." :value="modelValue" @input="emit('update:modelValue', $event.target.value)">
    </div>
</template>