// ================================= 
// SIMPLIFIED SCROLL ANIMATIONS
// ================================= 

function isElementInViewport(element) {
    const rect = element.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    
    // Simple check: element is visible if its top is above 80% of screen height
    return rect.top < windowHeight * 0.8;
}

function showAnimations() {
    // Get all elements that need animation
    const animatedElements = document.querySelectorAll('.fade-in, .scale-in, .slide-left, .slide-right');
    
    // Use  instead of forEach
    for (let i = 0; i < animatedElements.length; i++) {
        const element = animatedElements[i];
        
        // If element is in viewport and not already visible
        if (isElementInViewport(element) && !element.classList.contains('visible')) {
            element.classList.add('visible');
        }
    }
}

function initializeScrollAnimations() {
    console.log('Scroll animations initialized!');
    
    // Run animations when user scrolls
    window.addEventListener('scroll', showAnimations);
    
    // Run animations immediately in case elements are already visible
    showAnimations();
    
    // Run animations when page finishes loading
    window.addEventListener('load', showAnimations);
    
    // Safety fallback - show all elements after 2 seconds
    setTimeout(function() {
        const allElements = document.querySelectorAll('.fade-in, .scale-in, .slide-left, .slide-right');
        
        for (let i = 0; i < allElements.length; i++) {
            allElements[i].classList.add('visible');
        }
        
        console.log('All animations force-shown after 2 seconds');
    }, 2000);
}