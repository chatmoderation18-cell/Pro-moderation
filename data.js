// ChatGuard Pro - Data Management System
// This file manages user accounts, earnings, and task completion

const ChatGuardData = {
    // Current date set to January 2026
    currentDate: "January 17, 2026",
    
    // All user accounts with their data
    users: {
        "alex@email.com": {
            id: 1,
            email: "alex@email.com",
            password: "Password123",
            name: "Alex Johnson",
            avatar: "https://i.pravatar.cc/150?img=5",
            tier: "Premium Moderator",
            balance: 45.00, // $45 from 3 completed tasks
            tasksCompleted: 3,
            trainingCompleted: true,
            joinDate: "January 10, 2026"
        },
        "sarah@email.com": {
            id: 2,
            email: "sarah@email.com",
            password: "Password123",
            name: "Sarah Miller",
            avatar: "https://i.pravatar.cc/150?img=1",
            tier: "Verified Moderator",
            balance: 30.00, // $30 from 2 completed tasks
            tasksCompleted: 2,
            trainingCompleted: true,
            joinDate: "January 12, 2026"
        },
        "mike@email.com": {
            id: 3,
            email: "mike@email.com",
            password: "Password123",
            name: "Mike Chen",
            avatar: "https://i.pravatar.cc/150?img=2",
            tier: "Beginner Moderator",
            balance: 0.00, // New user, no tasks yet
            tasksCompleted: 0,
            trainingCompleted: false,
            joinDate: "January 15, 2026"
        }
    },
    
    // Available tasks database
    tasks: [
        {
            id: 1,
            title: "Twitch Gaming Moderation",
            platform: "Twitch",
            type: "gaming",
            rate: 15,
            duration: "2 hours",
            openings: 3,
            rating: 4.8,
            reviews: 128,
            description: "Moderate 2-hour gaming stream chat. Monitor for toxic behavior and enforce community guidelines."
        },
        {
            id: 2,
            title: "Discord Server Moderation",
            platform: "Discord",
            type: "community",
            rate: 15,
            duration: "2 hours",
            openings: 2,
            rating: 4.9,
            reviews: 87,
            description: "Review Discord conversations for 2 hours. Enforce community rules and maintain positive environment."
        },
        {
            id: 3,
            title: "Customer Support Chat",
            platform: "Live Chat",
            type: "support",
            rate: 15,
            duration: "2 hours",
            openings: 1,
            rating: 4.7,
            reviews: 42,
            description: "Moderate live customer support chat for 2 hours. Ensure professional communication and assistance."
        },
        {
            id: 4,
            title: "YouTube Comments Review",
            platform: "YouTube",
            type: "social",
            rate: 15,
            duration: "2 hours",
            openings: 2,
            rating: 4.6,
            reviews: 56,
            description: "Review YouTube video comments for 2 hours. Filter inappropriate content and spam."
        },
        {
            id: 5,
            title: "Live Stream Chat Support",
            platform: "Live Stream",
            type: "streaming",
            rate: 15,
            duration: "2 hours",
            openings: 4,
            rating: 4.5,
            reviews: 34,
            description: "Support live stream chat for 2 hours. Help viewers and moderate conversations in real-time."
        }
    ],
    
    // Currently logged in user
    currentUser: null,
    
    // Initialize system
    init: function() {
        // Check for saved login
        const savedUser = localStorage.getItem('chatguard_user');
        if (savedUser) {
            this.currentUser = JSON.parse(savedUser);
        }
        
        // Update all pages with current date
        this.updateDateOnAllPages();
        
        // Update user-specific data if logged in
        if (this.currentUser) {
            this.updateUserDataOnAllPages();
        }
        
        console.log('ChatGuard Data System Initialized - Date:', this.currentDate);
    },
    
    // Login function
    login: function(email, password) {
        const user = this.users[email];
        if (user && user.password === password) {
            this.currentUser = user;
            localStorage.setItem('chatguard_user', JSON.stringify(user));
            return { success: true, user: user };
        }
        return { success: false, message: "Invalid email or password" };
    },
    
    // Logout function
    logout: function() {
        this.currentUser = null;
        localStorage.removeItem('chatguard_user');
        return { success: true };
    },
    
    // Complete a task and earn $15
    completeTask: function(taskId) {
        if (!this.currentUser) return { success: false, message: "Not logged in" };
        
        const task = this.tasks.find(t => t.id === taskId);
        if (!task) return { success: false, message: "Task not found" };
        
        if (task.openings <= 0) return { success: false, message: "No openings left" };
        
        // Update user balance and completed tasks
        this.currentUser.balance += task.rate;
        this.currentUser.tasksCompleted += 1;
        
        // Update task openings
        task.openings -= 1;
        
        // Save updated user data
        localStorage.setItem('chatguard_user', JSON.stringify(this.currentUser));
        
        // Update the user in main database
        this.users[this.currentUser.email] = this.currentUser;
        
        return { 
            success: true, 
            message: `Task completed! Earned $${task.rate}`,
            balance: this.currentUser.balance,
            tasksCompleted: this.currentUser.tasksCompleted
        };
    },
    
    // Complete training
    completeTraining: function() {
        if (!this.currentUser) return { success: false, message: "Not logged in" };
        
        this.currentUser.trainingCompleted = true;
        localStorage.setItem('chatguard_user', JSON.stringify(this.currentUser));
        this.users[this.currentUser.email] = this.currentUser;
        
        return { success: true, message: "Training completed!" };
    },
    
    // Update date on all pages
    updateDateOnAllPages: function() {
        // Update any element with class 'current-date'
        const dateElements = document.querySelectorAll('.current-date');
        dateElements.forEach(element => {
            element.textContent = this.currentDate;
        });
        
        // Update dashboard welcome message
        const welcomeDates = document.querySelectorAll('.dashboard-header p');
        welcomeDates.forEach(element => {
            if (element.textContent.includes('2024')) {
                element.textContent = element.textContent.replace(/2024/g, '2026');
            }
        });
    },
    
    // Update user data on all pages
    updateUserDataOnAllPages: function() {
        // Update balance display
        const balanceElements = document.querySelectorAll('.user-balance span, .balance-amount');
        balanceElements.forEach(element => {
            if (!element.classList.contains('pending')) {
                element.textContent = `$${this.currentUser.balance.toFixed(2)}`;
            }
        });
        
        // Update user name
        const nameElements = document.querySelectorAll('.user-name, .user-info h4');
        nameElements.forEach(element => {
            element.textContent = this.currentUser.name;
        });
        
        // Update user avatar
        const avatarElements = document.querySelectorAll('.user-avatar');
        avatarElements.forEach(element => {
            element.src = this.currentUser.avatar;
        });
        
        // Update user tier
        const tierElements = document.querySelectorAll('.user-tier');
        tierElements.forEach(element => {
            element.textContent = this.currentUser.tier;
        });
        
        // Update tasks completed count
        const taskCountElements = document.querySelectorAll('.tasks-completed-count');
        taskCountElements.forEach(element => {
            element.textContent = this.currentUser.tasksCompleted;
        });
        
        // Update earnings display
        const earningsElements = document.querySelectorAll('.stat-amount');
        earningsElements.forEach(element => {
            const parentText = element.parentElement.textContent;
            if (parentText.includes('This Week') || parentText.includes('This Month') || parentText.includes('All Time')) {
                if (this.currentUser.tasksCompleted > 0) {
                    const weeklyEarnings = this.currentUser.tasksCompleted * 15;
                    element.textContent = `$${weeklyEarnings.toFixed(2)}`;
                }
            }
        });
        
        // Update training status
        if (this.currentUser.trainingCompleted) {
            const trainingElements = document.querySelectorAll('.training-status');
            trainingElements.forEach(element => {
                element.innerHTML = '<i class="fas fa-check-circle"></i> Training Completed';
                element.style.color = '#10b981';
            });
            
            const progressCircles = document.querySelectorAll('.progress-percent');
            progressCircles.forEach(element => {
                element.textContent = '100%';
            });
        }
    },
    
    // Get current user data
    getCurrentUser: function() {
        return this.currentUser;
    },
    
    // Get all tasks
    getAllTasks: function() {
        return this.tasks;
    },
    
    // Get user by email
    getUserByEmail: function(email) {
        return this.users[email];
    }
};

// Initialize the data system
ChatGuardData.init();