const previousButton = document.getElementById('previous-button');
const nextButton = document.getElementById('next-button');

const pokemonContainer = document.getElementById('pokemon-container');

let currentPokemonId = 1;

// There are 1025 standard Pokémons, and 10000-10303 are special forms

previousButton.addEventListener('click', () => {
    if (currentPokemonId === 10001) {
        currentPokemonId = 1025;
    }
    if (currentPokemonId > 1) {
        currentPokemonId--;
        updatePokemonDisplay();
    }
});

nextButton.addEventListener('click', () => {
    if (currentPokemonId === 1025) {
        currentPokemonId = 10000;
    }
    if (currentPokemonId < 10303) {
        currentPokemonId++;
        updatePokemonDisplay();
    }
});

function fetchPokemon(name, outDiv) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${name}/`)
        .then(response => {
            // Assure 200 OK response
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response;
        })
        .then(response => response.json())
        .then(data => {
            outDiv.innerHTML = `
                <h2 style="text-transform: capitalize;">${data.name}</h2>
                <img src="${data.sprites.front_default}" alt="${data.name}">
                <p>Type: ${data.types.map(t => t.type.name).join(', ')}</p>
            `;
        })
        .catch(() => {
            outDiv.innerHTML = `<p>This Pokémon does not exist.</p>`;
        });
}

function updatePokemonDisplay() {
    pokemonContainer.innerHTML = '';
    const pokemonDiv = document.createElement('div');
    pokemonContainer.appendChild(pokemonDiv);
    fetchPokemon(currentPokemonId, pokemonDiv);
}

// Initial display
updatePokemonDisplay();

// Keyboard navigation

document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') {
        previousButton.click();
    } else if (event.key === 'ArrowRight') {
        nextButton.click();
    }
});
