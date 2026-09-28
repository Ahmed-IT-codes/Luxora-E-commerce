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

    document.getElementById("searchPanel")
        .classList.add("show");

    document.getElementById("searchInput").focus();

}


function closeSearch() {

    document.getElementById("searchPanel")
        .classList.remove("show");

    document.getElementById("searchInput").value = "";

    searchProducts();

}


function searchProducts() {

    const input =
        document.getElementById("searchInput");

    const value =
        input.value.toLowerCase().trim();

    const products =
        document.querySelectorAll(".product-item");


    products.forEach(function (product) {

        const name =
            product.dataset.name.toLowerCase();

        if (name.includes(value)) {

            product.style.display = "";

        } else {

            product.style.display = "none";

        }

    });

}


// ================= FILTER =================

function filterProducts(category) {

    const products =
        document.querySelectorAll(".product-item");

    const buttons =
        document.querySelectorAll(".filter");


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


    buttons.forEach(function (button) {

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


    document.getElementById("shop")
        .scrollIntoView({
            behavior: "smooth"
        });

}


// ================= WISHLIST =================

function toggleWishlist(button, name) {

    const icon =
        button.querySelector("i");


    if (wishlist.includes(name)) {

        wishlist = wishlist.filter(function (item) {

            return item !== name;

        });


        button.classList.remove("liked");

        icon.className =
            "fa-regular fa-heart";

    } else {

        wishlist.push(name);

        button.classList.add("liked");

        icon.className =
            "fa-solid fa-heart";

    }


    document.getElementById("wishlistCount")
        .innerText = wishlist.length;

}


function showWishlist() {

    if (wishlist.length === 0) {

        alert("Your wishlist is empty.");

        return;

    }


    alert(
        "YOUR WISHLIST\n\n" +
        wishlist.join("\n")
    );

}


// ================= ADD TO CART =================

function addToCart(name, price) {

    const existing =
        cart.find(function (item) {

            return item.name === name;

        });


    if (existing) {

        existing.quantity++;

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

    let count = 0;
    let total = 0;


    cart.forEach(function (item) {

        count += item.quantity;

        total +=
            item.price * item.quantity;

    });


    document.getElementById("cartCount")
        .innerText = count;


    document.getElementById("cartTotal")
        .innerText =
        "Rs. " + total.toLocaleString();


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

                <p>Add something you like.</p>

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

                        <button
                            onclick="changeQuantity(${index}, -1)">
                            -
                        </button>

                        <span>
                            ${item.quantity}
                        </span>

                        <button
                            onclick="changeQuantity(${index}, 1)">
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


// ================= QUANTITY =================

function changeQuantity(index, amount) {

    cart[index].quantity += amount;


    if (cart[index].quantity <= 0) {

        cart.splice(index, 1);

    }


    updateCart();

}


// ================= REMOVE =================

function removeCartItem(index) {

    cart.splice(index, 1);

    updateCart();

}


// ================= OPEN CART =================

function openCart() {

    document.getElementById("cart")
        .classList.add("show");

    document.getElementById("cartOverlay")
        .classList.add("show");

}


// ================= CLOSE CART =================

function closeCart() {

    document.getElementById("cart")
        .classList.remove("show");

    document.getElementById("cartOverlay")
        .classList.remove("show");

}


// ================= QUICK VIEW =================

function quickView(name, price) {

    document.getElementById("quickName")
        .innerText = name;


    document.getElementById("quickPrice")
        .innerText =
        "Rs. " + price.toLocaleString();


    document.getElementById("quickAdd").onclick =
        function () {

            addToCart(name, price);

            closeQuickView();

        };


    document.getElementById("quickModal")
        .classList.add("show");

}


function closeQuickView() {

    document.getElementById("quickModal")
        .classList.remove("show");

}


// ================= CHECKOUT =================

function checkout() {

    if (cart.length === 0) {

        alert("Your cart is empty.");

        return;

    }


    alert(
        "ORDER CONFIRMED!\n\n" +
        "Thank you for shopping with URBANA."
    );


    cart = [];

    updateCart();

    closeCart();

}


// ================= NEWSLETTER =================

function subscribe() {

    const email =
        document.getElementById("emailInput")
        .value.trim();


    if (email === "") {

        alert("Please enter your email address.");

        return;

    }


    if (!email.includes("@")) {

        alert("Please enter a valid email address.");

        return;

    }


    alert(
        "You're in!\n\n" +
        "Welcome to the URBANA community."
    );


    document.getElementById("emailInput")
        .value = "";

}


// ================= ESC KEY =================

document.addEventListener("keydown", function (event) {

    if (event.key === "Escape") {

        closeSearch();

        closeCart();

        closeQuickView();

    }

});