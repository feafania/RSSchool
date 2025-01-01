
let cardsForPage = 4;
const cardContainer = document.querySelector('.cards-container');
const arrowLeftButton = document.querySelector('.arrow-button-left');
const arrowRightButton = document.querySelector('.arrow-button-right');
const sliderRow = document.querySelector('.slider__row');
let currentSliderPosition = 0;
let totalSliderPositions = 3;

function calculateCards() {
    giftsNumbers.length = cardsForPage;
    // giftsNumbers = [1, 15, 3, 27];
    for (let i=0; i < giftsNumbers.length; i++) {
        if (giftsNumbers[i]===undefined || giftsNumbers[i]===null) {
            const positionInScreen = i%(cardsForPage);
            const excludeSet = new Set();
            for (let j = 1; j <= (cardsForPage+positionInScreen); j++) {
                if (i - j >= 0) excludeSet.add(giftsNumbers[i - j]);
            }
            giftsNumbers[i] = getRandomNumber(excludeSet, gifts.length);
        }
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

function moveSlider() {
    const sliderShift = sliderRow.scrollWidth - sliderRow.offsetWidth;
    const oneMove = Math.ceil(sliderShift / totalSliderPositions);
    sliderRow.style.transform = `translateX(${currentSliderPosition !== totalSliderPositions ? -oneMove * currentSliderPosition : -sliderShift}px)`;
}

function handleArrowClick(event) {
    event.preventDefault();
    const clickedElement = event.target.closest('.arrow-button');

    if (clickedElement.classList.contains('arrow-button-right')) {
        currentSliderPosition = Math.min(totalSliderPositions, currentSliderPosition + 1);
    } else {
        currentSliderPosition = Math.max(0, currentSliderPosition - 1);
    }
    checkArrowState();
    moveSlider();
}

function checkArrowState() {
    arrowLeftButton.disabled = currentSliderPosition === 0;
    arrowLeftButton.classList.toggle('inactive', currentSliderPosition === 0);
    arrowRightButton.disabled = currentSliderPosition === totalSliderPositions;
    arrowRightButton.classList.toggle('inactive', currentSliderPosition === totalSliderPositions);
}

function handleHomeResize() {
    currentSliderPosition = 0;
    if (window.innerWidth > 768) {
        totalSliderPositions = 3;
    }
    else {
        totalSliderPositions = 6;
    }
    checkArrowState();
    moveSlider();
}

document.addEventListener('DOMContentLoaded', () => {

    arrowLeftButton.addEventListener('click', handleArrowClick);
    arrowRightButton.addEventListener('click', handleArrowClick);
    window.addEventListener('resize', handleHomeResize);
    handleHomeResize();

});