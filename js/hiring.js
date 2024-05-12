applyData = JSON.parse(localStorage.getItem("applyData")) || [];

function validateForm() {
    const requiredInputs = document.querySelectorAll('input[required]');
    let allInputsFilled = true;
    let today = new Date() 

    let firstName = document.getElementById("fname").value;
    let lastName = document.getElementById("lname").value;
    let email =  document.getElementById("email").value;
    let phone =  document.getElementById("phone").value;
    let address =  document.getElementById("address").value;

    let dateOfBirth =  document.getElementById("dateofbirth").value;
    let birth = new Date(dateOfBirth)
    let age = today.getFullYear() - birth.getFullYear();
    let monthDiff = today.getMonth() - birth.getMonth();

    let searchEmail = applyData.find((user) => user.Email === email);

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const phonePattern = /^01\d{1}-\d{3}-\d{4}$/;

    if (!(emailPattern.test(email.trim()))) {
        window.alert("Please enter a valid email address.");
        return;
    }
    
    if (!phonePattern.test(phone)) {
        alert('Please enter a valid phone number (e.g., 014-435-3454).');
        return;
    }
    
    // Validate for at least 18 years old
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
        age--;
    }
    
    if (age < 18) {
        window.alert("You must be at least 18 years old.");
        return;
    }

    // Required input validation
    requiredInputs.forEach((input) => {
        if (input.value === "") { 
            allInputsFilled = false;
            input.classList.add('missing-field'); 
        }
    });


    if (allInputsFilled) {
        if (searchEmail === undefined) {
            applyData.push(
                {
                    FirstName: firstName, 
                    LastName: lastName,
                    Email: email,
                    PhoneNumber: phone,
                    DOB: dateOfBirth,
                    Address: address,
                }
            )
    
            localStorage.setItem('applyData', JSON.stringify(applyData));
            window.alert(`Thank you for your submission, ${firstName} ${lastName} we will contact you soon!`);
        }
        else {
            window.alert("You've already applied with this email address before.");
        }   
    }
    else {
        window.alert("Please fill out all required fields.");
    }
}

function setDefault() {  
    document.getElementById("dateofbirth").max = new Date().toISOString().split("T")[0];
}

setDefault();