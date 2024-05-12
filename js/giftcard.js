let userCart = JSON.parse(localStorage.getItem("cartData")) || []; // Read cart data in local storage

function show(choice) {
    document.querySelector('#gift-card-design').value = choice;
}

function chooseCard() {
    let dropdown = document.querySelector('.dropdown');
    dropdown.classList.toggle('active');
}

function qtySelect() {
    let card = document.getElementById("gift-card");
    let qty = document.getElementById("gift-card-qty");
    let price = card.value;
    let qtyOpt = ``;

    let isQuantityEnabled = true;
    if (isNaN(price)) {
        price = "0"
        isQuantityEnabled = false;
    }

    card.value = price
    qty.disabled = !isQuantityEnabled;


    for (let i = 1; i <= 10; i++) {
        qtyOpt += `<option>${i}</option>`;
    }
    qty.innerHTML += qtyOpt;

    calPrice();
}

function calPrice() {
    let price = document.getElementById("gift-card").value;
    let qty = document.getElementById("gift-card-qty").value;

    let totalPrice = Number(price * qty);

    document.getElementById("gift-card-total").value = totalPrice.toFixed(2);
}

function addtoCart() {
    let addedDesign = document.getElementById("gift-card-design").value
    let addedCard = document.getElementById("gift-card").value;
    let addedqty = document.getElementById("gift-card-qty").value;

    let cardID = (addedDesign + "-" + addedCard);
    if (addedDesign === "") {
        window.alert("Please select a design")
    }
    else if (isNaN(addedCard)){
        window.alert("Please select an item");
    }
    else {
        if (addedqty == 0) {
            window.alert("Please select a quantity");
        }
        else {
            let searchCard = userCart.find((cartItem) => cartItem.id === cardID);
            addedqty = Number(addedqty);
            /* If the food isn't already in the cart, it's added as a new entry with a quantity of 1. 
               If it's already there, its quantity is increased by 1. */
            searchCard === undefined ? userCart.push({id: cardID, qty: addedqty}) : searchCard.qty += addedqty;
        
            localStorage.setItem("cartData", JSON.stringify(userCart));
            window.alert("Add to cart successful");
        }
    }
};