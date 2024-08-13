import { API_KEY, baseId, gallery_nature, gallery_studio } from "../API.js";
import { fetchAPI, getImage } from "./fetchAPI.js";
import { imgOnLoad } from "./utils.js";

const viewModal = () => {
    // Modal
    const gallery = document.querySelector('main .active');
    const images = gallery.querySelectorAll('.boxImage');
    const modal = document.querySelector('#modal');
    const modalImg = document.querySelector('#modal-img');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    let currentIndex = 0;

    // Show modal with selected image
    function showModal(index) {
        if (index < 0 || index >= images.length) return;
        currentIndex = index;
        const img = images[index].firstElementChild;
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

// Funtion for active the container
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

function applyRandomClasses() {
    const imageBoxes = document.querySelectorAll('.image-box');
    const sizes = ['size-small', 'size-medium', 'size-large'];
    const shapes = ['shape-rectangle', 'shape-square'];

    imageBoxes.forEach(box => {
        const randomSize = sizes[Math.floor(Math.random() * sizes.length)];
        const randomShape = shapes[Math.floor(Math.random() * shapes.length)];
        box.classList.add(randomSize, randomShape);
    });
}

function processImageList(imageList, container) {
    imageList.forEach((image) => {
        const box = document.createElement('div');
        box.classList.add('boxImage');
        const img = imgOnLoad(image.image, image.alt, image.title);
        box.appendChild(img);
        container.appendChild(box);
    });
};

const btn_filterStudio = document.getElementById('filter-studio');
const btn_filterNature = document.getElementById('filter-nature');
// general container
const main = document.querySelector('main');
// Container for the images of a specific class
const [...containers] = main.children;

const loadContent_PhotoStudio = () => {
    const ArrayImageStudio = `https://api.airtable.com/v0/${baseId}/${gallery_studio}?listRecords&view=retrato_studio`;
    const dataStudio = fetchAPI(ArrayImageStudio, API_KEY);

    // Gallery for photos Studio
    dataStudio.then(data => {
        // get list image
        const dataListImage = getImage(data.records);
        processImageList(dataListImage, containers[0]);
        viewModal()

    }).catch(error => { console.error(error) });
};

const loadContent_PhotoNature = () => {
    const ArrayImageNature = `https://api.airtable.com/v0/${baseId}/${gallery_nature}?listRecords&view=retrato_nature`;
    const dataNature = fetchAPI(ArrayImageNature, API_KEY);

    // Gallery for photos Natures
    dataNature.then(data => {
        // get list image
        const dataListImage = getImage(data.records);
        processImageList(dataListImage, containers[1]);
        viewModal();

    }).catch(error => { console.error(error) });
};

// Apply the filter from the index.html page
window.onload = function () {
    if (window.location.hash) {
        const filterID = window.location.hash.substring(1);
        if (filterID === 'filter-studio') {
            setActiveContainer(containers, 0);
            loadContent_PhotoStudio();
        };

        if (filterID === 'filter-nature') {
            setActiveContainer(containers, 1);
            loadContent_PhotoNature();
        };
    };

    // Apicar los filtros por medio del click
    btn_filterStudio.onclick = function () {
        setActiveContainer(containers, 0);
        loadContent_PhotoStudio();
    };

    // Apply filters through click
    btn_filterNature.onclick = function () {
        setActiveContainer(containers, 1);
        loadContent_PhotoNature();
    };

    // Get the button
    const scrollToTopBtn = document.getElementById("scrollToTopBtn");
    
    // Show the button when the user scrolls down 100 pixels from the top of the document
    window.onscroll = function () {
        if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
            scrollToTopBtn.classList.add("show");
        } else {
            scrollToTopBtn.classList.remove("show");
        }
    };
    // When the user clicks the button, scroll to the top
    scrollToTopBtn.onclick = function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
};