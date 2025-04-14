
// Mobile menu functionality
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    mobileMenuBtn.addEventListener('click', function() {
      navLinks.classList.toggle('nav-active');
      
      // Animate the hamburger icon
      const spans = this.querySelectorAll('span');
      if (navLinks.classList.contains('nav-active')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
      } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      }
    });
    
    // Close mobile menu when clicking anywhere else
    document.addEventListener('click', function(event) {
      const isClickInsideMenu = navLinks.contains(event.target);
      const isClickOnMenuBtn = mobileMenuBtn.contains(event.target);
      
      if (!isClickInsideMenu && !isClickOnMenuBtn && navLinks.classList.contains('nav-active')) {
        navLinks.classList.remove('nav-active');
        const spans = mobileMenuBtn.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      }
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Close mobile menu if open
        if (navLinks.classList.contains('nav-active')) {
          navLinks.classList.remove('nav-active');
          const spans = mobileMenuBtn.querySelectorAll('span');
          spans[0].style.transform = 'none';
          spans[1].style.opacity = '1';
          spans[2].style.transform = 'none';
        }
        
        // Scroll to the target
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
    
    // Animate elements on scroll
    const animatedElements = document.querySelectorAll('.animated');
    
    // Initial check
    checkIfInView();
    
    // Check if elements are in viewport on scroll
    window.addEventListener('scroll', checkIfInView);
    
    function checkIfInView() {
      const windowHeight = window.innerHeight;
      const windowTopPosition = window.scrollY;
      const windowBottomPosition = windowTopPosition + windowHeight;
      
      animatedElements.forEach(element => {
        const elementHeight = element.offsetHeight;
        const elementTopPosition = element.offsetTop;
        const elementBottomPosition = elementTopPosition + elementHeight;
        
        // Check if element is in viewport
        if (
          elementBottomPosition >= windowTopPosition && 
          elementTopPosition <= windowBottomPosition
        ) {
          element.classList.add('in-view');
        }
      });
    }
    
    // Active link highlighting
    const sections = document.querySelectorAll('section');
    const navLinksItems = document.querySelectorAll('.nav-links a');
    
    window.addEventListener('scroll', () => {
      let current = '';
      
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - sectionHeight / 3)) {
          current = section.getAttribute('id');
        }
      });
      
      navLinksItems.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
          link.classList.add('active');
        }
      });
    });
  });
  
  // Interactive particles/dots effect
  document.addEventListener('DOMContentLoaded', function() {
    const hero = document.querySelector('.hero');
    
    function createParticles() {
      if (!hero) return;
      
      for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Random position, size, and animation delay
        const size = Math.random() * 5 + 3;
        const left = Math.random() * 100;
        const top = Math.random() * 100;
        const delay = Math.random() * 5;
        const duration = Math.random() * 10 + 10;
        
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${left}%`;
        particle.style.top = `${top}%`;
        particle.style.animationDelay = `${delay}s`;
        particle.style.animationDuration = `${duration}s`;
        
        hero.appendChild(particle);
      }
    }
    
    // Only create particles on larger screens
    if (window.innerWidth > 768) {
      createParticles();
    }
  });
  
  // Add styles for particles
  document.addEventListener('DOMContentLoaded', function() {
    const style = document.createElement('style');
    style.textContent = `
      .particle {
        position: absolute;
        background-color: rgba(155, 135, 245, 0.3);
        border-radius: 50%;
        z-index: 1;
        pointer-events: none;
        animation: particleFloat infinite ease-in-out;
      }
      
      @keyframes particleFloat {
        0%, 100% {
          transform: translateY(0) translateX(0);
          opacity: 0.5;
        }
        25% {
          transform: translateY(-20px) translateX(10px);
          opacity: 0.8;
        }
        50% {
          transform: translateY(-10px) translateX(20px);
          opacity: 0.6;
        }
        75% {
          transform: translateY(10px) translateX(-10px);
          opacity: 0.7;
        }
      }
    `;
    document.head.appendChild(style);
  });
  
  // Add hover effect for search buttons
  const searchBtns = document.querySelectorAll('#dashboard-search-btn, #search-btn');
  searchBtns.forEach(btn => {
    btn.addEventListener('mouseenter', function() {
      this.style.transform = 'scale(1.05)';
      this.style.transition = 'all 0.2s ease-in-out';
    });
    
    btn.addEventListener('mouseleave', function() {
      this.style.transform = 'scale(1)';
    });
  });
  