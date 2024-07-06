// AGREGAR SECCIONES Y ANIMARLAS AL HACER SCROLL.
// Nombres y Ruta de archivos html relativos al archivo 'index.html'.
import { createCard, imgOnLoad, generatePortfolio } from './js/createCard.js'
import { image } from './js/imgUrl.js';

const files = [
    [
        'about',
        'portafolio',
        'feedback',
        'contact',
    ],
    [
        './html/about.html',
        './html/portafolio.html',
        './html/feedback.html',
        './html/contact.html',
    ]
];

// opciones para el observador
const options = {
    root: null,
    threshold: 0.25,
    rootMargin: '0px'
};

// iniciar el observador para cada seccion, 
// verificar cada seccion e inyectarle el archivo html respectivamente,
// animacion:
// remover la clase 'fade-enter' que contiene la opacidad a 0, 
// asignar la clase 'fade-enter-active' para la opacidad en 1,
// apagar el observador.
const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.remove('fade-enter');
            entry.target.classList.add('fade-enter-active');
            observer.unobserve(entry.target);
        };
    });
}, options);

// agregar la class 'fade-enter' a cada elemento section para iniciarlos ocultos.
// encender el observador para cada seccion.
const sections = document.querySelectorAll('.section');
sections.forEach(section => {
    section.classList.add('fade-enter');
    observer.observe(section);
    if ( section.id === 'portafolio') generatePortfolio(); // Llamar a la función para generar las imagenes del portafolio.
});

