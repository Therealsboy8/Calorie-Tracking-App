// FitTrack - Main JavaScript File
// Shared functionality across all pages

class FitTrackApp {
    constructor() {
        this.userData = this.loadUserData();
        this.foodDatabase = this.initializeFoodDatabase();
        this.exerciseDatabase = this.initializeExerciseDatabase();
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.updateUI();
    }

    // Data Management
    loadUserData() {
        const defaultData = {
            profile: {
                name: 'User',
                age: 30,
                weight: 165,
                height: 68,
                activityLevel: 'moderate',
                goal: 'lose_weight'
            },
            dailyGoals: {
                calories: 2000,
                protein: 120,
                carbs: 240,
                fat: 75,
                water: 8
            },
            currentDay: {
                calories: 0,
                protein: 0,
                carbs: 0,
                fat: 0,
                water: 0,
                workouts: []
            },
            streak: {
                current: 7,
                longest: 12
            },
            achievements: [
                { id: 'first_week', unlocked: true, date: '2025-01-08' },
                { id: 'goal_master', unlocked: true, date: '2025-01-12' },
                { id: 'strong_start', unlocked: true, date: '2025-01-15' },
                { id: 'hot_streak', unlocked: false, progress: 7 },
                { id: 'lightning', unlocked: false, progress: 23 },
                { id: 'champion', unlocked: false, progress: 30 }
            ],
            workoutHistory: [],
            weightHistory: []
        };

        const saved = localStorage.getItem('fittrack_data');
        return saved ? { ...defaultData, ...JSON.parse(saved) } : defaultData;
    }

    saveUserData() {
        localStorage.setItem('fittrack_data', JSON.stringify(this.userData));
    }

    // Database Initialization
    initializeFoodDatabase() {
        return [
            { 
                id: 'apple', 
                name: 'Apple', 
                calories: 95, 
                protein: 0.5, 
                carbs: 25, 
                fat: 0.3, 
                fiber: 4.4,
                emoji: '🍎',
                category: 'fruits',
                serving: '1 medium'
            },
            { 
                id: 'banana', 
                name: 'Banana', 
                calories: 105, 
                protein: 1.3, 
                carbs: 27, 
                fat: 0.4, 
                fiber: 3.1,
                emoji: '🍌',
                category: 'fruits',
                serving: '1 medium'
            },
            { 
                id: 'chicken_breast', 
                name: 'Chicken Breast', 
                calories: 231, 
                protein: 43.5, 
                carbs: 0, 
                fat: 5, 
                fiber: 0,
                emoji: '🍗',
                category: 'protein',
                serving: '4 oz'
            },
            { 
                id: 'broccoli', 
                name: 'Broccoli', 
                calories: 55, 
                protein: 3.7, 
                carbs: 11, 
                fat: 0.6, 
                fiber: 5.1,
                emoji: '🥦',
                category: 'vegetables',
                serving: '1 cup'
            },
            { 
                id: 'salmon', 
                name: 'Salmon', 
                calories: 280, 
                protein: 39, 
                carbs: 0, 
                fat: 12, 
                fiber: 0,
                emoji: '🐟',
                category: 'protein',
                serving: '4 oz'
            },
            { 
                id: 'rice', 
                name: 'Brown Rice', 
                calories: 205, 
                protein: 4.3, 
                carbs: 45, 
                fat: 0.4, 
                fiber: 3.5,
                emoji: '🍚',
                category: 'grains',
                serving: '1 cup cooked'
            },
            { 
                id: 'avocado', 
                name: 'Avocado', 
                calories: 234, 
                protein: 2.9, 
                carbs: 12, 
                fat: 21, 
                fiber: 10,
                emoji: '🥑',
                category: 'fats',
                serving: '1 medium'
            },
            { 
                id: 'greek_yogurt', 
                name: 'Greek Yogurt', 
                calories: 100, 
                protein: 17, 
                carbs: 6, 
                fat: 0, 
                fiber: 0,
                emoji: '🥛',
                category: 'dairy',
                serving: '6 oz'
            },
            { 
                id: 'almonds', 
                name: 'Almonds', 
                calories: 164, 
                protein: 6, 
                carbs: 6, 
                fat: 14, 
                fiber: 3.5,
                emoji: '🥜',
                category: 'nuts',
                serving: '1 oz'
            },
            { 
                id: 'sweet_potato', 
                name: 'Sweet Potato', 
                calories: 112, 
                protein: 2, 
                carbs: 26, 
                fat: 0.1, 
                fiber: 3.9,
                emoji: '🍠',
                category: 'vegetables',
                serving: '1 medium'
            }
        ];
    }

