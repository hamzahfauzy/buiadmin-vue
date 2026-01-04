<script setup>
import { useAppStore } from '@/libraries/app';
import { useRoute } from 'vue-router';
import Html from '@/components/PageContent/Html.vue';
import Crud from '@/components/PageContent/Crud.vue';
import DataTable from '@/components/PageContent/DataTable.vue';
import NotFound from './NotFound.vue';
import { onMounted, ref, shallowRef, watch } from 'vue';

const appStore = useAppStore()
const route = useRoute()
var page = ref(null)
var comp = shallowRef(null)
const pageContents = {
    html: Html,
    crud: Crud,
    datatable: DataTable
}

watch(
  () => route.fullPath,
  () => {
    loadPage()
  },
  { immediate: true }
)

function loadPage(){
    const pageKey = route.params.pathMatch.join('/')
    const getPage = appStore.getPageByPath(pageKey)
    page.value = getPage
    comp.value = getPage ? pageContents[getPage.content.type] : false
    document.title = getPage ? page.value.title : 'Error 404! Not Found';
}

onMounted(() => {
    loadPage()
})

</script>
<template>
    <component v-if="page" :is="comp" :page="page" :key="route.fullPath"></component>
    <NotFound v-else/>
</template>