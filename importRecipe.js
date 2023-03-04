const importRecipe = () => {
    if (localStorage.getItem('username') === '')
        return
    const name = document.querySelector('.name').textContent
    const ingredientUL = document.querySelector('.ingredients')
    const list = ingredientUL.querySelectorAll('li');

    const ingredients = []
    for (let ingredient of list) {
        ingredients.push(ingredient.textContent)
    }
    const servings = document.querySelector('.servings').textContent
    const calories = document.querySelector('.calories').textContent
    const type = document.querySelector('.type').textContent
    const price = document.querySelector('.price').textContent

    const recipe = {
        name, ingredients, servings, calories, type, price
    }

    let recipes = JSON.parse(localStorage.getItem('recipes'))

    if (recipes === null)
        recipes = [recipe]
    else
        recipes.push(recipe)

    localStorage.setItem('recipes', JSON.stringify(recipes))
    window.location.href = 'myrecipes.html'
}

const displayImportButton = () => {
    const importBtn = document.querySelector('.import')
    const username = localStorage.getItem('username')
    if (username === null || username === undefined || username === '')
        importBtn.style.display = 'none'
}
displayImportButton()