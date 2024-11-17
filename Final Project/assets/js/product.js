const URL = "https://api.escuelajs.co/api/v1/products";

// Fetch products
const getProducts = async (cont, func) => {
    cont.innerHTML = '<p>Loading products...</p>';
    
    try {
        const response = await fetch(URL);
        const products = await response.json();
        func(products);
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

        productElement.addEventListener('click', () => {
            openModal(product);
        });

        productContainer.appendChild(productElement);
    });
};

let productsList = [];

// fetch and display products
const productContainer = document.querySelector('.product-grid');

getProducts(productContainer, (products) => {
    productsList = products;
    displayProducts(products);
});

// Category buttons
const buttonClothes = document.querySelector('.cat1');
const buttonElectronics = document.querySelector('.cat2');
const buttonFurniture = document.querySelector('.cat3');
const buttonShoes = document.querySelector('.cat4');
const buttonMiscellaneous = document.querySelector('.cat5');
const buttonClose = document.querySelector('.apply-btn');



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




// modal elements
const modal = document.getElementById('productModal');
const modalImage = document.getElementById('modalImage');
const modalTitle = document.getElementById('modalTitle');
const modalCategory = document.getElementById('modalCategory');
const modalPrice = document.getElementById('modalPrice');
const modalDescription = document.getElementById('modalDescription');
const closeModal = document.querySelector('.close');

const addToCartBtn = document.getElementById('addToCartBtn');



// open modal with product details
const openModal = (product) => {
    modalImage.src = product.images;
    modalTitle.textContent = product.title;
    modalCategory.textContent = `Category: ${product.category.name}`;
    modalPrice.textContent = `Price: $${product.price}`;
    modalDescription.textContent = product.description || "No description.";

    addToCartBtn.addEventListener("click", () => {
        addToCart(product);
    }, { once: true })

    modal.style.display = 'block';
};


// cart count on page load
const initializeCartCount = () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

    const cartCountElement = document.getElementById('cart-count');
    if (cartCountElement) {
        cartCountElement.textContent = totalItems;
    }
};

// add product to cart in local storage
const addToCart = (product) => {

     const cart = JSON.parse(localStorage.getItem('cart')) || [];

     const existingProduct = cart.find(item => item.id == product.id);
 
     if (existingProduct) {
         existingProduct.quantity += 1;
     } else {
         cart.push({
             id: product.id,
             title: product.title,
             price: product.price,
             image: product.images[0],
             quantity: 1
         });
     }

    
    localStorage.setItem('cart', JSON.stringify(cart));

    // alert(`${product.title} has been added to your cart!`);

    if (typeof modal !== 'undefined') {
        modal.style.display = 'none';
    }
    

    // Update the cart count
    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
    const cartCountElement = document.getElementById('cart-count');
    if (cartCountElement) {
        cartCountElement.textContent = totalItems;
    }
};


document.addEventListener('DOMContentLoaded', initializeCartCount);



// user clicks on x
closeModal.addEventListener("click", () => {
    modal.style.display = 'none';
});


// clicks anywhere outside of the modal
window.addEventListener("click", (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});


// "Escape" key
window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' || event.key === 'Esc') {
        modal.style.display = 'none';
    }
});


