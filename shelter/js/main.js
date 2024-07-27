let startCard = 0;

function createCards() {
    for (let i=0; i < 3; i++) {
        createCard(startCard+i,"card"+(i+1));
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const arrowLeftButton = document.querySelector('.button-arrow-left');
    const arrowRightButton = document.querySelector('.button-arrow-right');
    const links = document.querySelectorAll('.start-screen-container-header__link');

    function updateButtonStates() {
        arrowLeftButton.disabled = startCard === 0;
        arrowLeftButton.classList.toggle('disabled', startCard === 0);

        arrowRightButton.disabled = startCard >= pets.length - 3;
        arrowRightButton.classList.toggle('disabled', startCard >= pets.length - 3);
    }

    function handleArrowLeftClick() {
        startCard = Math.max(0,startCard - 1);
        createCards();
        updateButtonStates();
    }

    function handleArrowRightClick() {
        startCard = Math.min(pets.length - 3,startCard + 1);
        createCards();
        updateButtonStates();
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
    arrowLeftButton.addEventListener('click', handleArrowLeftClick);
    arrowRightButton.addEventListener('click', handleArrowRightClick);

    document.getElementById('button-get-to-know').addEventListener('click',() => window.location.href = 'pets.html');
    document.getElementById('make-friends').addEventListener('click',() => window.location.href = '#friends');


    links.forEach(link => {
    //    link.addEventListener('click', handleLinkClick);
    });

    setInactive(document.getElementById('about-link'));
});

