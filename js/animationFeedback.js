document.addEventListener("DOMContentLoaded", function() {
    const feedbackItems = document.querySelectorAll('.feedback-item');
    let currentIndex = 0;
    let interval;

    function showFeedbackItem(index) {
        feedbackItems.forEach((item, i) => {
            item.classList.toggle('active', i === index);
        });
    }

    function startRotation() {
        interval = setInterval(() => {
            currentIndex = (currentIndex + 1) % feedbackItems.length;
            showFeedbackItem(currentIndex);
        }, 7000);
    }

    function stopRotation() {
        clearInterval(interval);
    }

    feedbackItems.forEach(item => {
        item.addEventListener('mouseenter', stopRotation);
        item.addEventListener('mouseleave', startRotation);
    });

    showFeedbackItem(currentIndex);
    startRotation();
});