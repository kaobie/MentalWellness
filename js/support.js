// ===================================
// SIMPLE SUPPORT.JS - WITH DYNAMIC DOM RENDERING 

// ===================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('Support page loaded!');
    
    // Generate emergency contacts dynamically FIRST
    generateEmergencyContacts();
    
    // Initialize other features
    setupFormValidation();
    setupMoodButtons();
    setupSupportButtons();
});

// ===================================
// DYNAMIC DOM RENDERING - EMERGENCY CONTACTS
// ===================================
function generateEmergencyContacts() {
    const contacts = [
        {
            icon: "bi-telephone-fill",
            name: "SOS Hotline", 
            number: "1767",
            description: "24/7 emotional support",
            color: "danger"
        },
        {
            icon: "bi-hospital",
            name: "IMH Emergency", 
            number: "6389 2222",
            description: "Mental health crisis line",
            color: "primary"
        },
        {
            icon: "bi-chat-dots",
            name: "Online Chat", 
            number: "sos.org.sg",
            description: "Live chat support",
            color: "info"
        }
    ];
    
    const container = document.getElementById('emergency-contacts-container');
    
    // Check if container exists
    if (!container) {
        console.log('Emergency contacts container not found');
        return;
    }
    
    //  to create contact cards
    for (let i = 0; i < contacts.length; i++) {
        const contact = contacts[i];
        
        // Create column
        const col = document.createElement('div');
        col.className = 'col-md-4 mb-2';
        
        // Create card
        const card = document.createElement('div');
        card.className = 'card border-' + contact.color + ' h-100';
        
        // Create card body
        const cardBody = document.createElement('div');
        cardBody.className = 'card-body text-center p-3';
        
        // Create icon
        const icon = document.createElement('i');
        icon.className = contact.icon + ' text-' + contact.color + ' fs-4 mb-2';
        
        // Create name
        const name = document.createElement('h6');
        name.className = 'fw-bold mb-1';
        name.textContent = contact.name;
        
        // Create number/link
        const numberElement = document.createElement('p');
        numberElement.className = 'mb-1 fw-bold';
        
        const link = document.createElement('a');
        link.className = 'text-' + contact.color + ' text-decoration-none';
        
        if (contact.number.includes('.')) {
            // Website link
            link.href = 'https://' + contact.number;
            link.target = '_blank';
        } else {
            // Phone number
            link.href = 'tel:' + contact.number;
        }
        link.textContent = contact.number;
        
        numberElement.appendChild(link);
        
        // Create description
        const desc = document.createElement('small');
        desc.className = 'text-muted';
        desc.textContent = contact.description;
        
        // Build structure using appendChild
        cardBody.appendChild(icon);
        cardBody.appendChild(name);
        cardBody.appendChild(numberElement);
        cardBody.appendChild(desc);
        card.appendChild(cardBody);
        col.appendChild(card);
        container.appendChild(col);
    }
    
    console.log('Emergency contacts generated dynamically');
}

// ===================================
// SUPPORT CARD BUTTONS (Make them functional) - FIXED
// ===================================
function setupSupportButtons() {
    // FIXED: Added missing 'a[' at the beginning
    const supportButtons = document.querySelectorAll('a[href="#supportFormSection"]');
    
    // Use  instead of forEach
    for (let i = 0; i < supportButtons.length; i++) {
        const button = supportButtons[i];
        
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const buttonText = this.textContent.trim();
            const supportTypeSelect = document.getElementById('supportType');
            
            if (buttonText.includes('Request Counseling')) {
                // Pre-select counseling
                supportTypeSelect.value = 'counseling';
                console.log('Counseling button clicked - form pre-filled');
                
            } else if (buttonText.includes('Join Peer Support')) {
                // Pre-select peer support
                supportTypeSelect.value = 'peer';
                console.log('Peer Support button clicked - form pre-filled');
            }
            
            // Trigger change event to update validation
            supportTypeSelect.dispatchEvent(new Event('change'));
            
            // Scroll to form
            document.getElementById('supportForm').scrollIntoView({ 
                behavior: 'smooth', 
                block: 'start' 
            });
        });
    }
    
    console.log('Support card buttons initialized');
}

