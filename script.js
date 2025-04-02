// ======================
// MOBILE MENU TOGGLE
// ======================
const burgerMenu = document.getElementById('burger-menu');
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.navbar a');

// Toggle menu function
function toggleMenu() {
    burgerMenu.classList.toggle('active');
    navbar.classList.toggle('active');
    
    // Toggle body scroll when menu is open
    document.body.classList.toggle('no-scroll', navbar.classList.contains('active'));
    
    // Animate burger icon
    if (navbar.classList.contains('active')) {
        burgerMenu.setAttribute('aria-expanded', 'true');
    } else {
        burgerMenu.setAttribute('aria-expanded', 'false');
    }
}

// Initialize menu state
burgerMenu.setAttribute('aria-expanded', 'false');

// Event listeners
burgerMenu.addEventListener('click', toggleMenu);

// Close menu when clicking on a link
navLinks.forEach(navLink => {
    navLink.addEventListener('click', () => {
        if (navbar.classList.contains('active')) {
            toggleMenu();
        }
        
        // Add active state to clicked link
        navLinks.forEach(link => link.classList.remove('active'));
        navLink.classList.add('active');
    });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (navbar.classList.contains('active') && 
        !e.target.closest('.navbar') && 
        !e.target.closest('#burger-menu')) {
        toggleMenu();
    }
});

// Close menu on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navbar.classList.contains('active')) {
        toggleMenu();
    }
});

// ======================
// TYPING ANIMATION
// ======================
const typed = new Typed('.animated-text', {
    strings: ['Fullstack Developer', 'Web Designer', 'Graphic Designer', 'ICT Consultant'],
    typeSpeed: 100,
    backSpeed: 60,
    loop: true,
    cursorChar: '|',
    smartBackspace: true
});

// ======================
// STICKY HEADER
// ======================
const header = document.querySelector('.header');
const headerHeight = header.offsetHeight;

window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    
    // Sticky header
    header.classList.toggle('sticky', scrollPosition > 0);
    
    // Add shadow when scrolled
    header.classList.toggle('shadow', scrollPosition > 10);
    
    // Shrink header when scrolled down
    if (scrollPosition > 100) {
        header.style.padding = '1rem 9%';
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.style.padding = '2rem 9%';
        header.style.backdropFilter = 'none';
    }
});

// ======================
// SCROLL REVEAL ANIMATION
// ======================
AOS.init({
    duration: 800,
    easing: 'ease-in-out-quart',
    once: true,
    mirror: false,
    offset: 120
});

// ======================
// ACTIVE SECTION HIGHLIGHT
// ======================
const sections = document.querySelectorAll('section');

function updateActiveNav() {
    let current = '';
    const scrollPosition = window.scrollY + headerHeight + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// Initial call
updateActiveNav();

// Update on scroll
window.addEventListener('scroll', updateActiveNav);

// ======================
// CURRENT YEAR IN FOOTER
// ======================
document.getElementById('year').textContent = new Date().getFullYear();

// ======================
// SMOOTH SCROLLING
// ======================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const targetPosition = targetElement.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // Update URL without jumping
            if (history.pushState) {
                history.pushState(null, null, targetId);
            } else {
                location.hash = targetId;
            }
        }
    });
});

// ======================
// FORM SUBMISSION
// ======================
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Get form values
        const formData = new FormData(this);
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.textContent;
        
        try {
            // Show loading state
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="bx bx-loader-alt bx-spin"></i> Sending...';
            
            // Simulate API call (replace with actual fetch)
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // Show success message
            const successMessage = document.createElement('div');
            successMessage.className = 'form-success';
            successMessage.innerHTML = `
                <i class="bx bx-check-circle"></i>
                <p>Thank you for your message! I will get back to you soon.</p>
            `;
            contactForm.parentNode.insertBefore(successMessage, contactForm.nextSibling);
            
            // Reset form
            this.reset();
            
            // Remove success message after 5 seconds
            setTimeout(() => {
                successMessage.style.opacity = '0';
                setTimeout(() => successMessage.remove(), 300);
            }, 5000);
            
        } catch (error) {
            console.error('Form submission error:', error);
            alert('There was an error sending your message. Please try again.');
        } finally {
            // Reset button state
            submitBtn.disabled = false;
            submitBtn.textContent = originalBtnText;
        }
    });
}

// ======================
// SKILL BARS ANIMATION
// ======================
const skillBars = document.querySelectorAll('.skill-level');
const skillsSection = document.querySelector('.skills');

