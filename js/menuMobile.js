document.addEventListener('DOMContentLoaded', function () {
    const menuMobile = document.getElementById('menu-mobile');
    const btnOpenMenu = document.getElementById('open-menu');
    const btnCloseMenu = document.getElementById('close-menu');
    
    function timeOut(elementVisible, elementHidden) {
        setTimeout(function(){
            elementVisible.style.opacity = 0;
            elementHidden.style.opacity = 1;
        },100)
    }
    btnOpenMenu.addEventListener('click', function () {
        menuMobile.style.transform = 'translateX(0)';
        timeOut(btnOpenMenu, btnCloseMenu);
    });

    btnCloseMenu.addEventListener('click', function () {
        menuMobile.style.transform = 'translateX(-110%)';
        timeOut(btnCloseMenu, btnOpenMenu);
    });
});