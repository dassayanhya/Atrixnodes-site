// Mobile Menu Toggle
const btn = document.getElementById('mobile-menu-btn');
const menu = document.getElementById('mobile-menu');

btn.addEventListener('click', () => {
    menu.classList.toggle('hidden');
});

// Close mobile menu when clicking a link
const links = menu.querySelectorAll('a');
links.forEach(link => {
    link.addEventListener('click', () => {
        menu.classList.add('hidden');
    });
});

// Navbar Blur Effect on Scroll (Optional polish)
window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    if (window.scrollY > 10) {
        nav.classList.add('shadow-lg');
    } else {
        nav.classList.remove('shadow-lg');
    }
});

const pricingToggle = document.getElementById('pricing-toggle');
const pricingMenu = document.getElementById('pricing-menu');
if (pricingToggle && pricingMenu) {
    pricingToggle.addEventListener('click', (e) => {
        e.preventDefault();
        pricingMenu.classList.toggle('hidden');
    });
    document.addEventListener('click', (e) => {
        const container = document.getElementById('nav-pricing');
        if (!container.contains(e.target)) {
            pricingMenu.classList.add('hidden');
        }
    });
}

const mobilePricingToggle = document.getElementById('mobile-pricing-toggle');
const mobilePricingMenu = document.getElementById('mobile-pricing-menu');
if (mobilePricingToggle && mobilePricingMenu) {
    mobilePricingToggle.addEventListener('click', () => {
        mobilePricingMenu.classList.toggle('hidden');
    });
}
const requestLinks = document.querySelectorAll('a.request-service[href^="http"]');
requestLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        const url = link.getAttribute('href');
        if (url) {
            try {
                window.open(url, '_blank', 'noopener');
                e.preventDefault();
            } catch (_) {
                window.location.href = url;
            }
        }
    });
});
const priceEls = document.querySelectorAll('.price-value');
if (priceEls.length) {
    const animatePrice = (el) => {
        const target = parseInt(el.getAttribute('data-target'), 10);
        const duration = 1000;
        const start = performance.now();
        const step = (now) => {
            const progress = Math.min((now - start) / duration, 1);
            const value = Math.floor(progress * target);
            el.textContent = String(value);
            if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
    };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                el.classList.add('is-visible');
                animatePrice(el);
                observer.unobserve(el);
            }
        });
    }, { threshold: 0.4 });
    priceEls.forEach(el => observer.observe(el));
}
