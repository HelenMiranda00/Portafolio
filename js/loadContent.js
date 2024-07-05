export async function loadComponent (url, containerID) {
  try {
    const response = await fetch(url);
    const html = await response.text();
    document.getElementById(containerID).innerHTML = html;
  } catch (error) {
    console.error('Error fetching content:', error);
  }
}

// // funcion para cargar las secciones.
// export const loadContent = async (url, containerID) => {
//   await fetch(url)
//     .then(res => res.text())
//     .then(html => { document.getElementById(containerID).innerHTML = html })
//     .catch(error => { console.error('Error al cargar el contenido: ', error) })
// };