// ===================================
// MOOD CHECK-IN (Simple & Visual)
// ===================================
function setupMoodButtons() {
    const moodButtons = document.querySelectorAll('.mood-btn');
    const responseDiv = document.getElementById('moodResponse');
    const alertDiv = document.getElementById('moodAlert');
    const titleDiv = document.getElementById('moodTitle');
    const messageDiv = document.getElementById('moodMessage');
    
    // Simple mood messages 
    const messages = {
        great: {
            title: "That's wonderful! 😊",
            text: "Keep up the positive momentum!",
            color: "alert-success"
        },
        good: {
            title: "Glad to hear it! 🙂", 
            text: "You're doing well today.",
            color: "alert-primary"
        },
        okay: {
            title: "That's perfectly valid 😐",
            text: "Some days are just okay, and that's normal.",
            color: "alert-warning"
        },
        difficult: {
            title: "Thank you for sharing 😕",
            text: "Having a difficult day can be tough. You're not alone.",
            color: "alert-info"
        },
        struggling: {
            title: "We're here for you 😢",
            text: "It takes courage to acknowledge when you're struggling.",
            color: "alert-danger"
        }
    };
    
    // Add click events to mood buttons - 
    for (let i = 0; i < moodButtons.length; i++) {
        const button = moodButtons[i];
        
        button.addEventListener('click', function() {
            const mood = this.getAttribute('data-mood');
            const response = messages[mood];
            
            // Remove active from all buttons - simple for loop
            for (let j = 0; j < moodButtons.length; j++) {
                moodButtons[j].classList.remove('active');
            }
            
            // Make clicked button active
            this.classList.add('active');
            
            // Update response content
            titleDiv.textContent = response.title;
            messageDiv.textContent = response.text;
            alertDiv.className = 'alert ' + response.color;
            
            // Show response
            responseDiv.style.display = 'block';
            
            console.log('Mood selected:', mood);
        });
    }
}

