document.addEventListener('DOMContentLoaded', () => {

    fetchProducts();
});


function fetchProducts() {
    const container = document.getElementById('productsContainer');
    container.innerHTML = '<p>Loading products...</p>'; 

    fetch('http://127.0.0.1:5000/api/products')
        .then((response) => {
            if (!response.ok) {
                throw new Error(`Failed to fetch products: ${response.status}`);
            }
            return response.json();
        })
        .then((data) => {
            renderProducts(data); 
        })
        .catch((err) => {
            console.error('Error fetching products:', err);
            container.innerHTML = '<p>Failed to load products. Please try again later.</p>';
        });
}


function renderProducts(products) {
    const container = document.getElementById('productsContainer');
    container.innerHTML = ''; 

    if (products.length === 0) {
        container.innerHTML = '<p>No products available.</p>';
        return;
    }

    products.forEach((product) => {
        const card = createProductCard(product);
        container.appendChild(card);
    });
}


function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'col-md-4 mb-4';
    card.innerHTML = `
        <div class="card">
            <img src="${product.image_url || 'assets/images/placeholders/default.png'}" class="card-img-top" alt="${product.name}">
            <div class="card-body">
                <h5 class="card-title">${product.name}</h5>
                <p class="card-text">${product.description || 'No description available'}</p>
                <p class="card-text"><strong>$${product.price}</strong></p>
                <button onclick="addToCart(${product.id}, '${product.name}', ${product.price})" class="btn btn-primary">Add to Cart</button>
            </div>
        </div>
    `;
    return card;
}