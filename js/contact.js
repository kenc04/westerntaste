customerMSG = JSON.parse(localStorage.getItem("customerMSG")) || [];

function submitMSG() {
    const requiredInputs = document.querySelectorAll('input[required]');
    let allInputsFilled = true;

    let fname = document.getElementById("fname").value;
    let lname = document.getElementById("lname").value;
    let email = document.getElementById("email").value;
    let phone = document.getElementById("phone").value;
    let message = document.getElementById("message").value

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const phonePattern = /^\d{3}-\d{3}-\d{4}$/;

    if (!(emailPattern.test(email.trim()))) {
        window.alert("Please enter a valid email address.");
        return;
    }
    
    if (!phonePattern.test(phone)) {
        window.alert('Please enter a valid phone number (e.g., 014-435-3454).');
        return;
    }

    requiredInputs.forEach((input) => {
        if (input.value === "") { 
            allInputsFilled = false;
            input.classList.add('missing-field'); 
        }
    });

    if (allInputsFilled) {
        customerMSG.push(
            {
                FirstName: fname, 
                LastName: lname,
                Email: email,
                PhoneNumber: phone,
                Message: message,
            }
        )

        localStorage.setItem('customerMSG', JSON.stringify(customerMSG)); 
        window.alert(`Thank you, ${fname} ${lname}. Your message is received!`);
    }
    else {
        window.alert("Please fill in all required fields");
    }
}