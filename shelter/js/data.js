
let pets = [];

async function loadPets() {
    const response = await fetch('./js/pets.json');
    return await response.json(); // array
}

function createCard(numberArray,id) {
    const cardElement = document.getElementById(id);
    if (!cardElement) {return}
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

}

function createCards() {
    for (let i=0; i < cardsForPage; i++) {
        createCard(startCard+i,"card"+(i+1));
    }
}
