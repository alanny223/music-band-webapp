<script>
document.addEventListener('DOMContentLoaded', function() {

    /**
     * 1. Contact Form Submission Handler
     * Disables button and provides feedback on form submission.
     */
    document.getElementById('contactForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const button = this.querySelector('button');
        const originalText = button.innerText;

        button.innerText = 'Sending...';
        button.disabled = true;

        setTimeout(() => {
            button.innerText = 'Message Sent!';
            button.classList.add('bg-green-500');

            setTimeout(() => {
                button.innerText = originalText;
                button.classList.remove('bg-green-500');
                button.disabled = false;
                this.reset();
            }, 2000);
        }, 1000);
    });

    /**
     * 2. Smooth Scroll for Anchor Links
     * Enables smooth scrolling for anchor links on the page.
     */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href'))?.scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    /**
     * 3. Initialize Swiper Carousel
     * Sets up a Swiper carousel with navigation and pagination.
     */
    if (document.querySelector('.swiper')) {
        const swiper = new Swiper('.swiper', {
            effect: 'cards',
            grabCursor: true,
            pagination: { el: '.swiper-pagination', clickable: true },
            navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' }
        });
    }

    /**
     * 4. Initialize AOS (Animate on Scroll)
     * Configures scroll-based animations.
     */
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100
    });

    /**
     * 5. GSAP Animations
     * Adds animations to elements with the 'news-item' class if GSAP is available.
     */
    if (typeof gsap !== 'undefined') {
        gsap.utils.toArray('.news-item').forEach((item, i) => {
            gsap.from(item, {
                scrollTrigger: {
                    trigger: item,
                    start: 'top bottom-=100'
                },
                y: 50,
                opacity: 0,
                duration: 0.6,
                delay: i * 0.2
            });
        });
    }

    /**
     * 6. Article Hover Effects
     * Zooms in on article images when hovered.
     */
    document.querySelectorAll('article').forEach(article => {
        article.addEventListener('mouseenter', () => {
            const img = article.querySelector('img');
            if (img) img.style.transform = 'scale(1.1)';
        });

        article.addEventListener('mouseleave', () => {
            const img = article.querySelector('img');
            if (img) img.style.transform = 'scale(1)';
        });
    });

    /**
     * 7. Particles Background Initialization
     * Adds a particles background effect.
     */
    particlesJS('particles-bg', {
        particles: {
            number: { value: 20, density: { enable: true, value_area: 800 } },
            color: { value: ['#4F46E5', '#9333EA'] },
            shape: { type: 'circle' },
            opacity: { value: 0.1, random: true },
            size: { value: 3, random: true },
            move: { enable: true, speed: 1, direction: 'none', random: true, out_mode: 'out' }
        }
    });

});
</script>

