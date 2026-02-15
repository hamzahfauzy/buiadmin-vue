$(document).on('click', '.btn-toggle-side-nav', function(){
    $('.app-sidebar').toggleClass('minimize')
    $('.app-header').toggleClass('minimize')
})

$(document).on('click', '.btn-toggle-side-nav-mobile', function(){
    const sidebar = $('.app-sidebar-mobile')
    if (!sidebar.hasClass('show')) {
        sidebar.addClass('show');

        $('.app-header-mobile .app-title .app-navigation .btn-menu .ft-x').show()
        $('.app-header-mobile .app-title .app-navigation .btn-menu .ft-menu').hide()

        setTimeout(() => {
            sidebar.addClass('active')
        }, 10);
    }
    else
    {
        sidebar.removeClass('active');
        $('.app-header-mobile .app-title .app-navigation .btn-menu .ft-x').hide()
        $('.app-header-mobile .app-title .app-navigation .btn-menu .ft-menu').show()
        setTimeout(() => {
            sidebar.removeClass('show');
        }, 300);
    }
})

$(document).on('click', '.btn-toggle-account-side', function(){
    $('.app-user-mobile').toggleClass('show')
})

$(document).on('click', '.sidebar-mobile-overlay', function(){
    $('.app-header-mobile .app-title .app-navigation .btn-menu .ft-x').hide()
    $('.app-header-mobile .app-title .app-navigation .btn-menu .ft-menu').show()
    $('.app-sidebar-mobile').toggleClass('active')
    setTimeout(() => {
        $('.app-sidebar-mobile').toggleClass('show')
    }, 300);
})

$(window).on('resize', function () {
    handleResize();
});

function handleResize() {
    const width = $(window).width();

    if (width <= 768) {
        // Tablet
        $('.app-sidebar').addClass('minimize')
        $('.app-header').addClass('minimize')
    } else {
        // Desktop
        $('.app-sidebar').removeClass('minimize')
        $('.app-header').removeClass('minimize')
    }
}

// Jalankan saat halaman pertama kali dibuka
setTimeout(handleResize, 100)


$(document).on('show.bs.dropdown', '.dropdown.datatable-dropdown-action', function () {
    const menu = $(this).find('.dropdown-menu')
    $('body').append(menu.detach())
})

$(document).on('hide.bs.dropdown', '.dropdown.datatable-dropdown-action', function () {
    const menu = $(this).find('.dropdown-menu')
    $(this).append(menu.detach())
})

export function getNested(obj, path) {
    return path ? path.split('.').reduce((o, p) => o ? o[p] : null, obj) : path
}

export function setNested(obj, path, value) {
    const keys = path.split('.')
    let current = obj
    keys.forEach((key, index) => {
        if (index === keys.length - 1) {
            current[key] = value
        } else {
            if (!current[key] || typeof current[key] !== 'object') {
                current[key] = {}
            }
            current = current[key]
        }
    })
}

export function parseFormData(model){
    const fd = new FormData()
    Object.entries(model).forEach(([key, val]) => {
        if (val == null || val == undefined) return
        if (val instanceof FileList) {
            for (let i = 0; i < val.length; i++) fd.append(`${key}[]`, val[i])
        } else if (val instanceof Object) {
            Object.entries(val).forEach(([k, v]) => {
                // console.log(val)
                fd.append(`${key}[]`, v)
            })
        } else {
            fd.append(key, val)
        }
    })

    return fd
}

function parseDate(dateString) {
    if (!dateString) return null;

    // ISO (paling aman)
    if (/^\d{4}-\d{2}-\d{2}T/.test(dateString)) {
        return new Date(dateString);
    }

    // Normalisasi separator
    const normalized = dateString.replace(/\//g, "-");
    const parts = normalized.split("-");

    if (parts.length !== 3) return null;

    let year, month, day;

    // YYYY-MM-DD
    if (parts[0].length === 4) {
        year  = parts[0];
        month = parts[1];
        day   = parts[2];
    } 
    // DD-MM-YYYY
    else if (parts[2].length === 4) {
        day   = parts[0];
        month = parts[1];
        year  = parts[2];
    } 
    else {
        return null; // format aneh
    }

    return new Date(
        Number(year),
        Number(month) - 1,
        Number(day)
    );
};

// fungsi format date
export function formatDate(date, format = 'Y-m-d H:i:s') {
    if(!date) return date
    date = parseDate(date);

    const pad = (n) => String(n).padStart(2, "0");

    const map = {
        d: pad(date.getDate()),       // 2-digit tanggal
        j: date.getDate(),            // tanggal tanpa leading zero
        m: pad(date.getMonth() + 1),  // 2-digit bulan
        n: date.getMonth() + 1,       // bulan tanpa leading zero
        Y: date.getFullYear(),        // tahun 4 digit
        y: String(date.getFullYear()).slice(-2), // tahun 2 digit
        H: pad(date.getHours()),      // jam 24h
        i: pad(date.getMinutes()),    // menit
        s: pad(date.getSeconds()),    // detik
    };

    return format.replace(/d|j|m|n|Y|y|H|i|s/g, (token) => map[token]);
};