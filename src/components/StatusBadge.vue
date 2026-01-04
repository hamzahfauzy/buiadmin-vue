<script setup>
import Badge from './Badge.vue';

defineProps({
    data: null,
    map: {}
})
</script>
<template>
    <Badge :color="map.color[data]" :label="map.label[data]" />
</template>