
// home.js - Entry point that initializes all modules
document.addEventListener('DOMContentLoaded', () => {
    ContactForm.init();
    SmoothScroll.init();
    if (document.querySelector('.swiper')) {
        Carousel.init();
    }
    Animation.init();
    ArticleEffects.init();
    ImageSlider.init();
});

// modules/ContactForm.js
const ContactForm = {
    init() {
        const form = document.getElementById('contactForm');
        if (!form) return;

        form.addEventListener('submit', this.handleSubmit);
    },

    handleSubmit(e) {
        e.preventDefault();
        const button = this.querySelector('button');
        const originalText = button.innerText;

        ContactForm.updateButtonState(button, 'Sending...', true);

        // Simulate form submission
        setTimeout(() => {
            ContactForm.updateButtonState(button, 'Message Sent!', true);
            button.classList.add('bg-green-500');

            setTimeout(() => {
                ContactForm.updateButtonState(button, originalText, false);
                button.classList.remove('bg-green-500');
                e.target.reset();
            }, 2000);
        }, 1000);
    },

    updateButtonState(button, text, disabled) {
        button.innerText = text;
        button.disabled = disabled;
    }
};

// modules/SmoothScroll.js
const SmoothScroll = {
    init() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', this.handleClick);
        });
    },

    handleClick(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href'))?.scrollIntoView({
            behavior: 'smooth'
        });
    }
};



// modules/Animation.js
const Animation = {
    init() {
        this.initAOS();
        this.initGSAP();
    },

    initAOS() {
        if (typeof AOS !== 'undefined') {
            AOS.init({
                duration: 1000,
                once: true,
                offset: 100
            });
        }
    },

    initGSAP() {
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
    }
};

// modules/ArticleEffects.js
const ArticleEffects = {
    init() {
        document.querySelectorAll('article').forEach(article => {
            article.addEventListener('mouseenter', this.handleMouseEnter);
            article.addEventListener('mouseleave', this.handleMouseLeave);
        });
    },

    handleMouseEnter(e) {
        const img = e.currentTarget.querySelector('img');
        if (img) img.style.transform = 'scale(1.1)';
    },

    handleMouseLeave(e) {
        const img = e.currentTarget.querySelector('img');
        if (img) img.style.transform = 'scale(1)';
    }
};

// Add intersection observer for animation on scroll
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.event-card');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('opacity-100');
                entry.target.classList.remove('opacity-0', 'translate-y-4');
            }
        });
    }, {
        threshold: 0.1
    });

    cards.forEach(card => {
        card.classList.add('opacity-0', 'translate-y-4', 'transition-all', 'duration-700');
        observer.observe(card);
    });
});
