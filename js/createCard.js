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