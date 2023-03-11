const login = async () => {
    const username = document.querySelector("#username").value;
    const password = document.querySelector("#password").value;

    const user = { username, password }

    localStorage.setItem("username", username);


    let authtoken = undefined

    try {
        const res = await fetch('/api/login', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(user),
        })
        authtoken = await res.json()
    } catch (e) {
        console.error(`Error in addrecipe.js: ${e}`)
    }

    console.log(authtoken)

    window.location.href = "index.html";
}