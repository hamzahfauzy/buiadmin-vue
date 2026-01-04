<script setup>
import '@/assets/css/auth.css';
</script>
<template>
    <div class="auth-container">
        <div class="login-wrapper">
            <a href="#">
                <img src="/src/assets/images/bui-admin-3.png" alt="">
            </a>
            <div class="login-box">
                <router-view></router-view>
            </div>
            <p class="text-center text-white">BuiAdmin &copy; 2026 by Hamzah Tech</p>
        </div>
    </div>
</template>