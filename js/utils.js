/**
 * Funcion para verificar si el elemento esta en el Viewport
 * @param {string} element - El elemento a verificar 
 * @returns {bulean} - devuelve true si el elemento esta visible y false si no.
 */
export function isElementInViewport(element) {
    // obtenemos las dimenciones del elemento html
    let rect = element.getBoundingClientRect();
    // se evaluan todas las caras del elemento y de existir seria true o false en caso contrario.
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

/**
 * Verifica si un elemento está dentro del viewport.
 *
 * @param {HTMLElement} element - El elemento HTML a verificar.
 * @returns {boolean} - Retorna true si el elemento está dentro del viewport, de lo contrario false.
 *
 * La función obtiene las dimensiones del viewport y posición del elemento en el viewport
 * usando `getBoundingClientRect()` y evalúa si el top y bottom del elemento
 * (superior e inferior) están dentro de los límites del medio inferior del viewport
 * (la mitad inferior de la ventana gráfica visible del navegador).
 */

export function isElementMiddleViewport(element) {
    const midViewPort = window.innerHeight / 2;
    let topElement = element.getBoundingClientRect().top;
    let bottomElement = element.getBoundingClientRect().bottom;
    let heightElement = element.getBoundingClientRect().height / 4;

    if (
        topElement < 0 && bottomElement < (midViewPort - heightElement) || 
        topElement > midViewPort) {

        return false;
    }
    else {
        return true;
    }
}

/**
 * Funcion para cargar elementos html por medio de su ID
 * @param {string} url - url/ruta del elmento a agregar 
 * @param {string} containerID - Id del elemento a agregar
 */
export async function loadComponent(url, containerID) {
    try {
        const response = await fetch(url);
        const html = await response.text();
        document.getElementById(containerID).innerHTML = html;
    } catch (error) {
        console.error('Error fetching content:', error);
    }
}

/**
 * Funcion para cargar una imagen
 * @param {string} url - url/ruta de la img
 * @param {string} alt - atributo alt de la img, por defecto vacio
 * @param {string} className - atributo class de la img, por defecto vacio
 * @param {string} id - atributo ID de la img, por defecto vacio
 * @param {string} loading - atributo loading de la img, por defecto "lazy"
 * @returns devuelve la img cargada.
 */
export function imgOnLoad(url, alt = '', title='', id = '', className='', loading = 'lazy') {
    const img = new Image();
    img.src = url;
    img.onload = function () {
        if (alt) img.alt = alt;
        if (title) img.title = title;
        if (className) img.className = className;
        if (id) img.id = id;
        if (loading) img.loading = loading;
    };
    img.onerror = function () {
        console.error('Error al cargar la imagen.');
    };
    return img;
};