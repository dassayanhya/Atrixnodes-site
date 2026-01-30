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

// Navbar background stays fully transparent
(() => {
    const nav = document.querySelector('nav');
    if (!nav) return;
    nav.style.setProperty('--nav-opacity', '0');
})();

const setupDropdown = (toggleId, menuId, containerId) => {
    const toggle = document.getElementById(toggleId);
    const menuEl = document.getElementById(menuId);
    if (!toggle || !menuEl) return;
    toggle.addEventListener('click', (e) => {
        e.preventDefault();
        menuEl.classList.toggle('hidden');
    });
    if (containerId) {
        document.addEventListener('click', (e) => {
            const container = document.getElementById(containerId);
            if (container && !container.contains(e.target)) {
                menuEl.classList.add('hidden');
            }
        });
    }
};


setupDropdown('mobile-services-toggle', 'mobile-services-menu');
setupDropdown('mobile-more-toggle', 'mobile-more-menu');

const rotatingEl = document.getElementById('rotating-text');
if (rotatingEl) {
    const words = ['Discord Bot', 'Minecraft servers', 'VPS'];
    let i = 0;
    const swap = () => {
        rotatingEl.classList.remove('fade-in');
        rotatingEl.classList.add('fade-out');
        setTimeout(() => {
            i = (i + 1) % words.length;
            rotatingEl.textContent = words[i];
            rotatingEl.classList.remove('fade-out');
            rotatingEl.classList.add('fade-in');
        }, 250);
    };
    setInterval(swap, 2500);
}

const heroCards = document.querySelectorAll('.hero-card');
if (heroCards.length) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.25 });
    heroCards.forEach(el => observer.observe(el));
}

const featureCards = document.querySelectorAll('.feature-item, .feature-glass, .platform-card');
if (featureCards.length) {
    const observer2 = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer2.unobserve(entry.target);
            }
        });
    }, { threshold: 0.25 });
    featureCards.forEach(el => observer2.observe(el));
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
    const currencySymbolEl = document.querySelectorAll('.price-currency');
    const currencyToggle = document.getElementById('currency-toggle');
    const currencyMenu = document.getElementById('currency-menu');
    const rates = { INR: 1, USD: 0.012, EUR: 0.011 };
    let currentCurrency = 'INR';
    const symbols = { INR: '₹', USD: '$', EUR: '€' };
    const format = (val) => Number(val).toFixed(2);
    const animatePrice = (el, target) => {
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
    const updateAll = () => {
        currencySymbolEl.forEach(s => s.textContent = symbols[currentCurrency]);
        priceEls.forEach(el => {
            const base = parseFloat(el.getAttribute('data-target'));
            const converted = Math.round(base * rates[currentCurrency]);
            el.textContent = format(converted);
        });
    };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                el.classList.add('is-visible');
                const target = parseInt(el.getAttribute('data-target'), 10);
                animatePrice(el, target);
                observer.unobserve(el);
            }
        });
    }, { threshold: 0.4 });
    priceEls.forEach(el => observer.observe(el));
    if (currencyToggle && currencyMenu) {
        setupDropdown('currency-toggle', 'currency-menu', 'currency-container');
        currencyMenu.querySelectorAll('[data-currency]').forEach(btn => {
            btn.addEventListener('click', () => {
                currentCurrency = btn.getAttribute('data-currency');
                currencyToggle.querySelector('span').textContent = `${symbols[currentCurrency]} ${currentCurrency} · ${currentCurrency === 'INR' ? 'Indian Rupee' : currentCurrency === 'USD' ? 'US Dollar' : 'Euro'}`;
                updateAll();
                currencyMenu.classList.add('hidden');
            });
        });
        updateAll();
    }
}