function animateSkillBars() {
    skillBars.forEach(bar => {
        const width = bar.getAttribute('data-width') || bar.style.width;
        bar.style.width = '0';
        bar.setAttribute('data-width', width);
        
        setTimeout(() => {
            bar.style.width = width;
        }, 100);
    });
}

// Intersection Observer for skills section
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateSkillBars();
            observer.unobserve(entry.target);
        }
    });
}, { 
    threshold: 0.5,
    rootMargin: '0px 0px -100px 0px'
});

if (skillsSection) {
    observer.observe(skillsSection);
}

// ======================
// ADDITIONAL ENHANCEMENTS
// ======================

// Lazy loading for images
document.querySelectorAll('img[data-src]').forEach(img => {
    img.src = img.getAttribute('data-src');
    img.onload = () => img.removeAttribute('data-src');
});

// Preloader (optional)
window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        preloader.style.opacity = '0';
        setTimeout(() => preloader.remove(), 500);
    }
});

// Dark mode toggle (optional)
const darkModeToggle = document.getElementById('dark-mode-toggle');
if (darkModeToggle) {
    darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
    });
    
    // Check for saved preference
    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
    }
}

// Tooltips for social icons
const socialIcons = document.querySelectorAll('.social-media a, .social-links a');
socialIcons.forEach(icon => {
    const platform = icon.getAttribute('aria-label') || 
                    icon.querySelector('i').className.split(' ')[1].replace('bxl-', '');
    
    icon.setAttribute('aria-label', platform);
    icon.setAttribute('data-tooltip', platform);
});
// Add to script.js
class Chatbot {
    constructor() {
      this.widget = document.querySelector('.chatbot-widget');
      this.messagesContainer = document.querySelector('.chatbot-messages');
      this.input = document.querySelector('.chatbot-input input');
      this.toggleBtn = document.querySelector('.chatbot-toggle');
      this.closeBtn = document.querySelector('.close-chatbot');
      this.sendBtn = document.querySelector('.send-btn');
      
      this.init();
    }
  
