let cart = [];


document.addEventListener('DOMContentLoaded', () => {
    fetch('http://127.0.0.1:5000/api/products')
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById('productsContainer');
            container.innerHTML = '';

            data.forEach(product => {
                const card = document.createElement('div');
                card.className = 'col-md-4 mb-4';
                card.innerHTML = `
                    <div class="card">
                        <img src="${product.image_url || 'https://via.placeholder.com/150'}" class="card-img-top" alt="${product.name}">
                        <div class="card-body">
                            <h5 class="card-title">${product.name}</h5>
                            <p class="card-text">${product.description || 'No description available'}</p>
                            <p class="card-text"><strong>$${product.price}</strong></p>
                            <button onclick="addToCart(${product.id}, '${product.name}', ${product.price})" class="btn btn-primary">Add to Cart</button>
                        </div>
                    </div>
                `;
                container.appendChild(card);
            });
        })
        .catch(err => console.error('Error fetching products:', err));
});

// إضافة منتج إلى السلة
function addToCart(productId, name, price) {
    const existingProduct = cart.find(item => item.id === productId);
    if (existingProduct) {
        existingProduct.quantity++;
    } else {
        cart.push({ id: productId, name, price, quantity: 1 });
    }
    updateCart();
}


function updateCart() {
    const cartItems = document.getElementById('cartItems');
    const totalPrice = document.getElementById('totalPrice');

    cartItems.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        total += item.price * item.quantity;
        cartItems.innerHTML += `
            <li class="list-group-item d-flex justify-content-between align-items-center">
                ${item.name} (x${item.quantity}) - $${(item.price * item.quantity).toFixed(2)}
                <div>
                    <button class="btn btn-sm btn-secondary" onclick="changeQuantity(${item.id}, 1)">+</button>
                    <button class="btn btn-sm btn-secondary" onclick="changeQuantity(${item.id}, -1)">-</button>
                </div>
            </li>
        `;
    });

    totalPrice.textContent = `Total: $${total.toFixed(2)}`;
}


function changeQuantity(productId, change) {
    const product = cart.find(item => item.id === productId);
    if (product) {
        product.quantity += change;
        if (product.quantity <= 0) {
            cart = cart.filter(item => item.id !== productId);
        }
        updateCart();
    }
}


document.getElementById('clearCart').addEventListener('click', () => {
    cart = [];
    updateCart();
});


document.getElementById('cartButton').addEventListener('click', () => {
    document.getElementById('cartSidebar').classList.add('active');
});

document.getElementById('closeCart').addEventListener('click', () => {
    document.getElementById('cartSidebar').classList.remove('active');
});