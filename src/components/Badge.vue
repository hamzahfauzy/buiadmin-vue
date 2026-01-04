<script setup>
defineProps({
    color: 'primary',
    label: 'Badge'
})
</script>
<template>
    <span class="badge" :class="'bg-' + color">{{ label }}</span> &nbsp;
</template>