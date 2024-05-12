let currentUser = JSON.parse(localStorage.getItem("currentUser")) || [];
// Function for bar button

function checkAccount() {
    console.log(currentUser);
    if (currentUser.length !== 0) {
        window.open('account.html', "_self")
    } 
    else {
        window.open('login.html', "_self")
    } 
}

document.querySelector("#barBtn").onclick = function() {
    document.querySelector(".nav-bar").classList.toggle("active");
}