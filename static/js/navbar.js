<script>
    // Tailwind CSS Configuration
    tailwind.config = {
        theme: {
            extend: {
                colors: {
                    'royal-blue': '#4169E1',
                    'golden-yellow': '#FFD700',
                    'custom-green': '#4CAF50',
                    'custom-purple': '#8E44AD'
                },
                fontFamily: {
                    'nunito': ['Nunito', 'sans-serif'],
                }
            }
        }
    }
</script>

<script>
document.addEventListener('DOMContentLoaded', function() {
    // Define mobile menu elements
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    let isMenuOpen = false;

    // Toggle menu visibility
    function toggleMenu() {
        isMenuOpen = !isMenuOpen;

        // Update button icon based on menu state
        mobileMenuButton.innerHTML = isMenuOpen ?
            '<i class="fas fa-times text-2xl"></i>' :
            '<i class="fas fa-bars text-2xl"></i>';

        // Toggle menu visibility classes
        if (isMenuOpen) {
            mobileMenu.classList.remove('menu-closed', '-translate-y-full', 'opacity-0');
            mobileMenu.classList.add('menu-open');
        } else {
            mobileMenu.classList.remove('menu-open');
            mobileMenu.classList.add('menu-closed', '-translate-y-full', 'opacity-0');
        }
    }

    // Toggle menu on button click
    mobileMenuButton.addEventListener('click', toggleMenu);

    // Close menu when clicking outside of menu
    document.addEventListener('click', function(event) {
        if (isMenuOpen && !mobileMenu.contains(event.target) && !mobileMenuButton.contains(event.target)) {
            toggleMenu();
        }
    });

    // Close menu on link click within the menu
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (isMenuOpen) toggleMenu();
        });
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Hide menu on scroll
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        if (currentScroll > lastScroll && isMenuOpen) {
            toggleMenu();
        }
        lastScroll = currentScroll;
    });
});
</script>
