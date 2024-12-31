// Smooth scroll to sections
function showSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
}

// Scroll to the top of the page
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
}

// Toggle "Read More" functionality
function showMore() {
    const fullContent = document.getElementById("about-full");
    const readMoreBtn = document.getElementById("read-more-btn");

    if (fullContent.style.display === "none" || fullContent.style.display === "") {
        fullContent.style.display = "block";
        readMoreBtn.textContent = "Read Less";
        readMoreBtn.setAttribute("aria-expanded", "true");
    } else {
        fullContent.style.display = "none";
        readMoreBtn.textContent = "Read More";
        readMoreBtn.setAttribute("aria-expanded", "false");
    }
}

// Smooth scroll for scroll-down icon
document.querySelector('.scroll-down a').addEventListener('click', (e) => {
    e.preventDefault();
    const targetId = e.target.getAttribute('href').substring(1);
    const targetSection = document.getElementById(targetId);
    if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
});

// Language Switching Functionality
function switchLanguage(language) {
    // Hide all language-specific sections
    const sections = document.querySelectorAll('.language-section');
    sections.forEach(section => section.style.display = 'none');

    // Show the selected language section
    const selectedSection = document.getElementById(`start-discussion-${language}`);
    if (selectedSection) {
        selectedSection.style.display = 'block';
    }
}
// Testimonials Carousel Functionality
document.addEventListener("DOMContentLoaded", () => {
    let currentIndex = 0; // Current active testimonial
    const items = document.querySelectorAll('.carousel-item'); // All testimonials
    const prevBtn = document.querySelector('.prev-btn'); // Previous button
    const nextBtn = document.querySelector('.next-btn'); // Next button

    function showItem(index) {
        // Remove 'active' class from all items
        items.forEach(item => item.classList.remove('active'));
        
        // Add 'active' class to the current item
        if (items[index]) {
            items[index].classList.add('active');
        }
    }

    // Previous Button Click Event
    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + items.length) % items.length;
        showItem(currentIndex);
    });

    // Next Button Click Event
    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % items.length;
        showItem(currentIndex);
    });

    // Initialize the first testimonial
    showItem(currentIndex);
});// Wait for the DOM to load before running the script
document.addEventListener("DOMContentLoaded", () => {
    let currentIndex = 0; // Index of the currently visible testimonial
    const items = document.querySelectorAll('.carousel-item'); // All testimonials
    const prevBtn = document.querySelector('.prev-btn'); // Previous button
    const nextBtn = document.querySelector('.next-btn'); // Next button

    function showItem(index) {
        // Hide all items and remove 'active' class
        items.forEach(item => item.classList.remove('active'));
        
        // Show the current item
        items[index].classList.add('active');
    }

    // Previous Button Click
    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + items.length) % items.length;
        showItem(currentIndex);
    });

    // Next Button Click
    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % items.length;
        showItem(currentIndex);
    });

    // Initialize the carousel by showing the first item
    showItem(currentIndex);
});
// Newsletter Form Submission
document.getElementById('newsletter-form').addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent actual form submission

    const emailInput = document.getElementById('newsletter-email');
    const message = document.getElementById('newsletter-message');

    if (emailInput.value.trim() !== '') {
        message.style.display = 'block';
        message.textContent = 'Thank you for subscribing!';
        message.style.color = 'green';

        // Clear the email field after submission
        emailInput.value = '';
    } else {
        message.style.display = 'block';
        message.textContent = 'Please enter a valid email address.';
        message.style.color = 'red';
    }
});
document.addEventListener("DOMContentLoaded", () => {
    const featuresContainer = document.querySelector('.features-container');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                featuresContainer.style.opacity = 1;
                featuresContainer.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.3 });

    observer.observe(featuresContainer);
});
// Toggle Read More
function showMore() {
    const fullContent = document.getElementById("about-full");
    const readMoreBtn = document.getElementById("read-more-btn");

    if (fullContent.style.display === "none" || fullContent.style.display === "") {
        fullContent.style.display = "block";
        readMoreBtn.textContent = "Read Less";
    } else {
        fullContent.style.display = "none";
        readMoreBtn.textContent = "Read More";
    }
}
// Function to Show Modal
function showCourseDetails(title, description) {
    document.getElementById("modal-title").textContent = title;
    document.getElementById("modal-description").textContent = description;
    document.getElementById("course-modal").style.display = "flex";
}

// Function to Close Modal
function closeModal() {
    document.getElementById("course-modal").style.display = "none";
}
document.addEventListener('DOMContentLoaded', () => {
    const readMoreBtn = document.getElementById('read-more-btn');
    const aboutFullContent = document.getElementById('about-full');

    readMoreBtn.addEventListener('click', () => {
        aboutFullContent.classList.toggle('active');
        readMoreBtn.textContent = aboutFullContent.classList.contains('active') 
            ? 'Show Less' 
            : 'Read More';
    });
});
