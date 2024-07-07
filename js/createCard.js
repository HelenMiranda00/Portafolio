import { image } from "./imgUrl.js";
import { createButton } from './utils.js';

// Función para cargar la imagen con sus atributos
export function imgOnLoad(url, alt = '', className = '', id = '', loading = 'lazy') {
    const img = new Image();
    img.src = url;
    img.onload = function() {
        if (alt) img.alt = alt;
        if (className) img.className = className;
        if (id) img.id = id;
        if (loading) img.loading = loading;
    };
    img.onerror = function() {
        console.error('Error al cargar la imagen.')
    };
    return img;
};

// Función para crear una card con las imágenes dentro de un contenedor
export function createCard(parentID) {
    const parent = document.getElementById(parentID);
    const container = document.createElement('div');
    container.className = 'slide';

    const figure = document.createElement('figure');
    figure.className = 'figure-content';

    parent.appendChild(container);
    container.appendChild(figure);

    return { container, figure }; // Retornamos tanto el contenedor como el figure
}

// Función para iterar en el objeto portafolio y agregar el item verificado al elemento especificado
export function addItemToElement(portafolio, group, index, element) {
    const groupArray = portafolio[group];

    if (groupArray && groupArray.length > index) {
        const item = groupArray[index];
        if (item.src) { // Si es una imagen
            const img = imgOnLoad(item.src, item.alt, item.className, item.id, item.loading);
            element.appendChild(img);
        } else if (item.description) { // Si es una descripción
            const figcaption = document.createElement('figcaption');
            const btnSeeMorePhoto = createButton('cta-SeeMorePhoto','Ver Fotos',()=>{});
            
            figcaption.className = 'description';
            figcaption.innerText = item.description;
            figcaption.appendChild(btnSeeMorePhoto);
            element.appendChild(figcaption);
        }
    }
}

// Función para generar el botón para un grupo específico
export function addButtonToSlide(groupArray, container) {
    if (groupArray && groupArray.length > 0) {
        const button = document.createElement('button');
        button.className = 'btn-filter';
        button.innerText = groupArray[0].nameID; // Usamos el nameID del primer elemento
        container.appendChild(button);
    }
}


// Función para generar el portafolio
export function generatePortfolio() {
    const portafolio = image.portafolio;

    Object.keys(portafolio).forEach(group => {
        const { container, figure } = createCard('container-slide');

        // Agregar la imagen con el índice 1
        addItemToElement(portafolio, group, 1, figure);

        // Agregar la descripción con el índice 0
        addItemToElement(portafolio, group, 0, figure);

        // Generar el botón para este slide
        addButtonToSlide(portafolio[group], container);
    });
}