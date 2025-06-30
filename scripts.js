// DARK MODE TOGGLE
const darkToggle = document.getElementById('dark-toggle');

function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
}

function toggleDarkMode() {
  const currentTheme = localStorage.getItem('theme') || 'light';
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  setTheme(newTheme);
}

darkToggle?.addEventListener('click', toggleDarkMode);

document.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('theme') || 'light';
  setTheme(savedTheme);
});


// LANGUAGE SWITCHER TOGGLE
document.getElementById("lang-toggle")?.addEventListener("click", () => {
  document.getElementById("lang-menu")?.classList.toggle("show");
});

// LANGUAGE SWITCHER CYCLE
const langSwitcher = document.getElementById('lang-switcher');
if (langSwitcher) {
  langSwitcher.addEventListener('click', () => {
    const currentPage = window.location.pathname;
    if (currentPage.includes('index-fr')) {
      window.location.href = 'index-ar.html';
    } else if (currentPage.includes('index-ar')) {
      window.location.href = 'index.html';
    } else {
      window.location.href = 'index-fr.html';
    }
  });
}


// LOGIN & REGISTER MODALS
const loginBtn = document.getElementById('loginBtn');
const registerBtn = document.getElementById('registerBtn');
const loginModal = document.getElementById('loginModal');
const registerModal = document.getElementById('registerModal');
const closeLogin = document.getElementById('closeLogin');
const closeRegister = document.getElementById('closeRegister');

loginBtn?.addEventListener('click', () => loginModal?.classList.remove('hidden'));
registerBtn?.addEventListener('click', () => registerModal?.classList.remove('hidden'));
closeLogin?.addEventListener('click', () => loginModal?.classList.add('hidden'));
closeRegister?.addEventListener('click', () => registerModal?.classList.add('hidden'));

window.addEventListener('click', (e) => {
  if (e.target === loginModal) loginModal?.classList.add('hidden');
  if (e.target === registerModal) registerModal?.classList.add('hidden');
});


// READ MORE TOGGLE
const readMoreBtn = document.getElementById('readMoreBtn');
const moreText = document.getElementById('moreText');

readMoreBtn?.addEventListener('click', () => {
  if (moreText?.classList.contains('hidden')) {
    moreText.classList.remove('hidden');
    readMoreBtn.textContent = 'Read Less';
  } else {
    moreText.classList.add('hidden');
    readMoreBtn.textContent = 'Read More';
  }
});


// COURSES MODAL
const courseModal = document.getElementById('courseModal');
const closeCourseModal = document.getElementById('closeCourseModal');
const modalTitle = document.getElementById('modalTitle');
const modalDesc = document.getElementById('modalDesc');

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

document.querySelectorAll('.info-btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    const card = e.target.closest('.course-card');
    const id = card.getAttribute('data-course');
    modalTitle.textContent = courseDescriptions[id].title;
    modalDesc.textContent = courseDescriptions[id].desc;
    courseModal.classList.remove('hidden');
  });
});

closeCourseModal?.addEventListener('click', () => courseModal.classList.add('hidden'));
window.addEventListener('click', (e) => {
  if (e.target === courseModal) courseModal.classList.add('hidden');
});


// LIGHTBOX MODAL
const closeLightbox = document.getElementById('closeLightbox');
const lightbox = document.getElementById('lightbox');

closeLightbox?.addEventListener('click', () => lightbox?.classList.add('hidden'));
window.addEventListener('click', (e) => {
  if (e.target === lightbox) lightbox?.classList.add('hidden');
});


// CONTACT FORM VALIDATION
document.getElementById('contactForm')?.addEventListener('submit', function (e) {
  const name = this.name.value.trim();
  const email = this.email.value.trim();
  const message = this.message.value.trim();
  const msg = document.getElementById('formMsg');

  if (!name || !email || !message) {
    e.preventDefault();
    msg.textContent = 'Please fill out all fields.';
    msg.style.color = 'red';
  } else if (!email.includes('@') || !email.includes('.')) {
    e.preventDefault();
    msg.textContent = 'Please enter a valid email address.';
    msg.style.color = 'red';
  } else {
    msg.textContent = 'Sending...';
    msg.style.color = 'green';
  }
});


// TESTIMONIALS ROTATOR
const testimonials = [
  { text: "“Madjid Vision helped me build my first portfolio — now I freelance full-time!”", author: "– Samira, Web Developer" },
  { text: "“Clear, practical lessons that made complex tech finally make sense.”", author: "– Ahmed, IT Student" },
  { text: "“The AI tools tutorial blew my mind. Super clear and actually useful!”", author: "– Youssef, Entrepreneur" }
];

let testimonialIndex = 0;

function rotateTestimonials() {
  testimonialIndex = (testimonialIndex + 1) % testimonials.length;
  document.getElementById("testimonialText").textContent = testimonials[testimonialIndex].text;
  document.getElementById("testimonialAuthor").textContent = testimonials[testimonialIndex].author;
}

setInterval(rotateTestimonials, 5000);


// NEWSLETTER FORM
document.getElementById('newsletterForm')?.addEventListener('submit', function (e) {
  e.preventDefault();
  const email = document.getElementById('newsletterEmail').value.trim();
  const msg = document.getElementById('newsletterMsg');

  if (!email.includes('@') || !email.includes('.')) {
    msg.textContent = 'Please enter a valid email address.';
    msg.style.color = 'red';
  } else {
    msg.textContent = 'Thank you for subscribing!';
    msg.style.color = 'green';
    this.reset();
  }
});
