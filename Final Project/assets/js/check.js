document.addEventListener('DOMContentLoaded', () => {
    const cartContainer = document.querySelector('.cart-items');
    const totalPriceElement = document.querySelector('.totalPrice');
    const discountElement = document.querySelector('.discount');
    const totalCheckoutElement = document.querySelector('.totalCheckout');
    const checkoutButton = document.querySelector('.checkout-btn');

    // Retrieve cart from local storage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Function to display cart items
    const displayCartItems = () => {
        cartContainer.innerHTML = ''; // Clear previous content

        cart.forEach((item, index) => {
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');
            cartItem.innerHTML = `
                <img src="${item.image}" alt="${item.title}" class="cart-item-image"/>
                <div class="item-details">
                    <h2>${item.title}</h2>
                    <p  class="item-price">Price: $${item.price}</p>
                    <p>Quantity: ${item.quantity}</p>
                    <button class="remove-btn" data-index="${index}">Remove</button>
                </div>
                <div class="quantity-controls">
                        <button class="decrement">–</button>
                        <span class="quantity">1</span>
                        <button class="increment">+</button>
                        <button class="remove-item">🗑️</button>
                    </div>
            `;

            cartContainer.appendChild(cartItem);
        });

        calculateTotal();
    };

    // Function to calculate and display total price
    const calculateTotal = () => {
        const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
        totalPriceElement.textContent = total.toFixed(2);
        totalCheckoutElement.textContent = (total * 0.8 - 15).toFixed(2);
        discountElement.textContent = `-$ ${(total * 0.2).toFixed(2)}`;
    };

    // Event listener for removing items from the cart
    cartContainer.addEventListener('click', (event) => {
        if (event.target.classList.contains('remove-btn')) {
            const index = event.target.getAttribute('data-index');
            cart.splice(index, 1); // Remove item from cart
            localStorage.setItem('cart', JSON.stringify(cart)); // Update local storage
            displayCartItems(); // Re-render cart items
        }
    });

    // Event listener for checkout button
    checkoutButton.addEventListener('click', () => {
        if (cart.length === 0) {
            alert('Your cart is empty!');
            return;
        }

        // Simulate checkout (clear the cart and show a message)
        alert('Thank you for your purchase!');
        cart = [];
        localStorage.setItem('cart', JSON.stringify(cart)); // Clear cart in local storage
        displayCartItems(); // Re-render cart items
    });

    // Initial display of cart items
    displayCartItems();
});
