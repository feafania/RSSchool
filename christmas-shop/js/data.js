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
        } else {
            img.src = '';
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
    cardElement.addEventListener('click', () => openModalWindow(numberInArray));
    return cardElement;
}

function getRandomNumber(excludeSet,arrLength) {
    const availableNumbers = Array.from({ length: arrLength }, (_, i) => i);
    const possibleNumbers = availableNumbers.filter(num => !excludeSet.has(num));
    if (possibleNumbers.length === 0) return null;
    const randomIndex = Math.floor(Math.random() * possibleNumbers.length);
    return possibleNumbers[randomIndex];
}

function fillModalWindow(numberArray) {
    if (!modalWindow) {return}
    const screenWidthMinus16 = window.innerWidth - 16;
    modalWindow.style.maxWidth = `${Math.min(screenWidthMinus16, 400)}px`;

    const cardImg = modalWindow.querySelector('.modal-img-box__img');
    const skillsContainer = modalWindow.querySelector('.modal-superpowers__skills');
    const cardHeader = modalWindow.querySelector('.modal-description__header');
    const skillElement = document.getElementById('skill-template');
    Array.from(skillsContainer.children).forEach(child => {
        if (child !== skillElement) {
            skillsContainer.removeChild(child);
        }
    });

    if (!gifts[numberArray]) {return}
    const giftCategory = giftsCategories.find((el) => el.category === gifts[numberArray].category);
    if (giftCategory) {
        if (cardImg) {
            cardImg.src = giftCategory.img;
        }
        if (cardHeader) {
            if (cardHeader.firstElementChild) {
                [...cardHeader.firstElementChild.classList]
                    .filter(cls => cls !== 'modal-description__category')
                    .forEach(cls => cardHeader.firstElementChild.classList.remove(cls));
                cardHeader.firstElementChild.classList.add(giftCategory.class);
    }
        }
    } else {
        if (cardImg) {
            cardImg.src = '';
        }
    }
    if (cardImg) {
        cardImg.alt = `${gifts[numberArray].name} — ${gifts[numberArray].category}`;
        cardImg.title = cardImg.alt;
    }

    const modalDescriptionCategory = cardHeader.querySelector('.modal-description__category');
    if (modalDescriptionCategory) {
        modalDescriptionCategory.textContent = gifts[numberArray].category;
    }
    const modalDescriptionName = cardHeader.querySelector('.modal-description__name');
    if (modalDescriptionName) {
        modalDescriptionName.textContent = gifts[numberArray].name;
    }
    const modalDescription = cardHeader.querySelector('.modal-description__description');
    if (modalDescription) {
        modalDescription.textContent = gifts[numberArray].description;
    }

    if (skillsContainer && skillElement) {
        const superpowersEntries = Object.entries(gifts[numberArray].superpowers);
        for (let i = 0; i < superpowersEntries.length; i++) {
            const clone = skillElement.content.cloneNode(true);
            const superpowersName = clone.querySelector('.modal-superpowers__name');
            if (superpowersName) {
                superpowersName.textContent = superpowersEntries[i][0][0].toUpperCase() + superpowersEntries[i][0].slice(1);
            }
            let degree = 0;
            const superpowersDegree = clone.querySelector('.modal-superpowers__degree');
            if (superpowersDegree) {
                superpowersDegree.textContent = superpowersEntries[i][1];
                degree = parseInt(superpowersEntries[i][1],10);
            }
            const superpowersSnowflakes = clone.querySelector('.modal-superpowers__snowflakes');
            if (superpowersSnowflakes) {
                for (let j = 0; j < 5; j++) {
                    const snowflake = superpowersSnowflakes.children[j];
                    if (snowflake) {
                        if ((j + 1) * 100 > degree) {
                            snowflake.classList.add('inactive');
                        }
                        const uniqueId = `clip0_${i * 5 + j}`;
                        snowflake.id = uniqueId;
                        const clipPathElement = snowflake.querySelector('g[clip-path]');
                        if (clipPathElement) {
                            const clipPathUrl = `url(#${uniqueId})`;
                            clipPathElement.setAttribute('clip-path', clipPathUrl);
                        }
                    }
                }
            }

            skillsContainer.append(clone);
        }
    }
}