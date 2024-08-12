import { API_KEY, baseId, gallery_nature, gallery_studio } from "../API.js";
import { fetchAPI, getImage } from "./fetchAPI.js";
import { imgOnLoad } from "./utils.js";

const viewModal = () => {
    // Modal
    const gallery = document.querySelector('main .active');
    const images = gallery.querySelectorAll('img');
    const modal = document.querySelector('#modal');
    const modalImg = document.querySelector('#modal-img');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    let currentIndex = 0;

    // Show modal with selected image
    function showModal(index) {
        if (index < 0 || index >= images.length) return;
        currentIndex = index;
        const img = images[index];
        modalImg.src = img.src;
        modal.style.transform = 'scale(1)';
        modal.style.opacity = '1';
    }
    // Close modal
    function closeModal() {
        modal.style.transform = 'scale(0)';
        modal.style.opacity = '0';
    }
    // Show previous image
    function showPrevImage() {
        currentIndex = (currentIndex - 1 + images.length) < 0 ? images.length - 1 : (currentIndex - 1 + images.length) % images.length;
        showModal(currentIndex);
    }
    // Show next image
    function showNextImage() {
        currentIndex = (currentIndex + 1) % images.length;
        showModal(currentIndex);
    }
    // Image click event
    images.forEach((img, index) => {
        img.addEventListener('click', () => {
            showModal(index);
        });
    });

    // Previous button click event
    prevBtn.addEventListener('click', showPrevImage);

    // Next button click event
    nextBtn.addEventListener('click', showNextImage);

    // Close modal on click outside of modal-content
    modal.addEventListener('click', (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });

    // Keyboard navigation
    document.addEventListener('keydown', (event) => {
        if (modal.style.display === 'flex') {
            if (event.key === 'ArrowLeft') {
                showPrevImage();
            } else if (event.key === 'ArrowRight') {
                showNextImage();
            } else if (event.key === 'Escape') {
                closeModal();
            }
        }
    });
}

function displayPhotos(container, photos) {
    container.innerHTML = ''; // Clear existing content
    photos.forEach(photo => {
        const img = imgOnLoad(photo.image, photo.alt, photo.title);
        container.appendChild(img);
    });
}

// Funcion para activar las cajas de las imagenes
const setActiveContainer = (listContainer, index) => {
    listContainer.forEach((container, i) => {
        if (i === index) {
            container.classList.remove('hidden');
            container.classList.add('active');
        } else {
            container.classList.add('hidden');
            container.classList.remove('active');
        }
    });
};

function createAndDisplayBox(index, indexTarget, className, activeClass, dataListImage, containerBox) {
    if (index === indexTarget) {
        const box = document.createElement('div');
        box.classList.add(className);
        
        if (activeClass) box.classList.add(activeClass);

        displayPhotos(box, dataListImage);
        containerBox.appendChild(box);
        viewModal();
    }
}

const ArrayImageStudio = `https://api.airtable.com/v0/${baseId}/${gallery_studio}?listRecords&view=retrato_studio`;
const ArrayImageNature = `https://api.airtable.com/v0/${baseId}/${gallery_nature}?listRecords&view=retrato_nature`;
const dataStudio = fetchAPI(ArrayImageStudio, API_KEY);
const dataNature = fetchAPI(ArrayImageNature, API_KEY);
const btn_filterStudio = document.getElementById('filter-studio');
const btn_filterNature = document.getElementById('filter-nature');
// container general
const main = document.querySelector('main');
// container for images
const [...containers] = main.children;

// show for default first container
containers.forEach((cont, index) => {
    if (index === 0) {
        cont.classList.remove('hidden');
        cont.classList.add('active');
    } else {
        cont.classList.remove('active');
        cont.classList.add('hidden');
    }
});

// Aplicar el filtro desde la pagina index.html
window.onload = function () {
    if (window.location.hash) {
        const filterID = window.location.hash.substring(1);
        if (filterID === 'filter-studio') setActiveContainer(containers, 0);
        if (filterID === 'filter-nature') setActiveContainer(containers, 1);
    }
    viewModal();
}

dataStudio.then(data => {
    // get list image
    const dataListImage = getImage(data.records);

    containers.forEach((containerBox, index) => {
        createAndDisplayBox(index, 0, 'boxImage', 'active', dataListImage, containerBox);

        // Apicar los filtros por medio del click
        btn_filterStudio.onclick = function () {
            setActiveContainer(containers, 0);
            viewModal();
        };
    });
}).catch(error => { console.error(error) });

// Gallery for photos Natures
dataNature.then(data => {
    // get list image
    const dataListImage = getImage(data.records);

    containers.forEach((containerBox, index) => {
        createAndDisplayBox(index, 1, 'boxImage', 'active', dataListImage, containerBox);

        // Apicar los filtros por medio del click
        btn_filterNature.onclick = function () {
            setActiveContainer(containers, 1);
            viewModal();
        };
    });
}).catch(error => { console.error(error) });

// Obtener el botón
const scrollToTopBtn = document.getElementById("scrollToTopBtn");

// Mostrar el botón cuando el usuario baja 100 píxeles desde la parte superior del documento
window.onscroll = function () {
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        scrollToTopBtn.classList.add("show");
    } else {
        scrollToTopBtn.classList.remove("show");
    }
};
// Cuando el usuario hace clic en el botón, desplázate hacia arriba
scrollToTopBtn.onclick = function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
};