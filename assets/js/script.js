// DOM Elements
const navbar = document.getElementById('navbar');
const mobileBtn = document.getElementById('mobile-menu-btn');
const closeBtn = document.getElementById('close-menu-btn');
const sidebar = document.getElementById('mobile-sidebar');
const overlay = document.getElementById('mobile-overlay');
const menuIcon = document.querySelector('.menu-icon');
const progressBar = document.getElementById('progress-bar');

// Open Mobile Menu
function openMenu() {
    sidebar.classList.remove('translate-x-full');
    sidebar.classList.add('translate-x-0');
    overlay.classList.remove('opacity-0', 'invisible');
    overlay.classList.add('opacity-100', 'visible');
    menuIcon.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Close Mobile Menu
function closeMenu() {
    sidebar.classList.add('translate-x-full');
    sidebar.classList.remove('translate-x-0');
    overlay.classList.add('opacity-0', 'invisible');
    overlay.classList.remove('opacity-100', 'visible');
    menuIcon.classList.remove('active');
    document.body.style.overflow = '';
}

// Event Listeners
mobileBtn.addEventListener('click', openMenu);
closeBtn.addEventListener('click', closeMenu);
overlay.addEventListener('click', closeMenu);

// Scroll Effects
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    // Navbar scroll effect
    if (currentScroll > 50) {
        navbar.classList.add('navbar-scrolled');
    } else {
        navbar.classList.remove('navbar-scrolled');
    }

    // Progress bar
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height);
    progressBar.style.transform = `scaleX(${scrolled})`;

    lastScroll = currentScroll;
});

// Close menu on escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !sidebar.classList.contains('translate-x-full')) {
        closeMenu();
    }
});

// Prevent scroll when menu is open
sidebar.addEventListener('touchmove', (e) => {
    e.stopPropagation();
}, { passive: false });


// Accordion Functionality
function toggleAccordion(id) {
    const content = document.getElementById(id);
    const icon = document.getElementById('icon-' + id);

    // Close all other accordions
    document.querySelectorAll('.accordion-content').forEach(item => {
        if (item.id !== id) {
            item.classList.remove('active');
            document.getElementById('icon-' + item.id).classList.remove('active');
        }
    });

    // Toggle current accordion
    content.classList.toggle('active');
    icon.classList.toggle('active');
}

// Open first accordion by default
window.addEventListener('DOMContentLoaded', () => {
    toggleAccordion('acc1');
});


const swiper = new Swiper('.testimonial-swiper', {
    loop: true,
    grabCursor: true,
    speed: 800,
    spaceBetween: 24, // Consistent Gap

    // Autoplay configuration
    autoplay: {
        delay: 4000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
    },

    // Pagination configuration
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
        dynamicBullets: true,
    },

    // Navigation configuration
    navigation: {
        nextEl: '.swiper-button-next-custom',
        prevEl: '.swiper-button-prev-custom',
    },

    // Strict Breakpoints as requested
    breakpoints: {
        0: {
            slidesPerView: 1,
            spaceBetween: 20,
        },
        768: {
            slidesPerView: 2,
            spaceBetween: 24,
        },
        1024: {
            slidesPerView: 3,
            spaceBetween: 30,
        },
    }
});


// ----------------------------------------------------
// 1. MODAL LOGIC
// ----------------------------------------------------
const modal = document.getElementById('contactModal');
const backdrop = document.getElementById('modalBackdrop');
const panel = document.getElementById('modalPanel');

function openModal() {
    // Reset form state when opening
    document.getElementById('formContainer').classList.remove('hidden');
    document.getElementById('successContainer').classList.add('hidden');
    document.getElementById('submit-to-google-sheet').reset();

    modal.classList.remove('hidden');
    setTimeout(() => {
        backdrop.classList.remove('opacity-0');
        panel.classList.remove('opacity-0', 'translate-y-4', 'scale-95');
        panel.classList.add('animate-slide-up');
    }, 10);
}

function closeModal() {
    backdrop.classList.add('opacity-0');
    panel.classList.add('opacity-0', 'translate-y-4', 'scale-95');
    panel.classList.remove('animate-slide-up');
    setTimeout(() => { modal.classList.add('hidden'); }, 300);
}

// ----------------------------------------------------
// 2. GOOGLE SHEET SUBMISSION LOGIC
// ----------------------------------------------------

// PASTE YOUR GOOGLE WEB APP URL HERE
const scriptURL = 'https://script.google.com/macros/s/AKfycbzJi4J5q6rhrfOzzg0bamyiFlqlPtlEeYi8OcVA-KwQtkreAUfz-hYVPn3g9-zE8Nzrfg/exec';

const form = document.getElementById('submit-to-google-sheet');
const btnText = document.getElementById('btnText');
const btnLoader = document.getElementById('btnLoader');
const submitBtn = document.getElementById('submitBtn');

form.addEventListener('submit', e => {
    e.preventDefault();

    // Show Loader
    btnText.classList.add('hidden');
    btnLoader.classList.remove('hidden');
    submitBtn.disabled = true;

    fetch(scriptURL, { method: 'POST', body: new FormData(form) })
        .then(response => {
            // Hide Loader & Show Success
            btnText.classList.remove('hidden');
            btnLoader.classList.add('hidden');
            submitBtn.disabled = false;

            // Switch to Success View
            document.getElementById('formContainer').classList.add('hidden');
            document.getElementById('successContainer').classList.remove('hidden');

            console.log('Success!', response);
        })
        .catch(error => {
            console.error('Error!', error.message);
            alert('Something went wrong. Please try again.');

            // Reset Button
            btnText.classList.remove('hidden');
            btnLoader.classList.add('hidden');
            submitBtn.disabled = false;
        })
})