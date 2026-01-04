<script setup>
import Sidebar from './Sidebar.vue';
</script>
<template>
    <section class="app-content">
        <div class="app-sidebar">
            <Sidebar />
        </div>

        <div class="app-main-content">
            <router-view />
        </div>
    </section>

    <section class="app-sidebar-mobile">
        <div class="sidebar-mobile-overlay"></div>

        <Sidebar className="app-side-nav bg-light shadow"/>
    </section>
</template>