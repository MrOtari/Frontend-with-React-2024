const URL = "https://api.escuelajs.co/api/v1/products";

// Fetch products from the API
const getProducts = async (cont, func) => {
    cont.innerHTML = '<p>Loading products...</p>';
    
    try {
        const response = await fetch(URL);
        const products = await response.json();
        func(products); // Pass products to the display function
    } catch (error) {
        cont.innerHTML = '<p>Error fetching products. Please try again later.</p>';
        console.error('Error fetching products:', error);
    }
};

// Function to display products
const displayProducts = (products) => {
    const productContainer = document.querySelector('.product-grid');
    productContainer.innerHTML = '';

    products.forEach((product, index) => {
        if (index === -1 || index > 46) return;
        const productElement = document.createElement('div');
        productElement.classList.add('product-card');
        
        productElement.innerHTML = `
            <img src="${product.images}" alt="${product.title}" />
            <h2>${product.title}</h2>
            <p>Category: ${product.category.name}</p>
            <p>Price: $${product.price}</p>
        `;

        // Add click event to open modal with product details
        productElement.addEventListener('click', () => {
            openModal(product);
        });

        productContainer.appendChild(productElement);
    });
};

// Store products globally to use in category filtering
let productsList = [];

// Call the function to fetch and display products
const productContainer = document.querySelector('.product-grid');
getProducts(productContainer, (products) => {
    productsList = products; // Save products to global variable
    displayProducts(products);
});

// Category buttons
const buttonClothes = document.querySelector('.cat1');
const buttonElectronics = document.querySelector('.cat2');
const buttonFurniture = document.querySelector('.cat3');
const buttonShoes = document.querySelector('.cat4');
const buttonMiscellaneous = document.querySelector('.cat5');
const buttonClose = document.querySelector('.apply-btn');

// Function to render products by category
const renderProductsByCategory = (category) => {
    const filteredProducts = productsList.filter(product => product.category.id === category);
    displayProducts(filteredProducts);
};

// Event listeners for category buttons
buttonClothes.addEventListener('click', () => renderProductsByCategory(1));
buttonElectronics.addEventListener('click', () => renderProductsByCategory(2));
buttonFurniture.addEventListener('click', () => renderProductsByCategory(3));
buttonShoes.addEventListener('click', () => renderProductsByCategory(4));
buttonMiscellaneous.addEventListener('click', () => renderProductsByCategory(5));

// Event listener to display all products
buttonClose.addEventListener('click', () => displayProducts(productsList));








// Reference to modal elements
const modal = document.getElementById('productModal');
const modalImage = document.getElementById('modalImage');
const modalTitle = document.getElementById('modalTitle');
const modalCategory = document.getElementById('modalCategory');
const modalPrice = document.getElementById('modalPrice');
const modalDescription = document.getElementById('modalDescription');
const closeModal = document.querySelector('.close');

const addToCartBtn = document.getElementById('addToCartBtn'); // Add to Cart button



// Function to open modal with product details
const openModal = (product) => {
    modalImage.src = product.images; // Update image source
    modalTitle.textContent = product.title;
    modalCategory.textContent = `Category: ${product.category.name}`;
    modalPrice.textContent = `Price: $${product.price}`;
    modalDescription.textContent = product.description || "No description available."; // Assuming the API provides description

    // Store the selected product in a temporary variable to add to cart later
    addToCartBtn.onclick = () => addToCart(product);

    modal.style.display = 'block'; // Show the modal
};




// Function to add product to cart in local storage
const addToCart = (product) => {
     // Get existing cart items from local storage or initialize an empty array
     const cart = JSON.parse(localStorage.getItem('cart')) || [];

     // Check if the product is already in the cart
     const existingProduct = cart.find(item => item.id == product.id);
 
     if (existingProduct) {
         // If it exists, increment the quantity
         existingProduct.quantity += 1;
     } else {
         // If it doesn't exist, add it to the cart with a quantity of 1
         cart.push({
             id: product.id,
             title: product.title,
             price: product.price,
             image: product.images[0], // Assuming the API provides an array of images
             quantity: 1
         });
     }

    
    // Save the updated cart array back to local storage
    localStorage.setItem('cart', JSON.stringify(cart));
    
    alert(`${product.title} has been added to your cart!`);
};





// Example function to retrieve and display cart items

// const displayCartItems = () => {
//     const cart = JSON.parse(localStorage.getItem('cart')) || [];
//     cart.forEach(item => {
//         console.log(`Title: ${item.title}, Price: ${item.price}, Quantity: ${item.quantity}`);
//         // You can create HTML elements here to display each item in the cart
//     });
// };



// Close the modal when the user clicks on <span> (x)
closeModal.onclick = () => {
    modal.style.display = 'none';
};

// Close the modal when the user clicks anywhere outside of the modal
window.onclick = (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
};

// Close the modal when the "Escape" key is pressed
window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' || event.key === 'Esc') {
        modal.style.display = 'none';
    }
});


