// ChatGuard Pro - Main JavaScript
document.addEventListener('DOMContentLoaded', function() {
    console.log('ChatGuard Pro loaded successfully');
    
    // Initialize all components
    initializeCalculator();
    initializeSignupForm();
    initializeTasks();
    initializeToast();
    
    // Show welcome toast
    setTimeout(() => {
        showToast('Welcome to ChatGuard Pro! Start earning $50/hour today.');
    }, 1500);
    
    // Update live stats every 30 seconds
    setInterval(updateLiveStats, 30000);
});

// ===== EARNINGS CALCULATOR =====
function initializeCalculator() {
    const hoursSlider = document.getElementById('hoursPerWeek');
    const hoursValue = document.getElementById('hoursValue');
    const rateButtons = document.querySelectorAll('.rate-option');
    const earningsAmount = document.getElementById('earningsAmount');
    const weeklyEarnings = document.getElementById('weeklyEarnings');
    const monthlyEarnings = document.getElementById('monthlyEarnings');
    const yearlyEarnings = document.getElementById('yearlyEarnings');
    
    if (!hoursSlider) return;
    
    let hourlyRate = 50; // Default rate
    
    // Update hours display
    hoursSlider.addEventListener('input', function() {
        hoursValue.textContent = this.value;
        calculateEarnings(this.value, hourlyRate);
    });
    
    // Rate selector
    rateButtons.forEach(button => {
        button.addEventListener('click', function() {
            rateButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            hourlyRate = parseInt(this.getAttribute('data-rate'));
            calculateEarnings(hoursSlider.value, hourlyRate);
        });
    });
    
    // Initial calculation
    calculateEarnings(hoursSlider.value, hourlyRate);
}

function calculateEarnings(hours, rate) {
    const weekly = hours * rate;
    const monthly = weekly * 4.33; // Average weeks per month
    const yearly = monthly * 12;
    
    // Update displays
    document.getElementById('earningsAmount').textContent = weekly.toLocaleString();
    document.getElementById('weeklyEarnings').textContent = `$${weekly.toLocaleString()}`;
    document.getElementById('monthlyEarnings').textContent = `$${Math.round(monthly).toLocaleString()}`;
    document.getElementById('yearlyEarnings').textContent = `$${Math.round(yearly).toLocaleString()}`;
}

// ===== SIGNUP FORM =====
function initializeSignupForm() {
    const signupForm = document.getElementById('signupForm');
    
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Show loading state
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Creating Account...';
            submitBtn.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                // Success
                submitBtn.innerHTML = '<i class="fas fa-check"></i> Account Created!';
                submitBtn.style.background = 'linear-gradient(135deg, #10b981 0%, #34d399 100%)';
                
                showToast('🎉 Welcome to ChatGuard Pro! Check your email for verification.');
                
                // Reset form after delay
                setTimeout(() => {
                    signupForm.reset();
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.background = '';
                    
                    // Redirect to tasks page
                    window.location.href = 'tasks.html';
                }, 2000);
                
            }, 2000);
        });
    }
}

// ===== TASKS FUNCTIONS =====
function initializeTasks() {
    // Task application buttons
    const applyButtons = document.querySelectorAll('.btn-task-apply');
    
    applyButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const taskCard = this.closest('.task-card');
            const taskTitle = taskCard.querySelector('.task-title').textContent;
            
            // Show applying state
            const originalText = this.textContent;
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Applying...';
            this.disabled = true;
            
            // Simulate application process
            setTimeout(() => {
                this.innerHTML = '<i class="fas fa-check"></i> Applied Successfully!';
                this.style.background = 'linear-gradient(135deg, #10b981 0%, #34d399 100%)';
                
                showToast(`✅ Application submitted for: ${taskTitle}`);
                
                // Reset button after delay
                setTimeout(() => {
                    this.innerHTML = originalText;
                    this.disabled = false;
                    this.style.background = '';
                }, 3000);
                
            }, 2000);
        });
    });
}

