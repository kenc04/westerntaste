let userList = JSON.parse(localStorage.getItem("userData")) || [];
let currentUser = [];

function login() {
    const requiredInputs = document.querySelectorAll('input[required]');
    let allInputsFilled = true;

    let userInput = document.getElementById("loginName").value;
    let passInput = document.getElementById("loginPass").value;
    let searchUser = userList.find((user) => user.username === userInput);
    
    requiredInputs.forEach((input) => {
        if (input.value === "") { 
            allInputsFilled = false;
            input.classList.add('missing-field'); 
        }
    });

    if (allInputsFilled) {
        if (searchUser === undefined) {
            window.alert("Invalid username or membership not found.");
        }
        else {
            if (passInput === searchUser.password) {
                window.alert("Login Successful");           
                window.open('index.html');
                        
                currentUser.push(searchUser);
                localStorage.setItem('currentUser', JSON.stringify(currentUser));
            }
            else {
                window.alert("Wrong Password.");
            }
        }
    }
    else {
        window.alert("Please fill in all required fields to log in");
    }
}

function showLoginPass() {
    let password = document.getElementById("loginPass");
    if (password.type === "password") {
        password.type = "text";
    } 
    else {
        password.type = "password";
    }
}

function signup() {
    const requiredInputs = document.querySelectorAll('input[required]');
    let allInputsFilled = true;

    let userInput = document.getElementById("signName").value;
    let passInput = document.getElementById("signPass1").value;
    let passInput1 = document.getElementById("signPass2").value;
    let searchUser = userList.find((user) => user.username === userInput);

    requiredInputs.forEach((input) => {
        if (input.value === "") { 
            allInputsFilled = false;
            input.classList.add('missing-field'); 
        }
    });

    if (allInputsFilled) {
        if (searchUser === undefined) {
            if (passInput === passInput1) {
                userList.push(
                    {
                        username: userInput, 
                        password: passInput,
                        firstname: "",
                        lastname: "",
                        email: ""
                    }
                )
    
                localStorage.setItem('userData', JSON.stringify(userList));
                window.alert("Sign Up Successful");
                window.open('welcome.html');
            }
            else {
                window.alert("Wrong password confirmation.")
            }
        }
        else {
            window.alert("Sorry, the username you've chosen is already taken. Please choose a different username.");
        }
    }
    else {
        window.alert("Please fill in all required fields to sign up");
    }
}

function showSignPass() {
    let password1 = document.getElementById("signPass1");
    let password2 = document.getElementById("signPass2");
    if (password1.type === "password" && password2.type === "password") {
        password1.type = "text";
        password2.type = "text";
    } 
    else {
        password1.type = "password";
        password2.type = "password"
    }
}

function changeSignup() {
    document.querySelector(".login-container").classList.add("signup-mode");

    document.querySelectorAll(".signup-field input").forEach((element) => {
        element.required = true;
    })
    document.querySelectorAll(".login-field input").forEach((element) => {
        element.required = false;
    })
}

function changeLogin() {
    document.querySelector(".login-container").classList.remove("signup-mode");

    document.querySelectorAll(".signup-field input").forEach((element) => {
        element.required = false;
    })
    document.querySelectorAll(".login-field input").forEach((element) => {
        element.required = true;
    })
}

function saveDetails() {
    const requiredInputs = document.querySelectorAll('input[required]');
    let allInputsFilled = true;

    let fname = document.getElementById("user-fname").value;
    let lname = document.getElementById("user-lname").value;
    let email = document.getElementById("user-email").value;
    let searchEmail = userList.find((user) => user.email === email);
    let newUser = userList[userList.length - 1];

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!(emailPattern.test(email.trim()))) {
        window.alert("Please enter a valid email address.");
        return;
    }

    requiredInputs.forEach((input) => {
        if (input.value === "") { 
            allInputsFilled = false;
            input.classList.add('missing-field'); 
        }
    });

    if (allInputsFilled) {
        if (searchEmail === undefined) {
            newUser.firstname = fname;
            newUser.lastname = lname;
            newUser.email = email;
    
            localStorage.setItem('userData', JSON.stringify(userList));
            window.alert("Sign Up Successful");

            currentUser.push(newUser);
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
            window.open('index.html');
        }
        else {
            window.alert("This email address is already registered. Please use a different email.")
        }
    }
    else {
        window.alert("Please fill in all required fields to sign up");
    }
}

