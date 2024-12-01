let cardsForPage = 12;
let activePage = 1;
let numberOfPages = 4;
const cardContainer = document.querySelector('.cards-container');

function calculateCards() {
    startCard = ((activePage-1)*cardsForPage);
    giftsNumbers = [1, 13, 0, 2,
                    12, 26, 14, 25,
                    15, 3, 24, 27];
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

document.addEventListener('DOMContentLoaded', () => {

    setInactive(document.getElementById('gifts'));

});

