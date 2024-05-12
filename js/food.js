let userCart = JSON.parse(localStorage.getItem("cartData")) || [];

function displayFoodMenu() {
    let menu = ``;

    menuArray[0].forEach(food => 
        menu += `
            <div class="all ${food.category}">
                <img src="images/menu-images/${food.image}" alt="sp">
                <h2>${food.name}</h2>
                <p>RM${Number(food.price).toFixed(2)}</p>
                <button onclick="addtoCart('${food.id}')">O R D E R</button>
            </div>`);

    document.getElementById("entree-container").innerHTML = menu;
};

function displayBeverageMenu() {
    let menu = ``;

    menuArray[1].forEach(food => 
        menu += `
            <div class="all ${food.category}">
                <img src="images/menu-images/${food.image}" alt="sp">
                <h2>${food.name}</h2>
                <p>RM${Number(food.price).toFixed(2)}</p>
                <button onclick="addtoCart('${food.id}')">O R D E R</button>
            </div>`);

    document.getElementById("beverage-container").innerHTML = menu;
};

function displayDessertMenu() {
    let menu = ``;

    menuArray[2].forEach(food => 
        menu += `
            <div class="all ${food.category}">
                <img src="images/menu-images/${food.image}" alt="sp">
                <h2>${food.name}</h2>
                <p>RM${Number(food.price).toFixed(2)}</p>
                <button onclick="addtoCart('${food.id}')">O R D E R</button>
            </div>`);

    document.getElementById("dessert-container").innerHTML = menu;
};

function addtoCart(foodID) {
    let addedFood = foodID;
    let searchFood = userCart.find((cartItem) => cartItem.id === addedFood);
    
    /* If the food isn't already in the cart, it's added as a new entry with a quantity of 1. 
       If it's already there, its quantity is increased by 1. */
    searchFood === undefined ? userCart.push({id: addedFood, qty: 1}) : searchFood.qty += 1;
    
    window.alert("Add to cart successful.")
    localStorage.setItem("cartData", JSON.stringify(userCart));
};