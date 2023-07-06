const cards = [
    'A', 'B', 'C', 'D', 'E', 'F',
    'A', 'B', 'C', 'D', 'E', 'F',
    'G', 'H', 'I', 'J', 'K', 'L',
    'G', 'H', 'I', 'J', 'K', 'L',
    'M', 'N', 'O', 'P', 'Q', 'R',
    'M', 'N', 'O', 'P', 'Q', 'R',
  ];
  
  const board = document.querySelector('.board');
  let flippedCards = [];
  let matchedCards = [];
  
  function createTile(card) {
    const tile = document.createElement('div');
    tile.classList.add('tile');
  
    const tileInner = document.createElement('div');
    tileInner.classList.add('tile-inner');
  
    const tileFront = document.createElement('div');
    tileFront.classList.add('tile-front');
  
    const tileBack = document.createElement('div');
    tileBack.classList.add('tile-back');
    
    const logoImg = document.createElement('img');
    logoImg.src = 'images/logo.png';
    tileBack.appendChild(logoImg);
  
    const letterSpan = document.createElement('span');
    letterSpan.textContent = card;
    tileFront.appendChild(letterSpan);
  
    tileInner.appendChild(tileFront);
    tileInner.appendChild(tileBack);
    tile.appendChild(tileInner);
  
    tile.addEventListener('click', function () {
      if (flippedCards.length < 2 && !matchedCards.includes(tile) && !flippedCards.includes(tile)) {
        flipCard(tile);
        checkMatch();
      }
    });
  
    return tile;
  }
  
  function flipCard(tile) {
    tile.classList.add('flipped');
    flippedCards.push(tile);
  }
  
  function checkMatch() {
    if (flippedCards.length === 2) {
      const card1 = flippedCards[0].querySelector('.tile-front span').textContent;
      const card2 = flippedCards[1].querySelector('.tile-front span').textContent;
  
      if (card1 === card2) {
        matchedCards.push(flippedCards[0], flippedCards[1]);
        flippedCards = [];
        checkGameEnd();
      } else {
        setTimeout(function () {
          flippedCards.forEach(function (tile) {
            tile.classList.remove('flipped');
          });
          flippedCards = [];
        }, 1000);
      }
    }
  }
  
  function checkGameEnd() {
    if (matchedCards.length === cards.length) {
      alert('Congratulations! You have completed the game.');
    }
  }
  
  function shuffleCards(cards) {
    for (let i = cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [cards[i], cards[j]] = [cards[j], cards[i]];
    }
  }
  
  function createBoard() {
    shuffleCards(cards);
    for (let i = 0; i < cards.length; i++) {
      const card = cards[i];
      const tile = createTile(card);
      board.appendChild(tile);
    }
  }
  
  createBoard();
  