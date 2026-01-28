// Simple smooth scroll utility using native browser APIs
// No external dependencies required

let isScrolling = false;

export const initSmoothScroll = () => {
  // Enable native smooth scrolling
  document.documentElement.style.scrollBehavior = 'smooth';
  
  // Add momentum scrolling for iOS
  document.body.style.webkitOverflowScrolling = 'touch';
  
  // Custom smooth scroll for better control
  const smoothScrollTo = (target, duration = 1000) => {
    const targetPosition = typeof target === 'number' ? target : target.offsetTop;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;

    const animation = (currentTime) => {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const run = ease(timeElapsed, startPosition, distance, duration);
      window.scrollTo(0, run);
      if (timeElapsed < duration) requestAnimationFrame(animation);
    };

    // Easing function
    const ease = (t, b, c, d) => {
      t /= d / 2;
      if (t < 1) return c / 2 * t * t + b;
      t--;
      return -c / 2 * (t * (t - 2) - 1) + b;
    };

    requestAnimationFrame(animation);
  };

  // Override default scroll behavior for links
  document.addEventListener('click', (e) => {
    const target = e.target.closest('a[href^="#"]');
    if (target) {
      e.preventDefault();
      const targetElement = document.querySelector(target.getAttribute('href'));
      if (targetElement) {
        smoothScrollTo(targetElement);
      }
    }
  });

  return {
    scrollTo: smoothScrollTo,
    destroy: () => {
      document.documentElement.style.scrollBehavior = 'auto';
      document.body.style.webkitOverflowScrolling = 'auto';
    }
  };
};

export const destroySmoothScroll = () => {
  document.documentElement.style.scrollBehavior = 'auto';
  document.body.style.webkitOverflowScrolling = 'auto';
};

export const scrollTo = (target, options = {}) => {
  const element = typeof target === 'string' ? document.querySelector(target) : target;
  
  if (typeof target === 'number') {
    // Scroll to position
    window.scrollTo({
      top: target,
      behavior: 'smooth',
      ...options
    });
  } else if (element && element.scrollIntoView) {
    // Scroll to element
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      ...options
    });
  }
};

export const scrollToTop = () => {
  scrollTo(0);
};

export const getLenis = () => null; // Compatibility function