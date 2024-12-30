const burgerMenu = document.querySelector('.burger-menu');

const navigationMenu = document.querySelector('.nav-menu');
const navigationLinks = document.querySelectorAll('.nav-menu-item');

const modalWindow = document.querySelector('.modal-window');
const modalWindowButton = document.querySelector('.button-close');

function setInactive(elementActive) {
    elementActive.classList.add('inactive');
}

function openPopupMenu(numberArray) {
    if (overlay) {
        overlay.classList.add('active');
        document.body.classList.add('no-scroll')
    }
    if (modalWindow) {
        modalWindow.classList.add('active');
        // fillModalWindow(numberArray);
    }
    if (modalWindowButton) {
        modalWindowButton.classList.add('active');
    }
    burgerMenu.style.zIndex = '800';
}

function closePopupMenu() {
    if (overlay) {
        overlay.classList.remove('active');
        document.body.classList.remove('no-scroll')
    }
    if (modalWindow) {
        modalWindow.classList.remove('active');
    }
    if (modalWindowButton) {
        modalWindowButton.classList.remove('active');
    }
    burgerMenu.style.zIndex = '999';
}

function hideMenu() {
    if (burgerMenu) {
        burgerMenu.classList.remove('active');
    }
    if (navigationMenu) {
        navigationMenu.classList.remove('active');
    }
    if (overlay) {
        overlay.classList.remove('active');
    }
    document.body.classList.remove('no-scroll');
}

document.addEventListener('DOMContentLoaded', () => {
    function handleClickOutside(event) {
        if (navigationMenu.classList.contains('active')) {
            if (modalWindow) {
                if (modalWindow.classList.contains('active')) {
                    return;
                }
            }
            if (!navigationMenu.contains(event.target) && !burgerMenu.contains(event.target)) {
                hideMenu();
            }
        }
    }

    function toggleMenu() {
        if (window.innerWidth <= 768) {
            if (modalWindow) {
             if (modalWindow.classList.contains('active')) {
                 return;
             }
            }
            burgerMenu.classList.toggle('active');
            if (navigationMenu) {
                navigationMenu.classList.toggle('active');
            }
            if (navigationMenu.classList.contains('active')) {
                document.body.classList.add('no-scroll');
            } else {
                document.body.classList.remove('no-scroll');
            }
        }
    }

    function handleResize() {
        calculateCards(); // Пересчитать количество карточек
        if (window.innerWidth > 768) {
            if (modalWindow) {
                if (modalWindow.classList.contains('active')) {
                    return;
                }
            }
            if (navigationMenu) {
                navigationMenu.classList.remove('action-large');
            }
            hideMenu()
        }
        else {
            if (navigationMenu) {
                navigationMenu.classList.add('action-large');
            }
        }
    }

    calculateCards();
    loadGifts()
        .then(data => {
            gifts = data;
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

    if (modalWindowButton) {
        modalWindowButton.addEventListener('click', closePopupMenu);
    }

    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            closePopupMenu();
        }
    })
});