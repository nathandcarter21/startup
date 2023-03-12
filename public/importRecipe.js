const importRecipe = async () => {
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

    const username = localStorage.getItem("username")

    const recipe = {
        name, ingredients, servings, calories, type, price
    }

    try {
        const res = await fetch('/api/recipe', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(recipe),
        })
    } catch (e) {
        console.error(`Error in addrecipe.js: ${e}`)
    }

    window.location.href = 'myrecipes.html'
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
        const importBtn = document.querySelector('.import')
        importBtn.style.display = 'none'
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
}

getUser()