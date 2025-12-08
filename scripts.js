(() => {
  const THEME_KEY = 'theme';
  let langMenuBound = false;

  function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(THEME_KEY, theme);
  }

  function applySavedTheme() {
    const savedTheme = localStorage.getItem(THEME_KEY) || 'light';
    setTheme(savedTheme);
  }

  function toggleDarkMode() {
    const currentTheme = localStorage.getItem(THEME_KEY) || 'light';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
  }

  function bindDarkToggle() {
    const toggle = document.getElementById('dark-toggle');
    if (!toggle || toggle.dataset.bound === 'true') return;
    toggle.addEventListener('click', toggleDarkMode);
    toggle.dataset.bound = 'true';
  }

  function bindLanguageMenu() {
    const toggle = document.getElementById('lang-toggle');
    const menu = document.getElementById('lang-menu');
    if (!toggle || !menu || langMenuBound) return;

    toggle.addEventListener('click', (event) => {
      event.stopPropagation();
      const isOpen = menu.classList.toggle('show');
      toggle.setAttribute('aria-expanded', isOpen);
    });

    document.addEventListener('click', (event) => {
      if (!menu.contains(event.target) && event.target !== toggle) {
        menu.classList.remove('show');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });

    langMenuBound = true;
  }

  function initLoginModals() {
    const loginBtn = document.getElementById('loginBtn');
    const registerBtn = document.getElementById('registerBtn');
    const loginModal = document.getElementById('loginModal');
    const registerModal = document.getElementById('registerModal');
    const closeLogin = document.getElementById('closeLogin');
    const closeRegister = document.getElementById('closeRegister');

    if (loginBtn && loginModal) {
      loginBtn.addEventListener('click', () => loginModal.classList.remove('hidden'));
    }
    if (registerBtn && registerModal) {
      registerBtn.addEventListener('click', () => registerModal.classList.remove('hidden'));
    }
    closeLogin?.addEventListener('click', () => loginModal?.classList.add('hidden'));
    closeRegister?.addEventListener('click', () => registerModal?.classList.add('hidden'));

    window.addEventListener('click', (event) => {
      if (event.target === loginModal) loginModal?.classList.add('hidden');
      if (event.target === registerModal) registerModal?.classList.add('hidden');
    });
  }

  function initReadMoreToggle() {
    const readMoreBtn = document.getElementById('readMoreBtn');
    const moreText = document.getElementById('moreText');
    if (!readMoreBtn || !moreText) return;

    readMoreBtn.addEventListener('click', () => {
      const expanded = !moreText.classList.contains('hidden');
      moreText.classList.toggle('hidden');
      readMoreBtn.textContent = expanded ? 'Read More' : 'Read Less';
    });
  }

  function initCourseModal() {
    const courseModal = document.getElementById('courseModal');
    const closeCourseModal = document.getElementById('closeCourseModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalDesc = document.getElementById('modalDesc');

    if (!courseModal || !modalTitle || !modalDesc) return;

    const courseDescriptions = {
      1: {
        title: 'Web Development Basics',
        desc: 'Learn HTML, CSS, and JavaScript from scratch. Perfect for beginners starting their coding journey.'
      },
      2: {
        title: 'JavaScript Mastery',
        desc: 'Deep dive into modern JavaScript with ES6, DOM manipulation, async programming, and real projects.'
      },
      3: {
        title: 'Building with AI Tools',
        desc: 'Explore how to integrate AI APIs, build intelligent UIs, and create your own virtual assistant.'
      }
    };

    document.querySelectorAll('.info-btn').forEach((btn) => {
      btn.addEventListener('click', (event) => {
        const card = event.target.closest('.course-card');
        const id = card?.getAttribute('data-course');
        if (!id) return;
        modalTitle.textContent = courseDescriptions[id].title;
        modalDesc.textContent = courseDescriptions[id].desc;
        courseModal.classList.remove('hidden');
      });
    });

    closeCourseModal?.addEventListener('click', () => courseModal.classList.add('hidden'));
    window.addEventListener('click', (event) => {
      if (event.target === courseModal) courseModal.classList.add('hidden');
    });
  }

  function initLightboxModal() {
    const lightbox = document.getElementById('lightbox');
    const closeLightbox = document.getElementById('closeLightbox');
    if (!lightbox || !closeLightbox) return;

    closeLightbox.addEventListener('click', () => lightbox.classList.add('hidden'));
    window.addEventListener('click', (event) => {
      if (event.target === lightbox) lightbox.classList.add('hidden');
    });
  }

  function initContactFormValidation() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', function (event) {
      const name = this.name.value.trim();
      const email = this.email.value.trim();
      const message = this.message.value.trim();
      const msg = document.getElementById('formMsg');

      if (!name || !email || !message) {
        event.preventDefault();
        msg.textContent = 'Please fill out all fields.';
        msg.style.color = 'red';
      } else if (!email.includes('@') || !email.includes('.')) {
        event.preventDefault();
        msg.textContent = 'Please enter a valid email address.';
        msg.style.color = 'red';
      } else {
        msg.textContent = 'Sending...';
        msg.style.color = 'green';
      }
    });
  }

  function initTestimonialsRotator() {
    const textEl = document.getElementById('testimonialText');
    const authorEl = document.getElementById('testimonialAuthor');
    if (!textEl || !authorEl) return;

    const testimonials = [
      { text: '“Madjid rebuilt our NGO site, translated every call-to-action, and trained our volunteers. Donations tripled in two weeks.”', author: '– Meriem, Program Coordinator' },
      { text: '“He recovered my hacked creator accounts overnight and left me with a security SOP I still follow.”', author: '– Luis, Content Strategist' },
      { text: '“The personal branding sprint gave me a live portfolio, resume kit, and messaging I now send to recruiters.”', author: '– Fatima, Cloud Engineer' }
    ];

    let index = 0;
    setInterval(() => {
      index = (index + 1) % testimonials.length;
      textEl.textContent = testimonials[index].text;
      authorEl.textContent = testimonials[index].author;
    }, 5000);
  }

  function initNewsletterForm() {
    const form = document.getElementById('newsletterForm');
    const emailInput = document.getElementById('newsletterEmail');
    const msg = document.getElementById('newsletterMsg');
    if (!form || !emailInput || !msg) return;

    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const email = emailInput.value.trim();
      if (!email.includes('@') || !email.includes('.')) {
        msg.textContent = 'Please enter a valid email address.';
        msg.style.color = 'red';
      } else {
        msg.textContent = 'Thank you for subscribing!';
        msg.style.color = 'green';
        form.reset();
      }
    });
  }

  function initNavigationFeatures() {
    bindDarkToggle();
    bindLanguageMenu();
  }

  document.addEventListener('DOMContentLoaded', () => {
    applySavedTheme();
    initNavigationFeatures();
    initLoginModals();
    initReadMoreToggle();
    initCourseModal();
    initLightboxModal();
    initContactFormValidation();
    initTestimonialsRotator();
    initNewsletterForm();
  });

  document.addEventListener('layout:ready', initNavigationFeatures);
})();
