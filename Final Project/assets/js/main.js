const URL = "https://api.escuelajs.co/api/v1/products";

// Fetch products
const getProducts = async () => {
    try {
        const response = await fetch(URL);
        return await response.json();
    } catch (error) {
        console.error('Error fetching products:', error);
        return null;
    }
};

// display products
const displayProducts = (products, container) => {
    container.innerHTML = '';

    products.slice(0, 47).forEach((product) => {
        const productElement = document.createElement('div');
        productElement.classList.add('product');

        productElement.innerHTML = `
            <img src="${product.images}" alt="${product.title}" />
            <h3>${product.title}</h3>
            <p>$${product.price}</p>
        `;

        // open modal with product details
        productElement.addEventListener('click', () => {
            openModal(product);
        });

        container.appendChild(productElement);
    });
};

const initializeProductDisplay = async () => {
    const products = await getProducts();
    if (!products) {
        document.querySelectorAll('.product-list').forEach((container) => {
            container.innerHTML = '<p>Error fetching products. Please try again later.</p>';
        });
        return;
    }

    const productContainer1 = document.querySelector('.product-list');
    const productContainer2 = document.querySelector('.product-list2');

    displayProducts(products, productContainer1);
    displayProducts(products, productContainer2);
};

initializeProductDisplay();




const modal = document.getElementById('productModal');
const modalImage = document.getElementById('modalImage');
const modalTitle = document.getElementById('modalTitle');
const modalCategory = document.getElementById('modalCategory');
const modalPrice = document.getElementById('modalPrice');
const modalDescription = document.getElementById('modalDescription');
const closeModal = document.querySelector('.close');

// Add to Cart button
const addToCartBtn = document.getElementById('addToCartBtn'); 




// modal with product details
const openModal = (product) => {
    modalImage.src = product.images;
    modalTitle.textContent = product.title;
    modalCategory.textContent = `Category: ${product.category.name}`;
    modalPrice.textContent = `Price: $${product.price}`;
    modalDescription.textContent = product.description || "No description available.";


    addToCartBtn.addEventListener("click", () => {
        addToCart(product);
    }, { once: true })

    modal.style.display = 'block';
};



// cart count on page load
const initializeCartCount = () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    // console.log(cart)
    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

    const cartCountElement = document.getElementById('cart-count');
    if (cartCountElement) {
        cartCountElement.textContent = totalItems;
    }
};

// add product to cart in local storage
const addToCart = (product) => {
    
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    // console.log(`cart: ${cart}`)
    const existingProduct = cart.find(item => item.id == product.id);
    // console.log(`existingProduct: ${existingProduct}`)
    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            title: product.title,
            price: product.price,
            image: product.images[0],
            quantity: 1,
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

document.querySelector("modal")

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