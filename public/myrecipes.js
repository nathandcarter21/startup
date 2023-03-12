let userRecipes = []

// const verifyUser = () => {
//     const username = localStorage.getItem('username')
//     if (username === null || username === undefined || username === '')
//         window.location.href = 'index.html'
// }

// verifyUser()

const loadRecipes = async () => {
    const container = document.querySelector('.recipeContainer')

    let recipes = undefined

    // const username = localStorage.getItem('username')

    try {
        const res = await fetch('/api/myrecipes', {
            method: 'GET',
            headers: { 'content-type': 'application/json' }
        })
        if (res.status === 401) {
            window.location.href = 'index.html'
            return
        }
        recipes = await res.json()
    } catch (e) {
        console.error(`Error in myrecipes.js: ${e}`)
    }

    userRecipes = recipes

    container.replaceChildren()

    if (userRecipes === null)
        return

    renderRecipes()
}

loadRecipes()

const filterRecipes = () => {
    const search = document.querySelector('.search').value

    renderRecipes(search)
}

const clearRecipes = async () => {
    const username = localStorage.getItem('username')

    try {
        await fetch('/api/clear', {
            method: 'POST',
            headers: { 'content-type': 'application/json', 'Authorization': username }
        })
    } catch (e) {
        console.error(`Error in myrecipes.js: ${e}`)
    }

    loadRecipes()
}

const renderRecipes = (search) => {
    const container = document.querySelector('.recipeContainer')

    container.replaceChildren()

    if (userRecipes === null)
        return
    for (const recipe of userRecipes) {
        const div = document.createElement('div')
        div.className += 'recipe'
        if (search) {
            if (!recipe.name.toLowerCase().match(search.toLowerCase()))
                continue
        }
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

        const price = document.createElement('h4')
        price.innerText = recipe.price

        const footer = document.createElement('div')
        footer.className += 'recipeFooter'

        const a = document.createElement('a')
        a.innerText = 'Go to recipe'
        a.href = `myrecipes/${recipe._id}`

        const del = document.createElement('button')
        del.innerText = 'Delete'
        del.addEventListener('click', async () => {
            try {
                await fetch('/api/delete', {
                    method: 'POST',
                    headers: { 'content-type': 'application/json', 'Authorization': recipe.username },
                    body: JSON.stringify(recipe)
                })
            } catch (e) {
                console.error(`Error in myrecipes.js: ${e}`)
            }
            loadRecipes()
        })

        footer.replaceChildren(a, del)

        div.replaceChildren(h2, ingredients, servings, calories, type, price, footer)

        container.appendChild(div)
    }
}