// ===== LIVE STATS UPDATES =====
function updateLiveStats() {
    // Update hero stats with small random increases
    const stats = {
        earnings: document.querySelector('.hero-stats .stat-item:nth-child(1) .stat-number'),
        moderators: document.querySelector('.hero-stats .stat-item:nth-child(2) .stat-number'),
        support: document.querySelector('.hero-stats .stat-item:nth-child(3) .stat-number')
    };
    
    if (stats.earnings) {
        const currentValue = parseInt(stats.earnings.textContent.replace('$', '').replace('M', '').replace('+', '')) * 1000000;
        const increase = Math.floor(Math.random() * 10000);
        stats.earnings.textContent = `$${((currentValue + increase) / 1000000).toFixed(1)}M+`;
    }
    
    if (stats.moderators) {
        const currentValue = parseInt(stats.moderators.textContent.replace('+', ''));
        const increase = Math.floor(Math.random() * 10);
        stats.moderators.textContent = `${(currentValue + increase).toLocaleString()}+`;
    }
    
    // Update floating cards
    updateFloatingCards();
}

function updateFloatingCards() {
    const earningsCard = document.querySelector('.card-earnings .card-amount');
    const statsCard = document.querySelector('.card-stats .card-percent');
    
    if (earningsCard) {
        const current = parseFloat(earningsCard.textContent.replace('$', ''));
        const newEarnings = current + (Math.random() * 50);
        earningsCard.textContent = `$${newEarnings.toFixed(2)}`;
    }
    
    if (statsCard) {
        const current = parseFloat(statsCard.textContent.replace('%', ''));
        const newPercent = Math.min(99.9, Math.max(98.5, current + (Math.random() - 0.5)));
        statsCard.textContent = `${newPercent.toFixed(1)}% Accuracy`;
    }
}

// ===== TOAST NOTIFICATIONS =====
function initializeToast() {
    const toast = document.getElementById('notificationToast');
    const closeBtn = toast.querySelector('.toast-close');
    
    closeBtn.addEventListener('click', () => {
        hideToast();
    });
    
    // Auto-hide after 8 seconds
    setTimeout(hideToast, 8000);
}

function showToast(message, type = 'info') {
    const toast = document.getElementById('notificationToast');
    const toastIcon = toast.querySelector('i');
    const toastMessage = toast.querySelector('.toast-message');
    
    // Set icon based on type
    switch(type) {
        case 'success':
            toastIcon.className = 'fas fa-check-circle';
            toastIcon.style.color = '#10b981';
            break;
        case 'warning':
            toastIcon.className = 'fas fa-exclamation-triangle';
            toastIcon.style.color = '#f59e0b';
            break;
        case 'error':
            toastIcon.className = 'fas fa-times-circle';
            toastIcon.style.color = '#ef4444';
            break;
        default:
            toastIcon.className = 'fas fa-info-circle';
            toastIcon.style.color = '#2563eb';
    }
    
    toastMessage.textContent = message;
    toast.classList.add('show');
    
    // Auto hide
    setTimeout(() => {
        hideToast();
    }, 8000);
}

function hideToast() {
    const toast = document.getElementById('notificationToast');
    toast.classList.remove('show');
}

// ===== HELPER FUNCTIONS =====
function applyNow() {
    showToast('Redirecting to application form...', 'info');
    setTimeout(() => {
        window.location.href = '#signup';
    }, 500);
}

function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// Mobile menu toggle
function toggleMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
}

// ===== SIMULATE REAL-TIME ACTIVITY =====
setInterval(() => {
    // Randomly show task updates
    if (Math.random() > 0.7) {
        const messages = [
            'New high-priority task available!',
            '3 new Discord moderation positions opened',
            'Earnings increased for premium tasks',
            'New training module available'
        ];
        const randomMessage = messages[Math.floor(Math.random() * messages.length)];
        showToast(randomMessage, 'info');
    }
}, 30000);