let cart = [];
let wishlist = [];


// ================= NAVBAR =================

window.addEventListener("scroll", function () {

    const navbar = document.getElementById("navbar");

    if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }

});


// ================= SEARCH =================

function openSearch() {

    document.getElementById("searchOverlay").classList.add("show");

    setTimeout(function () {
        document.getElementById("searchInput").focus();
    }, 200);

}


function closeSearch() {

    document.getElementById("searchOverlay").classList.remove("show");

}


function searchProducts() {

    const searchInput = document.getElementById("searchInput");

    const value = searchInput.value.toLowerCase();

    const products = document.querySelectorAll(".product-item");

    products.forEach(function (product) {

        const name = product.dataset.name.toLowerCase();

        if (name.includes(value)) {
            product.style.display = "";
        } else {
            product.style.display = "none";
        }

    });

}


// ================= PRODUCT FILTER =================

function filterProducts(category) {

    const products = document.querySelectorAll(".product-item");

    const filters = document.querySelectorAll(".filter");

    products.forEach(function (product) {

        if (
            category === "All" ||
            product.dataset.category === category
        ) {

            product.style.display = "";

        } else {

            product.style.display = "none";

        }

    });


    filters.forEach(function (button) {

        button.classList.remove("active");

        if (
            button.innerText.trim() === category ||
            (
                category === "All" &&
                button.innerText.trim() === "All"
            )
        ) {

            button.classList.add("active");

        }

    });

}


// ================= WISHLIST =================

function addWishlist(button, name) {

    const icon = button.querySelector("i");

    if (wishlist.includes(name)) {

        wishlist = wishlist.filter(function (item) {
            return item !== name;
        });

        button.classList.remove("liked");

        icon.className = "fa-regular fa-heart";

    } else {

        wishlist.push(name);

        button.classList.add("liked");

        icon.className = "fa-solid fa-heart";

    }

    document.getElementById("wishlistCount").innerText =
        wishlist.length;

}


// ================= OPEN WISHLIST =================

function openWishlist() {

    if (wishlist.length === 0) {

        alert("Your wishlist is empty.");

        return;

    }

    alert(
        "Wishlist:\n\n" +
        wishlist.join("\n")
    );

}


// ================= ADD TO CART =================

function addToCart(name, price) {

    const existingItem = cart.find(function (item) {
        return item.name === name;
    });


    if (existingItem) {

        existingItem.quantity++;

    } else {

        cart.push({
            name: name,
            price: price,
            quantity: 1
        });

    }


    updateCart();

    openCart();

}


// ================= UPDATE CART =================

function updateCart() {

    let totalItems = 0;

    let totalPrice = 0;


    cart.forEach(function (item) {

        totalItems += item.quantity;

        totalPrice += item.price * item.quantity;

    });


    document.getElementById("cartCount").innerText =
        totalItems;


    document.getElementById("cartTotal").innerText =
        "Rs. " + totalPrice.toLocaleString();


    displayCart();

}


// ================= DISPLAY CART =================

function displayCart() {

    const container =
        document.getElementById("cartItems");


    if (cart.length === 0) {

        container.innerHTML = `
            <div class="empty-cart">

                <i class="fa-solid fa-bag-shopping"></i>

                <h4>Your bag is empty</h4>

                <p>Add something you love.</p>

            </div>
        `;

        return;

    }


    let html = "";


    cart.forEach(function (item, index) {

        html += `
            <div class="cart-item">

                <div class="cart-item-info">

                    <h4>${item.name}</h4>

                    <p>
                        Rs. ${item.price.toLocaleString()}
                    </p>

                    <div class="quantity">

                        <button onclick="changeQuantity(${index}, -1)">
                            -
                        </button>

                        <span>
                            ${item.quantity}
                        </span>

                        <button onclick="changeQuantity(${index}, 1)">
                            +
                        </button>

                    </div>

                </div>


                <button
                    class="remove"
                    onclick="removeCartItem(${index})">

                    <i class="fa-solid fa-trash"></i>

                </button>

            </div>
        `;

    });


    container.innerHTML = html;

}


// ================= CHANGE QUANTITY =================

function changeQuantity(index, amount) {

    cart[index].quantity += amount;


    if (cart[index].quantity <= 0) {

        cart.splice(index, 1);

    }


    updateCart();

}


// ================= REMOVE CART ITEM =================

function removeCartItem(index) {

    cart.splice(index, 1);

    updateCart();

}


// ================= OPEN CART =================

function openCart() {

    document
        .getElementById("cartSidebar")
        .classList.add("show");


    document
        .getElementById("cartOverlay")
        .classList.add("show");

}


// ================= CLOSE CART =================

function closeCart() {

    document
        .getElementById("cartSidebar")
        .classList.remove("show");


    document
        .getElementById("cartOverlay")
        .classList.remove("show");

}


// ================= QUICK VIEW =================

function quickView(name, price) {

    document.getElementById("quickName").innerText =
        name;


    document.getElementById("quickPrice").innerText =
        "Rs. " + price.toLocaleString();


    document.getElementById("quickAdd").onclick =
        function () {

            addToCart(name, price);

            closeQuickView();

        };


    document
        .getElementById("quickModal")
        .classList.add("show");

}


// ================= CLOSE QUICK VIEW =================

function closeQuickView() {

    document
        .getElementById("quickModal")
        .classList.remove("show");

}


// ================= CHECKOUT =================

function checkout() {

    if (cart.length === 0) {

        alert("Your cart is empty!");

        return;

    }


    alert(
        "Thank you for shopping with LUXORA!\n\n" +
        "Your order has been placed successfully."
    );


    cart = [];

    updateCart();

    closeCart();

}


// ================= NEWSLETTER =================

function subscribe() {

    const email =
        document.getElementById("emailInput").value.trim();


    if (email === "") {

        alert("Please enter your email.");

        return;

    }


    alert(
        "Thank you for subscribing to LUXORA!"
    );


    document.getElementById("emailInput").value = "";

}


// ================= ESCAPE KEY =================

document.addEventListener("keydown", function (event) {

    if (event.key === "Escape") {

        closeSearch();

        closeCart();

        closeQuickView();

    }

});