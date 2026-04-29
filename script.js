document.addEventListener('DOMContentLoaded', () => {
    // 1. Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 2. Mobile Menu Toggle
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    mobileBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = mobileBtn.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.remove('ph-list');
            icon.classList.add('ph-x');
        } else {
            icon.classList.remove('ph-x');
            icon.classList.add('ph-list');
        }
    });

    // Close menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            mobileBtn.querySelector('i').classList.replace('ph-x', 'ph-list');
        });
    });

    // 3. Scroll Animations (Intersection Observer)
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: Stop observing once visible
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in, .slide-up').forEach(el => {
        observer.observe(el);
    });

    // Active link highlighting on scroll
    const sections = document.querySelectorAll('section');
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });

        document.querySelectorAll('.nav-links a').forEach(a => {
            a.classList.remove('active');
            if (a.getAttribute('href').includes(current)) {
                a.classList.add('active');
            }
        });
    });

    // 4. Contact Form Handling
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('button');
            const originalText = btn.innerHTML;
            
            btn.innerHTML = '<i class="ph ph-spinner ph-spin"></i> Sending...';
            btn.disabled = true;

            // Simulate API call
            setTimeout(() => {
                formStatus.innerHTML = '<span style="color: #28a745;"><i class="ph ph-check-circle"></i> Message sent successfully! I will get back to you soon.</span>';
                contactForm.reset();
                btn.innerHTML = originalText;
                btn.disabled = false;
                
                setTimeout(() => {
                    formStatus.innerHTML = '';
                }, 5000);
            }, 1500);
        });
    }

    // 5. Chatbot Logic
    const chatbotToggle = document.getElementById('chatbot-toggle');
    const chatbotWindow = document.getElementById('chatbot-window');
    const closeChatbot = document.getElementById('close-chatbot');
    const chatInput = document.getElementById('chatbot-input-field');
    const sendBtn = document.getElementById('send-chatbot-msg');
    const chatMessages = document.getElementById('chatbot-messages');

    function toggleChat() {
        chatbotWindow.classList.toggle('active');
        if (chatbotWindow.classList.contains('active')) {
            chatInput.focus();
        }
    }

    chatbotToggle.addEventListener('click', toggleChat);
    closeChatbot.addEventListener('click', toggleChat);

    const botResponses = [
        "That sounds interesting! Please reach out via the contact form so we can discuss it in detail.",
        "I'm an aspiring AI/ML Engineer currently studying Computer Engineering.",
        "My key skills include Java, Python, HTML/CSS, Node.js, and MongoDB.",
        "You can find my projects on my GitHub: github.com/Samruddhi8725",
        "I'm always open to new learning opportunities and collaborations!"
    ];

    function addMessage(text, sender) {
        const msgDiv = document.createElement('div');
        msgDiv.classList.add('message', sender);
        msgDiv.textContent = text;
        chatMessages.appendChild(msgDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function handleChatSubmit() {
        const text = chatInput.value.trim();
        if (text) {
            // User message
            addMessage(text, 'user');
            chatInput.value = '';

            // Simulated typing delay
            setTimeout(() => {
                const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
                
                // Specific keyword matching
                const lowerText = text.toLowerCase();
                let reply = randomResponse;
                
                if (lowerText.includes('resume')) {
                    reply = "You can download my resume from the Resume section above!";
                } else if (lowerText.includes('contact') || lowerText.includes('email')) {
                    reply = "You can email me at achari.samruddhi@gmail.com or use the contact form.";
                } else if (lowerText.includes('hi') || lowerText.includes('hello')) {
                    reply = "Hello there! How can I assist you today?";
                }

                addMessage(reply, 'bot');
            }, 800);
        }
    }

    sendBtn.addEventListener('click', handleChatSubmit);
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleChatSubmit();
        }
    });

    // Trigger initial fade ins
    setTimeout(() => {
        document.querySelector('.hero').classList.add('visible');
    }, 100);
});
