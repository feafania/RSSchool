let cardsForPage = 0;
const cardsContainer = document.querySelector('.cards-container');

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
    for (let i=0; i < (petsNumbers.length); i++) {
        // alert(((i<cardsForPage)||(i>=(2*cardsForPage))));
        card = createCard(i);
        if (card) {
            card.style.transition = 'none';
            if (i < cardsForPage) {
                card.style.transform = 'translateX(-100%)';
                card.classList.add('hidden');
            } else if (i < 2 * cardsForPage) {
                card.style.transform = 'translateX(0)';
                card.classList.remove('hidden');
            } else {
                card.style.transform = 'translateX(100%)';
                card.classList.add('hidden');
            }
            card.style.transition = 'transform 0.5s ease, opacity 0.5s ease';
        }
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

            if (card) {
                cardsContainer.appendChild(card); // to the end
                card.style.transition = 'none'; // cancel animation
                card.style.transform = 'translateX(100%)'; // move to the right
                card.classList.add('hidden');
                card.style.transition = 'transform 0.5s ease'; // return animation
            }
        }

        // Delay for the browser to process the move
        setTimeout(() => {

            // Handle the transition end event
            const onTransitionEnd = () => {
                // Cleanup the event listener
                cardsContainer.removeEventListener('transitionend', onTransitionEnd);

                // Call createCards after transition ends
                createCards();
            };

            // Add the event listener to the container (or directly to each card if needed)
            cardsContainer.addEventListener('transitionend', onTransitionEnd);

            for (let i = cardsForPage; i < petsNumbers.length; i++) {
                const card = cardsContainer.querySelector(`.card[data-number="${i}"]`);
                if (card) {
                    card.style.transition = 'transform 0.5s ease'; // animation
                    if (i >= 2 * cardsForPage) {
                        card.style.transform = 'translateX(0)'; //move to center
                        card.classList.remove('hidden');
                    } else {
                        card.style.transform = 'translateX(-100%)'; // move to the left
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

        for (let i=0; i < cardsForPage; i++) {
            petsNumbers.unshift(petsNumbers.pop());
            const excludeSet = new Set();
            for (let j = 1; j <= (cardsForPage+i); j++) {
                if ( j < petsNumbers.length) excludeSet.add(petsNumbers[j]);
            }
            petsNumbers[0] = getRandomNumber(excludeSet)
        }

        // Move the last cards to the beginning of the container
        for (let i = 2 * cardsForPage; i < petsNumbers.length; i++) {
            const card = cardsContainer.querySelector(`.card[data-number="${i}"]`);

            if (card) {
                cardsContainer.prepend(card); // to the beginning
                card.style.transition = 'none'; // cancel animation
                card.style.transform = 'translateX(-100%)'; // move to the left
                card.classList.add('hidden');
                card.style.transition = 'transform 0.5s ease'; // return animation
            }
        }

        // Delay for the browser to process the move
        setTimeout(() => {

            // Handle the transition end event
            const onTransitionEnd = () => {
                // Cleanup the event listener
                cardsContainer.removeEventListener('transitionend', onTransitionEnd);

                // Call createCards after transition ends
                createCards();
            };

            // Add the event listener to the container (or directly to each card if needed)
            cardsContainer.addEventListener('transitionend', onTransitionEnd);

            for (let i = (2 * cardsForPage-1); i >= 0; i--) {
                const card = cardsContainer.querySelector(`.card[data-number="${i}"]`);
                if (card) {
                    card.style.transition = 'transform 0.5s ease'; // animation
                    if (i >= cardsForPage) {
                        card.style.transform = 'translateX(100%)'; // move to the right
                        card.classList.add('hidden');
                    } else {
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


    arrowLeftButton.addEventListener('click', handleArrowLeftClick);
    arrowRightButton.addEventListener('click', handleArrowRightClick);

    document.getElementById('button-get-to-know').addEventListener('click',() => window.location.href = 'pets.html');
    document.getElementById('make-friends').addEventListener('click',() => window.location.href = '#friends');


    setInactive(document.getElementById('about-link'));

});

