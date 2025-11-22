// Confetti Animation
const canvas = document.getElementById('confetti-canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const confetti = [];
const confettiCount = 2;
const gravity = 0.2;
const terminalVelocity = 3;
const drag = 0.1;

const colors = [
    { front: '#FFB6C1', back: '#FFC0CB' },
    { front: '#E6E6FA', back: '#DDA0DD' },
    { front: '#F0E6FF', back: '#E6E6FA' },
    { front: '#FFDAB9', back: '#FFE4E1' },
    { front: '#E91E63', back: '#D81B60' },
    { front: '#BA68C8', back: '#9C27B0' }
];

class Confetti {
    constructor() {
        this.randomModifier = Math.random() * 3;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height - canvas.height;
        this.w = Math.random() * 6 + 4;
        this.h = Math.random() * 6 + 4;
        this.vy = Math.random() * 2 + 1;
        this.vx = (Math.random() - 0.5) * 2;
        this.rotation = Math.random() * 360;
        this.rotationSpeed = (Math.random() - 0.5) * 10;
    }

    update() {
        this.vy += gravity;
        this.vy = Math.min(this.vy, terminalVelocity);
        this.vy *= (1 - drag);
        this.vx *= (1 - drag);
        this.x += this.vx;
        this.y += this.vy;
        this.rotation += this.rotationSpeed;

        if (this.y > canvas.height) {
            this.y = -this.h;
            this.x = Math.random() * canvas.width;
        }
        if (this.x > canvas.width) {
            this.x = -this.w;
        } else if (this.x < -this.w) {
            this.x = canvas.width;
        }
    }

    draw() {
        ctx.save();
        ctx.translate(this.x + this.w / 2, this.y + this.h / 2);
        ctx.rotate((this.rotation * Math.PI) / 180);
        ctx.fillStyle = this.color.front;
        ctx.fillRect(-this.w / 2, -this.h / 2, this.w, this.h);
        ctx.restore();
    }
}

// Initialize confetti
for (let i = 0; i < confettiCount; i++) {
    confetti.push(new Confetti());
}

function animateConfetti() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    confetti.forEach(c => {
        c.update();
        c.draw();
    });
    requestAnimationFrame(animateConfetti);
}

animateConfetti();

// Resize handler
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }, 250);
});

// Smooth scroll on button click
const exploreBtn = document.getElementById('explore-btn');
if (exploreBtn) {
    exploreBtn.addEventListener('click', () => {
        const messageSection = document.getElementById('message-section');
        if (messageSection) {
            messageSection.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        }
        
        // Trigger confetti burst
        triggerConfettiBurst();
    });
}

// Confetti burst function
function triggerConfettiBurst() {
    for (let i = 0; i < 1; i++) {
        const c = new Confetti();
        c.y = window.innerHeight / 2;
        c.x = Math.random() * window.innerWidth;
        c.vy = (Math.random() - 0.5) * 6;
        c.vx = (Math.random() - 0.5) * 4;
        confetti.push(c);
    }
}

// Candle blow out functionality with modern messages
const candle = document.getElementById('candle');
const flame = document.getElementById('flame');
const smoke = document.getElementById('smoke');
const blowBtn = document.getElementById('blow-btn');
const wishMessage = document.getElementById('wish-message');

let candleBlown = false;

// Array of beautiful messages for the sister
const wishMessages = [
    '✨ All your wishes will come true! ✨',
    '💖 May every dream of yours become reality! 💖',
    '🌟 Your dreams are worth more than gold! 🌟',
    '🎁 The universe conspires to make you happy! 🎁',
    '💫 Everything beautiful is coming your way! 💫',
    '🌈 Your happiness is written in the stars! 🌈',
    '💝 You deserve all the joy in the world! 💝',
    '✨ Your future is as bright as you are! ✨'
];