// ===================================
// FORM VALIDATION (Simple & Clear)
// ===================================
function setupFormValidation() {
    const form = document.getElementById('supportForm1');
    if (!form) return; // Exit if form not found
    
    const nameInput = document.getElementById('fullName');
    const emailInput = document.getElementById('email');
    const supportType = document.getElementById('supportType');
    const submitButton = form.querySelector('button[type="submit"]');
    
    // Character counter for name
    const nameCounter = document.getElementById('nameCount');
    nameInput.addEventListener('input', function() {
        nameCounter.textContent = this.value.length;
    });
    
    // Simple name validation
    nameInput.addEventListener('blur', function() {
        const name = this.value.trim();
        
        if (name.length < 2) {
            showError(this, 'nameError', 'Name must be at least 2 characters');
        } else if (name.length > 50) {
            showError(this, 'nameError', 'Name is too long');
        } else if (/\d/.test(name)) {
            showError(this, 'nameError', 'Name cannot contain numbers');
        } else {
            showSuccess(this, 'nameError');
        }
    });
    
    // Simple email validation
    emailInput.addEventListener('blur', function() {
        const email = this.value.trim();
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!email) {
            showError(this, 'emailError', 'Email is required');
        } else if (!emailPattern.test(email)) {
            showError(this, 'emailError', 'Please enter a valid email');
        } else {
            showSuccess(this, 'emailError');
            document.getElementById('emailSuccess').style.display = 'block';
        }
    });
    
    // Support type validation
    supportType.addEventListener('change', function() {
        if (!this.value) {
            showError(this, 'supportTypeError', 'Please select a support type');
        } else {
            showSuccess(this, 'supportTypeError');
        }
    });
    
    // Radio button validation (urgency) 
    const urgencyRadios = document.querySelectorAll('input[name="urgency"]');
    for (let i = 0; i < urgencyRadios.length; i++) {
        const radio = urgencyRadios[i];
        
        radio.addEventListener('change', function() {
            document.getElementById('urgencyError').style.display = 'none';
            
            // Remove border-success from all radio containers
            for (let j = 0; j < urgencyRadios.length; j++) {
                urgencyRadios[j].closest('.form-check').classList.remove('border-success');
            }
            
            // Add border-success to selected radio container
            this.closest('.form-check').classList.add('border-success');
        });
    }
    
    // Checkbox validation (concerns) 
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    for (let i = 0; i < checkboxes.length; i++) {
        const checkbox = checkboxes[i];
        
        checkbox.addEventListener('change', function() {
            const allCheckboxes = document.querySelectorAll('input[type="checkbox"]');
            const checkedBoxes = document.querySelectorAll('input[type="checkbox"]:checked');
            
            // Remove green borders from all checkboxes first
            for (let k = 0; k < allCheckboxes.length; k++) {
                allCheckboxes[k].closest('.form-check').classList.remove('border-success');
            }
            
            if (checkedBoxes.length > 0) {
                document.getElementById('concernsError').style.display = 'none';
                
                // Add green borders only to checked boxes
                for (let j = 0; j < checkedBoxes.length; j++) {
                    checkedBoxes[j].closest('.form-check').classList.add('border-success');
                }
            }
        });
    }
    
    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        console.log('Form submitted');
        
        // Validate each field and show inline errors
        let allValid = true;
        
        // Check name
        const name = nameInput.value.trim();
        if (name.length < 2) {
            showError(nameInput, 'nameError', 'This section needs to be filled with at least 2 characters');
            allValid = false;
        }
        
        // Check email
        const email = emailInput.value.trim();
        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            showError(emailInput, 'emailError', 'This section needs a valid email address');
            allValid = false;
        }
        
        // Check support type
        if (!supportType.value) {
            showError(supportType, 'supportTypeError', 'This section needs to be selected');
            allValid = false;
        }
        
        // Check urgency radio buttons
        const urgency = document.querySelector('input[name="urgency"]:checked');
        if (!urgency) {
            document.getElementById('urgencyError').textContent = 'This section needs to be selected';
            document.getElementById('urgencyError').style.display = 'block';
            allValid = false;
        }
        
        // Check concerns checkboxes
        const concerns = document.querySelectorAll('input[type="checkbox"]:checked');
        if (concerns.length === 0) {
            document.getElementById('concernsError').textContent = 'This section needs at least one concern selected';
            document.getElementById('concernsError').style.display = 'block';
            allValid = false;
        }
        
        // Submit if all valid
        if (allValid) {
            submitButton.innerHTML = '<i class="bi bi-hourglass-split me-2"></i>Submitting...';
            submitButton.disabled = true;
            
            // Submit after short delay
            setTimeout(function() {
                form.submit();
            }, 1000);
        } else {
            // Scroll to first error
            const firstError = document.querySelector('.is-invalid');
            if (firstError) {
                firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    });
    
    // Reset form
    form.addEventListener('reset', function() {
        // Small delay to let the form reset first
        setTimeout(function() {
            // Clear all validation styling
            const validationElements = document.querySelectorAll('.is-invalid, .is-valid');
            for (let i = 0; i < validationElements.length; i++) {
                validationElements[i].classList.remove('is-invalid', 'is-valid');
            }
            
            // Hide all error and success messages 
            const feedbackElements = document.querySelectorAll('.invalid-feedback, .valid-feedback');
            for (let i = 0; i < feedbackElements.length; i++) {
                feedbackElements[i].style.display = 'none';
            }
            
            // Clear border colors from radio buttons and checkboxes 
            const formChecks = document.querySelectorAll('.form-check');
            for (let i = 0; i < formChecks.length; i++) {
                formChecks[i].classList.remove('border-success', 'border-danger');
            }
            
            // Reset counter
            nameCounter.textContent = '0';
            
            // Reset submit button
            submitButton.classList.remove('btn-secondary');
            submitButton.classList.add('btn-primary');
            submitButton.disabled = false;
            submitButton.innerHTML = '<i class="bi bi-send me-2"></i>Submit Support Request';
            
            console.log('Form completely reset');
        }, 50);
    });
}

// ===================================
// HELPER FUNCTIONS 
// ===================================
function showError(input, errorId, message) {
    input.classList.remove('is-valid');
    input.classList.add('is-invalid');
    
    const errorDiv = document.getElementById(errorId);
    errorDiv.textContent = message;
    errorDiv.style.display = 'block';
}

function showSuccess(input, errorId) {
    input.classList.remove('is-invalid');
    input.classList.add('is-valid');
    
    const errorDiv = document.getElementById(errorId);
    errorDiv.style.display = 'none';
}

function validateAllFields() {
    const name = document.getElementById('fullName').value.trim();
    const email = document.getElementById('email').value.trim();
    const supportType = document.getElementById('supportType').value;
    const urgency = document.querySelector('input[name="urgency"]:checked');
    const concerns = document.querySelectorAll('input[type="checkbox"]:checked');
    
    // Simple checks
    const nameValid = name.length >= 2 && name.length <= 50 && !/\d/.test(name);
    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const supportTypeValid = supportType !== '';
    const urgencyValid = urgency !== null;
    const concernsValid = concerns.length > 0;
    
    return nameValid && emailValid && supportTypeValid && urgencyValid && concernsValid;
}