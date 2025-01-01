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
console.log("Script loaded");

// Select the toggle button
const darkModeToggle = document.getElementById('dark-mode-toggle');

if (!darkModeToggle) {
    console.error("Toggle button not found!");
} else {
    console.log("Toggle button found");
}

// Check for saved user preference
if (localStorage.getItem('dark-mode') === 'enabled') {
    console.log("Dark mode enabled from localStorage");
    document.body.classList.add('dark-mode');
} else {
    console.log("Dark mode not enabled in localStorage");
}

// Add click event to toggle button
darkModeToggle?.addEventListener('click', () => {
    console.log("Toggle button clicked");

    document.body.classList.toggle('dark-mode');
    console.log(
        document.body.classList.contains('dark-mode')
            ? "Dark mode activated"
            : "Dark mode deactivated"
    );

    // Save user preference to localStorage
    if (document.body.classList.contains('dark-mode')) {
        localStorage.setItem('dark-mode', 'enabled');
        console.log("Dark mode preference saved to localStorage");
    } else {
        localStorage.setItem('dark-mode', 'disabled');
        console.log("Light mode preference saved to localStorage");
    }
});
// Test JavaScript
console.log("JavaScript is linked!");
alert("JavaScript is working!");
document.addEventListener("DOMContentLoaded", () => {
    const contactForm = document.getElementById("contact-form");
    const formStatus = document.getElementById("form-status");

    contactForm.addEventListener("submit", (event) => {
        event.preventDefault(); // Prevent form submission

        // Get form values
        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const message = document.getElementById("message").value.trim();

        // Validate fields
        if (!name || !email || !message) {
            formStatus.textContent = "All fields are required!";
            formStatus.style.color = "red";
            return;
        }

        if (!validateEmail(email)) {
            formStatus.textContent = "Please enter a valid email!";
            formStatus.style.color = "red";
            return;
        }

        // Simulate form submission (you can replace this with actual backend logic)
        formStatus.textContent = "Message sent successfully!";
        formStatus.style.color = "green";

        // Clear form fields
        contactForm.reset();
    });

    // Email validation function
    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
});
document.addEventListener("DOMContentLoaded", () => {
    const portfolioItems = document.querySelectorAll(".portfolio-item img");
    const lightbox = document.getElementById("lightbox");
    const lightboxImage = document.querySelector(".lightbox-image");
    const closeBtn = document.querySelector(".lightbox .close");
    const prevBtn = document.querySelector(".lightbox .prev");
    const nextBtn = document.querySelector(".lightbox .next");

    let currentIndex = 0;

   document.addEventListener("DOMContentLoaded", () => {
    const portfolioItems = document.querySelectorAll(".portfolio-item img");
    const lightbox = document.getElementById("lightbox");
    const lightboxImage = document.querySelector(".lightbox-image");
    const closeBtn = document.querySelector(".lightbox .close");
    const prevBtn = document.querySelector(".lightbox .prev");
    const nextBtn = document.querySelector(".lightbox .next");

    let currentIndex = 0;

    // Open Lightbox
    portfolioItems.forEach((item, index) => {
        item.addEventListener("click", () => {
            currentIndex = index;
            lightboxImage.src = item.src;
            lightbox.classList.add("visible");
        });
    });

    // Close Lightbox
    closeBtn.addEventListener("click", () => {
        lightbox.classList.remove("visible");
    });

    // Navigate Previous
    prevBtn.addEventListener("click", () => {
        currentIndex = (currentIndex - 1 + portfolioItems.length) % portfolioItems.length;
        lightboxImage.src = portfolioItems[currentIndex].src;
    });

    // Navigate Next
    nextBtn.addEventListener("click", () => {
        currentIndex = (currentIndex + 1) % portfolioItems.length;
        lightboxImage.src = portfolioItems[currentIndex].src;
    });

    // Close Lightbox on Click Outside Image
    lightbox.addEventListener("click", (e) => {
        if (e.target === lightbox) {
            lightbox.classList.remove("visible");
        }
    });
});

