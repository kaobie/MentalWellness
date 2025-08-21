// ================================= 
// RESOURCES.JS - FIXED WITH PROPER COLOR LOGIC
// Interactive Mental Health Tools
// ================================= 
document.addEventListener('DOMContentLoaded', function() {
    console.log('Resources page loaded!');
    
    // Initialize all functions
    initProgressBars();
    initFlipCards();
    initBreathingExercise();
    
    console.log('All resources features initialized!');
});

// ================================= 
// PROGRESS BAR ANIMATIONS
// ================================= 
function initProgressBars() {
    console.log('Initializing progress bars...');
    
    // Function to check if element is visible in viewport
    function isElementVisible(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
    
    // Function to animate progress bars
    function animateProgressBars() {
        const progressBars = document.querySelectorAll('.progress-bar[data-width]');
        
        // Use  instead of forEach
        for (let i = 0; i < progressBars.length; i++) {
            const bar = progressBars[i];
            
            if (isElementVisible(bar.parentElement)) {
                const targetWidth = bar.getAttribute('data-width');
                
                if (targetWidth === '85') {
                    bar.classList.add('animate-85');
                } else if (targetWidth === '92') {
                    bar.classList.add('animate-92');
                } else if (targetWidth === '78') {
                    bar.classList.add('animate-78');
                }
                
                console.log('Animating progress bar to ' + targetWidth + '%');
            }
        }
    }
    
    // Listen for scroll events
    window.addEventListener('scroll', animateProgressBars);
    
    // Also check on page load in case bars are already visible
    animateProgressBars();
    
    console.log('Progress bar animations initialized!');
}

// ================================= 
// FLIP CARD FUNCTIONALITY 
// ================================= 
function initFlipCards() {
    console.log('Initializing flip cards...');
    
    // Get all flip buttons (front side)
    const flipButtons = document.querySelectorAll('.flip-btn');
    console.log('Found flip buttons:', flipButtons.length);
    
    // Add click event to each flip button
    for (let i = 0; i < flipButtons.length; i++) {
        const button = flipButtons[i];
        
        button.addEventListener('click', function() {
            console.log('Flip button clicked!');
            // Find the parent flip card
            const flipCard = this.closest('.flip-card');
            if (flipCard) {
                // Add flipped class to trigger CSS animation
                flipCard.classList.add('flipped');
                console.log('Added flipped class to:', flipCard);
            } else {
                console.error('Could not find flip card parent');
            }
        });
    }
    
    // Get all back buttons
    const backButtons = document.querySelectorAll('.back-btn');
    console.log('Found back buttons:', backButtons.length);
    
    // Add click event to each back button - 
    for (let i = 0; i < backButtons.length; i++) {
        const button = backButtons[i];
        
        button.addEventListener('click', function() {
            console.log('Back button clicked!');
            // Find the parent flip card
            const flipCard = this.closest('.flip-card');
            if (flipCard) {
                // Remove flipped class to flip back
                flipCard.classList.remove('flipped');
                console.log('Removed flipped class from:', flipCard);
            }
        });
    }
    
    // Get all choice buttons
    const choiceButtons = document.querySelectorAll('.choice-btn');
    console.log('Found choice buttons:', choiceButtons.length);
    
    // Add click event to each choice button - 
    for (let i = 0; i < choiceButtons.length; i++) {
        const button = choiceButtons[i];
        
        button.addEventListener('click', function() {
            console.log('Choice button clicked!');
            // Get the card type (morning, sleep, stress)
            const flipCard = this.closest('.flip-card');
            const cardType = flipCard.getAttribute('data-card');
            
            // Clear previous selections in this card - 
            const allChoicesInCard = flipCard.querySelectorAll('.choice-btn');
            for (let j = 0; j < allChoicesInCard.length; j++) {
                allChoicesInCard[j].classList.remove('selected');
            }
            
            // Mark this choice as selected
            this.classList.add('selected');
            
            // Get progress value and text from button
            const progressValue = this.getAttribute('data-progress');
            const progressText = this.getAttribute('data-text');
            
            console.log('Updating progress: ' + cardType + ', ' + progressValue + '%, ' + progressText);
            
            // Update progress bar and text
            updateProgress(cardType, progressValue, progressText);
        });
    }
    
    console.log('Flip card event listeners attached!');
}

function updateProgress(cardType, percentage, text) {
    console.log('updateProgress called: ' + cardType + ', ' + percentage + '%, ' + text);
    
    // Find progress bar and text elements for this card
    const progressBar = document.querySelector('[data-progress-bar="' + cardType + '"]');
    const progressText = document.querySelector('[data-progress-text="' + cardType + '"]');
    
    console.log('Found progress bar:', progressBar);
    console.log('Found progress text:', progressText);
    
    // Update progress bar width with animation
    if (progressBar) {
        progressBar.style.width = percentage + '%';
        progressBar.style.transition = 'width 1s ease-in-out';
        
        // FIXED COLOR LOGIC - Red for low scores!
        progressBar.className = 'progress-bar'; // Reset classes
        if (percentage >= 90) {
            progressBar.classList.add('effectiveness-92'); // Green - excellent wellness
        } else if (percentage >= 70) {
            progressBar.classList.add('effectiveness-85'); // Teal - good wellness  
        } else if (percentage >= 50) {
            progressBar.classList.add('effectiveness-78'); // Yellow - okay wellness
        } else {
            progressBar.classList.add('effectiveness-40'); // Red - needs improvement
        }
        
        console.log('Updated progress bar width and color for ' + percentage + '%');
    } else {
        console.error('Progress bar not found for:', cardType);
    }
    
    // Update progress text
    if (progressText) {
        progressText.textContent = text;
        progressText.style.color = 'var(--success-color)';
        progressText.style.fontWeight = 'bold';
        console.log('Updated progress text');
    } else {
        console.error('Progress text not found for:', cardType);
    }
}

// ================================= 
// BREATHING EXERCISE WITH CONTROLS
// ================================= 
function initBreathingExercise() {
    console.log('Initializing breathing exercise...');
    
    const breathingCircle = document.querySelector('.breathing-circle');
    const breathingText = document.querySelector('.breathing-text');
    
    // Get all the sliders and value displays
    const inhaleSlider = document.querySelector('#inhale-slider');
    const holdSlider = document.querySelector('#hold-slider');
    const exhaleSlider = document.querySelector('#exhale-slider');
    const speedSlider = document.querySelector('#speed-slider');
    
    const inhaleValue = document.querySelector('#inhale-value');
    const holdValue = document.querySelector('#hold-value');
    const exhaleValue = document.querySelector('#exhale-value');
    const speedValue = document.querySelector('#speed-value');
    
    let isActive = false;
    let breathingInterval;
    let settings = {
        inhale: 4,
        hold: 2,
        exhale: 4,
        speed: 1
    };
    
    // Check if elements exist
    if (!breathingCircle || !breathingText) {
        console.log('Breathing exercise elements not found');
        return;
    }
    
    // Make circle clickable
    breathingCircle.style.cursor = 'pointer';
    breathingText.textContent = 'Click to Start';
    
    // Update slider values in real-time
    function updateSliderValues() {
        if (inhaleSlider) {
            settings.inhale = parseInt(inhaleSlider.value);
            inhaleValue.textContent = settings.inhale + 's';
        }
        
        if (holdSlider) {
            settings.hold = parseInt(holdSlider.value);
            holdValue.textContent = settings.hold + 's';
        }
        
        if (exhaleSlider) {
            settings.exhale = parseInt(exhaleSlider.value);
            exhaleValue.textContent = settings.exhale + 's';
        }
        
        if (speedSlider) {
            const speedVal = parseInt(speedSlider.value);
            settings.speed = speedVal / 10; // Convert 5-20 to 0.5-2.0
            speedValue.textContent = settings.speed + 'x';
        }
    }
    
    // Add event listeners to sliders - traditional functions
    if (inhaleSlider) {
        inhaleSlider.addEventListener('input', updateSliderValues);
    }
    if (holdSlider) {
        holdSlider.addEventListener('input', updateSliderValues);
    }
    if (exhaleSlider) {
        exhaleSlider.addEventListener('input', updateSliderValues);
    }
    if (speedSlider) {
        speedSlider.addEventListener('input', updateSliderValues);
    }
    
    // Initialize slider values
    updateSliderValues();
    
    function startBreathing() {
        isActive = true;
        breathingCircle.classList.add('active');
        
        let phase = 'breathe-in';
        let seconds = 0;
        
        // Calculate interval based on speed setting
        const intervalTime = 1000 / settings.speed;
        
        breathingInterval = setInterval(function() {
            seconds++;
            
            if (phase === 'breathe-in') {
                breathingText.textContent = 'Breathe In';
                breathingCircle.style.transform = 'scale(1.3)';
                breathingCircle.style.transition = 'all ' + (settings.inhale / settings.speed) + 's ease-in-out';
                
                if (seconds >= settings.inhale) {
                    phase = 'hold';
                    seconds = 0;
                }
            } else if (phase === 'hold') {
                breathingText.textContent = 'Hold';
                
                if (seconds >= settings.hold) {
                    phase = 'breathe-out';
                    seconds = 0;
                }
            } else if (phase === 'breathe-out') {
                breathingText.textContent = 'Breathe Out';
                breathingCircle.style.transform = 'scale(1)';
                breathingCircle.style.transition = 'all ' + (settings.exhale / settings.speed) + 's ease-in-out';
                
                if (seconds >= settings.exhale) {
                    phase = 'breathe-in';
                    seconds = 0;
                }
            }
        }, intervalTime);
    }
    
    function stopBreathing() {
        isActive = false;
        clearInterval(breathingInterval);
        breathingCircle.classList.remove('active');
        breathingText.textContent = 'Click to Start';
        breathingCircle.style.transform = 'scale(1)';
        breathingCircle.style.transition = 'all 0.3s ease';
    }
    
    // Circle click handler - ONLY arrow function in the file
    breathingCircle.addEventListener('click', () => {
        if (isActive) {
            stopBreathing();
        } else {
            startBreathing();
        }
    });
    
    console.log('Breathing exercise initialized successfully!');
}