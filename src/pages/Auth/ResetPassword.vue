<script setup>
import { ref } from 'vue';

const showPassword = ref(false)
const showConfirmPassword = ref(false)
</script>
<template>
    <h2>Atur Ulang Kata Sandi</h2>
    <p class="text-center">Masukan Kata Sandi Baru untuk mengatur ulang kata sandi.</p>
    <form>
        <div class="form-group">
            <label for="" class="form-label">Nama Pengguna</label>
            <input type="text" placeholder="johndoe" class="form-control form-control-lg" readonly="">
        </div>

        <div class="form-group">
            <label for="" class="form-label">Kata Sandi</label>
            <div class="form-password position-relative">
                <input :type="showPassword ? 'text' : 'password'" placeholder="*******" required class="form-control form-control-lg">
                <button type="button" class="btn toggle-password-btn" aria-label="Toggle password visibility" @click="showPassword = !showPassword">
                    <i class="ft ft-eye" v-if="!showPassword"></i>
                    <i class="ft ft-eye-off" v-if="showPassword"></i>
                </button>
            </div>
        </div>
        
        <div class="form-group">
            <label for="" class="form-label">Konfirmasi Kata Sandi</label>
            <div class="form-password position-relative">
                <input :type="showConfirmPassword ? 'text' : 'password'" placeholder="*******" required class="form-control form-control-lg">
                <button type="button" class="btn toggle-password-btn" aria-label="Toggle password visibility" @click="showConfirmPassword = !showConfirmPassword">
                    <i class="ft ft-eye" v-if="!showConfirmPassword"></i>
                    <i class="ft ft-eye-off" v-if="showConfirmPassword"></i>
                </button>
            </div>
        </div>

        <button type="submit" class="btn btn-primary btn-login w-100 btn-lg">Submit</button>
    </form>
</template>