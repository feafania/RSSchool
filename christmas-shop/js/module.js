
function setInactive(elementActive) {
    elementActive.classList.add('inactive');
}


document.addEventListener('DOMContentLoaded', () => {

    function handleClickOutside(event) {
        if ((navigationMenu.classList.contains('active')) && !modalWindow.classList.contains('active')) {
            if (!navigationMenu.contains(event.target) && !burgerMenu.contains(event.target)) {
                hideMenu();
            }
        }
    }

    function toggleMenu() {
         if ((window.innerWidth < 768) && !modalWindow.classList.contains('active')) {
            burgerMenu.classList.toggle('active');
            if (navigationMenu) {
                navigationMenu.classList.toggle('active');
            }
            if (overlay) {
                overlay.classList.toggle('active'); // Переключаем слой затемнения
            }
            if (navigationMenu.classList.contains('active')) {
                document.body.classList.add('no-scroll');
            } else {
                document.body.classList.remove('no-scroll');
            }
        }
    }
    calculateCards();
    loadPets()
        .then(data => {
            pets = data;
            calculateCards();
            createCards();
        });
    createCards();

    // Обработчик изменения размера окна
    window.addEventListener('resize', handleResize);
    handleResize();
    document.addEventListener('click', handleClickOutside);
    navigationLinks.forEach(link => {
        link.addEventListener('click', toggleMenu);
    });

    if (burgerMenu) {
        burgerMenu.addEventListener('click', toggleMenu);
    }

    if (overlay) {
        overlay.addEventListener('click', closePopupMenu);
    }

    if (buttonClose) {
        buttonClose.addEventListener('click', closePopupMenu);
    }

    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            closePopupMenu();
        }
    })
});
