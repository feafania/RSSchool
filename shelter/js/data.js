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
    cardElement.addEventListener('click', () => openPopupMenu(cardElement,numberArray));

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
    elementSubHeader.classList.add('modal-card-content_subheader');
    const elementDescription = document.createElement('h5');
    elementDescription.textContent = pet.description;
    elementDescription.classList.add('modal-card-content_description');
    content.appendChild(elementHeader);
    content.appendChild(elementSubHeader);
    content.appendChild(elementDescription);

    //list
    const elementList = document.createElement('ul');
    elementList.classList.add('modal-card-content_list');
    addModalContentListItem(elementList,'age',pet);
    addModalContentListItem(elementList,'inoculations',pet);
    addModalContentListItem(elementList,'diseases',pet);
    addModalContentListItem(elementList,'parasites',pet);
    content.appendChild(elementList);

}

function fillModalWindow(cardElement,numberArray) {
    if (!modalWindow) {return}
    //clean content
    const cardImg = modalWindow.querySelector('.modal-card-image');
    const cardContent = modalWindow.querySelector('.modal-card-content');
    if (cardImg) cardImg.remove();
    if (cardContent) cardContent.remove();

    if (!cardElement) {return}

    const img = document.createElement('img');
    const content = document.createElement('div');

    const imgElement = cardElement.querySelector('.card-image');
    if (imgElement) {
        img.src = imgElement.src;
        img.alt = imgElement.alt || '';
        img.title = imgElement.title || '';
    }
    img.classList.add('modal-card-image');

    content.classList.add('modal-card-content');
    fillModalContent(content,pets[numberArray]);

    modalWindow.appendChild(img);
    modalWindow.appendChild(content);

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

function openPopupMenu(cardElement,numberArray) {
    if (overlay) {
        overlay.classList.add('active');
        document.body.classList.add('no-scroll')
    }
    if (modalWindow) {
        modalWindow.classList.add('active');
        fillModalWindow(cardElement,numberArray);
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


