// --- سبد خرید ---
let cart = [];

// --- باز و بسته کردن منو ---
function toggleCart() {
    document.getElementById('cartSidebar').classList.toggle('active');
    document.getElementById('cartOverlay').classList.toggle('active');
}

// --- اضافه کردن به سبد ---
function addToCart(btn) {
    if (btn.classList.contains('added')) return;

    // پیدا کردن کارت محصول
    const card = btn.closest('.product-card');
    
    // گرفتن اطلاعات محصول از دیتاهای HTML
    const id = card.getAttribute('data-id');
    const name = card.getAttribute('data-name');
    const price = parseInt(card.getAttribute('data-price'));
    const img = card.getAttribute('data-img');

    // چک کنیم محصول قبلا هست یا نه
    const existingItem = cart.find(item => item.id === id);

    if (existingItem) {
        existingItem.qty++;
    } else {
        cart.push({ id, name, price, img, qty: 1 });
    }

    // آپدیت کردن سبد
    updateCartUI();
    
    // انیمیشن دکمه
    const originalText = "افزودن به سبد خرید";
    btn.innerText = "به سبد خرید منتقل شد";
    btn.classList.add('added');
    
    setTimeout(() => {
        btn.classList.remove('added');
        btn.innerText = originalText;
    }, 2000);
}

// --- آپدیت کردن ظاهر سبد ---
function updateCartUI() {
    const container = document.getElementById('cartItemsContainer');
    const totalEl = document.getElementById('totalPrice');
    const countEl = document.getElementById('cart-count');
    
    container.innerHTML = ''; // خالی کردن لیست قبلی
    let totalPrice = 0;
    let totalCount = 0;

    if (cart.length === 0) {
        container.innerHTML = '<p class="empty-msg">سبد خرید شما خالی است...</p>';
    } else {
        cart.forEach(item => {
            totalPrice += item.price * item.qty;
            totalCount += item.qty;

            // ساختن HTML برای هر آیتم
            const itemHTML = `
                <div class="cart-item">
                    <img src="${item.img}" class="cart-img" alt="${item.name}">
                    <div class="cart-details">
                        <h4>${item.name}</h4>
                        <p>${item.price.toLocaleString()} تومان</p>
                        <div class="qty-controls">
                            <button class="qty-btn" onclick="changeQty('${item.id}', 1)">+</button>
                            <span>${item.qty}</span>
                            <button class="qty-btn" onclick="changeQty('${item.id}', -1)">-</button>
                        </div>
                    </div>
                    <i class="fas fa-trash remove-btn" onclick="removeItem('${item.id}')"></i>
                </div>
            `;
            container.innerHTML += itemHTML;
        });
    }

    // نمایش جمع کل و تعداد
    totalEl.innerText = totalPrice.toLocaleString() + ' تومان';
    countEl.innerText = totalCount;
}

// --- تغییر تعداد (مثبت و منفی) ---
function changeQty(id, change) {
    const item = cart.find(i => i.id === id);
    if (item) {
        item.qty += change;
        if (item.qty <= 0) {
            removeItem(id); // اگه صفر شد حذفش کن
        } else {
            updateCartUI();
        }
    }
}

// --- حذف کامل آیتم ---
function removeItem(id) {
    cart = cart.filter(item => item.id !== id);
    updateCartUI();
}

// --- انیمیشن اسکرول و سرچ  ---
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('active');
        else entry.target.classList.remove('active');
    });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal-up, .reveal-down, .reveal-left, .reveal-right')
    .forEach((el) => observer.observe(el));

