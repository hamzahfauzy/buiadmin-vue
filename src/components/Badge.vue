<script setup>
defineProps({
    color: 'primary',
    label: 'Badge'
})
</script>
<template>
    <span class="badge" :class="'fw-semibold bg-' + color +'-subtle text-'+color+'-emphasis'">{{ label }}</span> &nbsp;
</template>