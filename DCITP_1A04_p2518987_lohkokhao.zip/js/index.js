// ================================= 
// INDEX.JS - CAROUSEL & ANIMATIONS
// ================================= 
document.addEventListener('DOMContentLoaded', function() {
    console.log('Index page loaded - initializing features...');
    
    // Initialize carousel
    initCarousel();
    
    // Initialize scroll animations
    initializeScrollAnimations();
    
    console.log('All index features initialized!');
});

// ================================= 
// CAROUSEL FUNCTIONALITY
// ================================= 
function initCarousel() {
    let currentSlide = 0;
    let isTransitioning = false;
    const slides = document.querySelectorAll('.quote-slide');
    const dots = document.querySelectorAll('.dot');
    const prevButton = document.getElementById('prevSlide');
    const nextButton = document.getElementById('nextSlide');
    const carousel = document.querySelector('.quotes-carousel');
    let autoSlideInterval;
    
    // Exit if no slides found
    if (slides.length === 0) {
        console.warn('No carousel slides found');
        return;
    }
    
    // Show specific slide
    function showSlide(slideIndex) {
        if (isTransitioning) return;
        
        isTransitioning = true;
        
        // Update slides using 
        for (let i = 0; i < slides.length; i++) {
            slides[i].classList.remove('active');
        }
        if (slides[slideIndex]) {
            slides[slideIndex].classList.add('active');
        }
        
        // Update dots using 
        for (let i = 0; i < dots.length; i++) {
            dots[i].classList.remove('active');
        }
        if (dots[slideIndex]) {
            dots[slideIndex].classList.add('active');
        }
        
        // Unlock after animation
        setTimeout(function() {
            isTransitioning = false;
        }, 500);
    }
    
    // Navigation functions
    function nextSlide() {
        if (!isTransitioning) {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        }
    }
    
    function prevSlide() {
        if (!isTransitioning) {
            currentSlide = (currentSlide - 1 + slides.length) % slides.length;
            showSlide(currentSlide);
        }
    }
    
    // Auto-slide functionality
    function startAutoSlide() {
        if (autoSlideInterval) clearInterval(autoSlideInterval);
        autoSlideInterval = setInterval(function() {
            if (!isTransitioning) nextSlide();
        }, 4000);
    }
    
    function stopAutoSlide() {
        if (autoSlideInterval) {
            clearInterval(autoSlideInterval);
            autoSlideInterval = null;
        }
    }
    
    // Event handlers - simplified
    function handleNavigation(direction, event) {
        if (event) {
            event.preventDefault();
            event.stopPropagation();
        }
        
        stopAutoSlide();
        
        if (direction === 'next') {
            nextSlide();
        } else {
            prevSlide();
        }
        
        // Restart auto-slide after user interaction
        setTimeout(function() {
            startAutoSlide();
        }, 3000);
    }
    
    // Add event listeners - traditional functions
    if (nextButton) {
        nextButton.addEventListener('click', function(e) {
            handleNavigation('next', e);
        });
        nextButton.addEventListener('touchstart', function(e) {
            handleNavigation('next', e);
        }, { passive: false });
    }
    
    if (prevButton) {
        prevButton.addEventListener('click', function(e) {
            handleNavigation('prev', e);
        });
        prevButton.addEventListener('touchstart', function(e) {
            handleNavigation('prev', e);
        }, { passive: false });
    }
    
    // Dot navigation - 
    for (let i = 0; i < dots.length; i++) {
        const dot = dots[i];
        const index = i; // Capture index for closure
        
        dot.addEventListener('click', function(e) {
            e.preventDefault();
            if (!isTransitioning) {
                currentSlide = index;
                stopAutoSlide();
                showSlide(currentSlide);
                setTimeout(function() {
                    startAutoSlide();
                }, 3000);
            }
        });
    }
    
    // Handle arrow keys for carousel navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') {
            handleNavigation('prev', e);
        } else if (e.key === 'ArrowRight') {
            handleNavigation('next', e);
        }
    });
    
    // Pause on hover 
    if (carousel && window.matchMedia('(hover: hover)').matches) {
        carousel.addEventListener('mouseenter', stopAutoSlide);
        carousel.addEventListener('mouseleave', () => startAutoSlide()); //ARROW FUNCTION
    }
    
    // Initialize carousel
    showSlide(0);
    startAutoSlide();
    
    console.log('Carousel initialized with ' + slides.length + ' slides');
}