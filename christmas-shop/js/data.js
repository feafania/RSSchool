let gifts = [];
let giftsNumbers = [];
let giftsCategories = [
    {
        category: 'For Work',
        img: 'assets/img/gift-for-work.png',
        class: 'card__title-for-work',
    },
    {
        category: 'For Health',
        img: 'assets/img/gift-for-health.png',
        class: 'card__title-for-health',
    },
    {
        category: 'For Harmony',
        img: 'assets/img/gift-for-harmony.png',
        class: 'card__title-for-harmony',
    },
];
const overlay = document.querySelector('.overlay');

async function loadGifts() {
    const response = await fetch('./js/gifts.json');
    return await response.json(); // array
}

function createCard(dataNumber, cardContainer) {
    let numberInArray = giftsNumbers[dataNumber];

    if (!cardContainer) {
        return
    }

    const cardElement = document.createElement('div');
    cardElement.classList.add('card');

    const imgElement = document.createElement('div');
    imgElement.classList.add('card__picture');
    const titleElement = document.createElement('div');
    titleElement.classList.add('card__title');

    const img = document.createElement('img');
    img.classList.add('card__image');

    const textCategory = document.createElement('h4');
    textCategory.classList.add('card__title-category');
    const textName = document.createElement('h3');
    textName.classList.add('card__title-name');

    if (gifts[numberInArray]) {
        const giftCategory = giftsCategories.find((el) => el.category === gifts[numberInArray].category);
        if (giftCategory) {
            img.src = giftCategory.img;
            textCategory.classList.add(giftCategory.class);
        }
        img.alt = `${gifts[numberInArray].name} — ${gifts[numberInArray].category}`;
        img.title = img.alt;

        textCategory.textContent = gifts[numberInArray].category;
        textName.textContent = gifts[numberInArray].name;
    }
    imgElement.appendChild(img);
    titleElement.appendChild(textCategory);
    titleElement.appendChild(textName);

    cardElement.setAttribute('data-number', dataNumber);
    cardElement.dataNumber = dataNumber

    cardElement.appendChild(imgElement);
    cardElement.appendChild(titleElement);

    cardContainer.appendChild(cardElement);
    // cardElement.addEventListener('click', () => openPopupMenu(numberInArray));
    return cardElement;
}

function getRandomNumber(excludeSet,arrLength) {
    const availableNumbers = Array.from({ length: arrLength }, (_, i) => i);
    const possibleNumbers = availableNumbers.filter(num => !excludeSet.has(num));
    if (possibleNumbers.length === 0) return null;
    const randomIndex = Math.floor(Math.random() * possibleNumbers.length);
    return possibleNumbers[randomIndex];
}