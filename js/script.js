// Mobile menu
const toggleBtn = document.querySelector('.mobile-menu-toggle');
const nav = document.querySelector('.main-nav');

toggleBtn?.addEventListener('click', () => {
    nav.classList.toggle('active');
    const expanded = toggleBtn.getAttribute('aria-expanded') === 'true';
    toggleBtn.setAttribute('aria-expanded', !expanded);
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(a => a.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(a.getAttribute('href'));
    target?.scrollIntoView({ behavior: 'smooth' });
}));

// Animated Counter
const counters = document.querySelectorAll('.stat-number');
const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) {
        const el = entry.target;
        const target = +el.dataset.count;
        const update = () => {
            const current = +el.innerText;
            if (current < target) {
                el.innerText = Math.ceil(current + target / 100);
                setTimeout(update, 20);
            } else el.innerText = target;
        };
        update();
        observer.unobserve(el);
    }
}));
counters.forEach(c => observer.observe(c));

// Newsletter
document.getElementById('newsletter-form')?.addEventListener('submit', e => {
    e.preventDefault();
    const email = e.target.querySelector('input').value;
    const msg = e.target.nextElementSibling;
    if (email) {
        msg.textContent = 'Thank you for subscribing!';
        msg.className = 'newsletter-message success';
        e.target.reset();
    } else {
        msg.textContent = 'Please enter a valid email.';
        msg.className = 'newsletter-message error';
    }
    setTimeout(() => msg.textContent = '', 4000);
});
