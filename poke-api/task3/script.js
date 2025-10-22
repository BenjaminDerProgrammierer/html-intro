const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const errorMessage = document.getElementById('error-message');

const pokemonContainer = document.getElementById('pokemon-container');

searchButton.addEventListener('click', runSearch);

// Search on Enter key press
searchInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        runSearch();
    }
});

function runSearch() {
    // Remove empty spaces and convert to lowercase
    const query = searchInput.value.trim().toLowerCase();

    if (query) {
        // Clear previous results
        pokemonContainer.innerHTML = '';
        errorMessage.classList.add('hidden');

        const pokemonDiv = document.createElement('div');
        pokemonDiv.classList.add('pokemon');
        pokemonContainer.appendChild(pokemonDiv);
        fetchPokemon(query, pokemonDiv);
    } else {
        errorMessage.textContent = 'Please enter a Pokémon name.';
        errorMessage.classList.remove('hidden');
    }
}

function fetchPokemon(name, outDiv) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
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