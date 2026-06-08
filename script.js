/* ==========================================================================
   AMRUTA PATIL — PORTFOLIO CLEAN LOGIC LAYER
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    
    // ---- Navbar Scroll Handling ----
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }, { passive: true });

    // ---- Mobile Hamburger Drawer Mechanism ----
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');

    hamburger.addEventListener('click', () => {
        const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
        hamburger.setAttribute('aria-expanded', !isExpanded);
        mobileMenu.classList.toggle('open');
    });

    window.closeMobile = function() {
        hamburger.setAttribute('aria-expanded', 'false');
        mobileMenu.classList.remove('open');
    };

    // ---- Smooth Synchronized Active Navigation States ----
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav-item');

    window.addEventListener('scroll', () => {
        let currentSectionId = '';
        const scrollPosition = window.scrollY + 140;

        sections.forEach(section => {
            if (scrollPosition >= section.offsetTop) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${currentSectionId}`) {
                item.classList.add('active');
            }
        });
    }, { passive: true });

    // ---- Structural Performance Numerical Counters ----
    function initCounter(element) {
        const targetValue = parseInt(element.dataset.target, 10);
        if (isNaN(targetValue)) return;

        let startTimestamp = null;
        const animationDuration = 1000; 

        const runStep = (currentTimestamp) => {
            if (!startTimestamp) startTimestamp = currentTimestamp;
            const elapsed = currentTimestamp - startTimestamp;
            const absoluteProgress = Math.min(elapsed / animationDuration, 1);
            
            // Native smooth ease-out calculation
            const easedProgress = 1 - Math.pow(1 - absoluteProgress, 3);
            
            element.textContent = Math.floor(easedProgress * targetValue) + '+';

            if (absoluteProgress < 1) {
                requestAnimationFrame(runStep);
            }
        };
        requestAnimationFrame(runStep);
    }

    const statNumbers = document.querySelectorAll('.stat-num');
    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                initCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.6 });

    statNumbers.forEach(el => counterObserver.observe(el));
});