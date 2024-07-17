/**
 * Elimina una clase de un elemento si la tiene, si no, devuelve un mensaje en consola.
 * 
 * @param {HTMLElement} element - El elemento DOM al que se le va a eliminar la clase.
 * @param {string} classToRemove - El nombre de la clase que se va a eliminar.
 */
export const removeClassIfExists = (element, classToRemove) => {
    if (element.classList.contains(classToRemove)) {
        element.classList.remove(classToRemove);
    } else {
        console.log("El elemento no contiene la 'class' espesificada");
    }
};

/**
 * Verifica si un elemento tiene una clase específica y, si no la tiene, la añade.
 * 
 * @param {HTMLElement} element - El elemento DOM al que se va a verificar y añadir la clase.
 * @param {string} classToVerify - El nombre de la clase que se va a verificar y añadir si no está presente.
 */
export const verifyAndAddClass = (element, classToVerify) => {
    if (!element.classList.contains(classToVerify)) {
        element.classList.add(classToVerify);
    }
};

/**
 * Itera sobre cada elemento del array y lo agrega al contenedor.
 * @param {Array} array - Array de elementos a agregar.
 * @param {HTMLElement} container - Contenedor donde se agregarán los elementos.
 */
export function AddElementsToContainer(array, container) {
    array.forEach(element => {
        container.appendChild(element);
    });
};

/**
 * Crea un botón HTML con los parámetros especificados.
 * @param {string} className - Clase o clases CSS para el botón.
 * @param {string} content - Contenido del botón (texto o HTML).
 * @param {function} onClickHandler - Función que se ejecutará cuando se haga clic en el botón.
 * @param {string} [href='#'] - URL para el atributo href del botón. Valor predeterminado es '#'.
 * @returns {HTMLElement} - El elemento del botón creado.
 */
export function createButton(className, content, onClickHandler, href = "#") {
    const button = document.createElement('a');
    button.className = className;
    button.innerHTML = content;
    button.href = href;

    if (typeof onClickHandler === 'function') {
        button.addEventListener('click', onClickHandler);
    }

    return button;
};

/**
 * Muestra una serie de diapositivas/elementos dentro de un contenedor, alternando entre ellas automáticamente.
 * @param {string} classOfElements - La clase CSS que identifica los elementos a mostrar.
 * @param {HTMLElement} container - El contenedor que contiene los elementos.
*/
let elementIndex = 0;
export function showElements(classOfElements, container) {
    const elements = container.getElementsByClassName(classOfElements);
    for (let i = 0; i < elements.length; i++) {
        elements[i].style.opacity = '0';
    }

    elementIndex++;

    if (elementIndex > elements.length) {
        elementIndex = 1;
    }
    elements[elementIndex - 1].style.opacity = '1';
    setTimeout(() => showSlides(classOfElements, container), 8000); // Change image every 8 seconds
};

/**
 * Verifica si un elemento con un ID especificado existe en el DOM.
 * @param {string} targetElementId - El ID del elemento a verificar.
 * @returns {HTMLElement|null} - El elemento si existe, o null si no se encuentra.
 */
export function VerifyExistElement(targetElementId) {
    const targetElement = document.getElementById(targetElementId);
    if (!targetElement) {
        console.error(`Element with id "${targetElementId}" not found.`);
        return null;
    }
    return targetElement;
};

/**
 * Ajusta las dimenciones de un elemento especifico que exista en el DOM en funcion de las medidas del viewport.
 * @param {string} targetElement - El elemento para ajustar sus dimenciones.
 */
export function autoSize(targetElement) {
    let height = document.documentElement.clientHeight / 16;
    let width = document.documentElement.clientWidth / 16;
    targetElement.style.width = width + 'rem';
    targetElement.style.height = height + 'rem';
}
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