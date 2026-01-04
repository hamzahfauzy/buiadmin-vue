<script setup>
import '@/assets/css/icons.css';
import '@/assets/css/style.css';
import Header from "../components/Admin/Header.vue";
import HeaderMobile from "../components/Admin/HeaderMobile.vue";
import Content from '../components/Admin/Content.vue';
import Footer from '../components/Admin/Footer.vue';

</script>
<template>
    <Header></Header>
    <HeaderMobile />

    <Content />

    <Footer></Footer>
</template>