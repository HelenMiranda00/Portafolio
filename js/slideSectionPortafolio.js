// animacion para los slide del portafolio
document.addEventListener('DOMContentLoaded', () => {
    const filterButtons = document.querySelectorAll('.btn-filter');
    const slides = document.querySelectorAll('.slide');

    filterButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            slides.forEach((slide, slideIndex) => {
                if (slide.classList.contains('animate')) {
                    slide.classList.remove('animate');
                    slide.classList.add('close-animate');
                    // retraso de 2s para eliminar la class
                    setTimeout(() => {
                        slide.classList.remove('close-animate');
                    }, 2000);
                }
            });
            // animar slide equivalente al boton por medio de su index equivalente al slide.
            slides[index].classList.add('animate');
        });
    });
});
