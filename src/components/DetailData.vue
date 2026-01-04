<script setup>
import DetailField from './Fields/DetailField.vue';
defineProps({
    fields: Array,
    modelValue: { type: Object, default: () => ({}) }
})
</script>
<template>
    <div class="row">
        <div class="col-12 mb-2" v-for="field in fields" :class="field.className">
            <DetailField :field="field" :data="modelValue" />
        </div>
    </div>
</template>