    init() {
      this.toggleBtn.addEventListener('click', () => this.toggleWidget());
      this.closeBtn.addEventListener('click', () => this.closeWidget());
      this.sendBtn.addEventListener('click', () => this.sendMessage());
      this.input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') this.sendMessage();
      });
      
      this.addMessage('bot', 'Hello! I can answer questions about my skills, projects, and experience. What would you like to know?');
    }
  
    toggleWidget() {
      this.widget.classList.toggle('active');
      this.toggleBtn.classList.toggle('active');
      if (this.widget.classList.contains('active')) {
        this.input.focus();
      }
    }
  
    closeWidget() {
      this.widget.classList.remove('active');
      this.toggleBtn.classList.remove('active');
    }
  
    sendMessage() {
      const message = this.input.value.trim();
      if (!message) return;
      
      this.addMessage('user', message);
      this.input.value = '';
      
      // Simulate typing indicator
      const typing = this.addMessage('bot', '...', true);
      
      // Simulate API response delay
      setTimeout(() => {
        this.messagesContainer.removeChild(typing);
        this.processMessage(message);
      }, 1000);
    }
  
    processMessage(message) {
        message = message.toLowerCase().trim();
        let response = "I'm not sure I understand. Try asking about:\n- My skills (web dev, design, etc.)\n- Projects\n- Experience\n- Contact info";
        
        // Web Development
        if (message.includes('web dev') || message.includes('website') || 
            message.includes('frontend') || message.includes('backend') ||
            message.includes('fullstack') || message.includes('full stack')) {
          response = `I specialize in fullstack web development with:\n\n` +
                     `• Frontend: React, Vue, HTML/CSS, JavaScript/TypeScript\n` +
                     `• Backend: Node.js, Python (Django/Flask), PHP\n` +
                     `• Databases: MongoDB, MySQL, PostgreSQL\n` +
                     `• DevOps: Docker, AWS, CI/CD pipelines\n\n` +
                     `I build responsive, SEO-friendly websites and web applications.`;
        
        // Graphic Design
        } else if (message.includes('design') || message.includes('logo') || 
                   message.includes('photoshop') || message.includes('illustrator') ||
                   message.includes('poster') || message.includes('graphic')) {
          response = `My design capabilities include:\n\n` +
                     `• Logo Design: Unique brand identities\n` +
                     `• Photo Editing: Professional retouching\n` +
                     `• Print Design: Posters, flyers, brochures\n` +
                     `• UI/UX: Wireframing and prototyping\n\n` +
                     `Tools: Adobe Photoshop, Illustrator, Figma, Canva`;
        
        // ICT Consultancy
        } else if (message.includes('ict') || message.includes('consult') || 
                   message.includes('technology advice') || message.includes('tech solutions')) {
          response = `As an ICT consultant, I offer:\n\n` +
                     `• Technology stack recommendations\n` +
                     `• System architecture design\n` +
                     `• Digital transformation strategies\n` +
                     `• Cost optimization analysis\n\n` +
                     `I help businesses leverage technology effectively.`;
        
        // Specific Technologies
        } else if (message.includes('react') || message.includes('vue') || 
                   message.includes('angular')) {
          response = `I have extensive experience with ${message.includes('react') ? 'React' : 
                      message.includes('vue') ? 'Vue' : 'Angular'}:\n\n` +
                      `• State management (Redux/Vuex)\n` +
                      `• Component libraries\n` +
                      `• Performance optimization\n` +
                      `• SSR/SSG implementations`;
        
        // Backend Technologies
        } else if (message.includes('node') || message.includes('python') || 
                   message.includes('php') || message.includes('database')) {
          response = `Backend expertise includes:\n\n` +
                     `• Node.js: Express, NestJS frameworks\n` +
                     `• Python: Django, Flask, data analysis\n` +
                     `• PHP: Laravel, WordPress development\n` +
                     `• Databases: SQL & NoSQL solutions`;
        
        // Projects
        } else if (message.includes('project') || message.includes('work') || 
                   message.includes('portfolio')) {
          response = `Recent notable projects:\n\n` +
                     `1. E-commerce Platform (MERN stack)\n` +
                     `2. Hotel Management System (PHP/MySQL)\n` +
                     `3. Smart Agriculture IoT Solution\n` +
                     `4. KeFarm Marketplace\n\n` +
                     `Would you like details on any specific project?`;
        
        // Experience
        } else if (message.includes('experience') || message.includes('job') || 
                   message.includes('background')) {
          response = `My professional background:\n\n` +
                     `• 4+ years web development\n` +
                     `• 3+ years graphic design\n` +
                     `• Worked with startups and enterprises\n` +
                     `• Managed teams of 5+ developers\n\n` +
                     `I bring both technical and leadership experience.`;
        
        // Contact
        } else if (message.includes('contact') || message.includes('email') || 
                   message.includes('hire') || message.includes('reach')) {
          response = `You can contact me through:\n\n` +
                     `• Email: gideon@example.com\n` +
                     `• Phone: +254 790 729 721\n` +
                     `• LinkedIn: linkedin.com/in/gideonbett\n\n` +
                     `I typically respond within 24 hours.`;
        
        // Greetings
        } else if (message.includes('hi') || message.includes('hello') || 
                   message.includes('hey')) {
          response = `Hello there! 👋 I'm Gideon's virtual assistant. ` +
                     `How can I help you today? You can ask about my skills, projects, or experience.`;
        
        // Help
        } else if (message.includes('help') || message.includes('what can you do')) {
          response = `I can tell you about:\n\n` +
                     `• My web development skills\n` +
                     `• Graphic design capabilities\n` +
                     `• ICT consultancy services\n` +
                     `• Past projects and experience\n` +
                     `• How to contact Gideon\n\n` +
                     `Try asking something like "What backend technologies do you use?"`;
        }
      
        // Add slight delay for more natural conversation flow
        setTimeout(() => {
          this.addMessage('bot', response);
          scrollToBottom();
        }, 800);
      }
  
    addMessage(sender, text, isTyping = false) {
      const message = document.createElement('div');
      message.className = `chat-message ${sender} ${isTyping ? 'typing' : ''}`;
      message.innerHTML = `<div class="message-content">${text}</div>`;
      this.messagesContainer.appendChild(message);
      this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
      return message;
    }
  }
  
  // Initialize
  new Chatbot();
  // Add this to your existing chatbot script
// Smooth scrolling to bottom when new messages arrive
function scrollToBottom() {
    const messages = document.querySelector('.chatbot-messages');
    messages.scrollTo({
      top: messages.scrollHeight,
      behavior: 'smooth'
    });
  }
  
  // Add this inside your sendMessage function after adding a new message
  scrollToBottom();
  
  // Add typing indicator animation
  function showTypingIndicator() {
    const typing = document.createElement('div');
    typing.className = 'chat-message bot typing';
    typing.innerHTML = '<div class="message-content"></div>';
    document.querySelector('.chatbot-messages').appendChild(typing);
    scrollToBottom();
    return typing;
  }
  
  // Example usage in your processMessage function:
  const typing = showTypingIndicator();
  setTimeout(() => {
    typing.remove();
    const response = this.generateResponse(message);
    this.addMessage('bot', response);
    scrollToBottom();
  }, 1500);