document.addEventListener('DOMContentLoaded',function(){
    const portada = document.querySelector('.portada-home');
    const darkGlass = document.querySelector('.portafolio-mobile');
    const photos = document.querySelector('.photos');

    setTimeout(function(){
        portada.style.transform = 'scale(1)';
        darkGlass.style.backgroundColor = 'rgba(0, 0, 0, 0.65)';
        photos.style.opacity = 1;
        photos.style.transform = 'scale(1)';
    },1000)
});