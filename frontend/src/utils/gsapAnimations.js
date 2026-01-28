// Simple animation utilities using CSS classes and basic JavaScript
// No external dependencies required - works with pure CSS and JS

// Animation utility functions
export const animateElement = (element, animationType, delay = 0) => {
  if (!element) return;
  
  // Remove any existing animation classes
  element.classList.remove('animate-fadeInUp', 'animate-fadeInLeft', 'animate-fadeInRight', 'animate-scaleIn');
  
  // Add the animation class after delay
  setTimeout(() => {
    element.classList.add(`animate-${animationType}`);
    element.style.opacity = '1';
  }, delay * 1000);
};

export const animateWithScrollTrigger = (element, animationType, triggerOptions = {}) => {
  if (!element) return;
  
  // Use Intersection Observer for scroll-triggered animations
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateElement(element, animationType, triggerOptions.delay || 0);
        observer.unobserve(element);
      }
    });
  }, { 
    threshold: 0.1,
    rootMargin: '0px 0px -20% 0px'
  });
  
  observer.observe(element);
};

export const animateStagger = (elements, animationType, triggerElement = null) => {
  if (!elements || elements.length === 0) return;
  
  const elementsArray = Array.from(elements);
  
  if (triggerElement) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          elementsArray.forEach((element, index) => {
            animateElement(element, animationType, index * 0.1);
          });
          observer.unobserve(triggerElement);
        }
      });
    }, { threshold: 0.1 });
    
    observer.observe(triggerElement);
  } else {
    elementsArray.forEach((element, index) => {
      animateElement(element, animationType, index * 0.1);
    });
  }
};

// Hero slider animations
export const heroSlideIn = (element) => {
  if (!element) return;
  element.style.opacity = '0';
  element.style.transform = 'scale(1.1)';
  element.style.transition = 'opacity 1s ease-out, transform 1s ease-out';
  
  requestAnimationFrame(() => {
    element.style.opacity = '1';
    element.style.transform = 'scale(1)';
  });
};

export const heroSlideOut = (element) => {
  if (!element) return;
  element.style.transition = 'opacity 0.5s ease-in';
  element.style.opacity = '0';
};

// Content card hover animations
export const cardHoverIn = (element) => {
  if (!element) return;
  element.style.transition = 'transform 0.3s ease-out';
  element.style.transform = 'scale(1.05) translateY(-10px)';
};

export const cardHoverOut = (element) => {
  if (!element) return;
  element.style.transition = 'transform 0.3s ease-out';
  element.style.transform = 'scale(1) translateY(0)';
};

// Navbar animations
export const navbarSlideDown = (element) => {
  if (!element) return;
  element.style.transform = 'translateY(-100px)';
  element.style.opacity = '0';
  element.style.transition = 'transform 0.6s ease-out, opacity 0.6s ease-out';
  
  requestAnimationFrame(() => {
    element.style.transform = 'translateY(0)';
    element.style.opacity = '1';
  });
};

// Modal animations
export const modalFadeIn = (backdrop, modal) => {
  if (!backdrop || !modal) return null;
  
  backdrop.style.opacity = '0';
  backdrop.style.transition = 'opacity 0.3s ease-out';
  
  modal.style.opacity = '0';
  modal.style.transform = 'scale(0.8) translateY(50px)';
  modal.style.transition = 'opacity 0.4s ease-out, transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)';
  
  requestAnimationFrame(() => {
    backdrop.style.opacity = '1';
    setTimeout(() => {
      modal.style.opacity = '1';
      modal.style.transform = 'scale(1) translateY(0)';
    }, 100);
  });
  
  return { backdrop, modal };
};

export const modalFadeOut = (backdrop, modal) => {
  if (!backdrop || !modal) return null;
  
  modal.style.transition = 'opacity 0.3s ease-in, transform 0.3s ease-in';
  modal.style.opacity = '0';
  modal.style.transform = 'scale(0.8) translateY(50px)';
  
  setTimeout(() => {
    backdrop.style.transition = 'opacity 0.2s ease-in';
    backdrop.style.opacity = '0';
  }, 100);
  
  return { backdrop, modal };
};

// Loading animations
export const spinnerRotate = (element) => {
  if (!element) return;
  element.style.animation = 'spin 1s linear infinite';
};

// Text animations
export const typewriterEffect = (element, text, speed = 50) => {
  if (!element) return;
  element.textContent = '';
  const chars = text.split('');
  let index = 0;
  
  const typeInterval = setInterval(() => {
    if (index < chars.length) {
      element.textContent += chars[index];
      index++;
    } else {
      clearInterval(typeInterval);
    }
  }, speed);
};

// Cleanup function
export const killAllAnimations = () => {
  // Remove all animation classes from elements
  const animatedElements = document.querySelectorAll('[class*="animate-"]');
  animatedElements.forEach(element => {
    element.classList.remove('animate-fadeInUp', 'animate-fadeInLeft', 'animate-fadeInRight', 'animate-scaleIn');
  });
};

// Animation configurations (for reference)
export const animations = {
  fadeInUp: 'fadeInUp',
  fadeInLeft: 'fadeInLeft', 
  fadeInRight: 'fadeInRight',
  scaleIn: 'scaleIn',
  staggerFadeIn: 'fadeInUp'
};