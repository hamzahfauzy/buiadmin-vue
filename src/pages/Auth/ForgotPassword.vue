<template>
    <h2>Atur Ulang Kata Sandi</h2>
    <p class="text-center">Masukan Nama Pengguna untuk mengatur ulang kata sandi.</p>
    <form>
        <div class="form-group">
            <label for="" class="form-label">Nama Pengguna</label>
            <input type="text" placeholder="example: johndoe" required class="form-control form-control-lg">
        </div>

        <button type="submit" class="btn btn-primary btn-login w-100 btn-lg">Submit</button>

        <p class="text-center mt-3">
            <router-link to="/auth/login" class="text-light">Klik disini</router-link> untuk kembali ke halaman Login
        </p>
    </form>
</template>