function showDropDown() {
    document.getElementById("dropdownNav").classList.toggle("show");
}

const logout = () => {
    localStorage.setItem('username', '')
    localStorage.setItem('recipes', null)
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

const setUsername = () => {
    const username = localStorage.getItem('username')
    const account = document.querySelector('.account')
    const dropdownNav = document.querySelector('.dropdownNav')
    if (username === null || username === undefined || username === '') {
        const login = document.createElement('a')
        login.innerText = 'Log In'
        login.href = 'login.html'
        login.className += 'block'
        dropdownNav.replaceChildren(login)
        return
    }
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

setUsername()