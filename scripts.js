// Book Data
const booksData = {
    computer: [
        "Introduction to Computer Science",
        "Advanced Programming in Python",
        "Data Structures and Algorithms",
        "Computer Networks Explained",
        "Operating Systems: A Comprehensive Guide"
    ],
    story: [
        "The Great Adventure",
        "Mysteries of the Unknown",
        "Timeless Tales of Courage",
        "Fantasy World Chronicles",
        "Legends of the Past"
    ],
    ai: [
        "Machine Learning Basics",
        "Deep Learning Simplified",
        "AI Ethics and Society",
        "Neural Networks Demystified",
        "Artificial Intelligence for Beginners"
    ],
    microsoft: [
        "Mastering Microsoft Word",
        "Excel Tips and Tricks",
        "PowerPoint Presentations Made Easy",
        "Microsoft Office Essentials",
        "Office 365 for Professionals"
    ],
    cybersecurity: [
        "Cybersecurity Fundamentals",
        "Hacking Prevention Techniques",
        "Data Protection Strategies",
        "Network Security for Beginners",
        "Cryptography Made Simple"
    ]
};

// Display Books Based on Category
function showBooks(category) {
    const bookList = document.getElementById("books-container");
    bookList.innerHTML = ""; // Clear previous content
    booksData[category].forEach(book => {
        const li = document.createElement("li");
        li.textContent = book;
        bookList.appendChild(li);
    });
    document.getElementById("book-list").style.display = "block";
}

function sendMessage() {
    const userInput = document.getElementById("user-input").value;
    if (!userInput) return;

    const messagesContainer = document.getElementById("chatbot-messages");

    // Add User Message
    const userMessage = document.createElement("div");
    userMessage.textContent = `You: ${userInput}`;
    userMessage.style.marginBottom = "10px";
    messagesContainer.appendChild(userMessage);

    // Add Typing Indicator
    const typingIndicator = document.createElement("div");
    typingIndicator.textContent = "AI is typing...";
    typingIndicator.style.color = "#999";
    messagesContainer.appendChild(typingIndicator);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;

    // Fetch AI Response
    fetch("chatbot.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: userInput }),
    })
        .then(response => response.json())
        .then(data => {
            // Remove Typing Indicator
            typingIndicator.remove();

            // Add AI Message
            const aiResponse = data.choices[0].message.content;
            const botMessage = document.createElement("div");
            botMessage.textContent = `AI: ${aiResponse}`;
            botMessage.style.marginBottom = "10px";
            messagesContainer.appendChild(botMessage);

            // Add Suggestion Buttons
            addSuggestions(["Tell me more", "Start over", "Contact support"]);

            // Speak the AI Response
            speakResponse(aiResponse);

            messagesContainer.scrollTop = messagesContainer.scrollHeight;

            // Save Chat History
            saveChatHistory();
        })
        .catch(error => {
            console.error("Error:", error);
        });
        function addSuggestions(suggestions) {
            const messagesContainer = document.getElementById("chatbot-messages");
        
            const suggestionsContainer = document.createElement("div");
            suggestionsContainer.className = "suggestions-container";
        
            suggestions.forEach(suggestion => {
                const button = document.createElement("button");
                button.textContent = suggestion;
                button.className = "suggestion-button";
                button.onclick = () => {
                    document.getElementById("user-input").value = suggestion;
                    sendMessage();
                };
                suggestionsContainer.appendChild(button);
            });
        
            messagesContainer.appendChild(suggestionsContainer);
        }        
    // Clear Input Field
    document.getElementById("user-input").value = "";
}

// Save Chat History
function saveChatHistory() {
    const messages = document.getElementById("chatbot-messages").innerHTML;
    localStorage.setItem("chatHistory", messages);
}

// Load Chat History
function loadChatHistory() {
    const savedMessages = localStorage.getItem("chatHistory");
    if (savedMessages) {
        document.getElementById("chatbot-messages").innerHTML = savedMessages;
    }
}

// Toggle Chatbot Visibility
function toggleChatbot() {
    const chatbot = document.getElementById("chatbot-container");
    chatbot.style.display = chatbot.style.display === "none" ? "block" : "none";
}

