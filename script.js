async function searchRecipesByIngredients(ingredients) {
    try {
        const response = await axios.get('https://api.spoonacular.com/recipes/findByIngredients', {
            params: {
                apiKey: '6e699b41306d427da8bb632971f2e578',
                ingredients: ingredients.join(','),
                number: 9,
            },
        });

        const recipes = response.data;

        displayRecipes(recipes);
    } catch (error) {
        console.error('Error searching for recipes:', error);
        throw error;
    }
}

function displayRecipes(recipes) {
    const searchResults = document.querySelector('.search-results');
    searchResults.innerHTML = '';

    if (recipes.length === 0) {
        // If no recipes were found, display a message
        searchResults.innerHTML = '<p style="color: black; margin-top: 30px; margin-left: 600px;">No recipes found. Please try different ingredients.</p>';
    } else {
        // Loop through and display the recipes
        recipes.forEach(recipe => {
            const recipeCard = document.createElement('div');
            recipeCard.className = 'recipe-card';
            recipeCard.innerHTML = `
                <h2>${recipe.title}</h2>
                <img src="${recipe.image}" alt="${recipe.title}">
                <p>Missed Ingredients: ${recipe.missedIngredients.map(ingredient => ingredient.name).join(', ')}</p>
                <p>Used Ingredients: ${recipe.usedIngredients.map(ingredient => ingredient.name).join(', ')}</p>
                <button type="button" class="view-recipe-button" style="margin-top: 10px;" data-recipe-id="${recipe.id}"><span></span>View Recipe</button>
            `;
            searchResults.appendChild(recipeCard);
        });

        // Add event listeners to "View Recipe" buttons to open the modal with recipe details
        const viewRecipeButtons = document.querySelectorAll('.recipe-card button');
        viewRecipeButtons.forEach((button) => {
            button.addEventListener('click', () => {
                const recipeId = button.getAttribute('data-recipe-id');
                openRecipeModal(recipeId);
            });
        });
    }
}

/* function displayRecipes(recipes) {
    const searchResults = document.querySelector('.search-results');
    searchResults.innerHTML = '';

    if (recipes.length === 0) {
        // If no recipes were found, display a message
        searchResults.innerHTML = '<p style="color: black; margin-top: 30px; margin-left: 600px;">No recipes found. Please try different ingredients.</p>';
    } else {
        // Loop through and display the recipes
        recipes.forEach(recipe => {
            const recipeCard = document.createElement('div');
            recipeCard.className = 'recipe-card';
            recipeCard.innerHTML = `
                <h2>${recipe.title}</h2>
                <img src="${recipe.image}" alt="${recipe.title}">
                <p>Missing Ingredients: ${recipe.missedIngredientCount}</p>
                <p>Used Ingredients: ${recipe.usedIngredientCount}</p>
                <button type="button" class="view-recipe-button" data-recipe-id="${recipe.id}"><span></span>View Recipe</button>
            `;
            searchResults.appendChild(recipeCard);
        });

        // Add event listeners to "View Recipe" buttons to open the modal with recipe details
        const viewRecipeButtons = document.querySelectorAll('.recipe-card button');
        viewRecipeButtons.forEach((button) => {
            button.addEventListener('click', () => {
                const recipeId = button.getAttribute('data-recipe-id');
                openRecipeModal(recipeId);
            });
        });
    }
} */


const searchRecipesButton = document.getElementById('search-recipes');
searchRecipesButton.addEventListener('click', () => {
    const ingredientInput = document.getElementById('ingredient-input');
    const ingredients = ingredientInput.value.split(',').map(ingredient => ingredient.trim());

    searchRecipesByIngredients(ingredients);
});

const searchButton = document.getElementById("search-button");

async function fetchRandomRecipes() {
    try {
        const response = await axios.get('https://api.spoonacular.com/recipes/random', {
            params: {
                apiKey: '6e699b41306d427da8bb632971f2e578',
                number: 3,
            },
        });

        const recipes = response.data.recipes;

        for (let i = 0; i < recipes.length; i++) {
            const recipe = recipes[i];
            const recipeBox = document.querySelector(`.box${i + 1}`);

            recipeBox.innerHTML = `
                    <h2>${recipe.title}</h2>
                    <img src="${recipe.image}" alt="${recipe.title}">
                    <button type="button" class="view-recipe-button" data-recipe-id="${recipe.id}"><span></span>View Recipe</button>
                `;

            // Add an event listener to the "View Recipe" button within the recommended section
            const viewRecipeButton = recipeBox.querySelector('.view-recipe-button');
            viewRecipeButton.addEventListener('click', () => {
                const recipeId = viewRecipeButton.getAttribute('data-recipe-id');
                openRecipeModal(recipeId);
            });
        }
    } catch (error) {
        console.error('Error fetching random recipes:', error);
        throw error;
    }
}

fetchRandomRecipes();

const viewRecipeButtons = document.querySelectorAll('.recipe-card button');
viewRecipeButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
        // When a button is clicked, call openRecipeModal with the corresponding recipe ID
        openRecipeModal(recipes[index].id);
    });
});

async function openRecipeModal(recipeId) {
    try {
        // Make an API request to Spoonacular to get the recipe details
        const response = await axios.get(`https://api.spoonacular.com/recipes/${recipeId}/information`, {
            params: {
                apiKey: '6e699b41306d427da8bb632971f2e578', // Replace with your Spoonacular API key
                includeNutrition: false, // Include nutrition information
                includeEquipment: false, // Include equipment information
                includeInstructions: true, // Include detailed instructions
            },
        });

        const recipe = response.data;

        // Check if the modal already exists; if not, create it
        let modal = document.getElementById('recipe-modal');
        if (!modal) {
            // Create the modal element
            modal = document.createElement('div');
            modal.id = 'recipe-modal';
            modal.className = 'modal';
        }

        // Create HTML for ingredients
        const ingredientsList = recipe.extendedIngredients ? recipe.extendedIngredients.map((ingredient) => `<li>${ingredient.original}</li>`).join('') : '';

        // Create HTML for steps
        const stepsList = recipe.analyzedInstructions[0]?.steps ? recipe.analyzedInstructions[0].steps.map((step) => `<li>${step.step}</li>`).join('') : '';

        // Set the modal content
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close">×</span> <!-- Close button -->
                <span class="heart" style="fill: black;">
                    <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 24 24">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                    </svg>
                </span>
                <h2 class="modal-title">${recipe.title}</h2>
                <img class="modal-image" src="${recipe.image}" alt="Recipe Image">
                <h3>Ingredients:</h3>
                <ul class="modal-ingred">${ingredientsList}</ul>
                <h3>Steps:</h3>
                <ol class="modal-instructions">${stepsList}</ol>
            </div>
        `;

        // Add an event listener to the heart icon to toggle the "liked" class
        const heartIcon = modal.querySelector('.heart');
        heartIcon.addEventListener('click', () => {
            // Toggle the "liked" class to change the color
            heartIcon.classList.toggle('liked');

            // Change the fill color to red if "liked" class is present, or reset to the original color
            const heartColor = heartIcon.classList.contains('liked') ? 'red' : 'black';
            const svgPath = heartIcon.querySelector('path');
            svgPath.style.fill = heartColor;
        });

        // Add an event listener to the close button
        const closeButton = modal.querySelector('.close');
        closeButton.addEventListener('click', () => {
            // Remove the modal when the close button is clicked
            document.body.removeChild(modal);
        });

        // Append the modal to the document body if it's not already present
        if (!document.contains(modal)) {
            document.body.appendChild(modal);
        }
    } catch (error) {
        console.error('Error fetching recipe details:', error);
    }
}
