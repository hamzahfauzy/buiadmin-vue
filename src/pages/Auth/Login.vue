<script setup>
import { ref } from 'vue';
import Auth from '../../libraries/auth';
import { useRouter } from 'vue-router';
import { useAppStore } from '@/libraries/app';

const router = useRouter()
const appStore = useAppStore()
const showPassword = ref(false)
const authData = ref({
    username: '',
    password: ''
})

async function doLogin(){
    $('.btn-login').html('Silahkan tunggu...')
    try {
        const login = await Auth.login(authData.value)
        if(login)
        {
            appStore.token = login.token
            appStore.isAuthChecked = false
            router.push('/dashboard')
        }
    } catch (error) {
        
    }
    $('.btn-login').html('Masuk')
}
</script>
<template>
    <h2>Login</h2>
    <p class="text-center">Masukan Nama Pengguna dan Kata Sandi untuk dapat masuk ke dalam sistem.</p>
    <form method="post" @submit.prevent="doLogin">
        <div class="form-group">
            <label for="" class="form-label">Nama Pengguna</label>
            <input type="text" v-model="authData.username" placeholder="example: johndoe" required class="form-control form-control-lg">
        </div>

        <div class="form-group">
            <label for="" class="form-label">Kata sandi</label>
            <div class="form-password position-relative">
                <input :type="showPassword ? 'text' : 'password'" v-model="authData.password" placeholder="*******" required class="form-control form-control-lg">
                <button type="button" class="btn toggle-password-btn" aria-label="Toggle password visibility" @click="showPassword = !showPassword">
                    <i class="ft ft-eye" v-if="!showPassword"></i>
                    <i class="ft ft-eye-off" v-if="showPassword"></i>
                </button>
            </div>
        </div>

        <div class="form-group">
            <div class="form-check">
                <input type="checkbox" name="" id="rememberMe" class="form-check-input">
                <label for="rememberMe" class="form-check-label">
                    Ingat Saya ?
                </label>
            </div>
        </div>

        <button type="submit" class="btn btn-primary btn-login w-100 btn-lg">Masuk</button>

        <p class="text-center mt-3">
            Lupa Kata Sandi ? <router-link to="/auth/forgot-password" class="text-light">Klik disini</router-link> untuk atur ulang kata sandi
        </p>
    </form>
</template>