let startCard = 0;
let cardsForPage = 0;

function calculateCards() {
    if (window.innerWidth < 768) {
        cardsForPage = 3;
    } else if (window.innerWidth < 1280) {
        cardsForPage = 6;
    } else {
        cardsForPage = 8;
    }
    startCard = Math.min(startCard,Math.max(pets.length-cardsForPage,0))

}

document.addEventListener('DOMContentLoaded', () => {
    const burgerMenu = document.querySelector('.burger-menu');
    const navigationMenu = document.querySelector('.header__navigation');
    const overlay = document.querySelector('.overlay');
    const navigationLinks = document.querySelectorAll('.navigation_link');

    function updateButtonStates() {
        arrowLeftButton.disabled = startCard === 0;
        arrowLeftButton.classList.toggle('disabled', startCard === 0);

        arrowRightButton.disabled = startCard >= pets.length - 3;
        arrowRightButton.classList.toggle('disabled', startCard >= pets.length - 3);
    }


    function setInactive(elementActive) {
        elementActive.classList.add('inactive');
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


    function handleClickOutside(event) {
        if (navigationMenu.classList.contains('active')) {
            if (!navigationMenu.contains(event.target) && !burgerMenu.contains(event.target)) {
                hideMenu();
            }
        }
    }
    function handleResize() {
        calculateCards(); // Пересчитать количество карточек
        createCards();
        if (window.innerWidth >= 768) {
            hideMenu()
        }
    }

    function toggleMenu() {
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

    calculateCards();
    loadPets()
        .then(data => {
            pets = data;
            createCards();
        });
    createCards();

    // Обработчик изменения размера окна
    window.addEventListener('resize', handleResize);
    handleResize();
    document.addEventListener('click', handleClickOutside);

   // arrowLeftButton.addEventListener('click', handleArrowLeftClick);
   // arrowRightButton.addEventListener('click', handleArrowRightClick);

    navigationLinks.forEach(link => {
        link.addEventListener('click', toggleMenu);
    });
    setInactive(document.getElementById('our-pets'));

    if (burgerMenu) {
        burgerMenu.addEventListener('click', toggleMenu);
    }

    document.getElementById('button-much-less').classList.add('disabled');
    document.getElementById('button-less').classList.add('disabled');
    document.getElementById('button-center').classList.add('inactive');

});

