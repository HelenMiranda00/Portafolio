export async function loadComponent (url, containerID) {
  try {
    const response = await fetch(url);
    const html = await response.text();
    document.getElementById(containerID).innerHTML = html;
  } catch (error) {
    console.error('Error fetching content:', error);
  }
}