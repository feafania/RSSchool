
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


    arrowLeftButton.addEventListener('click', handleArrowLeftClick);
    arrowRightButton.addEventListener('click', handleArrowRightClick);

    document.getElementById('button-get-to-know').addEventListener('click',() => window.location.href = 'pets.html');
    document.getElementById('make-friends').addEventListener('click',() => window.location.href = '#friends');


    setInactive(document.getElementById('about-link'));

});

