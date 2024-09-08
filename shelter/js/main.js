let cardsForPage = 0;
const cardsContainer = document.querySelector('.cards-container');
const arrowLeftButton = document.querySelector('.button-arrow-left');
const arrowRightButton = document.querySelector('.button-arrow-right');

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


function createCardsForMain() {
    const containerWidth = cardsContainer.offsetWidth;
    for (let i=0; i < (petsNumbers.length); i++) {
        card = createCard(i);
        const cardWidth = card.offsetWidth;
        if (card) {
            card.style.transition = 'none';
            if (i < cardsForPage) {
                const shiftAmount = (cardsForPage - i%cardsForPage) * cardWidth;
                card.style.transform = `translateX(-${shiftAmount}px)`;
                card.classList.add('hidden');
            } else if (i < 2 * cardsForPage) {
                card.style.transform = 'translateX(0)';
                card.classList.remove('hidden');
            } else {
                const shiftAmount = (i%cardsForPage) * cardWidth + containerWidth;
                card.style.transform = `translateX(${shiftAmount}px)`;
                card.classList.add('hidden');
            }
        }
    }
}

function createCurrentTransforms() {
    const currentTransforms = new Map();
    const containerRect = cardsContainer.getBoundingClientRect();

    for (let i = 0; i < petsNumbers.length; i++) {
        const card = cardsContainer.querySelector(`.card[data-number="${i}"]`);
        if (card) {
            // const computedStyle = window.getComputedStyle(card);
            // const transformValue = computedStyle.transform;
            // currentTransforms.set(card, transformValue);
            const cardRect = card.getBoundingClientRect();
            const currentX = cardRect.left - containerRect.left; // The actual position inside the container

            currentTransforms.set(card, currentX);
        }
    }
    return currentTransforms
}

function handleTransition() {

    // Handle the transition end event
    const onTransitionEnd = () => {
        // Cleanup the event listener
        cardsContainer.removeEventListener('transitionend', onTransitionEnd);

        // Call createCards after transition ends
        createCards();
        arrowLeftButton.addEventListener('click', handleArrowLeftClick);
        arrowRightButton.addEventListener('click', handleArrowRightClick);
    };

    // Add the event listener to the container (or directly to each card if needed)
    cardsContainer.addEventListener('transitionend', onTransitionEnd);


}

function preMovingEvents(card,currentTransforms) {
    // Apply their current positions to the cards before the changes
    // const currentTransform = currentTransforms.get(card) || 'translateX(0px)';
    // card.style.transform = currentTransform;
    card.style.transition = 'none'
    const currentX = currentTransforms.get(card) || 0; // current card position
    card.style.transform = `translateX(${currentX}px)`; // Use the current card position  as the starting point

    // To force redrawing (so that the browser fixes the current position)
    card.offsetHeight; // Trigger reflow

    card.style.transition = '0.5s ease transform, 0.5s ease opacity';
}

// function updateButtonStates() {
//     arrowLeftButton.disabled = startCard === 0;
//     arrowLeftButton.classList.toggle('disabled', startCard === 0);
//
//     arrowRightButton.disabled = startCard >= pets.length - cardsForPage;
//     arrowRightButton.classList.toggle('disabled', startCard >= pets.length - cardsForPage);
// }

