<!-- src/components/Loader.vue -->
<script setup>
import { useAppStore } from '@/libraries/app';
import Spinner from './Spinner.vue';

const appStore = useAppStore()
</script>
<template>
    <div class="position-fixed left-0 top-0 d-flex h-100 w-100 align-items-center justify-content-center bg-white" style="z-index: 999999;" v-if="appStore.isLoading">
        <Spinner />
    </div>
</template>
