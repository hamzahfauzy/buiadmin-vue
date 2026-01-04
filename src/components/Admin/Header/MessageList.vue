<template>
    <li class="dropdown notification-list">
        <a class="nav-link dropdown-toggle arrow-none" data-bs-toggle="dropdown" href="#" role="button"
            aria-haspopup="false" aria-expanded="false">
            <i class="ri-mail-line fs-22"></i>
            <span class="noti-icon-badge badge text-bg-purple">4</span>
        </a>
        <div class="dropdown-menu dropdown-menu-end dropdown-menu-animated dropdown-lg py-0 shadow">
            <div class="p-2 border-top-0 border-start-0 border-end-0 border-dashed border">
                <div class="row align-items-center">
                    <div class="col">
                        <h6 class="m-0 fs-16 fw-semibold"> You have 7 unread emails</h6>
                    </div>
                    <div class="col-auto">
                        <a href="javascript: void(0);" class="text-light text-decoration-none badge bg-primary">
                            <small>View All</small>
                        </a>
                    </div>
                </div>
            </div>

            <div style="max-height: 300px;" data-simplebar>

                <!-- item-->
                <a href="javascript:void(0);"
                    class="dropdown-item p-0 notify-item read-noti card m-0 shadow-none">
                    <div class="card-body">
                        <div class="d-flex align-items-center">
                            <div class="flex-shrink-0">
                                <div class="notify-icon">
                                    <img src="/src/assets/images/avatar.jpeg" class="img-fluid rounded-circle"
                                        alt="" />
                                </div>
                            </div>
                            <div class="flex-grow-1 text-truncate ms-2">
                                <h5 class="noti-item-title fw-semibold fs-14">Cristina Pride <small
                                        class="fw-normal text-muted float-end ms-1">1 day ago</small></h5>
                                <small class="noti-item-subtitle text-muted">Hi, How are you? What about our
                                    next meeting</small>
                            </div>
                        </div>
                    </div>
                </a>

                <!-- item-->
                <a href="javascript:void(0);"
                    class="dropdown-item p-0 notify-item read-noti card m-0 shadow-none">
                    <div class="card-body">
                        <div class="d-flex align-items-center">
                            <div class="flex-shrink-0">
                                <div class="notify-icon">
                                    <img src="/src/assets/images/avatar.jpeg" class="img-fluid rounded-circle"
                                        alt="" />
                                </div>
                            </div>
                            <div class="flex-grow-1 text-truncate ms-2">
                                <h5 class="noti-item-title fw-semibold fs-14">Sam Garret <small
                                        class="fw-normal text-muted float-end ms-1">2 day ago</small></h5>
                                <small class="noti-item-subtitle text-muted">Yeah everything is fine</small>
                            </div>
                        </div>
                    </div>
                </a>

                <!-- item-->
                <a href="javascript:void(0);"
                    class="dropdown-item p-0 notify-item read-noti card m-0 shadow-none">
                    <div class="card-body">
                        <div class="d-flex align-items-center">
                            <div class="flex-shrink-0">
                                <div class="notify-icon">
                                    <img src="/src/assets/images/avatar.jpeg" class="img-fluid rounded-circle"
                                        alt="" />
                                </div>
                            </div>
                            <div class="flex-grow-1 text-truncate ms-2">
                                <h5 class="noti-item-title fw-semibold fs-14">Karen Robinson <small
                                        class="fw-normal text-muted float-end ms-1">2 day ago</small></h5>
                                <small class="noti-item-subtitle text-muted">Wow that's great</small>
                            </div>
                        </div>
                    </div>
                </a>

                <!-- item-->
                <a href="javascript:void(0);"
                    class="dropdown-item p-0 notify-item read-noti card m-0 shadow-none">
                    <div class="card-body">
                        <div class="d-flex align-items-center">
                            <div class="flex-shrink-0">
                                <div class="notify-icon">
                                    <img src="/src/assets/images/avatar.jpeg" class="img-fluid rounded-circle"
                                        alt="" />
                                </div>
                            </div>
                            <div class="flex-grow-1 text-truncate ms-2">
                                <h5 class="noti-item-title fw-semibold fs-14">Sherry Marshall <small
                                        class="fw-normal text-muted float-end ms-1">3 day ago</small></h5>
                                <small class="noti-item-subtitle text-muted">Hi, How are you? What about our
                                    next meeting</small>
                            </div>
                        </div>
                    </div>
                </a>

                <!-- item-->
                <a href="javascript:void(0);"
                    class="dropdown-item p-0 notify-item read-noti card m-0 shadow-none">
                    <div class="card-body">
                        <div class="d-flex align-items-center">
                            <div class="flex-shrink-0">
                                <div class="notify-icon">
                                    <img src="/src/assets/images/avatar.jpeg" class="img-fluid rounded-circle"
                                        alt="" />
                                </div>
                            </div>
                            <div class="flex-grow-1 text-truncate ms-2">
                                <h5 class="noti-item-title fw-semibold fs-14">Shawn Millard <small
                                        class="fw-normal text-muted float-end ms-1">4 day ago</small></h5>
                                <small class="noti-item-subtitle text-muted">Yeah everything is fine</small>
                            </div>
                        </div>
                    </div>
                </a>
            </div>

        </div>
    </li>
</template>