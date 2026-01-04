<script setup>
import StatusBadge from '../StatusBadge.vue';
import MultiBadge from '../MultiBadge.vue';
defineProps({
    field: {},
    data: { type: Object, default: {} },
})
</script>
<template>
    <label for="" style="font-weight: 500;">
        {{field.label}}
    </label>
    <template v-if="field.type == 'image'">
        <div :class="field.isCenter ? 'd-flex' : ''">
            <div class="border rounded-circle" style="width: 150px;height: 150px;">
                <a :href="data[field.name]" target="_blank">
                    <img :src="data[field.name]" :alt="field.name" style="width: 100%;height: 100%;object-fit: cover;">
                </a>
            </div>
        </div>
    </template>
    <template v-else>
        <p class="m-0">
            <a v-if="field.type == 'link'" :href="data[field.name]" target="_blank">{{ field.linkLabel ?? data[field.name] }}</a>
            <MultiBadge v-else-if="field.type == 'multi-badge'" :data="data[field.name]" :map="field.badge" />
            <StatusBadge v-else-if="field.type == 'status-badge'" :data="data[field.name]" :map="field.badge" />
            <span v-else v-html="field.map ? field.map[data[field.name]] : data[field.name]"></span>
        </p>
    </template>
</template>