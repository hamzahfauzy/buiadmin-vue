<script setup>
import '@/assets/css/icons.css';
import '@/assets/css/style.css';
import Header from "@/components/Admin/Header.vue";
import HeaderMobile from "@/components/Admin/HeaderMobile.vue";
import Footer from '@/components/Admin/Footer.vue';
import Sidebar from '@/components/Admin/Sidebar.vue';

</script>
<template>
    <Header></Header>
    <HeaderMobile />

    <section class="app-content">
        <div class="app-sidebar">
            <Sidebar />
        </div>

        <div class="app-main-content">
            <slot></slot>
        </div>
    </section>

    <section class="app-sidebar-mobile">
        <div class="sidebar-mobile-overlay"></div>

        <Sidebar className="app-side-nav bg-light shadow"/>
    </section>

    <Footer></Footer>
</template>