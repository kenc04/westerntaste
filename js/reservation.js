reserved = JSON.parse(localStorage.getItem("reservation")) || [];

function showPopup() {
    const popup = document.getElementById("popup");
    popup.style.display = "flex"; 
    document.body.classList.add("remove-scrolling");
}

function closePopup() {
    const popup = document.getElementById("popup");
    popup.style.display = "none"; 
    document.body.classList.remove("remove-scrolling");
}

function parseTime(timeString) {
    const [hours, minutes] = timeString.split(':').map(Number);
    return { hours, minutes };
}

function makeReservation() {
    const requiredInputs = document.querySelectorAll('input[required]');
    let allInputsFilled = true;

    let firstName = document.getElementById("booking-fname").value;  
    let lastName = document.getElementById("booking-lname").value;
    let email = document.getElementById("booking-email").value;
    let phone = document.getElementById("booking-phone").value;
    let date = document.getElementById("booking-date").value;
    let time = document.getElementById("booking-time").value;
    let pax = document.getElementById("booking-pax").value;
    let moreInfo = document.getElementById("booking-info").value;

    const acceptableStartTime = { hours: 8, minutes: 0 };
    const acceptableEndTime = { hours: 21, minutes: 0 };

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
    
    const { hours, minutes } = parseTime(time);
    if (
        (hours < acceptableStartTime.hours) ||
        (hours === acceptableStartTime.hours && minutes < acceptableStartTime.minutes) ||
        (hours > acceptableEndTime.hours) ||
        (hours === acceptableEndTime.hours && minutes > acceptableEndTime.minutes)
    ) {
        window.alert("Please select between after 10am - 7pm");
        return;
    }
    requiredInputs.forEach((input) => {
        if (input.value === "") { 
            allInputsFilled = false;
            input.classList.add('missing-field'); 
        }
    });

    if (allInputsFilled) {
        reserved.push(
            {
                FirstName: firstName, 
                LastName: lastName,
                Email: email,
                PhoneNumber: phone,
                BookingDate: date,
                BookingTime: time,
                Pax: pax,
                Info: moreInfo
            }
        )

        localStorage.setItem('reservation', JSON.stringify(reserved)); 
        window.alert(`Thank you, ${firstName} ${lastName}. Your reservation has been submitted!`);
    }
    else {
        window.alert("Please fill in all required fields");
    }
}

function setDefault() {  
    document.getElementById("booking-date").min = new Date().toISOString().split("T")[0];
}

setDefault();
