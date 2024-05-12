let userCart = JSON.parse(localStorage.getItem("cartData")) || []; // Read cart data in local storage

/* ==========================
    Delivery Method Function 
   ==========================*/
function deliveryMethod() {
    let pickup = document.getElementById("pickup-radio");

    if(pickup.checked){
        document.getElementById("pickup-box").style.border = "2px solid rgb(100, 100, 100)";
        document.getElementById("ship-box").style.border = "1px solid rgb(218, 218, 218)";
        document.getElementById("pickup-details").style.display = "block";
        document.getElementById("ship-details").style.display = "none";

        // disable billing address option
        document.querySelectorAll(".no-ship-address").forEach((element) => {
            element.style.display = "none";
        })

        // no required for shipping details
        document.querySelectorAll("#ship-details .delivery-row input").forEach((element) => {
            element.required = false;
        })

        // default option to 'Use a different billing address'
        payBox1();
        billingBox2();
    }
    else {
        document.getElementById("pickup-box").style.border = "1px solid rgb(218, 218, 218)";
        document.getElementById("ship-box").style.border = "2px solid rgb(100, 100, 100)";
        document.getElementById("pickup-details").style.display = "none";
        document.getElementById("ship-details").style.display = "block";

        // enable billing address option
        document.querySelectorAll(".no-ship-address").forEach((element) => {
            element.style.display = "block";
        })

        // required for shipping details
        document.querySelectorAll("#ship-details .delivery-row input").forEach((element) => {
            element.required = true;
        })

        // default option to 'Same as shipping address'
        payBox1();
        billingBox1();
    }
}

function deliveryBox1() {
    document.getElementById("pickup-radio").checked = "true";
    deliveryMethod();
}

function deliveryBox2() {
    document.getElementById("ship-radio").checked = "true";
    deliveryMethod();
}

/* =========================
    Payment Method Function 
   =========================*/
function payMethod() {
    let payment = document.getElementById("banking-radio");

    if(payment.checked){
        document.getElementById("banking-box").style.border = "2px solid rgb(100, 100, 100)";
        document.getElementById("tng-box").style.border = "1px solid rgb(218, 218, 218)";
        document.getElementById("qr-code").style.display = "none";
        
        document.querySelectorAll(".tng-no-billing").forEach((element) => {
            element.style.display = "block";
        })
        billingMethod();
    }
    else {
        document.getElementById("banking-box").style.border = "1px solid rgb(218, 218, 218)";
        document.getElementById("tng-box").style.border = "2px solid rgb(100, 100, 100)";
        document.getElementById("qr-code").style.display = "block";
       
        document.querySelectorAll(".tng-no-billing").forEach((element) => {
            element.style.display = "none";
        })

        document.querySelectorAll("#billing-details .delivery-row input").forEach((element) => {
            element.required = false;
        })
    }
}

function payBox1() {
    document.getElementById("banking-radio").checked = "true";
    payMethod();
}

function payBox2() {
    document.getElementById("tng-radio").checked = "true";
    payMethod();
}

/* ==========================
    Billing Details Function 
   ==========================*/
function billingMethod() {
    let billing = document.getElementById("same-bill-radio");

    if(billing.checked){
        document.getElementById("same-bill-box").style.border = "2px solid rgb(100, 100, 100)";
        document.getElementById("diff-bill-box").style.border = "1px solid rgb(218, 218, 218)";
        document.getElementById("billing-details").style.display = "none";
    
        document.querySelectorAll("#billing-details .delivery-row input").forEach((element) => {
            element.required = false;
        })
    }
    else {
        document.getElementById("same-bill-box").style.border = "1px solid rgb(218, 218, 218)";
        document.getElementById("diff-bill-box").style.border = "2px solid rgb(100, 100, 100)";
        document.getElementById("billing-details").style.display = "block";
    
        document.querySelectorAll("#billing-details .delivery-row input").forEach((element) => {
            element.required = true;
        })

        document.querySelectorAll("#billing-details .phone-row input").forEach((element) => {
            element.required = false;
        })
    }
}

function billingBox1() {
    document.getElementById("same-bill-radio").checked = "true";
    billingMethod();
}

function billingBox2() {
    document.getElementById("diff-bill-radio").checked = "true";
    billingMethod();
}

/* =======================
    Display Cart Function 
   =======================*/
