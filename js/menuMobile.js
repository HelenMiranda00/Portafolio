import {isElementInViewport} from './utils.js';
const btnMenu = document.getElementById('button-menu');
const menuMobile = document.getElementById('menu-mobile');

btnMenu.addEventListener('click', () => {
    
    const [...spanList] = btnMenu.children;
    if (isElementInViewport(menuMobile)) {
        btnMenu.style.gap = '0.3rem';
        spanList.forEach(span => {
            span.style.opacity = 1;
            span.style.transform = 'rotateZ(0)'
        })

        menuMobile.style.transform = 'translateX(-105%)';
        
    } else {
        btnMenu.style.gap = 0;
    
        spanList.forEach((span, index) => {
            if(index === 0) {
              span.style.transform = 'rotateZ(45deg) translateY(3px)';
            }
            if(index === 1) {
                span.style.transform = 'rotateZ(-45deg)';
            }
            if(index === 2) {
                span.style.opacity = 0;
            }
        });
        
        menuMobile.style.transform = 'translateX(0)';

    }
});