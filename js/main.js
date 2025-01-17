let words = [];
let lastWords = [];
let maxWords = 20;
let numberOfAttempts = 6;
let currentWord = 'mosquito';
let currentHint = 'A small insect known for its buzzing sound and its tendency to bite humans and animals';

function getRandomNumber(excludeSet,arrLength) {
    const availableNumbers = Array.from({ length: arrLength }, (_, i) => i);
    const possibleNumbers = availableNumbers.filter(num => !excludeSet.has(num));
    if (possibleNumbers.length === 0) return null;
    const randomIndex = Math.floor(Math.random() * possibleNumbers.length);
    return possibleNumbers[randomIndex];
}

function fillWords(word) {
    const gameWords = document.querySelector('.game-words');
    if (gameWords) {
        while (gameWords.firstChild) {
            gameWords.removeChild(gameWords.firstChild);
        }
        if (words.length > 0) {
            const randomIndex = getRandomNumber(new Set(lastWords), words.length);
            lastWords.push(randomIndex);
            if (lastWords.length > maxWords) {
                lastWords.shift();
            }
            currentWord = words[randomIndex].word;
            currentHint = words[randomIndex].hint;
        }
        for (let i = 0; i < currentWord.length; i += 1) {
            const gameWordLetter = document.createElement('span');
            gameWordLetter.classList.add('game-word__letter');
            gameWordLetter.id = 'letter' + i;
            gameWordLetter.textContent = currentWord[i];
            gameWords.append(gameWordLetter);
        }
    }
    const gameGuessScore = document.querySelector('.game-guess__score');
    if (gameGuessScore) {
        gameGuessScore.textContent = '0';
    }
    const gameHint = document.querySelector('.game-hint');
    if (gameHint) {
        gameHint.textContent = 'Hint: ' + currentHint;
    }
}

function fillKeys(gameKeys) {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    for (let letter of alphabet) {
        const button = document.createElement('button');
        button.classList.add('game-keys__key');
        button.type = 'button';
        button.dataset.key = letter;
        button.textContent = letter;
        gameKeys.append(button);
    }
}

function fillGame(game) {
    const gameWords = document.createElement('div');
    gameWords.classList.add('game-words');
    game.append(gameWords);

    const gameHint = document.createElement('div');
    gameHint.classList.add('game-hint');
    game.append(gameHint);

    const gameGuess = document.createElement('div');
    gameGuess.classList.add('game-guess');
    game.append(gameGuess);
    const gameGuessText = document.createElement('span');
    gameGuessText.classList.add('game-guess__text');
    gameGuessText.textContent = 'Incorrect guesses: ';
    gameGuess.append(gameGuessText);
    const gameGuessScoreWrapper = document.createElement('span');
    gameGuessScoreWrapper.classList.add('game-guess__score-wrapper');
    gameGuess.append(gameGuessScoreWrapper);
    const gameGuessScore = document.createElement('span');
    gameGuessScore.classList.add('game-guess__score');
    gameGuessScoreWrapper.append(gameGuessScore);
    const gameGuessSlash = document.createElement('span');
    gameGuessSlash.classList.add('game-guess__slash');
    gameGuessSlash.textContent = ' / ';
    gameGuessScoreWrapper.append(gameGuessSlash);
    const gameNumberOfAttempts = document.createElement('span');
    gameNumberOfAttempts.classList.add('game-number-of-attempts');
    gameNumberOfAttempts.textContent = numberOfAttempts;
    gameGuessScoreWrapper.append(gameNumberOfAttempts);

    fillWords();

    const gameKeys = document.createElement('div');
    gameKeys.classList.add('game-keys');
    game.append(gameKeys);
    fillKeys(gameKeys);
}
function fillHangman(hangman) {
    const gallowsFrame = document.createElement('div');
    gallowsFrame.classList.add('gallows-frame');
    hangman.append(gallowsFrame);
    const gallows = document.createElement('div');

    gallows.classList.add('gallows');
    gallowsFrame.append(gallows);
    const gallowsVertical = document.createElement('div');
    gallowsVertical.classList.add('gallows__vertical');
    gallows.append(gallowsVertical);
    const gallowsHorizontal = document.createElement('div');
    gallowsHorizontal.classList.add('gallows__horizontal');
    gallows.append(gallowsHorizontal);
    const gallowsBetween = document.createElement('div');
    gallowsBetween.classList.add('gallows__between');
    gallows.append(gallowsBetween);
    const gallowsHanger = document.createElement('div');
    gallowsHanger.classList.add('gallows__hanger');
    gallows.append(gallowsHanger);

    const hangmanFrame = document.createElement('div');
    hangmanFrame.classList.add('hangman-frame');
    gallowsFrame.append(hangmanFrame);
    const head = document.createElement('div');
    head.classList.add('head');
    head.innerHTML = `
<svg viewBox="0 0 101 101" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="50.5" cy="50.5" r="48" />
</svg>
`;
    hangmanFrame.append(head);
    const body = document.createElement('div');
    body.classList.add('body');
    hangmanFrame.append(body);
    const handLeft = document.createElement('div');
    handLeft.classList.add('hand-left');
    hangmanFrame.append(handLeft);
    const handRight = document.createElement('div');
    handRight.classList.add('hand-right');
    hangmanFrame.append(handRight);
    const legLeft = document.createElement('div');
    legLeft.classList.add('leg-left');
    hangmanFrame.append(legLeft);
    const legRight = document.createElement('div');
    legRight.classList.add('leg-right');
    hangmanFrame.append(legRight);

    const hangmanName = document.createElement('div');
    hangmanName.classList.add('hangman-name');
    hangmanName.textContent = 'Hangman game';
    hangman.append(hangmanName);
}

async function fillPage() {
    const body = document.body;
    body.append(document.createElement('header'));
    const main = document.createElement('main');
    body.append(main);
    body.append(document.createElement('footer'));

    const wrapper = document.createElement('div');
    wrapper.classList.add('wrapper');
    main.append(wrapper);
    const hangman = document.createElement('section');
    hangman.classList.add('hangman');
    wrapper.append(hangman);
    fillHangman(hangman);
    const game = document.createElement('section');
    game.classList.add('game');
    wrapper.append(game);
    fillGame(game);

}

async function loadWords() {
    const response = await fetch('./js/words.json');
    return await response.json(); // array
}

document.addEventListener('DOMContentLoaded', async () => {
    try {
        const data = await loadWords();
        words = data;
        fillWords();
        await fillPage();
    } catch (error) {
        console.error("Error loading the page:", error);
    }
});