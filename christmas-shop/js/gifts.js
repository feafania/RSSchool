const cardContainer = document.querySelector('.cards-container');
const tabItems = document.querySelectorAll(".gifts__tab-item");
const scrollToTopButton = document.querySelector('.arrow-button-up');

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

function scrollFunction() {
    if ((document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) && (window.innerWidth <= 768)) {
        scrollToTopButton.style.opacity = "1";
    } else {
        scrollToTopButton.style.opacity = "0";
    }
}

document.addEventListener('DOMContentLoaded', () => {

    setInactive(document.getElementById('gifts'));

    tabItems.forEach((tabItem) => {
        tabItem.addEventListener('click', handleTabSwitch);
    });
    // tabItems[0].dispatchEvent(new Event('click'));
    setInactive(tabItems[0]);
    scrollToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    window.onscroll = function() {scrollFunction()};
    window.addEventListener('resize', scrollFunction);
});