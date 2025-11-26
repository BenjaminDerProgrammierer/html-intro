const textInput = document.getElementById('meal-input');
const searchBtn = document.getElementById('search-btn');
const shortcutsDiv = document.getElementById('shortcuts');
const mealsDiv = document.getElementById('meals');

// Fill in Shortcuts with A-Z buttons
for (let i = 'A'.codePointAt(0); i <= 'Z'.codePointAt(0); i++) {
    const letter = String.fromCodePoint(i);
    const button = document.createElement('button');
    button.classList.add('shortcut-btn');
    button.textContent = letter;
    button.addEventListener('click', () => {
        runLetterSearch(letter);
    });
    shortcutsDiv.appendChild(button);
}

searchBtn.addEventListener('click', (e) => {
    e.preventDefault();
    runTextSearch(textInput.value);
});


// www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata
async function runTextSearch(query) {
    await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`)
        .then((r) => {
            if (!r.ok) {
                throw new Error('Network response was not ok');
            }

            return r.json();
        }).then(data => data.meals[0]).then(data => {
            displayMeals([{
                name: data.strMeal,
                image: data.strMealThumb,
                youtube: data.strYoutube
            }])
        });
}

// www.themealdb.com/api/json/v1/1/search.php?f=a
async function runLetterSearch(letter) {
    await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`)
        .then((r) => {
            if (!r.ok) {
                throw new Error('Network response was not ok');
            }
            return r.json();
        })
        .then(data => {
            displayMeals(data.meals.map(meal => ({
                name: meal.strMeal,
                image: meal.strMealThumb,
                youtube: meal.strYoutube
            })))
        });
}

function displayMeals(meals) {
    mealsDiv.innerHTML = '';
    for (const meal of meals) {
        const mealDiv = document.createElement('div');
        const title = document.createElement('h3');
        title.textContent = meal.name;
        mealDiv.appendChild(title);

        const img = document.createElement('img');
        img.src = meal.image;
        img.alt = meal.name;
        mealDiv.appendChild(img);

        const link = document.createElement('a');
        link.href = meal.youtube;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        link.textContent = 'Watch on YouTube';
        mealDiv.appendChild(link);


        mealsDiv.appendChild(mealDiv);
    }
}