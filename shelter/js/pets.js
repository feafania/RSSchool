let cardsForPage = 0;

function calculateCards() {
    if (window.innerWidth < 768) {
        cardsForPage = 3;
    } else if (window.innerWidth < 1280) {
        cardsForPage = 6;
    } else {
        cardsForPage = 8;
    }

    petsNumbers.length = cardsForPage;
    for (let i=0; i < petsNumbers.length; i++) {
        if (petsNumbers[i]===undefined || petsNumbers[i]===null) {
            const positionInScreen = i%(cardsForPage);
            const excludeSet = new Set();
            for (let j = 1; j <= (cardsForPage+positionInScreen); j++) {
                if (i - j >= 0) excludeSet.add(petsNumbers[i - j]);
            }
            petsNumbers[i] = getRandomNumber(excludeSet)
        }
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

