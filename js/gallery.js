import { imgOnLoad } from "./utils.js";

const portafolio = {
    retratoGroup1: [
        { src: '../assets/img/retrato/retrato-group-1/retrato-00.jpg', alt: 'Retrato de chica de medio cuerpo con traje rojo, manos en la cabeza, fondo marrón y rojo vino' },
        { src: '../assets/img/retrato/retrato-group-1/retrato-01.jpg', alt: 'Retrato de perfil de chica con traje rojo y chaqueta marrón, fondo marrón y rojo vino' },
        { src: '../assets/img/retrato/retrato-group-1/retrato-02.jpg', alt: 'Chica sentada de espalda con traje rojo mirando la cámara, mano en el hombro, fondo marrón y rojo vino' },
        { src: '../assets/img/retrato/retrato-group-1/retrato-03.jpg', alt: 'Chica acostada de lado con traje rojo, apoyada en el codo, fondo marrón y rojo vino' },
        { src: '../assets/img/retrato/retrato-group-1/retrato-04.jpg', alt: 'Chica agachada con traje rojo, manos tocando el suelo, mirando hacia arriba, fondo marrón y rojo vino' }
    ],
    retratoGroup2: [
        { src: '../assets/img/retrato/retrato-group-3/retrato-00.jpg', alt: 'Chica latina de perfil con top caqui pastel, brazos cruzados, rostro inclinado hacia la cámara con ojos cerrados, fondo verde difuminado y rocas grises' },
        { src: '../assets/img/retrato/retrato-group-3/retrato-01.jpg', alt: 'Chica latina agachada con top caqui pastel, brazos cruzados sobre las rodillas, mirada seria hacia la cámara, fondo verde y rocas claras' },
        { src: '../assets/img/retrato/retrato-group-3/retrato-02.jpg', alt: 'Acercamiento de rostro de chica latina con top caqui pastel, perfil girado hacia la cámara, cabello abultado, mirada seria por encima del hombro, fondo verde y rocas grises' },
        { src: '../assets/img/retrato/retrato-group-2/retrato-00.jpg', alt: 'Chica de perfil con vestido blanco y hojas azules en un parque, brazo posado en el vientre' },
        { src: '../assets/img/retrato/retrato-group-2/retrato-01.jpg', alt: 'Chica de frente con vestido blanco y hojas azules, brazo cruzado y rostro apoyado en la mano, camino de ladrillos, árboles verdes' },
        { src: '../assets/img/retrato/retrato-group-2/retrato-02.jpg', alt: 'Chica de perfil con vestido blanco y hojas azules, mirando hacia arriba, manos cruzadas en el vientre, mucha luz natural' },
        { src: '../assets/img/retrato/retrato-group-4/retrato-00.jpg', alt: 'Acercamiento de chica con rasgos indígenas, con vestido color pastel, apoyada en una raíz de árbol, mirando hacia arriba, fondo natural difuminado' },
        { src: '../assets/img/retrato/retrato-group-4/retrato-01.jpg', alt: 'Chica con rasgos indígenas posando de perfil, vestida de color pastel, sobre una pequeña roca en un río, mirando al cielo, manos cruzadas en su vientre, fondo natural con árboles y hojas detalladas' },
        { src: '../assets/img/retrato/retrato-group-4/retrato-02.jpg', alt: 'Chica con rasgos indígenas de cuerpo entero, sentada en una raíz, vestida de color pastel, manos cruzadas apoyadas en sus muslos, mirando fijamente a la cámara, fondo natural con árboles' },
        { src: '../assets/img/retrato/retrato-group-4/retrato-03.jpg', alt: 'Acercamiento de rostro de chica con rasgos indígenas, recostada de lado en una raíz, vestida de color pastel, mirada pensativa y feliz, fondo natural con árboles difuminados' },
    ],
    retratoGroup3: [
        { src: '../assets/img/retrato/retrato-group-5/retrato-00.jpg', alt: 'Chica latina con vestuario de heavy metal, sentada sobre una bocina, tocando una guitarra negra, mirando la guitarra, fondo blanco y celeste' },
        { src: '../assets/img/retrato/retrato-group-5/retrato-01.jpg', alt: 'Chica latina con vestuario de heavy metal, de espaldas con guitarra blanca y roja, sosteniéndola sobre una bocina, mirando la guitarra, fondo naranjado y amarillo' },
        { src: '../assets/img/retrato/retrato-group-5/retrato-02.jpg', alt: 'Chica latina con vestuario de heavy metal, sentada en el suelo con piernas abiertas, guitarra apoyada en el suelo y en su hombro, mirando hacia arriba, fondo amarillo y blanco' },
        { src: '../assets/img/retrato/retrato-group-5/retrato-03.jpg', alt: 'Chica latina con vestuario de heavy metal, acostada boca abajo, apoyada en sus codos, mirando fijamente a la cámara, guitarra y bocina al lado, fondo amarillo y blanco' },
        { src: '../assets/img/retrato/retrato-group-5/retrato-04.jpg', alt: 'Chica latina con vestuario de heavy metal, acostada mirando hacia arriba mientras le toman la foto desde arriba, apoyando su mejilla en su brazo, guitarra y bocina cerca, fondo amarillo y blanco' },
    ],
};

const containers = document.querySelectorAll('.container');

function displayPhotos(container, photos) {
    container.innerHTML = ''; // Clear existing content
    photos.forEach(photo => {
        const img = imgOnLoad(photo.src, photo.alt);
        container.appendChild(img);
    });
}

function setActiveContainer(index) {
    containers.forEach((container, i) => {
        if (i === index) {
            container.classList.remove('hidden');
            container.classList.add('active');
        } else {
            container.classList.add('hidden');
            container.classList.remove('active');
        }
    });
}

// Inicializar las fotos en los contenedores
displayPhotos(document.getElementById('container-1'), portafolio.retratoGroup1);
displayPhotos(document.getElementById('container-2'), portafolio.retratoGroup2);
displayPhotos(document.getElementById('container-3'), portafolio.retratoGroup3);

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

// Aplicar el filtro desde la pagina index.html
window.onload = function(){
    if (window.location.hash) {
        const filterID = window.location.hash.substring(1);
        if (filterID === 'filter-retrato-1') setActiveContainer(0);
        if (filterID === 'filter-retrato-2') setActiveContainer(1);
        if (filterID === 'filter-retrato-3') setActiveContainer(2);
    }
}
// Apicar los filtros por medio del click
document.getElementById('filter-retrato-1').onclick = function () {
    setActiveContainer(0);
};

document.getElementById('filter-retrato-2').onclick = function () {
    setActiveContainer(1);
};

document.getElementById('filter-retrato-3').onclick = function () {
    setActiveContainer(2);
};