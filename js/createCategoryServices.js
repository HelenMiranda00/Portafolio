import { serviciosDeFotografia } from './arrayCategory.js';

function cargarImagen(url, alt, loading = "lazy") {
    const img = new Image();
    img.src = url;
    img.alt = alt;
    img.loading = loading;
    img.onerror = () => {
        img.src = "ruta/a/la/imagen-de-error.jpg"; // Imagen de respaldo
    };
    return img;
}

document.addEventListener("DOMContentLoaded", () => {
    const packagesContainer = document.querySelector("#services .packages");

    serviciosDeFotografia.forEach(categoria => {
        if (categoria.titulo) {
            const categoryDiv = document.createElement("div");
            categoryDiv.classList.add("package-category");

            const categoryTitle = document.createElement("h3");
            categoryTitle.textContent = categoria.titulo;
            categoryDiv.appendChild(categoryTitle);

            const listCategory = document.createElement("div");
            listCategory.classList.add("list-category");

            // Create Cards
            categoria.paquetes.forEach(paquete => {
                
                //  Card
                const card = document.createElement("div");
                card.classList.add("package");

                // img
                const packageImage = cargarImagen(paquete.imagen, paquete.titulo);
                card.appendChild(packageImage);

                // Package-details 
                const packageDetails = document.createElement("div");
                packageDetails.classList.add("package-details");
                card.appendChild(packageDetails)

                // Details: 

                // title
                const packageTitle = document.createElement("h3");
                packageTitle.textContent = paquete.titulo;
                packageDetails.appendChild(packageTitle);

                // description Title
                const desTitle = document.createElement('h4');
                desTitle.textContent = paquete.desTitle;
                packageDetails.appendChild(desTitle);

                // Price
                const packagePrice = document.createElement("p");
                packagePrice.textContent = paquete.precio;
                packageDetails.appendChild(packagePrice);

                // List Details
                const detailsList = document.createElement("ul");
                paquete.detalles.forEach(detalle => {
                    const listItem = document.createElement("li");
                    listItem.textContent = detalle;
                    detailsList.appendChild(listItem);
                });
                packageDetails.appendChild(detailsList);

                // Button
                const packageButton = document.createElement("button");
                packageButton.textContent = paquete.botonTexto;
                packageDetails.appendChild(packageButton);

                // Add card in list category
                listCategory.appendChild(card);
            });

            categoryDiv.appendChild(listCategory);
            packagesContainer.appendChild(categoryDiv);
        }
    });
});