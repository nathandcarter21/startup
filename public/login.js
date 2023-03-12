const signup = async () => {
    const username = document.querySelector("#username").value;
    const password = document.querySelector("#password").value;

    const user = { username, password }

    try {
        const res = await fetch('/auth/register', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(user),
        })
        if (res.status !== 200)
            return
    } catch (e) {
        console.error(`Error in addrecipe.js`)
    }

    window.location.href = "index.html"
}
const login = async () => {
    const username = document.querySelector("#username").value;
    const password = document.querySelector("#password").value;

    const user = { username, password }

    try {
        const res = await fetch('/auth/login', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(user),
        })
        if (res.status !== 200)
            return
    } catch (e) {
        console.error(`Error in addrecipe.js`)
    }

    window.location.href = "index.html"
}