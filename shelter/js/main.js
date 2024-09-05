let startCard = 0;
let cardsForPage = 0;

function calculateCards() {
    if (window.innerWidth < 768) {
        cardsForPage = 1;
    } else if (window.innerWidth < 1280) {
        cardsForPage = 2;
    } else {
        cardsForPage = 3;
    }
    startCard = Math.min(startCard,Math.max(pets.length-cardsForPage,0))
}

document.addEventListener('DOMContentLoaded', () => {
    const arrowLeftButton = document.querySelector('.button-arrow-left');
    const arrowRightButton = document.querySelector('.button-arrow-right');
    const links = document.querySelectorAll('.start-screen-container-header__link');

    function updateButtonStates() {
        arrowLeftButton.disabled = startCard === 0;
        arrowLeftButton.classList.toggle('disabled', startCard === 0);

        arrowRightButton.disabled = startCard >= pets.length - cardsForPage;
        arrowRightButton.classList.toggle('disabled', startCard >= pets.length - cardsForPage);
    }

    function handleArrowLeftClick() {
        startCard = Math.max(0,startCard - 1);
        createCards();
        updateButtonStates();
    }

    function handleArrowRightClick() {
        startCard = Math.min(pets.length - cardsForPage,startCard + 1);
        createCards();
        updateButtonStates();
    }

    function setInactive(elementActive) {
        elementActive.classList.add('inactive');
    }

    function resetInactive() {
        links.forEach(link => {
            link.classList.remove('inactive');
        });
    }

    function handleLinkClick(event) {
    //    resetInactive();
    //    setInactive(event.currentTarget);
    }

    calculateCards();

    loadPets()
        .then(data => {
            pets = data;
            createCards();
        });
    createCards();

    arrowLeftButton.addEventListener('click', handleArrowLeftClick);
    arrowRightButton.addEventListener('click', handleArrowRightClick);

    document.getElementById('button-get-to-know').addEventListener('click',() => window.location.href = 'pets.html');
    document.getElementById('make-friends').addEventListener('click',() => window.location.href = '#friends');


    links.forEach(link => {
    //    link.addEventListener('click', handleLinkClick);
    });

    setInactive(document.getElementById('about-link'));

    // Обработчик изменения размера окна
    window.addEventListener('resize', () => {
        calculateCards(); // Пересчитать количество карточек
        createCards();
    });
});

