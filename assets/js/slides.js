 
 
 
 let slideIndex = 0;
const slides = document.getElementsByClassName("mySlides");
const dots = document.getElementsByClassName("dot");

function showSlides() {
    // Remove active class from all slides and dots
    for (let i = 0; i < slides.length; i++) {
    slides[i].classList.remove("active");
    dots[i].classList.remove("active");
    }

    // Increment slide index
    slideIndex++;
    if (slideIndex > slides.length) { slideIndex = 1; }

    // Add active class to current slide and dot
    slides[slideIndex - 1].classList.add("active");
    dots[slideIndex - 1].classList.add("active");

    // Call next slide after 4 seconds
    setTimeout(showSlides, 5000);
}

// Initialize slideshow
showSlides();