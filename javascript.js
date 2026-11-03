
// 1. WELCOME SCREEN

const welcomeButton = document.getElementById("welcomeButton");
const welcomeScreen = document.getElementById("welcomeScreen");
const mainContent = document.getElementById("mainContent");

function enterPortfolio(scrollToProjects = false) {

    // Check whether welcome screen elements exist
    if (!welcomeScreen || !mainContent) {
        return;
    }

    // Hide welcome screen
    welcomeScreen.style.display = "none";

    // Show main portfolio content
    mainContent.hidden = false;

    // Scroll to the requested section
    if (scrollToProjects) {

        requestAnimationFrame(function () {

            const projectsSection = document.getElementById("projects");

            if (projectsSection) {
                projectsSection.scrollIntoView({
                    behavior: "instant",
                    block: "start"
                });
            }

        });

    } else {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }
}

// Normal entrance button
if (welcomeButton) {

    welcomeButton.addEventListener("click", function () {
        enterPortfolio(false);
    });

}

// Automatically skip welcome screen when returning from a project page
if (window.location.hash === "#projects") {

    enterPortfolio(true);

}
 /* =====================================
   DARK MODE
===================================== */

function initDarkMode() {
    const themeToggle = document.getElementById("themeToggle");

    // Get saved theme from localStorage
    const savedTheme = localStorage.getItem("theme");

    // Apply saved theme
    if (savedTheme === "dark") {
        document.body.classList.add("dark-mode");
    } else {
        document.body.classList.remove("dark-mode");
    }

    // Update theme button
    function updateThemeButton() {
        if (themeToggle) {
            themeToggle.textContent =
                document.body.classList.contains("dark-mode")
                    ? "☀️"
                    : "🌙";
        }
    }

    updateThemeButton();

    // Toggle theme when button is clicked
    if (themeToggle) {
        themeToggle.addEventListener("click", function () {
            document.body.classList.toggle("dark-mode");

            const currentTheme =
                document.body.classList.contains("dark-mode")
                    ? "dark"
                    : "light";

            localStorage.setItem("theme", currentTheme);

            updateThemeButton();
        });
    }
}

initDarkMode();

  // 3. MOBILE NAVIGATION

function initMobileNavigation() {

    const menuToggle = document.getElementById("menuToggle");
    const navLinks = document.getElementById("navLinks");

    // Check whether required elements exist
    if (!menuToggle || !navLinks) {
        console.warn("Mobile navigation elements not found.");
        return;
    }

    // Open or close mobile menu
    menuToggle.addEventListener("click", function () {

        const isOpen = navLinks.classList.toggle("active");

        menuToggle.setAttribute("aria-expanded", isOpen);

        menuToggle.textContent = isOpen ? "✕" : "☰";

    });

    // Close menu after clicking a navigation link
    navLinks.querySelectorAll("a").forEach(function (link) {

        link.addEventListener("click", function () {

            navLinks.classList.remove("active");

            menuToggle.setAttribute("aria-expanded", "false");

            menuToggle.textContent = "☰";

        });

    });

    // Close menu when pressing Escape
    document.addEventListener("keydown", function (event) {

        if (event.key === "Escape") {

            navLinks.classList.remove("active");

            menuToggle.setAttribute("aria-expanded", "false");

            menuToggle.textContent = "☰";

        }

    });

}

initMobileNavigation();


   //4. TYPING ANIMATION

function initTypingAnimation() {

    const typingText = document.getElementById("typingText");

    if (!typingText) {
        console.warn("Typing text element not found.");
        return;
    }

    // Text displayed by the typing animation
    const messages = [
        "Computer Science Student",
        "Multimedia Computing Student",
        
    ];

    let messageIndex = 0;
    let characterIndex = 0;
    let isDeleting = false;

    function typeEffect() {

        const currentMessage = messages[messageIndex];

        if (isDeleting) {
            characterIndex--;
        } else {
            characterIndex++;
        }

        typingText.textContent = currentMessage.substring(0, characterIndex);

        let typingSpeed = isDeleting ? 50 : 100;

        // Wait before deleting a completed message
        if (!isDeleting && characterIndex === currentMessage.length) {
            typingSpeed = 1500;
            isDeleting = true;
        }

        // Move to the next message
        else if (isDeleting && characterIndex === 0) {
            isDeleting = false;
            messageIndex = (messageIndex + 1) % messages.length;
            typingSpeed = 500;
        }

        setTimeout(typeEffect, typingSpeed);
    }

    typeEffect();
}

// Initialize typing animation
initTypingAnimation();



   //5. PROJECT FILTER AND SEARCH

function initProjectFilter() {

    const filterButtons = document.querySelectorAll(".filter-btn");
    const projectCards = document.querySelectorAll(".project-card");
    const searchInput = document.getElementById("projectSearch");
    const noProjectsMessage = document.getElementById("noProjects");

    if (projectCards.length === 0) {
        console.warn("Project cards not found.");
        return;
    }

    let currentCategory = "all";
    let searchTerm = "";

    // Filter and search projects together
    function updateProjects() {

        let visibleCount = 0;

        projectCards.forEach(function (card) {

            const projectCategory = card.dataset.category || "";
            const projectText = card.textContent.toLowerCase();

            const matchesCategory =
                currentCategory === "all" ||
                projectCategory === currentCategory;

            const matchesSearch =
                projectText.includes(searchTerm);

            if (matchesCategory && matchesSearch) {
                card.style.display = "";
                visibleCount++;
            } else {
                card.style.display = "none";
            }

        });

        // Show message if no projects match
        if (noProjectsMessage) {
            noProjectsMessage.style.display =
                visibleCount === 0 ? "block" : "none";
        }
    }

    // Handle category filter buttons
    filterButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            currentCategory = button.dataset.filter || "all";

            filterButtons.forEach(function (btn) {
                btn.classList.remove("active");
            });

            button.classList.add("active");

            updateProjects();

        });

    });

    // Handle project search
    if (searchInput) {

        searchInput.addEventListener("input", function () {

            searchTerm = searchInput.value.trim().toLowerCase();

            updateProjects();

        });

    }

    updateProjects();
}

