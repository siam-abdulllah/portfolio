(function () {
    'use strict';

    const header = document.getElementById('header');
    const nav = document.getElementById('nav');
    const menuToggle = document.getElementById('menuToggle');
    const backToTop = document.getElementById('backToTop');
    const navLinks = document.querySelectorAll('.nav-link, .footer-nav a');

    // Mobile menu toggle
    if (menuToggle) {
        menuToggle.addEventListener('click', function () {
            nav.classList.toggle('open');
            menuToggle.classList.toggle('active');
        });
    }

    // Close mobile menu on link click
    navLinks.forEach(function (link) {
        link.addEventListener('click', function () {
            nav.classList.remove('open');
            menuToggle.classList.remove('active');
        });
    });

    // Active nav link on scroll
    const sections = document.querySelectorAll('section[id]');

    function setActiveNav() {
        const scrollY = window.scrollY + 120;

        sections.forEach(function (section) {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');

            if (scrollY >= top && scrollY < top + height) {
                document.querySelectorAll('.nav-link').forEach(function (link) {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + id) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    // Header background on scroll
    function handleScroll() {
        if (window.scrollY > 50) {
            header.style.background = 'rgba(27, 31, 36, 0.95)';
        } else {
            header.style.background = 'rgba(27, 31, 36, 0.85)';
        }

        if (window.scrollY > 400) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }

        setActiveNav();
    }

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Counter animation
    const counters = document.querySelectorAll('.stat-number');
    let countersAnimated = false;

    function animateCounters() {
        if (countersAnimated) return;

        const statsSection = document.querySelector('.stats-grid');
        if (!statsSection) return;

        const rect = statsSection.getBoundingClientRect();
        if (rect.top > window.innerHeight || rect.bottom < 0) return;

        countersAnimated = true;

        counters.forEach(function (counter) {
            const target = parseInt(counter.getAttribute('data-count'), 10);
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;

            const timer = setInterval(function () {
                current += step;
                if (current >= target) {
                    counter.textContent = target;
                    clearInterval(timer);
                } else {
                    counter.textContent = Math.floor(current);
                }
            }, 16);
        });
    }

    window.addEventListener('scroll', animateCounters, { passive: true });
    animateCounters();

    // Fade-in on scroll
    const fadeElements = document.querySelectorAll(
        '.skill-card, .timeline-item, .portfolio-card, .stat-card, .info-item'
    );

    fadeElements.forEach(function (el) {
        el.classList.add('fade-in');
    });

    const observer = new IntersectionObserver(
        function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        },
        { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    fadeElements.forEach(function (el) {
        observer.observe(el);
    });

    // Contact form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const btn = contactForm.querySelector('button[type="submit"]');
            const originalText = btn.innerHTML;
            btn.innerHTML = 'Message Sent! <i class="fas fa-check"></i>';
            btn.style.background = '#34A853';
            contactForm.reset();
            setTimeout(function () {
                btn.innerHTML = originalText;
                btn.style.background = '';
            }, 3000);
        });
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                const offset = 80;
                const top = target.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({ top: top, behavior: 'smooth' });
            }
        });
    });
})();
