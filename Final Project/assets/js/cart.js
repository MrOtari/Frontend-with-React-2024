document.addEventListener('DOMContentLoaded', () => {
    const cartContainer = document.querySelector('.cart-items');
    const totalPriceElement = document.querySelector('.totalPrice');
    const discountElement = document.querySelector('.discount');
    const totalCheckoutElement = document.querySelector('.totalCheckout');
    const checkoutButton = document.querySelector('.checkout-btn');
    const cartCountElement = document.getElementById('cart-count');


    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // display cart items
    const displayCartItems = () => {
        cartContainer.innerHTML = '';

        cart.forEach((item, index) => {
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');
            cartItem.innerHTML = `
                <img src="${item.image}" alt="${item.title}" class="cart-item-image"/>
                <div class="item-details">
                    <h3>${item.title}</h3>
                    <p class="item-price">Price: $${item.price}</p>
                    <p>Quantity: <span class="quantity">${item.quantity}</span></p>
                    <button class="remove-btn" data-index="${index}">Remove</button>
                </div>
                <div class="quantity-controls">
                    <button class="decrement" data-index="${index}">–</button>
                    <span class="quantity-display">${item.quantity}</span>
                    <button class="increment" data-index="${index}">+</button>
                </div>
            `;

            cartContainer.appendChild(cartItem);
        });

        calculateTotal();
        updateCartCount();
    };

    // total price
    const calculateTotal = () => {
        const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
        totalPriceElement.textContent = `$${total.toFixed(2)}`;
        totalCheckoutElement.textContent = `$${(total  * 0.8 + 15).toFixed(2)}`;
        discountElement.textContent = `-$${(total * 0.2).toFixed(2)}`;
    };

    // total items in the cart
    const updateCartCount = () => {
        const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
        if (cartCountElement) {
            cartCountElement.textContent = totalItems;
        }
    };

    cartContainer.addEventListener('click', (event) => {
        const index = event.target.getAttribute('data-index');

        if (event.target.classList.contains('remove-btn')) {
            // Remove item from cart
            cart.splice(index, 1);
        } else if (event.target.classList.contains('increment')) {
            
            cart[index].quantity += 1;
        } else if (event.target.classList.contains('decrement')) {
            
            if (cart[index].quantity > 1) {
                cart[index].quantity -= 1;
            }
        }

        // Update cart
        localStorage.setItem('cart', JSON.stringify(cart));
        displayCartItems();
    });

    // Event listener for checkout button
    checkoutButton.addEventListener('click', () => {
        if (cart.length === 0) {
            alert('Your cart is empty!');
            return;
        }

        alert('Thank you for your purchase!');
        cart = [];
        localStorage.setItem('cart', JSON.stringify(cart));
        displayCartItems();
    });

    displayCartItems();
});

const initializeCartCount = () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

    const cartCountElement = document.getElementById('cart-count');
    if (cartCountElement) {
        cartCountElement.textContent = totalItems;
    }
};

document.addEventListener('DOMContentLoaded', initializeCartCount);
