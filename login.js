
document.addEventListener('DOMContentLoaded', function() {
    // Add sparkle animations
    createSparkles();
    
    // Microsoft login button animation
    const loginBtn = document.getElementById('microsoft-login-btn');
    
    loginBtn.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    });
    
    loginBtn.addEventListener('click', function() {
        // Add clicking animation
        this.classList.add('clicked');
        
        // Here you would typically redirect to Microsoft OAuth
        // For demo purposes, we'll show a loading state
        this.innerHTML = '<div class="loading-spinner"></div><span>Redirecting...</span>';
        
        // Mock redirect after 2 seconds
        setTimeout(function() {
            alert('This would redirect to Microsoft login in a real application.');
            loginBtn.innerHTML = '<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/512px-Microsoft_logo.svg.png" alt="Microsoft Logo"><span>Sign in with Microsoft</span>';
            loginBtn.classList.remove('clicked');
        }, 2000);
    });
    
    // Add CSS for loading state
    const style = document.createElement('style');
    style.textContent = `
        .clicked {
            background-color: #f3f4f6 !important;
            transform: scale(0.98) !important;
        }
        
        .loading-spinner {
            width: 20px;
            height: 20px;
            border: 3px solid rgba(139, 92, 246, 0.3);
            border-radius: 50%;
            border-top-color: #7c3aed;
            animation: spin 1s ease-in-out infinite;
            margin-right: 10px;
        }
        
        @keyframes spin {
            to { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(style);
});

function createSparkles() {
    const sparklesContainer = document.createElement('div');
    sparklesContainer.className = 'sparkles-container';
    document.body.appendChild(sparklesContainer);
    
    // Add CSS for sparkles
    const style = document.createElement('style');
    style.textContent = `
        .sparkles-container {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 1;
            overflow: hidden;
        }
        
        .sparkle {
            position: absolute;
            width: 5px;
            height: 5px;
            border-radius: 50%;
            background-color: rgba(255, 255, 255, 0.8);
            box-shadow: 0 0 10px rgba(255, 255, 255, 0.8), 
                        0 0 20px rgba(255, 255, 255, 0.8),
                        0 0 30px rgba(139, 92, 246, 0.8);
            animation: sparkle-float linear infinite;
        }
        
        @keyframes sparkle-float {
            0% {
                transform: translateY(0) scale(0);
                opacity: 0;
            }
            10% {
                opacity: 1;
                transform: scale(1);
            }
            90% {
                opacity: 1;
            }
            100% {
                transform: translateY(-100vh) scale(0.2);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Create random sparkles
    function createRandomSparkle() {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        
        // Random position
        const posX = Math.random() * window.innerWidth;
        sparkle.style.left = `${posX}px`;
        sparkle.style.bottom = '0';
        
        // Random size
        const size = Math.random() * 4 + 2;
        sparkle.style.width = `${size}px`;
        sparkle.style.height = `${size}px`;
        
        // Random animation duration
        const duration = Math.random() * 10 + 10;
        sparkle.style.animationDuration = `${duration}s`;
        
        // Add to container
        sparklesContainer.appendChild(sparkle);
        
        // Remove after animation
        setTimeout(() => {
            sparkle.remove();
        }, duration * 1000);
    }
    
    // Create sparkles at intervals
    setInterval(createRandomSparkle, 300);
    
    // Create initial set of sparkles
    for (let i = 0; i < 15; i++) {
        setTimeout(createRandomSparkle, i * 200);
    }
}
