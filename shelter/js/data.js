const pets = [
    {
        imgSrc: './assets/img/pets-katrine/pets-katrine.png',
        name: 'Katrine',
        species: 'Cat',
        breed: 'British Shorthair',
        about:'Katrine is a beautiful girl. She is as soft as the finest velvet with a thick lush fur. Will love you until the last breath she takes as long as you are the one. She is picky about her affection. She loves cuddles and to stretch into your hands for a deeper relaxations.',
        age: '9 months',
        inoculations: 'none',
        diseases: 'none',
        parasiters: 'none'
    },
    {
        imgSrc: './assets/img/pets-jennifer/pets-jennifer.png',
        name: 'Jennifer',
        species: 'Dog',
        breed: 'Labrador',
        about:'Jennifer is a sweet 2 months old Labrador that is patiently waiting to find a new forever home. This girl really enjoys being able to go outside to run and play, but won\'t hesitate to play up a storm in the house if she has all of her favorite toys.',
        age: '2 months',
        inoculations: 'none',
        diseases: 'none',
        parasiters: 'none'
    },
    {
        imgSrc: './assets/img/pets-woody/pets-woody.png',
        name: 'Woody',
        species: 'Dog',
        breed: 'Golden Retriever',
        about:'Woody is a handsome 3 1/2 year old boy. Woody does know basic commands and is a smart pup. Since he is on the stronger side, he will learn a lot from your training. Woody will be happier when he finds a new family that can spend a lot of time with him.',
        age: '2 years',
        inoculations: 'none',
        diseases: 'none',
        parasiters: 'none'
    },
    {
        imgSrc: './assets/img/pets-sophia/pets-sophia.png',
        name: 'Sophia',
        species: 'Dog',
        breed: 'Shih tzu',
        about:'',
        age: '1 month',
        inoculations: 'none',
        diseases: 'none',
        parasiters: 'none'
    },
    {
        imgSrc: './assets/img/pets-timmy/pets-timmy.png',
        name: 'Timmy',
        species: 'Cat',
        breed: 'British Shorthair',
        about:'Timmy is an adorable grey british shorthair male. He loves to play and snuggle. He is neutered and up to date on age appropriate vaccinations. He can be chatty and enjoys being held. Timmy has a lot to say and wants a person to share his thoughts with.',
        age: '4 years',
        inoculations: 'none',
        diseases: 'none',
        parasiters: 'none'
    },
    {
        imgSrc: './assets/img/pets-charly/pets-charly.png',
        name: 'Charly',
        species: 'Dog',
        breed: 'Jack Russell Terrier ',
        about:'This cute boy, Charly, is three years old and he likes adults and kids. He isn’t fond of many other dogs, so he might do best in a single dog home. Charly has lots of energy, and loves to run and play. We think a fenced yard would make him very happy.',
        age: '6 years',
        inoculations: 'none',
        diseases: 'none',
        parasiters: 'none'
    },
    {
        imgSrc: './assets/img/pets-scarlet/pets-scarlet.png',
        name: 'Scarlett',
        species: 'Dog',
        breed: 'Jack Russell Terrier',
        about:'Scarlett is a happy, playful girl who will make you laugh and smile. She forms a bond quickly and will make a loyal companion and a wonderful family dog or a good companion for a single individual too since she likes to hang out and be with her human.',
        age: '5 months',
        inoculations: 'none',
        diseases: 'none',
        parasiters: 'none'
    },
    {
        imgSrc: './assets/img/pets-freddie/pets-freddie.png',
        name: 'Freddie',
        species: 'Cat',
        breed: 'British Shorthair',
        about:'Freddie is a little shy at first, but very sweet when he warms up. He likes playing with shoe strings and bottle caps. He is quick to learn the rhythms of his human’s daily life. Freddie has bounced around a lot in his life, and is looking to find his forever home.',
        age: '7 months',
        inoculations: 'none',
        diseases: 'none',
        parasiters: 'none'
    }
];

function createCard(numberArray,id) {
    const cardElement = document.getElementById(id);
    if (!cardElement) {return}
    cardElement.innerHTML = '';

    const img = document.createElement('img');
    const title = document.createElement('p');
    if (numberArray < pets.length) {
        img.src = pets[numberArray].imgSrc;
        img.alt = `${pets[numberArray].name} — ${pets[numberArray].species}`;
        img.title = `${pets[numberArray].name} — ${pets[numberArray].species} ${pets[numberArray].breed}`;
        img.classList.add('card-image');

        title.classList.add('card-title');
        title.textContent = pets[numberArray].name;
    }
    const button = document.createElement('button');
    button.classList.add('button-oval');
    button.classList.add('button-secondary');
    button.classList.add('button-learn-more');

    cardElement.appendChild(img);
    cardElement.appendChild(title);
    cardElement.appendChild(button);

}