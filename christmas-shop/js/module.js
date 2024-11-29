
function setInactive(elementActive) {
    elementActive.classList.add('inactive');
}

document.addEventListener('DOMContentLoaded', () => {
    calculateCards();
    console.log('Cards: ',calculateCards());
    loadGifts()
        .then(data => {
            gifts = data;
            calculateCards();
            createCards();
        });
    createCards();
});
