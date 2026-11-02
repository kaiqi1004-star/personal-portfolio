
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


// =====================================
// 2. DARK / LIGHT MODE
// =====================================

const themeToggle = document.getElementById("themeToggle");

function initThemeToggle() {

    if (!themeToggle) {
        console.error("Theme toggle button not found.");
        return;
    }

    themeToggle.addEventListener("click", function () {

        const isDarkMode = document.body.classList.toggle("dark-mode");

        if (isDarkMode) {
            themeToggle.textContent = "☀️";
            themeToggle.setAttribute("aria-label", "Switch to light mode");
        } else {
            themeToggle.textContent = "🌙";
            themeToggle.setAttribute("aria-label", "Switch to dark mode");
        }

    });

}

// Initialize theme toggle
initThemeToggle();
