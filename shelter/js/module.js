
// document.addEventListener('DOMContentLoaded', () => {
//     function windowOnload() {
//         // Преобразуем массив в JSON-формат
//         const petsContent = JSON.stringify(pets, null, 2);
//
//         // Создаем объект Blob для хранения данных
//         const blob = new Blob([petsContent], { type: 'application/json' });
//
//         // Создаем ссылку для скачивания файла
//         const link = document.createElement('a');
//         link.href = URL.createObjectURL(blob);
//         link.download = 'pets.json'; // Файл будет называться pets.json
//
//         // Автоматически кликаем на ссылку для скачивания файла
//         link.click();
//         // Освобождаем URL для Blob
//         URL.revokeObjectURL(link.href);
//     }
//     windowOnload();
// });
let startCard = 0;
let cardsForPage = 0;

function setInactive(elementActive) {
    elementActive.classList.add('inactive');
}

document.addEventListener('DOMContentLoaded', () => {
    const burgerMenu = document.querySelector('.burger-menu');
    const navigationMenu = document.querySelector('.header__navigation');
    const overlay = document.querySelector('.overlay');
    const navigationLinks = document.querySelectorAll('.navigation_link');


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
    navigationLinks.forEach(link => {
        link.addEventListener('click', toggleMenu);
    });

    if (burgerMenu) {
        burgerMenu.addEventListener('click', toggleMenu);
    }

});
