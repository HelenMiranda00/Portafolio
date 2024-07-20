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
export function imgOnLoad(url, alt = '', className = '', id = '', loading = 'lazy') {
    const img = new Image();
    img.src = url;
    img.onload = function () {
        if (alt) img.alt = alt;
        if (className) img.className = className;
        if (id) img.id = id;
        if (loading) img.loading = loading;
    };
    img.onerror = function () {
        console.error('Error al cargar la imagen.')
    };
    return img;
};