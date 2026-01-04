<script setup>
import DataTable from '../DataTable.vue';
import PageTitle from '../PageTitle.vue';
const props = defineProps({
    page: {
        type: Object,
        default: {}
    }
})
</script>
<template>
    <div class="crud-container">
        <PageTitle :title="page.title"/>

        <DataTable 
            :columns="page.content.value.columns" 
            :search="page.content.value.search" 
            :filters="page.content.value.filters"
            :actions="page.content.value.actions" 
            :endpoint="page.content.value.endpoint"/>

    </div>
</template>