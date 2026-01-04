<script setup>
defineProps({
    title: {
        type: String,
        default: 'Title'
    },
    actions: Array
})
</script>
<template>
    <div class="page-title-header d-flex justify-content-between align-items-center mb-3">
        <div class="title">
            <h2 class="m-0 p-0">{{ title }}</h2>
        </div>
        <div class="action" v-if="actions">
            <template v-for="action in actions">
                <button class="btn btn-primary" v-if="action.type == 'button'" @click="action.clickEvent">
                    <i class="ft" :class="'ft-'+action.icon"></i>
                    {{ action.label }}
                </button>

                <router-link v-else-if="action.type == 'link'" :href="'/pages' + action.to">
                    <i class="ft" :class="'ft-'+action.icon"></i>
                    {{ action.label }}
                </router-link>
            </template>
        </div>
    </div>
</template>