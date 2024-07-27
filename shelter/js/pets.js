let startPetsCard = 0;

function createCards() {
    for (let i=0; i < 8; i++) {
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

    createCards();
   // arrowLeftButton.addEventListener('click', handleArrowLeftClick);
   // arrowRightButton.addEventListener('click', handleArrowRightClick);

    links.forEach(link => {
        //    link.addEventListener('click', handleLinkClick);
    });
    setInactive(document.getElementById('our-pets'));
    document.getElementById('button-much-less').classList.add('disabled');
    document.getElementById('button-less').classList.add('disabled');
    document.getElementById('button-center').classList.add('inactive');
});

