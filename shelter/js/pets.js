let startPetsCard = 0;
let cardsForPage = 0;

function calculateCards() {
    if (window.innerWidth < 768) {
        cardsForPage = 3;
    } else if (window.innerWidth < 1280) {
        cardsForPage = 6;
    } else {
        cardsForPage = 8;
    }
    startPetsCard = Math.min(startPetsCard,pets.length-cardsForPage)
    // for (i = 0; i < pets.length; i++) {
    //     card = document.getElementById(`card${(i+1)}`);
    //     if (i < cardsForPage) {
    //         card.style.display = 'none'; // hide element
    //     } else {
    //         card.style.display = 'block'; // show element (use '' for reset)
    //     }
    // }
}

function createCards() {
    for (let i=0; i < cardsForPage; i++) {
       createCard(startPetsCard+i,"card"+(i+1));
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const links = document.querySelectorAll('.pets-container-header__link');

    function updateButtonStates() {
        arrowLeftButton.disabled = startPetsCard === 0;
        arrowLeftButton.classList.toggle('disabled', startCard === 0);

        arrowRightButton.disabled = startPetsCard >= pets.length - 3;
        arrowRightButton.classList.toggle('disabled', startCard >= pets.length - 3);
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
    createCards();
   // arrowLeftButton.addEventListener('click', handleArrowLeftClick);
   // arrowRightButton.addEventListener('click', handleArrowRightClick);

    links.forEach(link => {
        //    link.addEventListener('click', handleLinkClick);
    });
    setInactive(document.getElementById('our-pets'));
    // Обработчик изменения размера окна
    window.addEventListener('resize', () => {
        calculateCards(); // Пересчитать количество карточек
        createCards();
    });

    document.getElementById('button-much-less').classList.add('disabled');
    document.getElementById('button-less').classList.add('disabled');
    document.getElementById('button-center').classList.add('inactive');
});