const faqItems = document.querySelectorAll('.faq-item');
if (faqItems.length) {
    faqItems.forEach(item => {
        const toggle = item.querySelector('.faq-toggle');
        const content = item.querySelector('.faq-content');
        if (!toggle || !content) return;
        content.classList.add('hidden');
        content.style.maxHeight = '0px';
        toggle.addEventListener('click', () => {
            faqItems.forEach(other => {
                if (other !== item) {
                    other.classList.remove('open');
                    const c = other.querySelector('.faq-content');
                    if (c) {
                        c.style.maxHeight = '0px';
                        c.addEventListener('transitionend', function onEnd() {
                            c.classList.add('hidden');
                            c.removeEventListener('transitionend', onEnd);
                        });
                    }
                }
            });
            const isOpen = item.classList.contains('open');
            if (isOpen) {
                item.classList.remove('open');
                content.style.maxHeight = '0px';
                content.addEventListener('transitionend', function onEnd() {
                    content.classList.add('hidden');
                    content.removeEventListener('transitionend', onEnd);
                });
            } else {
                item.classList.add('open');
                content.classList.remove('hidden');
                content.style.maxHeight = '0px';
                requestAnimationFrame(() => {
                    content.style.maxHeight = content.scrollHeight + 'px';
                });
            }
        });
        // Close on outside click for accordion for better UX
        document.addEventListener('click', (e) => {
            if (!item.contains(e.target)) {
                item.classList.remove('open');
                content.style.maxHeight = '0px';
                content.classList.add('hidden');
            }
        });
        window.addEventListener('resize', () => {
            if (item.classList.contains('open')) {
                content.style.maxHeight = content.scrollHeight + 'px';
            }
        });
    });
}

// Desktop dropdown hover delay (grace period)
(() => {
    const attachHoverDelay = (containerId, menuId) => {
        const container = document.getElementById(containerId);
        const menu = document.getElementById(menuId);
        if (!container || !menu) return;
        let closeTimer = null;
        const open = () => {
            if (closeTimer) { clearTimeout(closeTimer); closeTimer = null; }
            menu.classList.add('nav-menu-open');
        };
        const scheduleClose = () => {
            if (closeTimer) clearTimeout(closeTimer);
            closeTimer = setTimeout(() => {
                menu.classList.remove('nav-menu-open');
                closeTimer = null;
            }, 250);
        };
        container.addEventListener('mouseenter', open);
        container.addEventListener('mouseleave', scheduleClose);
        menu.addEventListener('mouseenter', open);
        menu.addEventListener('mouseleave', scheduleClose);
    };
    attachHoverDelay('nav-services', 'services-menu');
    attachHoverDelay('nav-more', 'more-menu');
})();

(() => {
    const light = document.getElementById('cat-light');
    const budget = document.getElementById('cat-budget');
    const deluxe = document.getElementById('cat-deluxe');
    const all = document.getElementById('cat-all');
    const locIndia = document.getElementById('loc-india');
    const locSingapore = document.getElementById('loc-singapore');
    const cards = document.querySelectorAll('.pricing-card[data-category]');
    if (!light || !budget || !deluxe || !all || !cards.length) return;
    let selected = 'all';
    const setActive = (activeBtn, otherBtns) => {
        activeBtn.classList.add('bg-brand-500', 'text-white', 'shadow-md');
        activeBtn.classList.remove('bg-slate-800/60', 'border', 'border-slate-700', 'text-slate-300');
        otherBtns.forEach(b => {
            b.classList.remove('bg-brand-500', 'text-white', 'shadow-md');
            b.classList.add('bg-slate-800/60', 'border', 'border-slate-700', 'text-slate-300');
        });
    };
    const applyFilter = () => {
        if (selected === 'all') {
            cards.forEach(c => c.classList.remove('hidden'));
        } else {
            cards.forEach(c => {
                const cat = c.getAttribute('data-category');
                c.classList.toggle('hidden', cat !== selected);
            });
        }
    };
    setActive(all, [light, budget, deluxe]);
    applyFilter();
    light.addEventListener('click', () => {
        selected = 'light';
        setActive(light, [budget, deluxe, all]);
        applyFilter();
    });
    budget.addEventListener('click', () => {
        selected = 'budget';
        setActive(budget, [light, deluxe, all]);
        applyFilter();
    });
    deluxe.addEventListener('click', () => {
        selected = 'deluxe';
        setActive(deluxe, [light, budget, all]);
        applyFilter();
    });
    all.addEventListener('click', () => {
        selected = 'all';
        setActive(all, [light, budget, deluxe]);
        applyFilter();
    });
    if (locIndia && locSingapore) {
        const setLocActive = (active, inactive) => {
            active.classList.add('bg-brand-500', 'text-white', 'shadow-md');
            active.classList.remove('bg-slate-800/60', 'border', 'border-slate-700', 'text-slate-300');
            inactive.classList.remove('bg-brand-500', 'text-white', 'shadow-md');
            inactive.classList.add('bg-slate-800/60', 'border', 'border-slate-700', 'text-slate-300');
        };
        setLocActive(locIndia, locSingapore);
        locIndia.addEventListener('click', () => setLocActive(locIndia, locSingapore));
        locSingapore.addEventListener('click', () => setLocActive(locSingapore, locIndia));
    }
})();
