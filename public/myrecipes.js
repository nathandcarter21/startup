let userRecipes = []

const loadRecipes = async () => {
    const container = document.querySelector('.recipeContainer')

    let recipes = undefined

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
                    headers: { 'content-type': 'application/json' },
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

const logout = async () => {
    const res = await fetch('/auth/logout', {
        method: 'DELETE',
        headers: { 'content-type': 'application/json' }
    })

    window.location.href = 'index.html'
    const account = document.querySelector('.account')
    account.innerText = 'Account'

    const dropdownNav = document.querySelector('.dropdownNav')

    const login = document.createElement('a')
    login.innerText = 'Login'
    login.href = 'login.html'
    login.className += 'block'

    dropdownNav.replaceChildren(login)
}

const getUser = async () => {
    const res = await fetch('/auth/user', {
        method: 'GET',
        headers: { 'content-type': 'application/json' }
    })

    if (res.status === 404) {
        window.location.href = 'index.html'
        return
    }

    const user = await res.json()
    username = user

    const account = document.querySelector('.account')
    const dropdownNav = document.querySelector('.dropdownNav')

    account.innerText = username


    const myRecipes = document.createElement('a')
    myRecipes.innerText = 'My Recipes'
    myRecipes.href = 'myrecipes.html'
    myRecipes.className += 'block'

    const logoutBtn = document.createElement('a')
    logoutBtn.innerText = 'Log Out'
    logoutBtn.href = '#'
    logoutBtn.className += 'block'
    logoutBtn.addEventListener('click', logout)

    dropdownNav.replaceChildren(myRecipes, logoutBtn)

    loadRecipes()
}

getUser()