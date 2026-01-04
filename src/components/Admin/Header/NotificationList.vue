<template>
    <li class="dropdown notification-list">
        <a class="nav-link dropdown-toggle arrow-none" data-bs-toggle="dropdown" href="#" role="button"
            aria-haspopup="false" aria-expanded="false">
            <i class="ri-notification-3-line fs-22"></i>
            <span class="noti-icon-badge badge text-bg-pink">3</span>
        </a>
        <div class="dropdown-menu dropdown-menu-end dropdown-menu-animated dropdown-lg py-0 shadow">
            <div class="p-2 border-top-0 border-start-0 border-end-0 border-dashed border">
                <div class="row align-items-center">
                    <div class="col">
                        <h6 class="m-0 fs-16 fw-semibold"> You have 6 new notification</h6>
                    </div>
                    <div class="col-auto">
                        <a href="javascript: void(0);" class="text-light badge bg-primary text-decoration-none">
                            <small>View All</small>
                        </a>
                    </div>
                </div>
            </div>

            <div style="max-height: 300px;" data-simplebar>
                <!-- item-->
                <a href="javascript:void(0);" class="dropdown-item notify-item">
                    <div class="notify-icon">
                        <i class="mdi mdi-comment-account-outline text-bui-primary"></i>
                    </div>
                    <p class="notify-details">Caleb Flakelar commented on Admin
                        <small class="noti-time">1 min ago</small>
                    </p>
                </a>

                <!-- item-->
                <a href="javascript:void(0);" class="dropdown-item notify-item">
                    <div class="notify-icon">
                        <i class="mdi mdi-account-plus text-bui-primary"></i>
                    </div>
                    <p class="notify-details">New user registered.
                        <small class="noti-time">5 hours ago</small>
                    </p>
                </a>

                <!-- item-->
                <a href="javascript:void(0);" class="dropdown-item notify-item">
                    <div class="notify-icon">
                        <i class="mdi mdi-heart text-bui-primary"></i>
                    </div>
                    <p class="notify-details">Carlos Crouch liked
                        <small class="noti-time">3 days ago</small>
                    </p>
                </a>

                <!-- item-->
                <a href="javascript:void(0);" class="dropdown-item notify-item">
                    <div class="notify-icon">
                        <i class="mdi mdi-comment-account-outline text-bui-primary"></i>
                    </div>
                    <p class="notify-details">Caleb Flakelar commented on Admi
                        <small class="noti-time">4 days ago</small>
                    </p>
                </a>

                <!-- item-->
                <a href="javascript:void(0);" class="dropdown-item notify-item">
                    <div class="notify-icon">
                        <i class="mdi mdi-account-plus text-bui-primary"></i>
                    </div>
                    <p class="notify-details">New user registered.
                        <small class="noti-time">7 days ago</small>
                    </p>
                </a>

                <!-- item-->
                <a href="javascript:void(0);" class="dropdown-item notify-item">
                    <div class="notify-icon">
                        <i class="mdi mdi-heart text-bui-primary"></i>
                    </div>
                    <p class="notify-details">Carlos Crouch liked <b>Admin</b>.
                        <small class="noti-time">Carlos Crouch liked</small>
                    </p>
                </a>
            </div>

        </div>
    </li>
</template>