let pets = [];
let petsNumbers = [];
const overlay = document.querySelector('.overlay');
const modalWindow = document.querySelector('.modal-window');
const modalWindowButton = document.querySelector('.button-close');
const burgerMenu = document.querySelector('.burger-menu');

async function loadPets() {
    const response = await fetch('./js/pets.json');
    return await response.json(); // array
}

function createCard(dataNumber) {
    numberInArray = petsNumbers[dataNumber];
    const cardContainer = document.querySelector('.cards-container');
    if (!cardContainer) {return}

    const cardElement = document.createElement('div');
    cardElement.classList.add('card');
    cardElement.innerHTML = '';

    const img = document.createElement('img');
    const title = document.createElement('div');
    if (pets[numberInArray]) {
        img.src = pets[numberInArray].img;
        img.alt = `${pets[numberInArray].name} — ${pets[numberInArray].type}`;
        img.title = `${pets[numberInArray].name} — ${pets[numberInArray].type} ${pets[numberInArray].breed}`;
        img.classList.add('card-image');

        title.classList.add('card-title');
        title.textContent = pets[numberInArray].name;
    }
    const button = document.createElement('button');
    button.classList.add('button-oval');
    button.classList.add('button-secondary');
    button.classList.add('button-learn-more');

    cardElement.setAttribute('data-number', dataNumber);

    cardElement.appendChild(img);
    cardElement.appendChild(title);
    cardElement.appendChild(button);

    cardContainer.appendChild(cardElement);
    cardElement.addEventListener('click', () => openPopupMenu(numberInArray));
    return cardElement;

}

function addModalContentListItem(elementList,attName,pet) {
    const elementListItem = document.createElement('li');
    elementListItem.innerHTML = `<span class="modal-card-content_list-item-bold">${attName[0].toUpperCase()}${attName.slice(1)}:</span> ${pet[attName]}`;
    elementListItem.classList.add('modal-card-content_list-item');
    elementList.appendChild(elementListItem);
}

function fillModalContent(content,pet) {
    const elementHeader = document.createElement('h3');
    elementHeader.textContent = pet.name;
    elementHeader.classList.add('modal-card-content_header');
    const elementSubHeader = document.createElement('h4');
    elementSubHeader.textContent = `${pet.type} - ${pet.breed}`;
    elementSubHeader.classList.add('modal-card-content_subheader','modal-card-content_element');
    const elementDescription = document.createElement('h5');
    elementDescription.textContent = pet.description;
    elementDescription.classList.add('modal-card-content_description','modal-card-content_element');
    content.appendChild(elementHeader);
    content.appendChild(elementSubHeader);
    content.appendChild(elementDescription);

    //list
    const elementList = document.createElement('ul');
    elementList.classList.add('modal-card-content_list','modal-card-content_element');
    addModalContentListItem(elementList,'age',pet);
    addModalContentListItem(elementList,'inoculations',pet);
    addModalContentListItem(elementList,'diseases',pet);
    addModalContentListItem(elementList,'parasites',pet);
    content.appendChild(elementList);

}

function fillModalWindow(numberArray) {
    if (!modalWindow) {return}
    //clean content
    const cardImg = modalWindow.querySelector('.modal-card-image');
    const cardContent = modalWindow.querySelector('.modal-card-content');
    if (cardImg) cardImg.remove();
    if (cardContent) cardContent.remove();

    if (!pets[numberArray]) {return}

    const contentImg = document.createElement('div');
    contentImg.classList.add('modal-card-image');
    const img = document.createElement('img');

    img.src = pets[numberArray].img;
    img.alt = `${pets[numberArray].name} — ${pets[numberArray].type}`;
    img.title = `${pets[numberArray].name} — ${pets[numberArray].type} ${pets[numberArray].breed}`;

    contentImg.appendChild(img);
    modalWindow.appendChild(contentImg);

    const content = document.createElement('div');
    content.classList.add('modal-card-content');
    fillModalContent(content,pets[numberArray]);


    modalWindow.appendChild(content);

}

function createCards() {
    const cardContainer = document.querySelector('.cards-container');
    if (!cardContainer) {return}
    else {
        cardContainer.innerHTML = ''; // remove all children
    }

    // Проверяем, на какой странице мы находимся
    const currentPage = window.location.pathname;  // Возвращает путь текущего URL

    if (currentPage.includes('index.html')) createCardsForMain()
    else if (currentPage.includes('pets.html')) createCardsForPets()
}

function openPopupMenu(numberArray) {
    if (overlay) {
        overlay.classList.add('active');
        document.body.classList.add('no-scroll')
    }
    if (modalWindow) {
        modalWindow.classList.add('active');
        fillModalWindow(numberArray);
    }
    if (modalWindowButton) {
        modalWindowButton.classList.add('active');
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
    if (modalWindowButton) {
        modalWindowButton.classList.remove('active');
    }
    burgerMenu.style.zIndex = '999';
}