function displayCart() {
    if (userCart.length !==0) {
        document.getElementById("cart-empty").style.display = "none";
        let cart = `<h1>Order Summary</h1>`;
        let subtotal = 0;
        let totalSST = 0;
        let cardPurhcase = false;
        let foodPurhcase = false;

        // Check whether user have add gift card to cart
        userCart.forEach(cartItem => {
            let menuFood = cartItem.id;
            let searchItem = menuArray[menuArray.length - 1].find((menuItem) => menuItem.id === menuFood);
            cardPurhcase = (searchItem !== undefined) ? true : false  
            
            console.log(searchItem)                   
        });

        // Check whether user have add food to cart
        userCart.forEach(cartItem => {
            let menuFood = cartItem.id;
            let searchItem
            for (let i = 0; i < menuArray.length - 1; i++) {
                searchItem = menuArray[i].find((menuItem) => menuItem.id === menuFood);
                if (searchItem) {
                    foodPurhcase = (searchItem !== undefined) ? true : false 
                }
            }          
        });

        // Display user cart
        userCart.forEach(cartItem => {
            let menuFood = cartItem.id;
            let searchItem;
            let itemPrice;

            for (let i = 0; i < menuArray.length; i++) {
                searchItem = menuArray[i].find((menuItem) => menuItem.id === menuFood);
                if (searchItem) {
                    if (i == 3) {
                        itemPrice = cartItem.qty * searchItem.price;
                        subtotal += cartItem.qty * searchItem.price;
                        totalSST += 0;
                        break;
                    }
                    else {
                        itemPrice = cartItem.qty * searchItem.price;
                        subtotal += cartItem.qty * searchItem.price;
                        totalSST += cartItem.qty * searchItem.price * 0.08;
                        break; 
                    }
                }
            } 
            cart += `
                <div class="cart-row cart-product">
                    <div class="cart-image">
                        <img src="images/menu-images/${searchItem.image}" alt="">
                    </div>
                    
                    <div class="cart-details">
                        <p>${searchItem.name}
                            <button class="remove-btn" onclick="removeItem('${cartItem.id}')">Remove</button>
                        </p>

                        <div class="qty-control">
                            <span class="minus" id="minus" onclick="decrement('${cartItem.id}')">-</span>

                            <span id="${cartItem.id}">${cartItem.qty}</span>

                            <span class="plus" id="plus" onclick="increment('${cartItem.id}')">+</span>
                        </div>
                    </div>
                    
                    <div class="item-price">RM ${Number(itemPrice).toFixed(2)}</div>
                </div>`
            }
        );
        
        cart += `
            <div class="cart-row cart-total">
                <div>Subtotal</div>
                <div>RM ${Number(subtotal).toFixed(2)}</div>
            </div>
    
            <div class="cart-row cart-total">
                <div>SST (8%)</div>
                <div>RM ${Number(totalSST).toFixed(2)}</div>
            </div>
    
            <div class="cart-row cart-total">
                <div>Total</div>
                <div>RM ${Number(subtotal + totalSST).toFixed(2)}</div>
            </div>
        </div>
        
        <input type="submit" id="payBtn" value="P A Y" onclick="pay()">`;

        /* If cardPurchase or foodPurchase equal true, then display all delivery section.
           If cardPurchase and foodPurchase equal false, then display some delivery section.
        */
        if (cardPurhcase == true && foodPurhcase == true) {
            document.querySelectorAll(".gift-no-ship").forEach((element) => {
                element.style.display = "block";
            }) 
        }
        else if (cardPurhcase == true && foodPurhcase == false) {
            document.querySelectorAll(".gift-no-ship").forEach((element) => {
                element.style.display = "none";
            })
            
            document.querySelectorAll("#ship-details .delivery-row input").forEach((element) => {
                element.required = false;
            })
            billingBox2();
        }
        else if (cardPurhcase == false && foodPurhcase == true) {
            document.querySelectorAll(".gift-no-ship").forEach((element) => {
                element.style.display = "block";
            })
        }      
    
        document.getElementById("cart-section").innerHTML = cart;
    }
    else {
        document.getElementById("cart-empty").style.display = "block";
        document.getElementById("cart-page-footer").style.display = "block";
        document.getElementById("cart-container").style.display = "none";
    }
};

/* ===================
    Quantity Function 
   ===================*/
