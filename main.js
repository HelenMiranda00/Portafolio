// <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"><path d="M16.293 9.293 12 13.586 7.707 9.293l-1.414 1.414L12 16.414l5.707-5.707z"></path></svg>
// <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"><path d="m6.293 13.293 1.414 1.414L12 10.414l4.293 4.293 1.414-1.414L12 7.586z"></path></svg>

import { loadContent } from './js/loadContent.js';

// agregar componentes a cada seccion respectivamente haciendo uso de la funcion loadContent que a su vez usa la funcion Fetch.
const addComponentToSection = (arrayFileName, arrayFile, sectionID) => {
    arrayFileName.forEach((fileName, index) => {
        if (fileName === sectionID) {
            loadContent(arrayFile[index], sectionID);
            console.log('El elemento a sido encontrado: ', arrayFile[index]);
        };
    });
};

// AGREGAR SECCIONES Y ANIMARLAS AL HACER SCROLL.

// Nombres y Ruta de archivos html relativos al archivo 'index.html'
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
            if (entry.target.id === 'about') addComponentToSection(files[0], files[1], 'about');
            if (entry.target.id === 'portafolio') addComponentToSection(files[0], files[1], 'portafolio');
            if (entry.target.id === 'feedback') addComponentToSection(files[0], files[1], 'feedback');
            if (entry.target.id === 'contact') addComponentToSection(files[0], files[1], 'contact');
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
});