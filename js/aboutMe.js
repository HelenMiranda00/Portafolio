import { isElementInViewport } from "./utils.js";

// About me Section ID
const aboutMeSection = document.querySelector('#about');

// animar el texto de "sobre me"
const seeMoreContentAboutMe = () => {
    const paragrahpList = document.querySelectorAll('.paragrahp');
    // size Screen
    const widthSmall_00 = document.documentElement.clientWidth;
    const widthSmall_01 = window.innerWidth;
    let timeout;

    // verificamos que sea un mobile o table mediante la pantalla
    // De lo contrario (laptops o  desktop) aplicar la animacion.
    if (widthSmall_00 >= '800' || widthSmall_01 >= '800') {

        aboutMeSection.addEventListener('mouseenter', () => {
            clearTimeout(timeout);

            const contentDes = document.getElementById('description-aboutMe');
            contentDes.style.opacity = '1';

            const title = document.querySelector('.about-content').children[0].children[0];
            title.style.opacity = '0.1';

            timeout = setTimeout(() => {
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
seeMoreContentAboutMe();

// Modal About me
const openModalAbout = document.getElementById('open-modal-about'); // Boton
const modalAboutMe = document.querySelector('.modal-aboutMe');

// informacion de contacto
const infoContact = {
    instagram: 'https://www.instagram.com/helentmiranda/',
    whatsapp: 'https://wa.me/50762336933?text=Hola%20me%20gustar%C3%ADa%20obtener%20m%C3%A1s%20informaci%C3%B3n%20sobre%20sus%20servicios.',
    email: 'mailto:helenph5522@gmail.com?subject=Consulta%20sobre%20servicios&body=Hola,%20me%20gustar%C3%ADa%20obtener%20m%C3%A1s%20informaci%C3%B3n%20sobre%20sus%20servicios.',
};

// funcion agregar los href a los iconos de contacto
const addHref = () => {
    const modalContent = document.getElementById('modal-content');
    const [...listElements] = modalContent.children;
    
    listElements.forEach(element => {
        const containClass = element.classList.contains('social-media-contact') ? element : null;
        console.log(containClass)
    
        if (containClass) {
            Array.from(element.children).forEach((a, i) => {
                if (i === 0) a.href = infoContact.instagram;
                if (i === 1) a.href = infoContact.whatsapp;
                if (i === 2) a.href = infoContact.email;
            });
        };
    });
}

// Activar el modal
openModalAbout.addEventListener('click', function () {

    if (modalAboutMe.classList.contains('disable-modal')) {
        modalAboutMe.classList.remove('disable-modal');
        modalAboutMe.classList.add('enable-modal');
    }
    // llamar a la funcion para agregar las href
    addHref();
});

// Desactivar el modal
openModalAbout.addEventListener('click', function () {
    if (modalAboutMe.classList.contains('enable-modal')) {

        modalAboutMe.addEventListener('click', function () {
            modalAboutMe.classList.remove('enable-modal');
            modalAboutMe.classList.add('disable-modal');
        });
    }
});
