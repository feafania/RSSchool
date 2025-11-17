let cardsForPage = 0;
let activePage = 1;
let numberOfPages = 0;
const cardsContainer = document.querySelector('.cards-container');

const buttonMuchLess = document.getElementById('button-much-less');
const buttonLess = document.getElementById('button-less');
const buttonCenter = document.getElementById('button-center');
const buttonGreater = document.getElementById('button-greater');
const buttonMuchGreater = document.getElementById('button-much-greater');

function calculateCards() {
    startCard = ((activePage-1)*cardsForPage);
    petsNumbers.length = 48;
    if (window.innerWidth < 768) {
        cardsForPage = 3;
    } else if (window.innerWidth < 1280) {
        cardsForPage = 6;
        numberOfPages = 8;
    } else {
        cardsForPage = 8;
    }
    numberOfPages = Math.round(petsNumbers.length/cardsForPage);

    //recalculate active page
    activePage = Math.floor(startCard/cardsForPage)+1;
    updateButtonStates();
    updateCardsForPets();
}

function loadPetsNumbers() {
    for (let i=0; i < petsNumbers.length; i++) {
        const position3 = i%3;
        const position6 = i%6;
        const position8 = i%8;
        const excludeSet = new Set();
        for (let j = 1; j <= Math.max(position3,position6,position8); j++) {
            if (i - j >= 0) excludeSet.add(petsNumbers[i - j]);
        }
        petsNumbers[i] = getRandomNumber(excludeSet)
    }
}

function updateCard(card,numberOfCard) {
    if (card) {
        if ((numberOfCard>=((activePage-1)*cardsForPage))&&(numberOfCard<(activePage*cardsForPage))) {
            card.classList.remove('hidden-display');
        } else {
            card.classList.add('hidden-display');
        }
    }
}


function createCardsForPets() {
    for (let i=0; i < (petsNumbers.length); i++) {
        card = createCard(i);
        updateCard(card,i);
    }
}
function createCards() {
    const cardContainer = document.querySelector('.cards-container');
    if (!cardContainer) {return}
    else {
        cardContainer.innerHTML = ''; // remove all children
    }
    loadPetsNumbers();
    createCardsForPets();
}

function handleResize() {
    calculateCards(); // Пересчитать количество карточек
    updateButtonStates();
    updateCardsForPets();

    if ((window.innerWidth >= 768) && !modalWindow.classList.contains('active')) {
        hideMenu()
    }
}


function updateCardsForPets() {
    for (let i=0; i < (petsNumbers.length); i++) {
        const card = cardsContainer.querySelector(`.card[data-number="${i}"]`);
        updateCard(card,i);
    }
}

function updateButtonStates() {
    buttonMuchLess.disabled = activePage <= 1;
    buttonMuchLess.classList.toggle('disabled', activePage <= 1);
    buttonLess.disabled = activePage <= 1;
    buttonLess.classList.toggle('disabled', activePage <= 1);

    buttonGreater.disabled = activePage >= numberOfPages;
    buttonGreater.classList.toggle('disabled', activePage >= numberOfPages);
    buttonMuchGreater.disabled = activePage >= numberOfPages;
    buttonMuchGreater.classList.toggle('disabled', activePage >= numberOfPages);
    buttonCenter.textContent = activePage;

}

function handleButtonClick(direction) {
    switch (direction) {
        case 'less': {
            activePage = Math.max(activePage-1,1);
            break;
        }
        case 'greater': {
            activePage = Math.min(activePage+1,numberOfPages);
            break;
        }
        case 'much-less': {
            activePage = 1;
            break;
        }
        case 'much-greater': {
            activePage = numberOfPages;
            break;
        }
        default: {}
    }
    updateButtonStates();
    updateCardsForPets();
}

document.addEventListener('DOMContentLoaded', () => {

    buttonMuchLess.addEventListener('click', () => handleButtonClick('much-less'));
    buttonLess.addEventListener('click', () => handleButtonClick('less'));
    buttonGreater.addEventListener('click', () => handleButtonClick('greater'));
    buttonMuchGreater.addEventListener('click', () => handleButtonClick('much-greater'));

    calculateCards();
    updateButtonStates();

    setInactive(document.getElementById('our-pets'));
    setInactive(buttonCenter);

});

