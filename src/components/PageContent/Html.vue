<script setup>
import { computed, onMounted, ref } from 'vue';
import CrudService from '@/libraries/services/crud.service';

const props = defineProps({
    page: {
        type: Object,
        default: {}
    }
})

const templateData = ref(
  props.page.content?.initData ? { ...props.page.content.initData } : {}
)

const renderTemplate = (html, data) => {
  if (!html) return ''

  return html.replace(/\{\{(.*?)\}\}/g, (_, key) => {
    const cleanKey = key.trim()
    return data?.[cleanKey] ?? ''
  })
}

const renderedHtml = computed(() => {
  return renderTemplate(props.page.content?.value, templateData.value)
})

onMounted(async () => {
  if (!props.page.content?.dataSource) return

  try {
    const res = await CrudService.get(props.page.content.dataSource)

    templateData.value = {
      ...templateData.value,
      ...(res.data ?? {})
    }
  } catch (err) {
    console.error('Failed fetch content:', err)
  }
})

</script>
<template>
    <div v-html="renderedHtml"></div>
</template>