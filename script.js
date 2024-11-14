
// Toggle the side navigation
function toggleMenu() {
    const sideNav = document.getElementById("side-nav");
    const mainContent = document.querySelector("main");

    if (sideNav.style.left === "0px") {
        sideNav.style.left = "-250px"; // Hide side-nav
        mainContent.classList.remove("main-content-shift");
    } else {
        sideNav.style.left = "0px"; // Show side-nav
        mainContent.classList.add("main-content-shift");
    }
}

// Close the menu if the user clicks outside of it or on the menu button
document.addEventListener("click", function (event) {
    const sideNav = document.getElementById("side-nav");
    const menuButton = document.querySelector(".menu-toggle");

    if (!sideNav.contains(event.target) && !menuButton.contains(event.target)) {
        sideNav.style.left = "-250px"; // Close side-nav
        document.querySelector("main").classList.remove("main-content-shift");
    }
});