if (blowBtn && candle && wishMessage) {
    blowBtn.addEventListener('click', () => {
        if (!candleBlown) {
            // Enhanced button animation
            blowBtn.style.transform = 'scale(0.95)';
            blowBtn.style.boxShadow = '0 4px 15px rgba(233, 30, 99, 0.6)';
            
            setTimeout(() => {
                blowBtn.style.transform = 'scale(1.05)';
                blowBtn.style.boxShadow = '0 15px 35px rgba(233, 30, 99, 0.7)';
                
                setTimeout(() => {
                    blowBtn.style.transform = 'scale(1)';
                    blowBtn.style.transition = 'all 0.3s ease';
                }, 200);
            }, 150);
            
            // Blow out animation
            candle.classList.add('blown');
            if (smoke) {
                smoke.style.display = 'block';
            }
            
            setTimeout(() => {
                if (flame) flame.style.display = 'none';
                
                // Select a random beautiful message
                const randomMessage = wishMessages[Math.floor(Math.random() * wishMessages.length)];
                
                // Create and show the wish message with modern styling
                wishMessage.textContent = randomMessage;
                wishMessage.classList.add('show');
                
                // Trigger confetti burst
                triggerConfettiBurst();
                
                candleBlown = true;
                blowBtn.textContent = 'Make Another Wish! 🎂';
                
                // Change button style with smooth transition
                blowBtn.style.transition = 'all 0.5s ease';
                blowBtn.style.background = 'linear-gradient(45deg, #6bcf7f, #4ecdc4)';
                
                setTimeout(() => {
                    if (smoke) smoke.style.display = 'none';
                }, 1000);
            }, 500);
        } else {
            // Reset candle for another wish
            candle.classList.remove('blown');
            if (flame) flame.style.display = 'block';
            if (smoke) smoke.style.display = 'block';
            wishMessage.classList.remove('show');
            wishMessage.textContent = '';
            
            // Fade out current message
            wishMessage.classList.remove('show');
            
            setTimeout(() => {
                wishMessage.textContent = '';
                candleBlown = false;
                blowBtn.textContent = 'Blow Out the Candle! 🎂';
                blowBtn.style.background = 'linear-gradient(45deg, #E91E63, #9C27B0)';
            }, 400);
        }
    });
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animationPlayState = 'running';
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Add parallax effect to balloons
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const balloons = document.querySelectorAll('.balloon');
    balloons.forEach((balloon, index) => {
        const speed = 0.5 + (index * 0.1);
        balloon.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Add click effect to memory cards
document.querySelectorAll('.memory-card').forEach(card => {
    card.addEventListener('click', () => {
        card.style.transform = 'scale(0.95)';
        setTimeout(() => {
            card.style.transform = '';
        }, 200);
    });
});

// Removed automatic confetti on page load and keyboard shortcuts to minimize celebrations

// Reason Reveal Button Functionality
const reasonBtn = document.getElementById('reason-btn');
const reasonCards = document.querySelectorAll('.reason-card');

if (reasonBtn && reasonCards.length > 0) {
    let revealed = false;
    
    reasonBtn.addEventListener('click', () => {
        if (!revealed) {
            // Reveal all cards
            reasonCards.forEach((card, index) => {
                card.classList.remove('hidden');
                setTimeout(() => {
                    card.classList.add('revealed');
                }, index * 150);
            });
            
            reasonBtn.textContent = '✨ Hide Reasons ✨';
            reasonBtn.style.background = 'linear-gradient(45deg, #6bcf7f, #4ecdc4)';
            revealed = true;
        } else {
            // Hide all cards
            reasonCards.forEach((card, index) => {
                card.classList.remove('revealed');
                setTimeout(() => {
                    card.classList.add('hidden');
                }, index * 100);
            });
            
            reasonBtn.textContent = 'Click to Reveal Reasons! 🎁';
            reasonBtn.style.background = 'linear-gradient(45deg, #667eea, #764ba2)';
            revealed = false;
        }
    });
}

// Timeline Animation on Scroll
const timelineItems = document.querySelectorAll('.timeline-item');
const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && entry.target.style.opacity !== '1') {
            entry.target.style.opacity = '1';
            timelineObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.3
});

timelineItems.forEach(item => {
    timelineObserver.observe(item);
});

// Add click interaction to timeline items
timelineItems.forEach(item => {
    item.addEventListener('click', () => {
        item.style.transform = 'scale(1.05)';
        setTimeout(() => {
            item.style.transform = '';
        }, 300);
    });
});

// Add click interaction to reason cards
reasonCards.forEach(card => {
    card.addEventListener('click', () => {
        card.style.transform = 'scale(0.98)';
        setTimeout(() => {
            card.style.transform = '';
        }, 200);
    });
});

// Music Control
document.addEventListener('DOMContentLoaded', () => {
    const musicBtn = document.getElementById('music-btn');
    const backgroundMusic = document.getElementById('background-music');
    let isMusicPlaying = false;
    
    if (!musicBtn || !backgroundMusic) return;
    
    // Initialize icon state
    const musicIcon = musicBtn.querySelector('.music-icon');
    if (!musicIcon) return;
    
    // Set initial muted state
    musicBtn.classList.add('muted');
    
    // Try to play music on first user interaction (required by browsers)
    const playMusicOnInteraction = (e) => {
        // Don't trigger if clicking the music button itself
        if (e.target === musicBtn || musicBtn.contains(e.target)) {
            return;
        }
        
        if (!isMusicPlaying && backgroundMusic.paused) {
            backgroundMusic.play().then(() => {
                isMusicPlaying = true;
                musicBtn.classList.remove('muted');
                musicIcon.textContent = '🎵';
            }).catch(err => {
                console.log('Music autoplay prevented:', err);
            });
        }
    };
    
    // Play music on first user interaction (excluding music button)
    document.addEventListener('click', playMusicOnInteraction, { once: true });
    document.addEventListener('touchstart', playMusicOnInteraction, { once: true });
    
    // Music button click handler
    musicBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        
        if (isMusicPlaying && !backgroundMusic.paused) {
            // Pause music
            backgroundMusic.pause();
            isMusicPlaying = false;
            musicBtn.classList.add('muted');
            musicIcon.textContent = '🔇';
        } else {
            // Play music
            backgroundMusic.play().then(() => {
                isMusicPlaying = true;
                musicBtn.classList.remove('muted');
                musicIcon.textContent = '🎵';
            }).catch(err => {
                console.log('Error playing music:', err);
                musicBtn.classList.add('muted');
                musicIcon.textContent = '🔇';
            });
        }
    });
    
    // Handle audio errors
    backgroundMusic.addEventListener('error', () => {
        musicBtn.classList.add('muted');
        musicIcon.textContent = '🔇';
    });
    
    // Update state when audio ends or is paused externally
    backgroundMusic.addEventListener('pause', () => {
        if (backgroundMusic.paused) {
            isMusicPlaying = false;
            musicBtn.classList.add('muted');
            musicIcon.textContent = '🔇';
        }
    });
    
    backgroundMusic.addEventListener('play', () => {
        isMusicPlaying = true;
        musicBtn.classList.remove('muted');
        musicIcon.textContent = '🎵';
    });
});

