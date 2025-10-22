const pokemonDropdown = document.getElementById('pokemon-dropdown');
const pokemonContainer = document.getElementById('pokemon-container');

pokemonDropdown.addEventListener('change', (event) => {
    currentPokemonId = event.target.value;
    updatePokemonDisplay();
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
