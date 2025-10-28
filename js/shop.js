// If you have time, you can move this variable "products" to a json or js file and load the data in this js. It will look more professional
const products = [
    {
        id: 1,
        name: 'cooking oil',
        price: 10.5,
        type: 'grocery',
        offer: {
            number: 3,
            percent: 20
        }
    },
    {
        id: 2,
        name: 'Pasta',
        price: 6.25,
        type: 'grocery'
    },
    {
        id: 3,
        name: 'Instant cupcake mixture',
        price: 5,
        type: 'grocery',
        offer: {
            number: 10,
            percent: 30
        }
    },
    {
        id: 4,
        name: 'All-in-one',
        price: 260,
        type: 'beauty'
    },
    {
        id: 5,
        name: 'Zero Make-up Kit',
        price: 20.5,
        type: 'beauty'
    },
    {
        id: 6,
        name: 'Lip Tints',
        price: 12.75,
        type: 'beauty'
    },
    {
        id: 7,
        name: 'Lawn Dress',
        price: 15,
        type: 'clothes'
    },
    {
        id: 8,
        name: 'Lawn-Chiffon Combo',
        price: 19.99,
        type: 'clothes'
    },
    {
        id: 9,
        name: 'Toddler Frock',
        price: 9.99,
        type: 'clothes'
    }
]

// => Reminder, it's extremely important that you debug your code. 
// ** It will save you a lot of time and frustration!
// ** You'll understand the code better than with console.log(), and you'll also find errors faster. 
// ** Don't hesitate to seek help from your peers or your mentor if you still struggle with debugging.

// Improved version of cartList. Cart is an array of products (objects), but each one has a quantity field to define its quantity, so these products are not repeated.
let total = 0;

const savedCart = localStorage.getItem("shopping_cart");

let cart = savedCart ? JSON.parse(savedCart) : [];

// Exercise 1
const buy = (id) => {
    // 1. Loop for to the array products to get the item to add to cart
    let selectedProduct = {}
    for (let product of products) {
        if (product.id === id) {
            selectedProduct = product;
        }
    }
    // 2. Add found product to the cart array
    let existingItem = cart.find(item => item.id === selectedProduct.id)
    if (existingItem) {
        existingItem.quantity++
    } else {
        selectedProduct.quantity = 1;
        cart.push(selectedProduct);
    }
    return cart;
}

// Exercise 2
const cleanCart = () => {
    cart.length = 0;
    total = 0;
    localStorage.removeItem("shopping_cart");
    updateCartButton();
    printCart();
}

// Exercise 3
const calculateTotal = () => {
    // Calculate total price of the cart using the "cartList" array
    total = 0;
    for (let item of cart) {
        total += item.subtotalWithDiscount;
    }
    total = parseFloat(total.toFixed(2));
    return total;
}

// Exercise 4
const applyPromotionsCart = () => {
    // Apply promotions to each item in the array "cart"
    cart.forEach(item => {
        let subtotal = item.price * item.quantity;
        if (item.offer && item.quantity >= item.offer.number) {
            item.subtotalWithDiscount = parseFloat((subtotal * (1 - item.offer.percent / 100)).toFixed(2));
        } else item.subtotalWithDiscount = parseFloat(subtotal.toFixed(2));
    }
    )
};

// Exercise 5
const printCart = () => {
    // Fill the shopping cart modal manipulating the shopping cart dom
    const cartList = document.getElementById("cart_list");
    cartList.innerHTML = "";
    cart.forEach(item => {
        cartList.innerHTML += `
        <tr>
        <th scope="row">${item.name}</th>
        <td>$${item.price}</td>
        <td><div class="quantity">
        <button class="remove btn btn-secondary btn-sm d-flex justify-content-center align-items-center" data-id="${item.id}">-</button>
        ${item.quantity}
        <button class="add btn btn-secondary btn-sm d-flex justify-content-center align-items-center" data-id="${item.id}">+</button>
        </div>
        </td>
        <td>$${item.subtotalWithDiscount}</td>
        </tr>
        `;
    });

    document.getElementById("total_price").innerText = calculateTotal();
    document.getElementById("checkout").classList.toggle("disabled", cart.length === 0);
    document.getElementById("clean-cart").classList.toggle("disabled", cart.length === 0);

    const removeBtn = document.querySelectorAll(".remove");
    removeBtn.forEach(btn => {
        btn.addEventListener("click", () => {
            const id = Number(btn.dataset.id);
            removeFromCart(id);
            applyPromotionsCart();
            calculateTotal();
            updateCartButton();
            printCart();
            localStorage.setItem("shopping_cart", JSON.stringify(cart));
        });
    });

    const addBtn = document.querySelectorAll(".add");
    addBtn.forEach(btn => {
        btn.addEventListener("click", () => {
            const id = Number(btn.dataset.id);
            buy(id);
            applyPromotionsCart();
            calculateTotal();
            updateCartButton();
            printCart();
            localStorage.setItem("shopping_cart", JSON.stringify(cart));
        });
    });
};

// ** Nivell II **

// Exercise 7
const removeFromCart = (id) => {
    for (let item of cart) {
        if (item.id === id) {
            if (item.quantity > 1) {
                item.quantity -= 1;
            } else {
                const itemIndex = cart.indexOf(item.id);
                cart.splice(itemIndex, 1);
            }
        }
    }
    return cart;
}


const open_modal = () => {
    printCart();
}

// ** ADDITIONAL FUNCTIONS **

const updateCartButton = () => {
    let itemCount = 0;
    cart.forEach(item => {
        itemCount += item.quantity;
    });
    const itemCounter = document.getElementById("count_product");
    if (itemCounter) itemCounter.innerText = itemCount;
}

updateCartButton();

// ** EVENT LISTENERS **

const addToCartBtn = document.querySelectorAll(".add-to-cart");
addToCartBtn.forEach(btn => {
    btn.addEventListener("click", () => {
        const id = Number(btn.dataset.productId);
        buy(id)
        updateCartButton();
        applyPromotionsCart();
        calculateTotal();
        localStorage.setItem("shopping_cart", JSON.stringify(cart));
    })
});

const cleanCartBtn = document.getElementById("clean-cart");
if (cleanCartBtn) {
    cleanCartBtn.addEventListener("click", cleanCart);
}

const cartBtn = document.querySelector(".cart-button");
if (cartBtn) {
    cartBtn.addEventListener("click", printCart);
}