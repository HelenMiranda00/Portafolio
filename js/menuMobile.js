const btn_Menu = document.getElementById('button-menu');

btn_Menu.addEventListener('click', () => {

    if (btn_Menu.children[2].classList.contains('open-menu')) {
       
        btn_Menu.children[0].classList.remove('span-1');
        btn_Menu.children[1].classList.remove('span-2');
        btn_Menu.children[2].classList.remove('open-menu');
    } else {
        btn_Menu.children[2].classList.add('open-menu');
        btn_Menu.children[0].classList.add('span-1');
        btn_Menu.children[1].classList.add('span-2');
    }
});