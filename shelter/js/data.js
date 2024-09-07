let pets = [];
const overlay = document.querySelector('.overlay');
const modalWindow = document.querySelector('.modal-window');
const burgerMenu = document.querySelector('.burger-menu');

async function loadPets() {
    const response = await fetch('./js/pets.json');
    return await response.json(); // array
}

function createCard(numberArray) {
    const cardContainer = document.querySelector('.cards-container');
    if (!cardContainer) {return}

    const cardElement = document.createElement('div');
    cardElement.classList.add('card');
    cardElement.innerHTML = '';

    const img = document.createElement('img');
    const title = document.createElement('div');
    if ((numberArray < pets.length)&&(pets.length>0)) {
        img.src = pets[numberArray].img;
        img.alt = `${pets[numberArray].name} — ${pets[numberArray].type}`;
        img.title = `${pets[numberArray].name} — ${pets[numberArray].type} ${pets[numberArray].breed}`;
        img.classList.add('card-image');

        title.classList.add('card-title');
        title.textContent = pets[numberArray].name;
    }
    const button = document.createElement('button');
    button.classList.add('button-oval');
    button.classList.add('button-secondary');
    button.classList.add('button-learn-more');

    cardElement.appendChild(img);
    cardElement.appendChild(title);
    cardElement.appendChild(button);

    cardContainer.appendChild(cardElement);
    cardElement.addEventListener('click', openPopupMenu);

}

function createCards() {
    const cardContainer = document.querySelector('.cards-container');
    if (!cardContainer) {return}
    else {
        cardContainer.innerHTML = ''; // remove all children
    }

    for (let i=0; i < cardsForPage; i++) {
        createCard(startCard+i);
    }
}

function openPopupMenu(event) {
    if (overlay) {
        overlay.classList.add('active');
        document.body.classList.add('no-scroll')
    }
    if (modalWindow) {
        modalWindow.classList.add('active');
    }
    burgerMenu.style.zIndex = '800';
}

function closePopupMenu(event) {
    if (overlay) {
        overlay.classList.remove('active');
        document.body.classList.remove('no-scroll')
    }
    if (modalWindow) {
        modalWindow.classList.remove('active');
    }
    burgerMenu.style.zIndex = '999';
}


