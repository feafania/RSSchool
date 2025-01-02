const cardContainer = document.querySelector('.cards-container');
const tabItems = document.querySelectorAll(".gifts__tab-item");

function calculateCards(currentCategory = '') {
    const tempGiftsNumbers = [];
    for (let i = 0; i < gifts.length; i++) {
        if (!currentCategory || gifts[i].category === currentCategory) {
            tempGiftsNumbers[tempGiftsNumbers.length] = i;
        }
    }
    giftsNumbers = [];
    const excludeSet = new Set();
    for (let i=0; i < tempGiftsNumbers.length; i++) {
        const randomIndex = getRandomNumber(excludeSet, tempGiftsNumbers.length);
        excludeSet.add(randomIndex);
        giftsNumbers[i] = tempGiftsNumbers[randomIndex];
    }
}
function createCards() {
    if (!cardContainer) {return}
    else {
        cardContainer.innerHTML = ''; // remove all children
    }
    for (let i=0; i < (giftsNumbers.length); i++) {
        card = createCard(i,cardContainer);
    }
}

function handleTabSwitch(event) {
    setInactive(event.target,1);
    tabItems.forEach((tabItem) => {
        if (event.target !== tabItem) {
            setInactive(tabItem,0);
        }
    });
    calculateCards(event.target.dataset.category);
    createCards();
}

document.addEventListener('DOMContentLoaded', () => {

    setInactive(document.getElementById('gifts'));

    tabItems.forEach((tabItem) => {
        tabItem.addEventListener('click', handleTabSwitch);
    });
    // tabItems[0].dispatchEvent(new Event('click'));
    setInactive(tabItems[0]);
});