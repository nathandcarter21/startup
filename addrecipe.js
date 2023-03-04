const verifyUser = () => {
    const username = localStorage.getItem('username')
    if (username === null || username === undefined || username === '')
        window.location.href = 'index.html'
}

verifyUser()

const addRecipe = () => {
    const name = document.querySelector('#name').value
    const ingredients = document.querySelector('#ingredients').value.split(',')
    const servings = document.querySelector('#servings').value
    const calories = document.querySelector('#calories').value
    const type = document.querySelector('#type').value
    const price = document.querySelector('#price').value

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