function increment(foodID) {
    let addedFood = foodID;
    let searchFood = userCart.find((cartItem) => cartItem.id === addedFood);
    
    /* If the food isn't already in the cart, it's added as a new entry with a quantity of 1. 
       If it's already there, its quantity is increased by 1. */
    searchFood === undefined ? userCart.push({id: addedFood, qty: 1}) : searchFood.qty += 1;

    displayCart();
    refreshCart(addedFood);
    localStorage.setItem("cartData", JSON.stringify(userCart));
};

function decrement(foodID) {
    let addedFood = foodID;
    let searchFood = userCart.find((cartItem) => cartItem.id === addedFood);
    
    /* Its quantity is decreased by 1. 
       If quantity is equal than 0, then remove from userCart */
    if (searchFood.qty === 0) {
        return;
    }
    else {
        searchFood.qty -= 1;
    }

    refreshCart(addedFood);
    userCart = userCart.filter((foodID) => foodID.qty !== 0);
    displayCart();
    localStorage.setItem("cartData", JSON.stringify(userCart)); // Save cart data in local storage
};

function removeItem(foodID) {
    let removeFood = foodID;
    userCart = userCart.filter((cartItem) => cartItem.id !== removeFood);
    localStorage.setItem("cartData", JSON.stringify(userCart)); // Save cart data in local storage
    displayCart();
}

function refreshCart(foodID) {
    let searchFood = userCart.find((cartItem) => cartItem.id === foodID);
    document.getElementById(foodID).innerHTML = searchFood.qty;
    displayCart();
}

/* ==================
    Payment Function 
   ==================*/
function pay() {
    const requiredInputs = document.querySelectorAll('input[required]');
    let allInputsFilled = true;

    let emailInput = document.getElementById("email").value;
    
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const postcodePattern = /^\d{5}$/;
    const cityStatePattern = /^[^\d]+$/;
    const phonePattern = /^\d{3}-\d{3}-\d{4}$/;
    
    requiredInputs.forEach((input) => {
        if (input.value === "") { 
            allInputsFilled = false;
            input.classList.add('missing-field'); 
        }
    });

    if (allInputsFilled) {
        if (!(emailPattern.test(emailInput.trim()))) {
            window.alert("Please enter a valid email address.");
            return;
        }
    
        if (document.getElementById("ship-details").style.display == "block") {
            let postcodeInput = document.getElementById("ship-postcode").value
            let cityInput = document.getElementById("ship-city").value
            let stateInput = document.getElementById("ship-state").value
            let phoneInput = document.getElementById("ship-phone").value
    
            if (!(postcodePattern.test(postcodeInput.trim()))) {
                window.alert("Postcode cannot contain alphabet");
                return;
            }
    
            if (!(cityStatePattern.test(cityInput.trim()))) {
                window.alert("City name cannot contain number.");
                return;
            }
    
            if (!(cityStatePattern.test(stateInput.trim()))) {
                window.alert("State name cannot contain number.");
                return;
            }
    
            if (!phonePattern.test(phoneInput.trim())) {
                window.alert('Please enter a valid phone number (e.g., 014-435-3454).');
                return;
            }
        }
    
        if (document.getElementById("billing-details").style.display == "block") {
            let postcodeInput = document.getElementById("billing-postcode").value
            let cityInput = document.getElementById("billing-city").value
            let stateInput = document.getElementById("billing-state").value
            let phoneInput = document.getElementById("billing-phone").value
    
            if (!(postcodePattern.test(postcodeInput.trim()))) {
                window.alert("Postcode cannot contain alphabet");
                return;
            }
    
            if (!(cityStatePattern.test(cityInput.trim()))) {
                window.alert("City name cannot contain number.");
                return;
            }
    
            if (!(cityStatePattern.test(stateInput.trim()))) {
                window.alert("State name cannot contain number.");
                return;
            }
            
            if (phoneInput != ""){
                if (!phonePattern.test(phoneInput.trim())) {
                    window.alert('Please enter a valid phone number (e.g., 014-435-3454).');
                    return;
                }
            }

        }

        userCart = [];
        localStorage.setItem("cartData", JSON.stringify(userCart)); 
        // Proceed with payment
        window.alert("Transaction Successful!");  
    } 
    else {
        window.alert("Please fill in all required fields before proceeding with payment.");
    }
}

deliveryMethod();
payMethod();
billingMethod();
displayCart();