function scrollToBottom() {
    console.log("Hello World");
    scrollToPosition(document.documentElement.scrollHeight);
}

function scrollToPosition(targetY) {
    const scrollDuration = 1000; // Duration in milliseconds
    const startY = window.scrollY; // Starting position
    const distance = targetY - startY; // Distance to scroll
    const startTime = performance.now(); // Get the start time

    function animateScroll(currentTime) {
        const elapsedTime = currentTime - startTime; // Calculate elapsed time
        const progress = Math.min(elapsedTime / scrollDuration, 1); // Normalize progress (0 to 1)

        const easeInOutQuad = progress < 0.5
            ? 2 * progress * progress
            : 1 - Math.pow(-2 * progress + 2, 2) / 2; // Easing function

        const currentY = startY + distance * easeInOutQuad; // Calculate the current position
        window.scrollTo(0, currentY); // Scroll to the current position

        // Check if the animation should continue
        if (elapsedTime < scrollDuration) {
            requestAnimationFrame(animateScroll); // Continue the animation
        } else {
            window.scrollTo(0, targetY); // Ensure it stops exactly at targetY
        }
    }

    requestAnimationFrame(animateScroll); // Start the animation
}

// Scroll to about section when clicking menu links
document.querySelectorAll('#banner > div.inner > ul > li > a').forEach(anchor => {
    anchor.addEventListener('click', function(event) {
        event.preventDefault(); // Prevent default link behavior

        const targetSection = document.querySelector('body > section.about-section');

        if (targetSection) {
            const targetY = targetSection.getBoundingClientRect().top + window.scrollY;
            scrollToPosition(targetY - 200); // Use smooth scrolling function
        }
    });
});




