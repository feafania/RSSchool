let cardsForPage = 0;

function calculateCards() {
    if (window.innerWidth < 768) {
        cardsForPage = 1;
    } else if (window.innerWidth < 1280) {
        cardsForPage = 2;
    } else {
        cardsForPage = 3;
    }
    petsNumbers.length = cardsForPage*3;
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

function getRandomNumber(excludeSet) {
    const availableNumbers = Array.from({ length: pets.length }, (_, i) => i);
    const possibleNumbers = availableNumbers.filter(num => !excludeSet.has(num));
    if (possibleNumbers.length === 0) return null;
    const randomIndex = Math.floor(Math.random() * possibleNumbers.length);
    return possibleNumbers[randomIndex];
}


function createCardsForMain() {
    for (let i=cardsForPage; i < (cardsForPage*2); i++) {
        createCard(petsNumbers[i]);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const arrowLeftButton = document.querySelector('.button-arrow-left');
    const arrowRightButton = document.querySelector('.button-arrow-right');

    // function updateButtonStates() {
    //     arrowLeftButton.disabled = startCard === 0;
    //     arrowLeftButton.classList.toggle('disabled', startCard === 0);
    //
    //     arrowRightButton.disabled = startCard >= pets.length - cardsForPage;
    //     arrowRightButton.classList.toggle('disabled', startCard >= pets.length - cardsForPage);
    // }

    function handleArrowLeftClick() {
        // console.log('i---','petsNumbers',petsNumbers);
        for (let i=0; i < cardsForPage; i++) {
            petsNumbers.shift();
            const excludeSet = new Set();
            for (let j = 1; j <= (cardsForPage+i); j++) {
                if (petsNumbers.length - j >= 0) excludeSet.add(petsNumbers[petsNumbers.length - j]);
            }
            petsNumbers[petsNumbers.length] = getRandomNumber(excludeSet)
            // console.log('i',i,'excludeSet',excludeSet);
            // console.log('i',i,'petsNumbers',petsNumbers);
        }
        // console.log('i+++','petsNumbers',petsNumbers);
        createCards();
        // updateButtonStates();
    }

    function handleArrowRightClick() {
        // console.log('i---','petsNumbers',petsNumbers);
        for (let i=0; i < cardsForPage; i++) {
            petsNumbers.unshift(petsNumbers.pop());
            const excludeSet = new Set();
            for (let j = 1; j <= (cardsForPage+i); j++) {
                if ( j < petsNumbers.length) excludeSet.add(petsNumbers[j]);
            }
            petsNumbers[0] = getRandomNumber(excludeSet)
            // console.log('i',i,'excludeSet',excludeSet);
            // console.log('i',i,'petsNumbers',petsNumbers);
        }
        // console.log('i+++','petsNumbers',petsNumbers);
        createCards();
        // updateButtonStates();
    }


    arrowLeftButton.addEventListener('click', handleArrowLeftClick);
    arrowRightButton.addEventListener('click', handleArrowRightClick);

    document.getElementById('button-get-to-know').addEventListener('click',() => window.location.href = 'pets.html');
    document.getElementById('make-friends').addEventListener('click',() => window.location.href = '#friends');


    setInactive(document.getElementById('about-link'));

});