    initializeExerciseDatabase() {
        return [
            {
                id: 'jumping_jacks',
                name: 'Jumping Jacks',
                category: 'cardio',
                duration: 30,
                sets: 3,
                reps: null,
                caloriesPerMinute: 8,
                difficulty: 'beginner',
                emoji: '🏃',
                instructions: 'Stand with feet together, jump while spreading legs and raising arms overhead'
            },
            {
                id: 'push_ups',
                name: 'Push-ups',
                category: 'strength',
                duration: null,
                sets: 3,
                reps: 12,
                caloriesPerMinute: 7,
                difficulty: 'intermediate',
                emoji: '💪',
                instructions: 'Start in plank position, lower chest to ground, push back up'
            },
            {
                id: 'squats',
                name: 'Squats',
                category: 'strength',
                duration: null,
                sets: 3,
                reps: 15,
                caloriesPerMinute: 6,
                difficulty: 'beginner',
                emoji: '🦵',
                instructions: 'Stand with feet shoulder-width apart, lower hips back and down, return to standing'
            },
            {
                id: 'planks',
                name: 'Planks',
                category: 'core',
                duration: 45,
                sets: 3,
                reps: null,
                caloriesPerMinute: 5,
                difficulty: 'intermediate',
                emoji: '🏋️',
                instructions: 'Hold body straight in push-up position, engage core muscles'
            },
            {
                id: 'burpees',
                name: 'Burpees',
                category: 'cardio',
                duration: null,
                sets: 3,
                reps: 10,
                caloriesPerMinute: 12,
                difficulty: 'advanced',
                emoji: '🔥',
                instructions: 'Squat down, jump back to plank, do push-up, jump feet forward, jump up with arms overhead'
            },
            {
                id: 'yoga_flow',
                name: 'Yoga Flow',
                category: 'flexibility',
                duration: 600,
                sets: 1,
                reps: null,
                caloriesPerMinute: 3,
                difficulty: 'beginner',
                emoji: '🧘',
                instructions: 'Flow through sun salutation sequence with controlled breathing'
            }
        ];
    }

