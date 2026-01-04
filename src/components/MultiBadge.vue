<script setup>
import Badge from './Badge.vue';

defineProps({
    data: Array,
    map: {}
})
</script>
<template>
    <div style="max-width: 500px;white-space: pre-wrap;">
        <Badge v-for="badge in data" :color="map.color" :label="badge[map.labelKey]" />
    </div>
</template>