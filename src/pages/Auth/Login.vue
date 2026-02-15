<script setup>
import { ref } from 'vue';
import Auth from '@/libraries/auth';
import { useRouter } from 'vue-router';
import { useAppStore } from '@/libraries/app';
import Alert from '@/components/Alert.vue';

const router = useRouter()
const appStore = useAppStore()
const showPassword = ref(false)
const authData = ref({
    username: '',
    password: ''
})

const alertComponent = ref(null)

async function doLogin(){
    $('.btn-login').html('Pelase wait...')
    try {
        const login = await Auth.login(authData.value)
        if(login)
        {
            await appStore.fetchUi()
            appStore.token = login.token
            appStore.isAuthChecked = false
            router.push(appStore.defaultPage)
        }
        else
        {
        }
    } catch (error) {
        if(error.response?.data?.message)
        {
            alertComponent.value.show('alert-danger', error.response?.data?.message)
        }
    }
    $('.btn-login').html('Submit')
}
</script>
<template>
    <h2>Login</h2>
    <p class="text-center">Use your username and password to login into the system.</p>

    <Alert ref="alertComponent"/>
    <form method="post" @submit.prevent="doLogin">
        <div class="form-group">
            <label for="" class="form-label">Username</label>
            <input type="text" v-model="authData.username" placeholder="example: johndoe" required class="form-control form-control-lg">
        </div>

        <div class="form-group">
            <label for="" class="form-label">Password</label>
            <div class="auth-form-password form-password position-relative">
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
                    Remember me ?
                </label>
            </div>
        </div>

        <button type="submit" class="btn btn-primary btn-login w-100 btn-lg">Submit</button>

        <p class="text-center mt-3">
            Forgot Password ? <router-link to="/auth/forgot-password" class="text-light">Click here</router-link> to reset password
        </p>
    </form>
</template>