function handleArrowLeftClick() {
    const containerWidth = cardsContainer.offsetWidth;

    arrowLeftButton.removeEventListener('click', handleArrowLeftClick);
    arrowRightButton.removeEventListener('click', handleArrowRightClick);

    for (let i=0; i < cardsForPage; i++) {
        petsNumbers.shift();
        const excludeSet = new Set();
        for (let j = 1; j <= (cardsForPage+i); j++) {
            if (petsNumbers.length - j >= 0) excludeSet.add(petsNumbers[petsNumbers.length - j]);
        }
        petsNumbers[petsNumbers.length] = getRandomNumber(excludeSet)
    }

    // Move the first cards to the end of the container
    for (let i = 0; i < cardsForPage; i++) {
        const card = cardsContainer.querySelector(`.card[data-number="${i}"]`);
        const cardWidth = card.offsetWidth;

        if (card) {
            cardsContainer.appendChild(card); // to the end
            card.style.transition = 'none'; // cancel animation
            const shiftAmount = (i%cardsForPage) * cardWidth + containerWidth;
            card.style.transform = `translateX(${shiftAmount}px)`;
            card.classList.add('hidden');
        }
    }

    // Delay for the browser to process the move
    setTimeout(() => {
        const currentTransforms= createCurrentTransforms();
        handleTransition();

        for (let i = cardsForPage ; i < petsNumbers.length; i++) {
            const card = cardsContainer.querySelector(`.card[data-number="${i}"]`);
            const cardWidth = card.offsetWidth;
            if (card) {
                preMovingEvents(card,currentTransforms);
                if (i >= 2 * cardsForPage) {
                    card.style.transform = 'translateX(0)'; //move to center
                    card.classList.remove('hidden');
                } else {
                    const shiftAmount = (cardsForPage - i%cardsForPage) * cardWidth;
                    card.style.transform = `translateX(-${shiftAmount}px)`;
                    card.classList.add('hidden');
                }
            }
        }

        // Trigger a reflow (recalculation of styles) to ensure the browser processes the changes
        cardsContainer.offsetHeight; // Trigger a reflow
    }, 100); // A slight delay before synchronizing animations


    // updateButtonStates();
}

function handleArrowRightClick() {
    const containerWidth = cardsContainer.offsetWidth;

    arrowLeftButton.removeEventListener('click', handleArrowLeftClick);
    arrowRightButton.removeEventListener('click', handleArrowRightClick);

    for (let i=0; i < cardsForPage; i++) {
        petsNumbers.unshift(petsNumbers.pop());
        const excludeSet = new Set();
        for (let j = 1; j <= (cardsForPage+i); j++) {
            if ( j < petsNumbers.length) excludeSet.add(petsNumbers[j]);
        }
        petsNumbers[0] = getRandomNumber(excludeSet)
    }

    // Move the last cards to the beginning of the container
    for (let i = (petsNumbers.length-1); i >= (2 * cardsForPage); i--) {
        const card = cardsContainer.querySelector(`.card[data-number="${i}"]`);
        const cardWidth = card.offsetWidth;

        if (card) {
            cardsContainer.prepend(card); // to the beginning
            card.style.transition = 'none'; // cancel animation
            const shiftAmount = (cardsForPage - i%cardsForPage) * cardWidth;
            card.style.transform = `translateX(-${shiftAmount}px)`;
            card.classList.add('hidden');
        }
    }

    // Delay for the browser to process the move
    setTimeout(() => {
        const currentTransforms= createCurrentTransforms();
        handleTransition();

        for (let i = 0; i <(2 * cardsForPage); i++) {
            const card = cardsContainer.querySelector(`.card[data-number="${i}"]`);
            const cardWidth = card.offsetWidth;
            if (card) {
                preMovingEvents(card,currentTransforms);

                if (i >= cardsForPage) {
                    const shiftAmount = (i%cardsForPage) * cardWidth + containerWidth;
                    card.style.transform = `translateX(${shiftAmount}px)`;
                    card.classList.add('hidden');
                } else {
                    // animation
                    // const nextCard = cardsContainer.querySelector(`.card[data-number="${cardsForPage + i}"]`);
                    // const currentXNextCard = +currentTransforms.get(nextCard) || 0; // current card position
                    // card.style.transform = `translateX(${currentXNextCard}px)`; // Use the current card position  as the starting point
                    card.style.transform = 'translateX(0)'; //move to center
                    card.classList.remove('hidden');

                }
            }
        }

        // Trigger a reflow (recalculation of styles) to ensure the browser processes the changes
        cardsContainer.offsetHeight; // Trigger a reflow
    }, 100); // A slight delay before synchronizing animations

    // updateButtonStates();
}


document.addEventListener('DOMContentLoaded', () => {

    arrowLeftButton.addEventListener('click', handleArrowLeftClick);
    arrowRightButton.addEventListener('click', handleArrowRightClick);

    document.getElementById('button-get-to-know').addEventListener('click',() => window.location.href = 'pets.html');
    document.getElementById('make-friends').addEventListener('click',() => window.location.href = '#friends');


    setInactive(document.getElementById('about-link'));

});