    // Event Listeners
    setupEventListeners() {
        // Handle navigation
        document.addEventListener('click', (e) => {
            if (e.target.matches('[data-action]')) {
                this.handleAction(e.target.dataset.action, e.target);
            }
        });

        // Handle form submissions
        document.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleFormSubmit(e.target);
        });
    }

    handleAction(action, element) {
        switch (action) {
            case 'add-food':
                this.showAddFoodModal();
                break;
            case 'start-workout':
                this.startWorkout();
                break;
            case 'add-water':
                this.addWater();
                break;
            case 'update-measurements':
                this.showMeasurementModal();
                break;
            default:
                console.log(`Action ${action} not implemented`);
        }
    }

    // Food Management
    addFood(foodId, portion = 1) {
        const food = this.foodDatabase.find(f => f.id === foodId);
        if (!food) return false;

        const multiplier = portion;
        this.userData.currentDay.calories += food.calories * multiplier;
        this.userData.currentDay.protein += food.protein * multiplier;
        this.userData.currentDay.carbs += food.carbs * multiplier;
        this.userData.currentDay.fat += food.fat * multiplier;

        this.saveUserData();
        this.updateUI();
        return true;
    }

    // Workout Management
    startWorkout(exerciseIds = []) {
        const workout = {
            id: Date.now().toString(),
            date: new Date().toISOString(),
            exercises: exerciseIds,
            duration: 0,
            caloriesBurned: 0,
            completed: false
        };

        this.currentWorkout = workout;
        return workout;
    }

    completeWorkout(duration, caloriesBurned) {
        if (this.currentWorkout) {
            this.currentWorkout.duration = duration;
            this.currentWorkout.caloriesBurned = caloriesBurned;
            this.currentWorkout.completed = true;
            
            this.userData.workoutHistory.push(this.currentWorkout);
            this.userData.currentDay.workouts.push(this.currentWorkout.id);
            
            this.updateStreak();
            this.checkAchievements();
            this.saveUserData();
            this.currentWorkout = null;
        }
    }

    // Water Tracking
    addWater(glasses = 1) {
        this.userData.currentDay.water += glasses;
        if (this.userData.currentDay.water > this.userData.dailyGoals.water) {
            this.userData.currentDay.water = this.userData.dailyGoals.water;
        }
        this.saveUserData();
        this.updateUI();
    }

    // Streak Management
    updateStreak() {
        const today = new Date().toDateString();
        const lastWorkout = this.userData.workoutHistory[this.userData.workoutHistory.length - 1];
        
        if (lastWorkout) {
            const lastWorkoutDate = new Date(lastWorkout.date).toDateString();
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            
            if (lastWorkoutDate === today) {
                // Workout completed today
                if (this.userData.streak.lastWorkoutDate !== today) {
                    this.userData.streak.current += 1;
                    this.userData.streak.lastWorkoutDate = today;
                }
            } else if (lastWorkoutDate !== yesterday.toDateString()) {
                // Streak broken
                this.userData.streak.current = 0;
            }
            
            if (this.userData.streak.current > this.userData.streak.longest) {
                this.userData.streak.longest = this.userData.streak.current;
            }
        }
    }

    // Achievement System
    checkAchievements() {
        const achievements = this.userData.achievements;
        
        // Check streak achievements
        const hotStreak = achievements.find(a => a.id === 'hot_streak');
        if (hotStreak && !hotStreak.unlocked && this.userData.streak.current >= 14) {
            hotStreak.unlocked = true;
            hotStreak.date = new Date().toISOString();
            this.showAchievementNotification('Hot Streak Unlocked! 🔥');
        }
        
        // Check workout count achievements
        const lightning = achievements.find(a => a.id === 'lightning');
        if (lightning && !lightning.unlocked && this.userData.workoutHistory.length >= 50) {
            lightning.unlocked = true;
            lightning.date = new Date().toISOString();
            this.showAchievementNotification('Lightning Achievement! ⚡');
        }
    }

    showAchievementNotification(message) {
        // Create and show achievement notification
        const notification = document.createElement('div');
        notification.className = 'achievement-notification';
        notification.innerHTML = `
            <div class="bg-yellow-400 text-black px-4 py-2 rounded-lg font-bold shadow-lg">
                ${message}
            </div>
        `;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 1000;
            animation: slideIn 0.5s ease-out;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.5s ease-in';
            setTimeout(() => notification.remove(), 500);
        }, 3000);
    }

    // UI Updates
    updateUI() {
        this.updateCalorieDisplay();
        this.updateProgressBars();
        this.updateStreakDisplay();
    }

    updateCalorieDisplay() {
        const calorieElements = document.querySelectorAll('[data-calories]');
        calorieElements.forEach(el => {
            el.textContent = this.userData.currentDay.calories;
        });
    }

    updateProgressBars() {
        const calorieProgress = (this.userData.currentDay.calories / this.userData.dailyGoals.calories) * 100;
        const proteinProgress = (this.userData.currentDay.protein / this.userData.dailyGoals.protein) * 100;
        const carbsProgress = (this.userData.currentDay.carbs / this.userData.dailyGoals.carbs) * 100;
        const fatProgress = (this.userData.currentDay.fat / this.userData.dailyGoals.fat) * 100;
        const waterProgress = (this.userData.currentDay.water / this.userData.dailyGoals.water) * 100;

        // Update progress bars if they exist
        this.updateProgressBar('calorie-progress', calorieProgress);
        this.updateProgressBar('protein-progress', proteinProgress);
        this.updateProgressBar('carbs-progress', carbsProgress);
        this.updateProgressBar('fat-progress', fatProgress);
        this.updateProgressBar('water-progress', waterProgress);
    }

    updateProgressBar(id, percentage) {
        const element = document.getElementById(id);
        if (element) {
            element.style.width = `${Math.min(percentage, 100)}%`;
        }
    }

    updateStreakDisplay() {
        const streakElements = document.querySelectorAll('[data-streak]');
        streakElements.forEach(el => {
            el.textContent = this.userData.streak.current;
        });
    }

    // Utility Functions
    calculateBMI(weight, height) {
        // weight in lbs, height in inches
        return (weight / (height * height)) * 703;
    }

    calculateBMR(weight, height, age, gender) {
        // Mifflin-St Jeor Equation
        if (gender === 'male') {
            return 10 * (weight * 0.453592) + 6.25 * (height * 2.54) - 5 * age + 5;
        } else {
            return 10 * (weight * 0.453592) + 6.25 * (height * 2.54) - 5 * age - 161;
        }
    }

    formatTime(seconds) {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        
        if (hours > 0) {
            return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
        } else {
            return `${minutes}:${secs.toString().padStart(2, '0')}`;
        }
    }

    // Animation Utilities
    animateValue(element, start, end, duration) {
        const startTime = performance.now();
        const difference = end - start;
        
        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const current = start + (difference * this.easeOutQuart(progress));
            
            element.textContent = Math.round(current);
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };
        
        requestAnimationFrame(animate);
    }

    easeOutQuart(t) {
        return 1 - Math.pow(1 - t, 4);
    }

    // Modal Management
    showModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.remove('hidden');
            anime({
                targets: modal,
                opacity: [0, 1],
                duration: 300,
                easing: 'easeOutQuart'
            });
        }
    }

    hideModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            anime({
                targets: modal,
                opacity: [1, 0],
                duration: 300,
                easing: 'easeOutQuart',
                complete: () => {
                    modal.classList.add('hidden');
                }
            });
        }
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    window.fitTrackApp = new FitTrackApp();
    
    // Add CSS animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
        
        .achievement-notification {
            animation: slideIn 0.5s ease-out;
        }
    `;
    document.head.appendChild(style);
});

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = FitTrackApp;
}