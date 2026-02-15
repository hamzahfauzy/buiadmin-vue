<script setup>
import { useAppStore } from '@/libraries/app';

const appStore = useAppStore()
</script>
<template>
    <div class="app-brand">
        <router-link :to="appStore.defaultPage" class="navbar-brand text-white primary-brand">
            <img src="/src/assets/images/bui-admin-3.png" alt="bui admin icon">
        </router-link>
        <router-link :to="appStore.defaultPage" class="navbar-brand text-white secondary-brand">
            <img src="/src/assets/images/bui-admin-blue.png" alt="bui admin icon">
        </router-link>
        <router-link :to="appStore.defaultPage" class="navbar-brand text-white secondary-minimize-brand">
            <img src="/src/assets/images/bui-admin-icon-primary.png" alt="bui admin icon">
        </router-link>
        <router-link :to="appStore.defaultPage" class="navbar-brand text-white primary-minimize-brand">
            <img src="/src/assets/images/bui-admin-icon.png" alt="bui admin icon">
        </router-link>
    </div>
</template>