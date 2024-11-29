
let cardsForPage = 4;
const cardContainer = document.querySelector('.cards-container');
const arrowLeftButton = document.querySelector('.arrow-button-left');
const arrowRightButton = document.querySelector('.arrow-button-right');

function calculateCards() {
    giftsNumbers.length = cardsForPage;
    giftsNumbers = [1, 15, 3, 27];
    // for (let i=0; i < giftsNumbers.length; i++) {
    //     if (giftsNumbers[i]===undefined || giftsNumbers[i]===null) {
    //         const positionInScreen = i%(cardsForPage);
    //         const excludeSet = new Set();
    //         for (let j = 1; j <= (cardsForPage+positionInScreen); j++) {
    //             if (i - j >= 0) excludeSet.add(giftsNumbers[i - j]);
    //         }
    //         giftsNumbers[i] = getRandomNumber(excludeSet)
    //     }
    // }
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

