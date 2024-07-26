import { isElementInViewport } from './js/utils.js';
// AGREGAR SECCIONES Y ANIMARLAS AL HACER SCROLL.

// animar el texto de "sobre me"
const seeMoreContentAboutMe = () => {
    const btn_moreAboutMe = document.getElementById('more-aboutMe');
    const paragrahpList = document.querySelectorAll('.paragrahp');
    const widthSmall_00 = document.documentElement.clientWidth;
    const widthSmall_01 = window.innerWidth;

    if (widthSmall_00 <= '800' || widthSmall_01 <= '800') {
        paragrahpList.forEach(span => {
            span.style.animationName = 'showText';
        });
    } else {
        btn_moreAboutMe.addEventListener('click', () => {
            const contentDes = document.getElementById('description-aboutMe');
            contentDes.style.opacity = '1';
    
            const title = document.querySelector('.about-content').children[0].children[0];
            title.style.opacity = '0.2';
            
            setTimeout(() => {
                if (!isElementInViewport(contentDes)) {
                    contentDes.style.opacity = '0';
                    title.style.opacity = '1';
                }
            }, 20000);
            
            paragrahpList.forEach(span => {
                span.style.animationName = 'showText';
            });
        });
    }
}

// opciones para el observador
const options = {
    root: null,
    threshold: 0.25,
    rootMargin: '5px'
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
            if (entry.target.id === 'about') {
                seeMoreContentAboutMe();
            }
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