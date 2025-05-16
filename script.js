// DOM Elements
const cartCount = document.getElementById('cart-count');
const addToCartButtons = document.querySelectorAll('.add-to-cart');
const cartIcon = document.querySelector('.cart-icon');
const categoryFilter = document.getElementById('category-filter');
const priceFilter = document.getElementById('price-filter');
const productsGrid = document.querySelector('.products-grid');
const contactForm = document.getElementById('contactForm');

// Cart functionality
let cartItems = JSON.parse(localStorage.getItem('cart')) || [];

function updateCartCount() {
    cartCount.textContent = cartItems.length;
    localStorage.setItem('cart', JSON.stringify(cartItems));
}

function addToCart(event) {
    const button = event.target;
    const productCard = button.closest('.product-card');
    const productName = productCard.querySelector('h3').textContent;
    const productPrice = productCard.querySelector('p').textContent;
    
    cartItems.push({
        name: productName,
        price: productPrice
    });
    
    updateCartCount();
    
    // Add animation to cart icon
    cartIcon.classList.add('cart-bounce');
    setTimeout(() => {
        cartIcon.classList.remove('cart-bounce');
    }, 500);
    
    // Show confirmation
    button.textContent = 'Added!';
    setTimeout(() => {
        button.textContent = 'Add to Cart';
    }, 2000);
}

// Initialize cart count on page load
updateCartCount();

// Product filtering
function filterProducts() {
    const category = categoryFilter.value;
    const priceRange = priceFilter.value;
    
    // In a real app, you would fetch filtered products from a server
    // For this demo, we'll just show all products
    loadProducts();
}

function loadProducts() {
    // In a real app, you would fetch products from an API
    // For this demo, we'll use mock data
    const mockProducts = [
        {
            id: 1,
            name: "Wireless Headphones",
            price: "$89.99",
            category: "electronics",
            priceValue: 89.99,
            image: "https://images.pexels.com/photos/3394654/pexels-photo-3394654.jpeg?auto=compress&cs=tinysrgb&w=500"
        },
        {
            id: 2,
            name: "Smart Watch",
            price: "$139.99",
            category: "electronics",
            priceValue: 139.99,
            image: "https://media.istockphoto.com/id/1189983927/photo/smart-watch-for-branding-and-mock-up-3d-render-illustration.jpg?s=612x612&w=0&k=20&c=V5IEiA7u-_wAYjFoq7HXC4UrGUhsyt615QYQS97XrMQ="
        },
        {
            id: 3,
            name: "Bluetooth Speaker",
            price: "$79.99",
            category: "electronics",
            priceValue: 69.99,
            image: "https://images.pexels.com/photos/6023354/pexels-photo-6023354.jpeg?auto=compress&cs=tinysrgb&w=500"
        },
        {
            id: 4,
            name: "Cotton T-Shirt",
            price: "$24.99",
            category: "clothing",
            priceValue: 24.99,
            image: "images/products/product4.jpg"
        },
        {
            id: 5,
            name: "Denim Jeans",
            price: "$49.99",
            category: "clothing",
            priceValue: 49.99,
            image: "images/products/product5.jpg"
        },
        {
            id: 6,
            name: "Coffee Maker",
            price: "$89.99",
            category: "home",
            priceValue: 89.99,
            image: "images/products/product6.jpg"
        }
    ];
    
    // Clear existing products
    productsGrid.innerHTML = '';
    
    // Filter products based on selections
    let filteredProducts = mockProducts;
    
    if (categoryFilter.value !== 'all') {
        filteredProducts = filteredProducts.filter(product => product.category === categoryFilter.value);
    }
    
    if (priceFilter.value !== 'all') {
        const [min, max] = priceFilter.value.split('-').map(Number);
        if (priceFilter.value.endsWith('+')) {
            filteredProducts = filteredProducts.filter(product => product.priceValue >= 100);
        } else {
            filteredProducts = filteredProducts.filter(product => product.priceValue >= min && product.priceValue <= max);
        }
    }
    
    // Display filtered products
    filteredProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card fade-in';
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>${product.price}</p>
            <button class="add-to-cart">Add to Cart</button>
        `;
        productsGrid.appendChild(productCard);
    });
    
    // Add event listeners to new add to cart buttons
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', addToCart);
    });
}

// Contact form submission
function handleContactFormSubmit(event) {
    event.preventDefault();
    
    const formData = new FormData(contactForm);
    const formValues = Object.fromEntries(formData.entries());
    
    // In a real app, you would send this data to a server
    console.log('Form submitted:', formValues);
    
    // Show success message
    alert('Thank you for your message! We will get back to you soon.');
    contactForm.reset();
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    // Add event listeners to all add to cart buttons
    addToCartButtons.forEach(button => {
        button.addEventListener('click', addToCart);
    });
    
    // Filter event listeners
    if (categoryFilter && priceFilter) {
        categoryFilter.addEventListener('change', filterProducts);
        priceFilter.addEventListener('change', filterProducts);
        loadProducts();
    }
    
    // Contact form submission
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactFormSubmit);
    }
    
    // Add animations to elements
    const animatedElements = document.querySelectorAll('.product-card, .team-member, .about-content > *');
    animatedElements.forEach((element, index) => {
        element.classList.add(index % 2 === 0 ? 'slide-in-left' : 'slide-in-right');
    });
});

// Responsive navigation
function setupMobileMenu() {
    const navToggle = document.createElement('button');
    navToggle.className = 'nav-toggle';
    navToggle.innerHTML = '<span></span><span></span><span></span>';
    
    const header = document.querySelector('header .container');
    const nav = document.querySelector('nav');
    
    navToggle.addEventListener('click', () => {
        nav.classList.toggle('active');
        navToggle.classList.toggle('active');
    });
    
    header.insertBefore(navToggle, nav);
}

// Initialize mobile menu if on small screen
if (window.innerWidth <= 768) {
    setupMobileMenu();
}

// Handle window resize
window.addEventListener('resize', () => {
    if (window.innerWidth <= 768) {
        setupMobileMenu();
    } else {
        const navToggle = document.querySelector('.nav-toggle');
        if (navToggle) {
            navToggle.remove();
        }
        const nav = document.querySelector('nav');
        if (nav) {
            nav.classList.remove('active');
        }
    }
});