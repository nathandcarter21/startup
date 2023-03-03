const recipes = [
    {
        name: 'Teriyaki Chicken with Rice',
        ingredients: [
            'Teriyaki Sauce',
            'Chicken',
            'Rice',
        ],
        servings: 4,
        calories: 2100,
        category: 'Dinner',
        price: '$$'
    },
    {
        name: 'BBQ Chicken Skewers',
        ingredients: [
            'Chicken',
            'Rice',
            'Onions',
            'Skewers',
        ],
        servings: 3,
        calories: 1800,
        category: 'Dinner',
        price: '$$$'
    },
    {
        name: 'Strawberry Shortcake',
        ingredients: [
            'Strawberries',
            'Milk',
            'Flour',
            'Water',
        ],
        servings: 1,
        calories: 900,
        category: 'Dessert',
        price: '$$'
    },
    {
        name: 'Avocado Toast',
        ingredients: [
            'Bread',
            'Avocado',
            'Eggs',
        ],
        servings: 1,
        calories: 500,
        category: 'Breakfast',
        price: '$'
    },
]

const loadRecipes = () => {
    const container = document.querySelector('.recipeContainer')

    const recipes = JSON.parse(localStorage.getItem('recipes'))

    container.replaceChildren()

    if (recipes === null)
        return

    for (const recipe of recipes) {
        const div = document.createElement('div')
        div.className += 'recipe'

        const h2 = document.createElement('h2')
        h2.innerText = recipe.name

        const ingredients = document.createElement('div')
        ingredients.className += 'ingredients'

        const h6 = document.createElement('h6')
        h6.innerText = 'Ingredients'

        const ul = document.createElement('ul')
        for (const ingredient of recipe.ingredients) {
            const li = document.createElement('li')
            li.innerText = ingredient
            ul.appendChild(li)
        }
        ingredients.replaceChildren(h6, ul)

        const servings = document.createElement('h4')
        servings.innerText = `Servings: ${recipe.servings}`

        const calories = document.createElement('h4')
        calories.innerText = `Calories: ${recipe.calories}`

        const type = document.createElement('h4')
        type.innerText = recipe.type

        const footer = document.createElement('div')
        footer.className += 'recipeFooter'

        const a = document.createElement('a')
        a.innerText = 'Link'
        a.href = 'recipe.html'

        const span = document.createElement('span')
        span.innerText = recipe.price

        footer.replaceChildren(a, span)

        div.replaceChildren(h2, ingredients, servings, calories, type, footer)

        container.appendChild(div)
    }
}

loadRecipes()

const filterRecipes = () => {
    const search = document.querySelector('.search').value
    const container = document.querySelector('.recipeContainer')

    container.replaceChildren()

    const recipes = JSON.parse(localStorage.getItem('recipes'))

    if (recipes === null)
        return

    for (const recipe of recipes) {
        const div = document.createElement('div')
        div.className += 'recipe'

        if (!recipe.name.toLowerCase().match(search.toLowerCase()))
            continue

        const h2 = document.createElement('h2')
        h2.innerText = recipe.name

        const ingredients = document.createElement('div')
        ingredients.className += 'ingredients'

        const h6 = document.createElement('h6')
        h6.innerText = 'Ingredients'

        const ul = document.createElement('ul')
        for (const ingredient of recipe.ingredients) {
            const li = document.createElement('li')
            li.innerText = ingredient
            ul.appendChild(li)
        }
        ingredients.replaceChildren(h6, ul)

        const servings = document.createElement('h4')
        servings.innerText = `Servings: ${recipe.servings}`

        const calories = document.createElement('h4')
        calories.innerText = `Calories: ${recipe.calories}`

        const type = document.createElement('h4')
        type.innerText = recipe.type

        const footer = document.createElement('div')
        footer.className += 'recipeFooter'

        const a = document.createElement('a')
        a.innerText = 'Link'
        a.href = 'recipe.html'

        const span = document.createElement('span')
        span.innerText = recipe.price

        footer.replaceChildren(a, span)

        div.replaceChildren(h2, ingredients, servings, calories, type, footer)

        container.appendChild(div)
    }
}

const clearRecipes = () => {
    localStorage.setItem('recipes', null)
    loadRecipes()
}
