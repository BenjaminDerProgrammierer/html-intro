let resultElement = document.querySelector('.result');

let diceImages = [
    '../assets/dice-1.svg',
    '../assets/dice-2.svg',
    '../assets/dice-3.svg',
    '../assets/dice-4.svg',
    '../assets/dice-5.svg',
    '../assets/dice-6.svg'
];

function rollDice() {
    return Math.floor(Math.random() * 6) + 1;
}

function newMove() {
    let diceResults = {dice1: rollDice(), dice2: rollDice() };
    let result = "";
    if (diceResults.dice1 > diceResults.dice2) {
        result = 'Spieler 1 hat gewonnen!';
    } else if (diceResults.dice1 < diceResults.dice2) {
        result = 'Spieler 2 hat gewonnen!';
    } else {
        result = "Unentschieden";
    }
    return {...diceResults, result};
}

for (let i = 0; i < 15; i++) {
    let {dice1, dice2, result} = newMove();
    resultElement.innerHTML += `
        <div class="twoDice">
            <img src="${diceImages[dice1 - 1]}" alt="Dice showing ${dice1}">
            <img src="${diceImages[dice2 - 1]}" alt="Dice showing ${dice2}">
            <p>${result}</p>
        </div>
    `;
}