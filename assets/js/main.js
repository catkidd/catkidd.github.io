const header = document.querySelector("header");
window.addEventListener("scroll", function () {
    header.classList.toggle("sticky", window.scrollY > 100);
});

const menuIcon = document.querySelector("#menu-icon");
const menuItems = document.querySelector(".menu__items");

menuIcon.onclick = () => {
    menuItems.classList.toggle("open");
    const isOpen = menuItems.classList.contains("open");
    menuIcon.classList = isOpen ? "fa-solid fa-xmark" : "fa-solid fa-bars";
};

window.onscroll = () => {
    const isOpen = menuItems.classList.contains("menu__items");
    menuIcon.classList = isOpen ? "fa-solid fa-bars" : "fa-solid fa-xmark";
    menuItems.classList.remove("open");
};

document.addEventListener("DOMContentLoaded", function() {
    let typed = new Typed(".auto-type", {
        strings: ["Developer", "Designer"],
        typeSpeed: 150,
        backSpeed: 150,
        backDelay: 1000,
        loop: true,
    });
});

