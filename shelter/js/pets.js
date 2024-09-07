let cardsForPage = 0;

function calculateCards() {
    if (window.innerWidth < 768) {
        cardsForPage = 3;
    } else if (window.innerWidth < 1280) {
        cardsForPage = 6;
    } else {
        cardsForPage = 8;
    }
}


function createCardsForPets() {
    for (let i=0; i < cardsForPage; i++) {
        createCard(i);
    }
}


document.addEventListener('DOMContentLoaded', () => {

   // arrowLeftButton.addEventListener('click', handleArrowLeftClick);
   // arrowRightButton.addEventListener('click', handleArrowRightClick);

    document.getElementById('button-much-less').classList.add('disabled');
    document.getElementById('button-less').classList.add('disabled');

    setInactive(document.getElementById('our-pets'));
    setInactive(document.getElementById('button-center'));

});