// Initialize project filter and search
initProjectFilter();


// Feature 6: Scroll Progress Bar
function initScrollProgress() {
    const scrollProgress = document.getElementById("scrollProgress");

    if (!scrollProgress) {
        console.warn("Scroll progress element not found.");
        return;
    }

    function updateProgress() {
        const scrollableHeight =
            document.documentElement.scrollHeight - window.innerHeight;

        if (scrollableHeight <= 0) {
            scrollProgress.style.width = "0%";
            return;
        }

        const progress =
            (window.scrollY / scrollableHeight) * 100;

        scrollProgress.style.width = progress + "%";
    }

    window.addEventListener("scroll", updateProgress, {
        passive: true
    });

    updateProgress();
}

initScrollProgress();

// Feature 7: Back to Top Button
function initBackToTop() {
    const backToTop = document.getElementById("backToTop");

    if (!backToTop) {
        console.warn("Back to top button not found.");
        return;
    }

    function toggleButton() {
        if (window.scrollY > 300) {
            backToTop.classList.add("show");
        } else {
            backToTop.classList.remove("show");
        }
    }

    backToTop.addEventListener("click", function () {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });

    window.addEventListener("scroll", toggleButton, {
        passive: true
    });

    toggleButton();
}

initBackToTop();


 // Feature 8: Active Navigation
function initActiveNavigation() {
    const sections = document.querySelectorAll("main section[id]");
    const navLinks = document.querySelectorAll(".nav-links a");

    if (sections.length === 0 || navLinks.length === 0) {
        console.warn("Navigation sections or links not found.");
        return;
    }

    function updateActiveLink() {
        let currentSection = "";

        sections.forEach(function (section) {
            const sectionTop = section.offsetTop;

            if (window.scrollY >= sectionTop - 150) {
                currentSection = section.getAttribute("id");
            }
        });

        navLinks.forEach(function (link) {
            link.classList.remove("active");

            if (link.getAttribute("href") === "#" + currentSection) {
                link.classList.add("active");
            }
        });
    }

    window.addEventListener("scroll", updateActiveLink, {
        passive: true
    });

    updateActiveLink();
}

initActiveNavigation();


// Feature 9: Scroll Reveal Animation
function initScrollReveal() {
    const revealElements = document.querySelectorAll(
        ".about-content, .project-card, .contact-card"
    );

    if (revealElements.length === 0) {
        console.warn("Reveal elements not found.");
        return;
    }

    const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
        return;
    }

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15
    });

    revealElements.forEach(function (element) {
        element.classList.add("reveal");
        observer.observe(element);
    });
}

initScrollReveal();

/* =====================================
   10. CONTACT FORM VALIDATION
===================================== */

function initContactForm() {

    const contactForm = document.getElementById("contactForm");

    if (!contactForm) {
        return;
    }

    const nameInput = document.getElementById("contactName");
    const emailInput = document.getElementById("contactEmail");
    const subjectInput = document.getElementById("contactSubject");
    const messageInput = document.getElementById("contactMessage");
    const formStatus = document.getElementById("formStatus");

    contactForm.addEventListener("submit", function (event) {

        event.preventDefault();

        // Clear previous error messages
        document.querySelectorAll(".error-message").forEach(function (error) {
            error.textContent = "";
        });

        formStatus.textContent = "";
        formStatus.className = "form-status";

        let isValid = true;

        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const subject = subjectInput.value.trim();
        const message = messageInput.value.trim();

        // Validate Name
        if (name === "") {
            document.getElementById("nameError").textContent =
                "Please enter your name.";
            isValid = false;
        }

        // Validate Email
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (email === "") {
            document.getElementById("emailError").textContent =
                "Please enter your email address.";
            isValid = false;
        } else if (!emailPattern.test(email)) {
            document.getElementById("emailError").textContent =
                "Please enter a valid email address.";
            isValid = false;
        }

        // Validate Subject
        if (subject === "") {
            document.getElementById("subjectError").textContent =
                "Please enter a subject.";
            isValid = false;
        }

        // Validate Message
        if (message === "") {
            document.getElementById("messageError").textContent =
                "Please enter your message.";
            isValid = false;
        }

        // Stop if validation fails
        if (!isValid) {
            formStatus.textContent =
                "Please correct the errors above.";
            formStatus.classList.add("error");
            return;
        }

        // Prepare Gmail message
        const gmailURL =
            "https://mail.google.com/mail/?view=cm&fs=1" +
            "&to=kaiqi1004@gmail.com" +
            "&su=" + encodeURIComponent(subject) +
            "&body=" + encodeURIComponent(
                "Name: " + name +
                "\nEmail: " + email +
                "\n\nMessage:\n" + message
            );

        formStatus.textContent =
            "Your information is ready. Opening Gmail...";
        formStatus.classList.add("success");

        window.open(gmailURL, "_blank", "noopener,noreferrer");

    });

}

// Initialize contact form
initContactForm();
