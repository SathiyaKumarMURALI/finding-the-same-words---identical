

let cards;
let flippedCards = [];
let matches = 0;
let attempts = 0;
let maxAttempts = 50;
let lockBoard = true;

let dataset = [
    `Have a good day`,
    `Have a good day`,
    `Good morning`,
    `Good morning`,
    `Fabulous`,
    `Fabulous`,
    `Lucky you`,
    `Lucky you`,
    `Tremendous`,
    `Tremendous`,
    `Wonderful`,
    `Wonderful`,
    `Good bye`,
    `Good bye`,
    `Impecabble`,
    `Impecabble`,
  ];

const newGameBtn = document.getElementById('new-game-btn');
// new-game-startBtn.classList("underline");
const startBtn = document.getElementById('start-btn');

newGameBtn.addEventListener('click', () => {
  flippedCards = [];
  matches = 0;
  attempts = 0;
  maxAttempts = 100;
  lockBoard = true;
  shuffleCards();
});

startBtn.addEventListener('click', () => {
  lockBoard = false;
  flipAllCards();
});


function flipCard() {
  if (lockBoard) return;
  if (this === flippedCards[0]) return;
  this.classList.add('flip');
  this.classList.toggle('flipped');
  
  if (flippedCards.length === 0) {
    flippedCards.push(this);
    return;
  }

  let secondCard = this;
  let firstCard = flippedCards[0];
  flippedCards = [];
  
  if (secondCard.dataset.card === firstCard.dataset.card) {
    matches++;
    attempts++;
    firstCard.classList.add('match');
    secondCard.classList.add('match');

    if (matches === dataset.length / 2) {
      alert(`Congratulations! You completed the game in ${attempts} attempts!`);
    }
    // Disable matched cards
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
  } else {
    attempts++;

    lockBoard = true;
    setTimeout(() => {
      firstCard.classList.remove('flip');
      secondCard.classList.remove('flip');
      firstCard.classList.toggle('flipped');
      secondCard.classList.toggle('flipped');
      lockBoard = false;
    }, 800);
  }

  if (attempts === maxAttempts) {
    alert('Sorry, you have exceeded the maximum number of attempts.');
    resetGame();
  }
}

function flipAllCards() {
  const cards = document.querySelectorAll('.card');
  cards.forEach(card => {
    //card.classList.add('flip');
    card.classList.toggle('flipped');
  });
}


function resetGame() {
  cards.forEach((card, index) => {
    card.classList.remove('flip');
    card.dataset.card = dataset[index];
  });
  flippedCards = [];
  matches = 0;
  attempts = 0;
}
  
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function shuffleCards() {
  shuffleArray(dataset); 

  const gameContainer = document.querySelector('.game-container');
  gameContainer.innerHTML = '';

  dataset.forEach(item => {
  const card = document.createElement('div');
  card.classList.add('card');
  card.dataset.card = item;
  
  const front = document.createElement('div');
  front.classList.add('front');
  
  const back = document.createElement('div');
  back.classList.add('back');
  
  const cardTextContainer = document.createElement('div');
  cardTextContainer.classList.add('card-text-container');
  
  const cardText = document.createElement('div');
  cardText.classList.add('card-text');
  cardText.textContent = item;
  
  cardTextContainer.appendChild(cardText);
  front.appendChild(cardTextContainer);
  card.appendChild(front);
  card.appendChild(back);
  gameContainer.appendChild(card);
  });
  
  cards = document.querySelectorAll('.card');
  cards.forEach(card => card.addEventListener('click', flipCard));
}

window.addEventListener('load', function() {
  // code to be executed when the document is fully loaded
  shuffleCards();
});
