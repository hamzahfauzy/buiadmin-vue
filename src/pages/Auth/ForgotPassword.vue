<template>
    <h2>Reset Password</h2>
    <p class="text-center">Put your username to resetting the password.</p>
    <form>
        <div class="form-group">
            <label for="" class="form-label">Username</label>
            <input type="text" placeholder="example: johndoe" required class="form-control form-control-lg">
        </div>

        <button type="submit" class="btn btn-primary btn-login w-100 btn-lg">Submit</button>

        <p class="text-center mt-3">
            <router-link to="/auth/login" class="text-light">Click here</router-link> to back to login form
        </p>
    </form>
</template>