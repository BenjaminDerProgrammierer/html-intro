const pokemonContainer = document.getElementById('pokemon-container');

(async () => {
    await fetch('https://pokeapi.co/api/v2/pokemon?limit=10000')
        .then(response => response.json())
        .then(data => {
            const pokemonList = data.results;

            for (const p of pokemonList) {
                // Fetch p.url and call fetchPokemon
                const pokemonDiv = document.createElement('div');
                pokemonDiv.classList.add('pokemon');
                fetchPokemon(p.name, pokemonDiv);
                pokemonContainer.appendChild(pokemonDiv);
            }

            document.body.insertBefore(pokemonDropdown, pokemonContainer);
        })
})();

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
                ${data.sprites.front_default ? `<img src="${data.sprites.front_default}" alt="${data.name}">` : '<p>No image available</p>'}
                <p>Type: ${data.types.map(t => t.type.name).join(', ')}</p>
            `;
        })
        .catch(() => {
            outDiv.innerHTML = `<p>This Pokémon does not exist.</p>`;
        });
}
