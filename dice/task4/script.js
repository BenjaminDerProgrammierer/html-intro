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

function rollTwoDices() {
    return { dice1: rollDice(), dice2: rollDice() };
}

for (let i = 0; i < 15; i++) {
    let { dice1, dice2 } = rollTwoDices();
    let sum = dice1 + dice2;
    let twoDiceElement = document.createElement('div');
    twoDiceElement.classList.add('twoDice');
    twoDiceElement.innerHTML = `
        <img src="${diceImages[dice1 - 1]}" alt="Dice showing ${dice1}">
        <img src="${diceImages[dice2 - 1]}" alt="Dice showing ${dice2}">
        <p>Sum: ${sum}</p>
    `;
    resultElement.appendChild(twoDiceElement);
}