// Mobile Menu Toggle
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const mainNav = document.querySelector('.main-nav');

mobileMenuToggle?.addEventListener('click', () => {
    const isActive = mainNav.classList.contains('active');
    mainNav.classList.toggle('active');
    mobileMenuToggle.setAttribute('aria-expanded', !isActive);
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.header') && mainNav.classList.contains('active')) {
        mainNav.classList.remove('active');
        mobileMenuToggle.setAttribute('aria-expanded', 'false');
    }
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu if open
            mainNav.classList.remove('active');
            mobileMenuToggle?.setAttribute('aria-expanded', 'false');
        }
    });
});

// Animated Counter
const animateCounter = (element, target) => {
    let current = 0;
    const increment = target / 100;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current);
    }, 20);
};

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Animate counters
            const counters = entry.target.querySelectorAll('.stat-number');
            counters.forEach(counter => {
                const target = parseInt(counter.getAttribute('data-count'));
                animateCounter(counter, target);
            });
            
            // Add fade-in animation
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// Observe stats section
const statsSection = document.querySelector('.stats');
if (statsSection) {
    observer.observe(statsSection);
}

// Testimonial Slider
const testimonialSlides = document.querySelectorAll('.testimonial-slide');
const prevBtn = document.querySelector('.testimonial-btn.prev');
const nextBtn = document.querySelector('.testimonial-btn.next');
let currentSlide = 0;

function showSlide(index) {
    testimonialSlides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
    });
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % testimonialSlides.length;
    showSlide(currentSlide);
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + testimonialSlides.length) % testimonialSlides.length;
    showSlide(currentSlide);
}

prevBtn?.addEventListener('click', prevSlide);
nextBtn?.addEventListener('click', nextSlide);

// Auto-rotate testimonials
let testimonialInterval = setInterval(nextSlide, 5000);
document.querySelector('.testimonials')?.addEventListener('mouseenter', () => {
    clearInterval(testimonialInterval);
});
document.querySelector('.testimonials')?.addEventListener('mouseleave', () => {
    testimonialInterval = setInterval(nextSlide, 5000);
});

// Newsletter Form
const newsletterForm = document.getElementById('newsletter-form');
const newsletterMessage = document.querySelector('.newsletter-message');

newsletterForm?.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = e.target.querySelector('input[type="email"]').value;
    const submitBtn = e.target.querySelector('button[type="submit"]');
    
    // Simple validation
    if (!email || !email.includes('@')) {
        showNewsletterMessage('Please enter a valid email address.', 'error');
        return;
    }
    
    // Show loading state
    submitBtn.textContent = 'Subscribing...';
    submitBtn.disabled = true;
    
    // Simulate API call
    try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        showNewsletterMessage('Thank you for subscribing!', 'success');
        e.target.reset();
    } catch (error) {
        showNewsletterMessage('Something went wrong. Please try again.', 'error');
    } finally {
        submitBtn.textContent = 'Subscribe';
        submitBtn.disabled = false;
    }
});

function showNewsletterMessage(message, type) {
    newsletterMessage.textContent = message;
    newsletterMessage.className = `newsletter-message ${type}`;
    setTimeout(() => {
        newsletterMessage.textContent = '';
        newsletterMessage.className = 'newsletter-message';
    }, 5000);
}

// Sticky Header
let lastScroll = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    // Hide/show header on scroll
    if (currentScroll > lastScroll && currentScroll > 100) {
        header.classList.add('header-hidden');
    } else {
        header.class.remove('header-hidden');
    }
    
    lastScroll = currentScroll;
});

// Lazy Loading Images
const lazyImages = document.querySelectorAll('img[loading="lazy"]');
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    lazyImages.forEach(img => imageObserver.observe(img));
}

// Keyboard Navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-navigation');
});

// Form Validation Enhancement
const forms = document.querySelectorAll('form');
forms.forEach(form => {
    form.addEventListener('submit', (e) => {
        const requiredFields = form.querySelectorAll('[required]');
        let isValid = true;
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                field.classList.add('error');
                field.setAttribute('aria-invalid', 'true');
            } else {
                field.classList.remove('error');
                field.setAttribute('aria-invalid', 'false');
            }
        });
        
        if (!isValid) {
            e.preventDefault();
        }
    });
});

// Performance: Preload critical resources
const preloadCriticalResources = () => {
    const criticalImages = [
        'images/hero-bg.jpg',
        'images/school-logo.png'
    ];
    
    criticalImages.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        document.head.appendChild(link);
    });
};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    preloadCriticalResources();
    
    // Add loading classes for animations
    document.body.classList.add('loaded');
});

// Service Worker Registration (for PWA capabilities)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').catch(() => {
            // Service worker registration failed, app will still work normally
        });
    });
}
