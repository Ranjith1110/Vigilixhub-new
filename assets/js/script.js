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