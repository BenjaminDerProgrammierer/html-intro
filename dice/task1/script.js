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

let diceRoll = rollDice();

resultElement.innerHTML = `<img src="${diceImages[diceRoll - 1]}" alt="Dice showing ${diceRoll}">`; 