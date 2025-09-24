let resultElement = document.querySelector('#result');
let rollPlayer1Element = document.querySelector('#rollPlayer1');
let rollPlayer2Element = document.querySelector('#rollPlayer2');
let player1NameElement = document.querySelector('#player1Name');
let player2NameElement = document.querySelector('#player2Name');
let diceColorElement = document.querySelector('#diceColor');

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
let dice1 = 0;
let dice2 = 0;

let player1Name = "Player 1";
let player2Name = "Player 2";

function rollDice() {
    return Math.floor(Math.random() * 6) + 1;
}

function checkWinner() {
    if (score1 > score2) {
        return `<span class="player1Name">${player1Name}</span> ist der Gesamtsieger!`;
    } else if (score1 < score2) {
        return `<span class="player2Name">${player2Name}</span> ist der Gesamtsieger!`;
    } else {
        return 'Das Spiel endet unentschieden!';
    }
}

function checkMoveDone() {
    if (dice1 === 0 || dice2 === 0) {
        return;
    }

    let result = "";
    if (dice1 > dice2) {
        result = ` <span class="player1Name">${player1Name}</span> hat gewonnen!`;
        score1++;
    } else if (dice1 < dice2) {
        result = ` <span class="player2Name">${player2Name}</span> hat gewonnen!`;
        score2++;
    } else {
        result = "Unentschieden";
    }

    // Delete previous partial results
    document.querySelectorAll('.partial').forEach(e => e.remove());
    // Delete previous final results
    document.querySelectorAll('.finalScore').forEach(e => e.remove());

    const twoDiceElement = document.createElement('div');
    twoDiceElement.classList.add('twoDice');

    const dice1Image = document.createElement('object');
    const dice2Image = document.createElement('object');
    const resultText = document.createElement('p');

    dice1Image.id = `dice-${Date.now()}-1`;
    dice1Image.type = 'image/svg+xml';
    dice1Image.data = diceImages[dice1 - 1];
    dice1Image.className = 'dice';
    dice1Image.setAttribute('aria-label', `Dice showing ${dice1}`);

    dice2Image.id = `dice-${Date.now()}-2`;
    dice2Image.type = 'image/svg+xml';
    dice2Image.data = diceImages[dice2 - 1];
    dice2Image.className = 'dice';
    dice2Image.setAttribute('aria-label', `Dice showing ${dice2}`);

    if (dice1 > dice2) {
        dice1Image.classList.add('highlight');
    } else if (dice2 > dice1) {
        dice2Image.classList.add('highlight');
    }

    resultText.innerHTML = result;

    twoDiceElement.appendChild(dice1Image);
    twoDiceElement.appendChild(dice2Image);
    twoDiceElement.appendChild(resultText);

    resultElement.appendChild(twoDiceElement);

    // Show current score
    const finalScoreElement = document.createElement('div');
    finalScoreElement.classList.add('finalScore');
    finalScoreElement.appendChild(document.createElement('hr'));

    const winnerText = document.createElement('h2');
    winnerText.innerHTML = checkWinner();
    finalScoreElement.appendChild(winnerText);

    const scoreText = document.createElement('p');
    scoreText.innerHTML = `Endstand: <span class="spieler1 ${score1 > score2 ? 'highlight' : ''}"> <span class="player1Name">${player1Name}</span>: ${score1}</span>, <span class="spieler2 ${score2 > score1 ? 'highlight' : ''}"> <span class="player2Name">${player2Name}</span>: ${score2}</span>`;
    finalScoreElement.appendChild(scoreText);

    resultElement.appendChild(finalScoreElement);

    // Reset for next round
    dice1 = 0;
    dice2 = 0;
    rollPlayer1Element.disabled = false;
    rollPlayer2Element.disabled = false;
}

function showPartialScore() {
    const partialDiceElement = document.createElement('div');
    partialDiceElement.classList.add('twoDice');
    partialDiceElement.classList.add('partial');

    let dice;
    if (dice1 !== 0) {
        dice = dice1;
    } else {
        dice = dice2;
    }
    const diceImage = document.createElement('object');

    diceImage.id = `dice-${Date.now()}-partial`;
    diceImage.type = 'image/svg+xml';
    diceImage.data = diceImages[dice - 1];
    diceImage.className = 'dice';
    diceImage.setAttribute('aria-label', `Dice showing ${dice}`);

    partialDiceElement.appendChild(diceImage);

    resultElement.appendChild(partialDiceElement);

}

rollPlayer1Element.addEventListener('click', () => {
    dice1 = rollDice();
    rollPlayer1Element.disabled = true;
    showPartialScore();
    checkMoveDone();
    setColors();

    player1NameElement.parentElement.remove();
    if (document.querySelector('.settings').children.length <= 1) {
        document.querySelector('.settings').remove();
    }
});

rollPlayer2Element.addEventListener('click', () => {
    dice2 = rollDice();
    rollPlayer2Element.disabled = true;
    showPartialScore();
    checkMoveDone();
    setColors();

    player2NameElement.parentElement.remove();
    if (document.querySelector('.settings').children.length <= 1) {
        document.querySelector('.settings').remove();
    }
});

player1NameElement.addEventListener('input', () => {
    document.querySelectorAll('.player1Name').forEach(e => e.textContent = player1NameElement.value);
});

player2NameElement.addEventListener('input', () => {
    document.querySelectorAll('.player2Name').forEach(e => e.textContent = player2NameElement.value);
});

// Set initial input values on load
document.querySelector('#player1Name').value = player1Name;
document.querySelector('#player2Name').value = player2Name;
document.querySelector('#diceColor').value = diceColor;

diceColorElement.addEventListener('input', setColors);

function setColors() {
    const color = diceColorElement.value;
    document.querySelectorAll('.dice').forEach(e => {
        // SVG might not be loaded yet - if so, wait for load event and try again

        const svgDoc = e.contentDocument;

        if (!svgDoc) {
            e.addEventListener('load', setColors);
            return;
        }

        svgDoc.querySelector("svg").style.color = color;
    });
}
