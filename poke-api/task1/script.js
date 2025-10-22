const pikachuBtn = document.getElementById('pikachu-button');
const pikachuDiv = document.getElementById('pikachu-render');
const charmanderBtn = document.getElementById('charmander-button');
const charmanderDiv = document.getElementById('charmander-render');

function fetchPokemon(name, outDiv) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
        .then(response => {
            // Assurre 200 OK response
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response;
        })
        .then(response => response.json())
        .then(data => {
            // Clear previous content
            outDiv.innerHTML = `
                <h2 style="text-transform: capitalize;">${data.name}</h2>
                <div>
                    <img src="${data.sprites.front_shiny}" alt="${data.name}'s front" style="height: ${data.height * 10}px;">
                    <img src="${data.sprites.back_shiny}" alt="${data.name}'s back" style="height: ${data.height * 10}px;">
                </div>
                <p>Weight: ${data.weight}</p>
                <p>Type: ${data.types.map(t => t.type.name).join(', ')}</p>
                <p>Attacks: ${data.moves.slice(0, 5).map(m => m.move.name).join(', ')}</p>
                <audio controls>
                    <source src="${data.cries.latest}" type="audio/ogg">
                    Your browser does not support the audio element.
                </audio>
            `;
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
            outDiv.innerHTML = `<p>Error fetching data. Please try again later.</p>`;
        });
}

pikachuBtn.addEventListener('click', () => fetchPokemon('pikachu', pikachuDiv));
charmanderBtn.addEventListener('click', () => fetchPokemon('charmander', charmanderDiv));