<script setup>
import StatusBadge from '../StatusBadge.vue';
import MultiBadge from '../MultiBadge.vue';
import { getNested, formatDate } from '@/libraries/utility';
defineProps({
    field: {},
    data: { type: Object, default: {} },
})

function parseColumn(column, data){
    const value = getNested(data, column.name)
    if(column.type == 'date')
    {
        return formatDate(value, column.format ?? 'Y-m-d H:i:s')
    }
    if(column.type == 'object' && value != "")
    {
        return JSON.stringify(value)
    }
    return value !== "" ? value : '&nbsp;'
}
</script>
<template>
    <label for="" class="detail-label">
        {{field.label}}
    </label>
    <template v-if="field.type == 'image'">
        <div :class="field.isCenter ? 'd-flex' : ''">
            <div class="border rounded-circle" style="width: 150px;height: 150px;">
                <a :href="data[field.name]" target="_blank">
                    <img :src="parseColumn(field, data)" :alt="field.name" style="width: 100%;height: 100%;object-fit: cover;">
                </a>
            </div>
        </div>
    </template>
    <template v-else>
        <p class="m-0 detail-item">
            <a v-if="field.type == 'link'" :href="data[field.name]" target="_blank">{{ field.linkLabel ?? parseColumn(field, data) }}</a>
            <MultiBadge v-else-if="field.type == 'multi-badge'" :data="data[field.name]" :map="field.badge" />
            <StatusBadge v-else-if="field.type == 'status-badge'" :data="data[field.name]" :map="field.badge" />
            <span v-else v-html="field.map ? field.map[data[field.name]] : parseColumn(field, data)"></span>
        </p>
    </template>
</template>