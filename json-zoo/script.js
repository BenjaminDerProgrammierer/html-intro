// {
//     "species": "Elefant",
//     "enclosure": "Afrikawiese",
//     "enclosure_area": 8000,
//     "count": 6,
//     "food": ["Heu", "Obst", "Gemüse"],
//     "feeding_times": ["08:00", "14:00"],
//     "keeper": "Sabine Müller",
//     "sponsorships": ["Sparkasse Köln", "Elefantenfreunde e.V."]
// }

const zooContainerElement = document.getElementById("zoo-container");

koelnerZoo.animals.forEach(animal => {
    zooContainerElement.innerHTML += `
    <div class="animal">
        <h2>${animal.species}</h2>
        <p><strong>Enclosure:</strong> ${animal.enclosure} (${animal.enclosure_area} m²)</p>
        <p><strong>Count:</strong> ${animal.count}</p>
        <p><strong>Keeper:</strong> ${animal.keeper}</p>
        <p><strong>Food:</strong> ${animal.food.join(', ')}</p>
        <p><strong>Feeding times:</strong> ${animal.feeding_times.join(', ')}</p>
        ${animal.sponsorships?.length ? `<p><strong>Sponsorships:</strong> ${animal.sponsorships.join(', ')}</p>` : ''}
    </div>`
});