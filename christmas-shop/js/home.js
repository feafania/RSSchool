
let cardsForPage = 4;
const cardContainer = document.querySelector('.cards-container');
const arrowLeftButton = document.querySelector('.arrow-button-left');
const arrowRightButton = document.querySelector('.arrow-button-right');
const sliderRow = document.querySelector('.slider__row');
const timerDays = document.querySelector('.timer__sector.days').firstElementChild;
const timerHours = document.querySelector('.timer__sector.hours').firstElementChild;
const timerMinutes = document.querySelector('.timer__sector.minutes').firstElementChild;
const timerSeconds = document.querySelector('.timer__sector.seconds').firstElementChild;
let currentSliderPosition = 0;
let totalSliderPositions = 3;
const nextYear = (new Date()).getUTCFullYear() + 1;
const newYear = new Date(Date.UTC(nextYear, 0, 1, 0, 0, 0));


function calculateCards() {
    giftsNumbers.length = cardsForPage;
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

function updateTimer() {
    const now = new Date();
    const diffInSeconds = Math.floor((newYear - now) / 1000);

    if (diffInSeconds <= 0) {
        // thre is New Year!
        timerDays.textContent = '0';
        timerHours.textContent = '0';
        timerMinutes.textContent = '0';
        timerSeconds.textContent = '0';
        return;
    }

    timerDays.textContent = Math.floor(diffInSeconds / (24 * 60 * 60)).toString();
    timerHours.textContent = Math.floor((diffInSeconds % (24 * 60 * 60)) / (60 * 60)).toString();
    timerMinutes.textContent = Math.floor((diffInSeconds % (60 * 60)) / 60).toString();
    timerSeconds.textContent = (diffInSeconds % 60).toString();
}


document.addEventListener('DOMContentLoaded', () => {

    arrowLeftButton.addEventListener('click', handleArrowClick);
    arrowRightButton.addEventListener('click', handleArrowClick);
    window.addEventListener('resize', handleHomeResize);
    handleHomeResize();
    setInterval(updateTimer, 1000);
    updateTimer();
    document.querySelector('.slider__header').lastElementChild.textContent = `in the new ${nextYear}`;
});