function searchProducts() {
    let input = document.getElementById('searchInput').value.toLowerCase();
    let cards = document.getElementsByClassName('product-card');
    for (let i = 0; i < cards.length; i++) {
        let title = cards[i].getAttribute('data-name').toLowerCase();
        if (title.includes(input)) cards[i].style.display = "block";
        else cards[i].style.display = "none";
    }
    

    // کد تغییر صفحه
function changePage(pageNum) {
    const p1 = document.querySelectorAll('.page-1');
    const p2 = document.querySelectorAll('.page-2');
    const btns = document.querySelectorAll('.page-btn');

    if (pageNum === 1) {
        // نمایش صفحه 1
        p1.forEach(el => el.style.display = "");
        p2.forEach(el => el.style.display = "none");
        
        btns[0].classList.add('active');
        btns[1].classList.remove('active');
    } 
    else if (pageNum === 2) {
        // نمایش صفحه 2
        p1.forEach(el => el.style.display = "none");
        p2.forEach(el => el.style.display = ""); 
        
        btns[0].classList.remove('active');
        btns[1].classList.add('active');
    }
}




// --- سیستم تغییر تم ---
function toggleTheme() {
    // 1. اضافه/حذف کلاس dark-mode به بدنه سایت
    document.body.classList.toggle('dark-mode');

    // 2. ذخیره وضعیت در حافظه مرورگر
    if (document.body.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark');
    } else {
        localStorage.setItem('theme', 'light');
    }
}

// چک کردن حافظه موقع لود شدن سایت (که تم نپره)
window.onload = function() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
    }


    checkScroll(); // مثلاً برای انیمیشن
};


}

    function changePage(pageNum) {
        // گرفتن لیست محصولات
        const p1 = document.querySelectorAll('.page-1');
        const p2 = document.querySelectorAll('.page-2');
        
        // گرفتن دکمه‌ها
        const btns = document.querySelectorAll('.page-btn');

        if (pageNum === 1) {
            // نمایش محصولات صفحه ۱
            for(let i=0; i<p1.length; i++) { p1[i].style.display = ""; }
            // مخفی کردن محصولات صفحه ۲
            for(let i=0; i<p2.length; i++) { p2[i].style.display = "none"; }
            
            // تنظیم رنگ دکمه
            if(btns.length > 0) {
                btns[0].classList.add('active');
                btns[1].classList.remove('active');
            }
        } 
        else if (pageNum === 2) {
            // مخفی کردن محصولات صفحه ۱
            for(let i=0; i<p1.length; i++) { p1[i].style.display = "none"; }
            // نمایش محصولات صفحه ۲
            for(let i=0; i<p2.length; i++) { p2[i].style.display = ""; }

            // تنظیم رنگ دکمه
            if(btns.length > 0) {
                btns[0].classList.remove('active');
                btns[1].classList.add('active');
            }
        }
    }

        function toggleTheme() {
        console.log("دکمه تم زده شد!"); // برای تست
        document.body.classList.toggle('dark-mode');
        
        // ذخیره در حافظه
        if (document.body.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark');
        } else {
            localStorage.setItem('theme', 'light');
        }
    }

    // لود کردن تم ذخیره شده
    document.addEventListener("DOMContentLoaded", function() {
        if (localStorage.getItem('theme') === 'dark') {
            document.body.classList.add('dark-mode');
        }
    });
// 1. نمایش/مخفی کردن رمز عبور
function togglePassword() {
    const passInput = document.getElementById('password');
    const icon = document.querySelector('.toggle-pass');

    if (passInput.type === 'password') {
        passInput.type = 'text'; // رمز رو نشون بده
        icon.classList.remove('fa-eye'); // آیکون چشم باز رو بردار
        icon.classList.add('fa-eye-slash'); // آیکون چشم خط‌خورده رو بذار
    } else {
        passInput.type = 'password'; // رمز رو مخفی کن
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
    }
}

// 2. مدیریت دکمه ورود (انیمیشن لودینگ)
function handleLogin(e) {
    e.preventDefault(); // جلوگیری از رفرش صفحه

    const btn = document.querySelector('.btn-login');
    const btnText = document.querySelector('.btn-login span');

    // تغییر متن دکمه
    btnText.innerText = "در حال ورود...";
    btn.style.opacity = "0.7";
    btn.style.cursor = "wait";

    // شبیه‌سازی ورود (بعد از 1.5 ثانیه میره صفحه اصلی)
    setTimeout(() => {
        window.location.href = "index.html";
    }, 1500);
}






window.addEventListener('load', function() {
    const preloader = document.getElementById('preloader');

    // تاخیر ۳ ثانیه‌ای
    setTimeout(function() {
        preloader.classList.add('hidden');

        // بعد از محو شدن کامل، آن را از DOM حذف می‌کنیم
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);

    }, 3000);
});