// Load Chat History When Page Loads
loadChatHistory();
function startVoiceInput() {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = 'en-US'; // Set the language (e.g., English)

    recognition.onstart = () => {
        console.log("Voice recognition started...");
    };

    recognition.onresult = (event) => {
        const userInput = event.results[0][0].transcript;
        document.getElementById("user-input").value = userInput; // Autofill the input field
    };

    recognition.onerror = (event) => {
        console.error("Voice recognition error:", event.error);
    };

    recognition.start();
}
function downloadChatHistory() {
    const messagesContainer = document.getElementById("chatbot-messages");
    const chatHistory = messagesContainer.textContent; // Get all chat text
    const blob = new Blob([chatHistory], { type: "text/plain" }); // Create a text file
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "chat_history.txt"; // Set download file name
    link.click(); // Trigger download
}
function authenticateUser(event) {
    event.preventDefault(); // Prevent form submission

    const username = document.getElementById("username").value;
    if (!username) {
        alert("Please enter your name.");
        return;
    }

    // Save the username in localStorage
    localStorage.setItem("chatbotUsername", username);

    // Personalize the chatbot
    personalizeChatbot(username);

    // Hide the login form and show the chatbot
    document.getElementById("login-container").style.display = "none";
    document.getElementById("chatbot-container").style.display = "flex";
}

// Personalize the chatbot header with the username
function personalizeChatbot(username) {
    const header = document.getElementById("chatbot-header");
    if (header) {
        header.textContent = `Welcome, ${username}! Chat with us`;
    }
}

// Load the chatbot if the user is already authenticated
function loadAuthentication() {
    const savedUsername = localStorage.getItem("chatbotUsername");
    if (savedUsername) {
        personalizeChatbot(savedUsername);
        document.getElementById("login-container").style.display = "none";
        document.getElementById("chatbot-container").style.display = "flex";
    } else {
        document.getElementById("chatbot-container").style.display = "none";
    }
}

function showLogin() {
    document.getElementById("login-container").style.display = "block";
    document.getElementById("signup-container").style.display = "none"; // Hide signup form
}

function showSignUp() {
    document.getElementById("signup-container").style.display = "block";
    document.getElementById("login-container").style.display = "none"; // Hide login form
}

function authenticateUser(event) {
    event.preventDefault();
    function closeForms() {
        // Hide both login and sign-up containers
        document.getElementById("login-container").style.display = "none";
        document.getElementById("signup-container").style.display = "none";
    }    

    const username = document.getElementById("username").value;
    if (!username) {
        alert("Please enter your name.");
        return;
    }

    alert(`Welcome, ${username}! You are now logged in.`);
    document.getElementById("login-container").style.display = "none"; // Hide login form
}

function registerUser(event) {
    event.preventDefault();

    const username = document.getElementById("signup-username").value;
    const email = document.getElementById("signup-email").value;

    if (!username || !email) {
        alert("Please fill out all fields.");
        return;
    }

    // Simulate saving user details
    alert(`Thank you for signing up, ${username}!`);

    // Automatically log the user in
    localStorage.setItem("chatbotUsername", username);

    // Hide sign-up form
    document.getElementById("signup-container").style.display = "none";
}
const coursesData = {
    programming: [
        "JavaScript for Beginners",
        "Advanced Python Programming",
        "Web Development with HTML, CSS, and JS",
        "Mobile App Development with Flutter",
        "Full-Stack Development with MERN"
    ],
    cybersecurity: [
        "Introduction to Cybersecurity",
        "Ethical Hacking Basics",
        "Data Protection and Encryption",
        "Network Security Essentials",
        "Incident Response Strategies"
    ],
    ai: [
        "Machine Learning Fundamentals",
        "Deep Learning with TensorFlow",
        "AI Ethics and Society",
        "Natural Language Processing Basics",
        "Computer Vision Applications"
    ],
    networking: [
        "Networking Basics with Cisco",
        "Advanced Routing and Switching",
        "Wireless Network Configuration",
        "Introduction to Cloud Networking",
        "Troubleshooting Network Issues"
    ],
    microsoft: [
        "Mastering Excel for Data Analysis",
        "PowerPoint Presentations That Impress",
        "Microsoft Word for Beginners",
        "Office 365 Collaboration Tools",
        "Outlook Email Productivity"
    ]
};

function showCourses(category) {
    const courseList = document.getElementById("courses-list");
    courseList.innerHTML = ""; // Clear previous content
    coursesData[category].forEach(course => {
        const courseItem = document.createElement("div");
        courseItem.textContent = course;
        courseList.appendChild(courseItem);
    });
}
<script src="scripts.js"></script>
        // Show login form
function showLogin() {
    document.getElementById("login-container").style.display = "block";
    document.getElementById("signup-container").style.display = "none"; // Hide sign-up form
}

// Show sign-up form
function showSignUp() {
    document.getElementById("signup-container").style.display = "block";
    document.getElementById("login-container").style.display = "none"; // Hide login form
}

// Close both login and sign-up forms
function closeForms() {
    document.getElementById("login-container").style.display = "none";
    document.getElementById("signup-container").style.display = "none";
}