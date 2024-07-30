// animar el texto de "sobre me"
console.log('about me active')
const seeMoreContentAboutMe = () => {
    const imageProfile = document.querySelector('#about').children[0];
    const paragrahpList = document.querySelectorAll('.paragrahp');
    const widthSmall_00 = document.documentElement.clientWidth;
    const widthSmall_01 = window.innerWidth;

    // verificamos que sea un mobile o table mediante la pantalla
    // De lo contrario (laptops o  desktop) aplicar la animacion.
    if (widthSmall_00 <= '800' || widthSmall_01 <= '800') {
        paragrahpList.forEach(span => {
            span.style.animationName = 'showText';
        });
    } else {
        imageProfile.addEventListener('mouseenter', () => {
            console.log('dentro de la imagen')
            const contentDes = document.getElementById('description-aboutMe');
            contentDes.style.opacity = '1';
    
            const title = document.querySelector('.about-content').children[0].children[0];
            title.style.opacity = '0.2';
            
            setTimeout(() => {
                if (!isElementInViewport(contentDes)) {
                    contentDes.style.opacity = '0';
                    title.style.opacity = '1';
                }
            }, 30000);
            
            paragrahpList.forEach(span => {
                span.style.animationName = 'showText';
            });
        });
    }
}

// AGREGAR SECCIONES Y ANIMARLAS AL HACER SCROLL.

console.log('main')
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