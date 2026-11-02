
// =====================================
// 1. WELCOME SCREEN
// =====================================

const welcomeButton = document.getElementById("welcomeButton");
const welcomeScreen = document.getElementById("welcomeScreen");
const mainContent = document.getElementById("mainContent");

welcomeButton.addEventListener("click", function () {

    welcomeScreen.style.display = "none";
    mainContent.hidden = false;

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});



/* =====================================
   2. DARK / LIGHT MODE
===================================== */

function initThemeToggle() {

    const themeToggle = document.getElementById("themeToggle");

    if (!themeToggle) {
        console.warn("Theme toggle button not found.");
        return;
    }

    // Get saved theme from localStorage
    let savedTheme = "light";

    try {
        savedTheme = localStorage.getItem("portfolioTheme") || "light";
    } catch (error) {
        console.warn("Unable to access localStorage:", error);
    }

    // Apply saved theme
    function applyTheme(theme) {

        const isDarkMode = theme === "dark";

        document.body.classList.toggle("dark-mode", isDarkMode);

        themeToggle.textContent = isDarkMode ? "☀️" : "🌙";

        themeToggle.setAttribute(
            "aria-label",
            isDarkMode ? "Switch to light mode" : "Switch to dark mode"
        );
    }

    // Load saved theme when website opens
    applyTheme(savedTheme);

    // Switch theme when button is clicked
    themeToggle.addEventListener("click", function () {

        const isDarkMode = document.body.classList.contains("dark-mode");

        const newTheme = isDarkMode ? "light" : "dark";

        applyTheme(newTheme);

        // Save user's theme preference
        try {
            localStorage.setItem("portfolioTheme", newTheme);
        } catch (error) {
            console.warn("Unable to save theme preference:", error);
        }

    });

}

initThemeToggle();

