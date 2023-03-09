const recipes = [
    {
        name: 'Teriyaki Chicken with Rice',
        img: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Zm9vZHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
        price: '$$'
    },
    {
        name: 'BBQ Chicken Skewers',
        img: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Zm9vZHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
        price: '$$$'
    },
    {
        name: 'Strawberry Shortcake',
        img: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fGZvb2R8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
        price: '$$'
    },
    {
        name: 'Avocado Toast',
        img: 'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fGZvb2R8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
        price: '$'
    }
]

const loadRecipes = () => {
    const container = document.querySelector('.recipeContainer')

    for (const recipe of recipes) {
        const div = document.createElement('div')
        div.className += 'recipe'

        const h2 = document.createElement('h2')
        h2.innerText = recipe.name

        const img = document.createElement('img')
        img.src = recipe.img

        const footer = document.createElement('div')
        footer.className += 'recipeFooter'

        const a = document.createElement('a')
        a.innerText = 'Link'
        a.href = 'recipe.html'

        const span = document.createElement('span')
        span.innerText = recipe.price

        footer.replaceChildren(a, span)
        div.replaceChildren(h2, img, footer)

        container.appendChild(div)
    }
}

loadRecipes()

const filterRecipes = () => {
    const search = document.querySelector('.search').value
    const container = document.querySelector('.recipeContainer')

    container.replaceChildren()

    for (const recipe of recipes) {

        if (!recipe.name.toLowerCase().match(search.toLowerCase()))
            continue

        const div = document.createElement('div')
        div.className += 'recipe'

        const h2 = document.createElement('h2')
        h2.innerText = recipe.name

        const img = document.createElement('img')
        img.src = recipe.img

        const footer = document.createElement('div')
        footer.className += 'recipeFooter'

        const a = document.createElement('a')
        a.innerText = 'Link'
        a.href = 'recipe.html'

        const span = document.createElement('span')
        span.innerText = recipe.price

        footer.replaceChildren(a, span)
        div.replaceChildren(h2, img, footer)

        container.appendChild(div)
    }
}
