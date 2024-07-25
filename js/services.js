document.addEventListener('scroll', function() {
    document.querySelectorAll('.package').forEach(function(element) {
        if (element.getBoundingClientRect().top < window.innerHeight) {
            element.classList.add('visible');
        }
    });
});