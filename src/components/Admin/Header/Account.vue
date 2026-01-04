<script setup>
import Auth from '@/libraries/auth';
import { useRouter } from 'vue-router';
import { useAppStore } from '@/libraries/app';

const router = useRouter()
const appStore = useAppStore()
function doLogout(){
    Auth.logout()
    appStore.token = null
    appStore.isAuthenticated = false
    appStore.isLoading = true
    router.push('/auth/login')

    setTimeout( () => {
        appStore.isLoading = false
    }, 1000)
}
</script>
<template>
    <li class="dropdown account" v-if="appStore.ui">
        <a class="nav-link dropdown-toggle arrow-none nav-user" data-bs-toggle="dropdown" href="#" role="button" aria-haspopup="false" aria-expanded="false">
            <span class="account-user-avatar">
                <img src="/src/assets/images/avatar.jpeg" alt="user-image" width="32" class="rounded-circle">
            </span>
            <span class="d-block">
                {{ appStore.ui?.user?.name }}

                <i class="ri-arrow-down-s-line d-inline-block align-middle"></i>
            </span>
        </a>
        <div class="dropdown-menu dropdown-menu-end dropdown-menu-animated profile-dropdown shadow">
            <!-- item-->
            <div class=" dropdown-header noti-title">
                <h6 class="text-overflow m-0">Welcome !</h6>
            </div>

            <!-- item-->
            <a href="pages-profile.html" class="dropdown-item">
                <i class="ri-account-circle-line fs-18 align-middle me-1"></i>
                <span>My Account</span>
            </a>

            <!-- item-->
            <a href="pages-profile.html" class="dropdown-item">
                <i class="ri-settings-4-line fs-18 align-middle me-1"></i>
                <span>Settings</span>
            </a>

            <!-- item-->
            <a href="javascript:void(0)" class="dropdown-item" @click="doLogout">
                <i class="ri-logout-box-line fs-18 align-middle me-1"></i>
                <span>Logout</span>
            </a>
        </div>
    </li>
</template>