const pokemonContainer = document.getElementById('pokemon-container');

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
            outDiv.innerHTML = `<p>An Error Occurred</p>`;
        });
}

setTimeout(() => {
    for (let i = 1; i <= 150; i++) {
        const pokemonDiv = document.createElement('div');
        pokemonDiv.classList.add('pokemon');
        pokemonContainer.appendChild(pokemonDiv);
        fetchPokemon(i, pokemonDiv);
    }
}, 1000);
