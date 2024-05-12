const slidesBox = document.querySelector(".slideImages");
const slides = document.querySelectorAll(".slideImages .slide");
let slideIndex = 0;

displaySlide(slideIndex);
let interval = null;

document.addEventListener("DOMContentLoaded", autoSwipe);

function autoSwipe() {
    if (slides.length > 0) {
        slides[slideIndex].classList.add("display");
        interval = setInterval(nextSlide, 10000);
    }
}

function displaySlide(index) {
    if (index < 0 || index >= slides.length) return;
    slidesBox.style.transform = `translateX(-${index * 100}%)`;
    slideIndex = index;
};

function prevSlide() {
    if (slideIndex === 0) {
        displaySlide(slides.length - 1);
    } else {
        displaySlide(slideIndex - 1);
    }
}

function nextSlide() {
    if (slideIndex === slides.length - 1) {
        displaySlide(0);
      } else {
        displaySlide(slideIndex + 1);
      }
}

function readUser() {
    if (currentUser !== null) {
        window.alert(`Welcome back, ${currentUser[0].username}`);
    } 
    else {
        return;
    }
}
