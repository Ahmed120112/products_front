let cart = [];


function addToCart(productId, name, price) {
    fetch('http://127.0.0.1:5000/api/cart', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ product_id: productId }),
    })
        .then((response) => {
            if (!response.ok) throw new Error('Failed to add item to cart');
            return response.json();
        })
        .then(() => {
            openCart(); 
            updateCart(); 
        })
        .catch((err) => console.error('Error adding to cart:', err));
}

// فتح السلة
function openCart() {
    const cartSidebar = document.getElementById('cartSidebar');
    if (cartSidebar) {
        cartSidebar.classList.add('active');
    }
}

document.getElementById('cartButton').addEventListener('click', () => {
    const cartSidebar = document.getElementById('cartSidebar');
    cartSidebar.classList.add('active');
});


document.getElementById('closeCart').addEventListener('click', () => {
    const cartSidebar = document.getElementById('cartSidebar');
    if (cartSidebar) {
        cartSidebar.classList.remove('active');
    }
});


function updateCart() {
    fetch('http://127.0.0.1:5000/api/cart')
        .then((response) => {
            if (!response.ok) throw new Error('Failed to fetch cart');
            return response.json();
        })
        .then((data) => {
            const cartItems = document.getElementById('cartItems');
            const totalPrice = document.getElementById('totalPrice');
            if (cartItems) cartItems.innerHTML = '';

            let total = 0;
            data.forEach((item) => {
                total += item.price * item.quantity;
                if (cartItems) {
                    cartItems.innerHTML += `
                        <li class="list-group-item d-flex justify-content-between align-items-center">
                            ${item.name} (x${item.quantity}) - $${(item.price * item.quantity).toFixed(2)}
                            <div>
                                <button class="btn btn-sm btn-secondary" onclick="changeQuantity(${item.id}, 1)">+</button>
                                <button class="btn btn-sm btn-secondary" onclick="changeQuantity(${item.id}, -1)">-</button>
                            </div>
                        </li>
                    `;
                }
            });

            if (totalPrice) totalPrice.textContent = `Total: $${total.toFixed(2)}`;
        })
        .catch((err) => console.error('Error fetching cart:', err));
}


function changeQuantity(productId, change) {
    fetch(`http://127.0.0.1:5000/api/cart/${productId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ change }),
    })
        .then((response) => {
            if (!response.ok) throw new Error('Failed to update quantity');
            return response.json();
        })
        .then(() => updateCart()) 
        .catch((err) => console.error('Error updating quantity:', err));
}


document.getElementById('clearCart').addEventListener('click', () => {
    fetch('http://127.0.0.1:5000/api/cart/clear', {
        method: 'DELETE',
    })
        .then((response) => {
            if (!response.ok) throw new Error('Failed to clear cart');
            return response.json();
        })
        .then(() => updateCart()) 
        .catch((err) => console.error('Error clearing cart:', err));
});