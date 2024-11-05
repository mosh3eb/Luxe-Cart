// Animated Background
function createFloatingElements() {
    const bg = document.getElementById('animatedBg');
    for (let i = 0; i < 50; i++) {
        const span = document.createElement('span');
        span.style.left = Math.random() * 100 + 'vw';
        span.style.animationDelay = Math.random() * 5 + 's';
        span.style.opacity = Math.random();
        bg.appendChild(span);
    }
}
createFloatingElements();

// Initialize Swiper
const heroSwiper = new Swiper('.hero-swiper', {
    loop: true,
    autoplay: {
        delay: 5000,
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true
    }
});

// Live Chat Functionality
const chatToggle = document.getElementById('chatToggle');
const chatWindow = document.getElementById('chatWindow');
const chatClose = document.getElementById('chatClose');
const messageInput = document.getElementById('messageInput');
const chatMessages = document.getElementById('chatMessages');

chatToggle.addEventListener('click', () => {
    chatWindow.style.display = chatWindow.style.display === 'none' ? 'block' : 'none';
});

chatClose.addEventListener('click', () => {
    chatWindow.style.display = 'none';
});

function addMessage(message, isUser = true) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`;
    messageDiv.innerHTML = `
        <div class="max-w-[70%] ${isUser ? 'bg-primary' : 'bg-gray-700'} rounded-lg px-4 py-2">
            ${message}
        </div>
    `;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

messageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && messageInput.value.trim()) {
        addMessage(messageInput.value);
        // Simulate bot response
        setTimeout(() => {
            addMessage('Thank you for your message! Our team will get back to you shortly.', false);
        }, 1000);
        messageInput.value = '';
    }
});

// GSAP Animations
gsap.registerPlugin(ScrollTrigger);

gsap.from('.glass-card', {
    scrollTrigger: {
        trigger: '.glass-card',
        start: 'top bottom',
        end: 'bottom top',
        toggleActions: 'play none none reverse'
    },
    y: 50,
    opacity: 0,
    duration: 1,
    stagger: 0.2
});

// Cart Animation
document.querySelectorAll('.product-card button').forEach(button => {
    button.addEventListener('click', function() {
        this.classList.add('cart-animation');
        setTimeout(() => this.classList.remove('cart-animation'), 500);
    });
});

// Initialize lazy loading
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
});