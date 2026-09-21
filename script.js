const menuURL =
    "https://raw.githubusercontent.com/saksham-accio/f2_contest_3/main/food.json";


let menu = [];

let order = {};


// =====================================================
// 1. GET MENU
// =====================================================

function getMenu() {

    return fetch(menuURL)
        .then(response => {

            if (!response.ok) {
                throw new Error("Failed to fetch menu");
            }

            return response.json();

        })
        .then(data => {

            menu = data;

            displayMenu(menu);

            return data;

        })
        .catch(error => {

            console.error("Menu Error:", error);

            document.getElementById("menu-container").innerHTML =
                "<p>Unable to load menu.</p>";

            throw error;

        });
}


// =====================================================
// DISPLAY MENU
// =====================================================

function displayMenu(items) {

    const menuContainer =
        document.getElementById("menu-container");

    menuContainer.innerHTML = "";

    items.forEach(item => {

        const card = document.createElement("div");

        card.classList.add("menu-card");

        card.innerHTML = `

            <img
                src="${item.imgSrc}"
                alt="${item.name}"
            >

            <div class="menu-card-content">

                <h3>${item.name}</h3>

                <p class="price">
                    $${item.price}
                </p>

            </div>

        `;

        menuContainer.appendChild(card);

    });
}


// =====================================================
// 2. TAKE ORDER
// =====================================================

function TakeOrder() {

    return new Promise((resolve) => {

        setTimeout(() => {

            /*
                Find all burgers from the menu.
            */

            const burgers = menu.filter(item =>
                item.name.toLowerCase().includes("burger")
            );


            /*
                If there are fewer than 3 burgers,
                use available burgers repeatedly.
            */

            let selectedBurgers = [];

            for (let i = 0; i < 3; i++) {

                const randomIndex =
                    Math.floor(Math.random() * burgers.length);

                selectedBurgers.push(
                    burgers[randomIndex]
                );

            }


            /*
                Store burgers in order object.
            */

            order = {

                items: selectedBurgers

            };


            resolve(order);

        }, 2500);

    });

}


// =====================================================
// 3. ORDER PREPARATION
// =====================================================

function orderPrep(order) {

    return new Promise((resolve) => {

        setTimeout(() => {

            console.log("Order is being prepared...");

            resolve({

                order_status: true,

                paid: false

            });

        }, 1500);

    });

}


// =====================================================
// 4. PAY ORDER
// =====================================================

function payOrder(order) {

    return new Promise((resolve) => {

        setTimeout(() => {

            console.log("Payment successful");

            resolve({

                order_status: true,

                paid: true

            });

        }, 1000);

    });

}


// =====================================================
// 5. THANK YOU
// =====================================================

function thankyouFnc(result) {

    if (result.paid === true) {

        alert(
            "Thank you for ordering! Your food is on the way."
        );

        document.getElementById("status").innerText =
            "Thank you! Your order has been paid successfully.";

    }

}


// =====================================================
// DISPLAY ORDER
// =====================================================

function displayOrder(order) {

    const orderItems =
        document.getElementById("order-items");

    const orderMessage =
        document.getElementById("order-message");

    orderMessage.innerText =
        "Your randomly selected burgers:";

    orderItems.innerHTML = "";

    order.items.forEach(item => {

        const div =
            document.createElement("div");

        div.classList.add("order-item");

        div.innerHTML = `

            <span>${item.name}</span>

            <span>$${item.price}</span>

        `;

        orderItems.appendChild(div);

    });

}


// =====================================================
// START COMPLETE ORDER FLOW
// =====================================================

function startOrder() {

    document.getElementById("status").innerText =
        "Taking your order...";


    TakeOrder()

        .then(order => {

            console.log("Order:", order);

            displayOrder(order);

            document.getElementById("status").innerText =
                "Order received. Preparing your food...";

            return orderPrep(order);

        })

        .then(result => {

            console.log("Preparation:", result);

            document.getElementById("status").innerText =
                "Food prepared. Processing payment...";

            return payOrder(result);

        })

        .then(result => {

            console.log("Payment:", result);

            document.getElementById("status").innerText =
                "Payment successful!";

            thankyouFnc(result);

        })

        .catch(error => {

            console.error("Order Error:", error);

            document.getElementById("status").innerText =
                "Something went wrong. Please try again.";

        });

}


// =====================================================
// LOAD MENU WHEN PAGE OPENS
// =====================================================

getMenu()
    .catch(error => {

        console.error(
            "Application initialization failed:",
            error
        );

    });
