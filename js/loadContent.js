// funcion para cargar las secciones.
export const loadContent = (url, containerID) => {
    fetch(url)
      .then(res => res.text())
      .then(html => {document.getElementById(containerID).innerHTML = html})
      .catch(error => {console.error('Error al cargar el contenido: ', error)})
};