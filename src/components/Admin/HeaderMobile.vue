<script setup>
import Account from './Header/Account.vue';
import Brand from './Header/Brand.vue';
import MessageList from './Header/MessageList.vue';
import NotificationList from './Header/NotificationList.vue';
</script>
<template>
    <section class="app-header-mobile app-header-primary">
        <div class="container-fluid app-header-container p-0">
            <Brand />
            <div class="app-title w-100">
                <div class="app-navigation d-flex justify-content-between w-100">
                    <button class="btn btn-menu btn-toggle-side-nav-mobile">
                        <i class="ft ft-menu"></i>
                        <i class="ft ft-x"></i>
                    </button>
                    
                    <button class="btn btn-menu btn-toggle-account-side">
                        <i class="ft ft-user"></i>
                    </button>
                </div>
            </div>
        </div>
    </section>

    <section class="app-user-mobile">
        <ul class="d-flex align-items-center gap-4">
            <MessageList />

            <NotificationList />
        </ul>

        <ul>
            <Account />
        </ul>
    </section>
</template>