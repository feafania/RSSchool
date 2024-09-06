
function calculateCards() {
    if (window.innerWidth < 768) {
        cardsForPage = 3;
    } else if (window.innerWidth < 1280) {
        cardsForPage = 6;
    } else {
        cardsForPage = 8;
    }
    startCard = Math.min(startCard,Math.max(pets.length-cardsForPage,0))

}

document.addEventListener('DOMContentLoaded', () => {
    function updateButtonStates() {
        arrowLeftButton.disabled = startCard === 0;
        arrowLeftButton.classList.toggle('disabled', startCard === 0);

        arrowRightButton.disabled = startCard >= pets.length - 3;
        arrowRightButton.classList.toggle('disabled', startCard >= pets.length - 3);
    }

   // arrowLeftButton.addEventListener('click', handleArrowLeftClick);
   // arrowRightButton.addEventListener('click', handleArrowRightClick);

    document.getElementById('button-much-less').classList.add('disabled');
    document.getElementById('button-less').classList.add('disabled');

    setInactive(document.getElementById('our-pets'));
    setInactive(document.getElementById('button-center'));

});

