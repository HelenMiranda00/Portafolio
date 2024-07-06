import { image } from "./imgUrl.js";

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
export function createCard(parentID, containerElement, figureElement, callback) {
    const parent = document.getElementById(parentID);
    const container = document.createElement(containerElement);
    container.className = 'slide';
    
    const figure = document.createElement(figureElement);
    
    callback(figure);
    
    container.appendChild(figure);
    parent.appendChild(container);
};

// Función para iterar y crear las cards
export function generatePortfolio() {
    const portafolio = image.portafolio;

    Object.keys(portafolio).forEach(group => {
        createCard('container-slide', 'div', 'figure', figure => {
            portafolio[group].forEach(imgData => {
                const img = imgOnLoad(imgData.src, imgData.alt, imgData.className, imgData.id, imgData.loading);
                figure.appendChild(img);
            });
        });
    });
}