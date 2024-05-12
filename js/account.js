let userList = JSON.parse(localStorage.getItem("userData"));
const contents = document.querySelectorAll(".contents");

function changeContent(contentIndex) {
    contents.forEach(content => {
        content.classList.remove("display");
    });

    contents[contentIndex].classList.add("display");
}

function loadContent() {
    console.log(currentUser);
    document.getElementById("user-fname").value = currentUser[0].firstname;
    document.getElementById("user-lname").value = currentUser[0].lastname;
    document.getElementById("user-email").value = currentUser[0].email;
}

function saveDetails() {
    const requiredInputs = document.querySelectorAll('input[required]');
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    let fname = document.getElementById("user-fname");
    let lname = document.getElementById("user-lname");
    let email = document.getElementById("user-email");

    let allInputsFilled = true;

    if (!(emailPattern.test(email.value.trim()))) {
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
        let searchUser = userList.find((user) => user.username === currentUser[0].username);
    
        searchUser.firstname = fname.value;
        searchUser.lastname = lname.value;
        searchUser.email = email.value;
    
        localStorage.setItem('userData', JSON.stringify(userList));
        currentUser[0] = searchUser
        localStorage.setItem('currentUser', JSON.stringify(currentUser))
        window.alert("Save successful");
        loadContent();
    } 
    else {
        window.alert("Please fill in all required fields before saving your details");
    }
    
}

function deleteAccount() {
    if (window.confirm("Are you sure you want to delete your account?") == true) {
        userList = userList.filter((user) => user.username !== currentUser[0].username);

        currentUser = [];
        localStorage.setItem("userData", JSON.stringify(userList)); // Save cart data in local storage
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
    
        window.alert("Delete Account Successful");    
        window.open('index.html', "_self");
    }
    else {
        return;
    }
}

function logOut() {
    currentUser = [];
    localStorage.setItem('currentUser', JSON.stringify(currentUser));

    window.alert("Log Out Successful");
    window.open('index.html', "_self");
}

changeContent(0);
loadContent();