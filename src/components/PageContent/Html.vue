<script setup>
const props = defineProps({
    page: {
        type: Object,
        default: {}
    }
})

</script>
<template>
    <div v-html="page.content.value"></div>
</template>