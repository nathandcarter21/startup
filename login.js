const login = () => {
    const username = document.querySelector("#username").value;
    localStorage.setItem("username", username);
    window.location.href = "index.html";
}