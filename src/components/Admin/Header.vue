<script setup>
import Account from './Header/Account.vue';
import Brand from './Header/Brand.vue';
import MessageList from './Header/MessageList.vue';
import NotificationList from './Header/NotificationList.vue';
</script>
<template>
    <section class="app-header app-header-primary">
        <div class="container-fluid app-header-container p-0">
            <Brand />
            <div class="app-title w-100 d-flex justify-content-between">
                <div class="app-navigation">
                    <button class="btn btn-menu btn-toggle-side-nav">
                        <i class="ft ft-menu"></i>
                    </button>
                </div>
                <div class="app-user">
                    <ul class="d-flex align-items-center gap-4">
                        <MessageList />

                        <NotificationList />
                        
                        <Account />
                    </ul>
                </div>
            </div>
        </div>
    </section>
</template>