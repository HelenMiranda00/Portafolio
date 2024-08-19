import { imgOnLoad, isElementInViewport } from "./utils.js";
import { fetchAPI, getInfoProfile } from "./fetchAPI.js";
import { API_KEY, baseId, profile } from "../API.js"

document.addEventListener('DOMContentLoaded', () => {
    const dataProfile = `https://api.airtable.com/v0/${baseId}/${profile}?maxRecords=3&view=profile`;

    // About me Section ID
    const aboutMeSection = document.querySelector('#about');

    // get data profile
    const data = fetchAPI(dataProfile, API_KEY);
    data.then(res => {
        // information - profile
        const infoProfile = getInfoProfile(res?.records);
        console.log(infoProfile)
        // funtion to create an "a" element for social media icon.
        const createIcon = (parentElement) => {
            infoProfile[0].linkContact.forEach((link, indexLink) => {
                const a = document.createElement('a');
                a.href = link;
                a.target = '_blank';
                a.rel = 'noopener';
                const imgIcon = imgOnLoad(infoProfile[0].iconsContact[indexLink].url, infoProfile[0].alt, infoProfile[0].title);
                a.appendChild(imgIcon);
                parentElement.appendChild(a);
            });
        };

        // image - profile
        const imageProfile = imgOnLoad(infoProfile[0].url, infoProfile[0].alt, infoProfile[0].title);
        const imageProfileModal = imgOnLoad(infoProfile[0].imgModal, infoProfile[0].alt, infoProfile[0].title);

        // add img in section about me
        aboutMeSection.firstElementChild.innerHTML = '';
        aboutMeSection.firstElementChild.appendChild(imageProfile);

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
                    title.style.opacity = '0.2';

                    timeout = setTimeout(() => {
                        if (!isElementInViewport(contentDes)) {
                            contentDes.style.opacity = '0';
                            title.style.opacity = '1';
                        }
                    }, 40000);

                    paragrahpList.forEach(span => {
                        span.style.animationName = 'showText';
                    });
                });
            }
        }
        seeMoreContentAboutMe();

        // contact in the footer
        const contactBox = document.querySelectorAll('.contact-item');
        Array.from(contactBox).forEach((item) => {
            Array.from(item.children).forEach(el => {
                if (el.matches('div.social-icons')) {
                    el.innerHTML = '';
                    // social media icon - profile
                    createIcon(el);
                };
                if (el.matches('p.email')) {
                    el.innerHTML = '';
                    const stringConEmail = infoProfile[0].linkContact[2];
                    // Expresión regular para encontrar el email
                    let regexEmail = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/;
                    // Extraer el email usando match
                    let email = stringConEmail.match(regexEmail)[0];
                    el.textContent = email;
                };
            });
        });

        // add contact data in modal
        const addDataModal = () => {
            const modalContent = document.getElementById('modal-content');
            const [...listElements] = modalContent.children;

            listElements.forEach(element => {
                if (element.matches('img')) element.replaceWith(imageProfileModal);

                if (element.matches('.social-media-contact')) {
                    const socialMediaIcons = document.querySelector('.social-media-contact');
                    socialMediaIcons.innerHTML = '';
                    createIcon(socialMediaIcons);
                };
            });
        };

        // Modal About me
        const openModalAbout = document.getElementById('open-modal-about'); // Boton
        const modalAboutMe = document.querySelector('.modal-aboutMe');

        // Activar el modal
        openModalAbout.addEventListener('click', function () {

            if (modalAboutMe.classList.contains('disable-modal')) {
                modalAboutMe.classList.remove('disable-modal');
                modalAboutMe.classList.add('enable-modal');
            }
            // llamar a la funcion para agregar las href
            addDataModal();
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

    }).catch(err => {
        console.error('Hubo un error:', err);
    });
});