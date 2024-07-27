document.addEventListener('DOMContentLoaded', () => {

    const carousel = document.getElementById('carousel');
    const cards = document.querySelectorAll('.card');
    let currentIndex = 0;
    let interval;

    // funcion para animar el carrusel de fotos
    function startAnimation() {
        interval = setInterval(() => {
            cards.forEach((card, index) => {
                const persent = 50 / (cards.length - 1);
                card.style.flex = index === currentIndex ? '0 0 50%' : `0 0 ${persent}%`;
                const cardText = card.querySelector('.card-text');
                cardText.classList.add('animation-text-on');
                if (index === currentIndex) {
                    cardText.classList.add('animation-text-on');
                    cardText.classList.remove('animation-text-off');
                } else {
                    cardText.classList.add('animation-text-off');
                    cardText.classList.remove('animation-text-on');
                }
            });
            currentIndex = (currentIndex + 1) % cards.length;
        }, 6000); // Cambia cada 6 segundos
    }
    startAnimation();

    // funcion para detener la animacion
    function stopAnimation() {
        clearInterval(interval);
    }
    
    //  se detiene la animacion cuando el mouse entra en el contenedor e inicia cuando sale
    carousel.addEventListener('mouseenter', stopAnimation);
    carousel.addEventListener('mouseleave', startAnimation);
});