// Opening Section Animation
document.addEventListener('DOMContentLoaded', () => {
    const openingImage = document.querySelector('.opening-image');
    if (openingImage) {
        openingImage.style.opacity = '0';
        openingImage.style.transform = 'scale(0.8)';
        setTimeout(() => {
            openingImage.style.transition = 'all 0.6s ease';
            openingImage.style.opacity = '1';
            openingImage.style.transform = 'scale(1)';
        }, 300);
    }
    
    // Load Gallery
    loadGallery();
});

// Gallery Data
const galleryItems = [
    {
        image: "images/sanika5.jpg",
        caption: "Looks innocent, isn’t 😄"
    },
    {
        image: "images/sanika2.jpg",
        caption: "Pretty with a pinch of attitude 😌✨"
    },
    {
        image: "images/sanika3.jpg",
        caption: "She bullies, I smile 😭😂"
    },
    {
        image: "images/sanika11.jpg",
        caption: "Thank you God for Sister like her!!😭💖"
    },
    {
        image: "images/sanika13.jpg",
        caption: "Certified drama queen."
    },
    {
        image: "images/sanika6.jpg",
        caption: "Partners in stupidity 😎🤣"
    }
];

// Load Gallery Function
function loadGallery() {
    const galleryContainer = document.getElementById('galleryContainer');
    if (!galleryContainer) return;
    
    galleryContainer.innerHTML = '';
    
    galleryItems.forEach((item, index) => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        galleryItem.style.setProperty('--order', index);
        galleryItem.innerHTML = `
            <img src="${item.image}" alt="${item.caption}" loading="lazy" onerror="this.style.display='none';">
            <div class="overlay">
                <div class="overlay-caption">${item.caption}</div>
            </div>
        `;
        
        // Add click event to toggle caption
        galleryItem.addEventListener('click', () => {
            // Close other items
            document.querySelectorAll('.gallery-item').forEach(otherItem => {
                if (otherItem !== galleryItem) {
                    otherItem.classList.remove('active');
                }
            });
            // Toggle current item
            galleryItem.classList.toggle('active');
        });
        
        galleryContainer.appendChild(galleryItem);
    });
}


