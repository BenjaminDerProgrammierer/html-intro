let resultElement = document.querySelector('#result');
let buttonElement = document.querySelector('#newGameButton');

let diceImages = [
    '../assets/dice-1.svg',
    '../assets/dice-2.svg',
    '../assets/dice-3.svg',
    '../assets/dice-4.svg',
    '../assets/dice-5.svg',
    '../assets/dice-6.svg'
];

let score1 = 0;
let score2 = 0;

function rollDice() {
    return Math.floor(Math.random() * 6) + 1;
}

function newMove() {
    let diceResults = { dice1: rollDice(), dice2: rollDice() };
    let result = "";
    if (diceResults.dice1 > diceResults.dice2) {
        result = 'Spieler 1 hat gewonnen!';
        score1++;
    } else if (diceResults.dice1 < diceResults.dice2) {
        result = 'Spieler 2 hat gewonnen!';
        score2++;
    } else {
        result = "Unentschieden";
    }
    return { ...diceResults, result };
}

function checkWinner() {
    if (score1 > score2) {
        return 'Spieler 1 ist der Gesamtsieger!';
    } else if (score1 < score2) {
        return 'Spieler 2 ist der Gesamtsieger!';
    } else {
        return 'Das Spiel endet unentschieden!';
    }
}

function simulateGame() {
    for (let i = 0; i < 15; i++) {
        let { dice1, dice2, result } = newMove();

        const twoDiceElement = document.createElement('div');
        twoDiceElement.classList.add('twoDice');

        const dice1Image = document.createElement('img');
        const dice2Image = document.createElement('img');
        const resultText = document.createElement('p');

        dice1Image.src = diceImages[dice1 - 1];
        dice1Image.alt = `Dice showing ${dice1}`;

        dice2Image.src = diceImages[dice2 - 1];
        dice2Image.alt = `Dice showing ${dice2}`;

        if (dice1 > dice2) {
            dice1Image.classList.add('highlight');
        } else if (dice2 > dice1) {
            dice2Image.classList.add('highlight');
        }

        resultText.textContent = result;

        twoDiceElement.appendChild(dice1Image);
        twoDiceElement.appendChild(dice2Image);
        twoDiceElement.appendChild(resultText);

        resultElement.appendChild(twoDiceElement);
    }

    const finalScoreElement = document.createElement('div');
    finalScoreElement.classList.add('finalScore');
    finalScoreElement.appendChild(document.createElement('hr'));

    const winnerText = document.createElement('h2');
    winnerText.textContent = checkWinner();
    finalScoreElement.appendChild(winnerText);

    const scoreText = document.createElement('p');
    scoreText.innerHTML = `Endstand: <span class="spieler1 ${score1 > score2 ? 'highlight' : ''}">Spieler 1: ${score1}</span>, <span class="spieler2 ${score2 > score1 ? 'highlight' : ''}">Spieler 2: ${score2}</span>`;
    finalScoreElement.appendChild(scoreText);

    resultElement.appendChild(finalScoreElement);
};

buttonElement.addEventListener('click', () => {
    // Reset scores and result display
    score1 = 0;
    score2 = 0;
    resultElement.innerHTML = '';
    simulateGame();
});

// Initial game simulation
simulateGame();