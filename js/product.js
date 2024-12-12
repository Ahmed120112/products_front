document.addEventListener('DOMContentLoaded', () => {
    const productId = new URLSearchParams(window.location.search).get('id');

    fetch(`http://127.0.0.1:5000/api/products/${productId}`)
        .then(response => response.json())
        .then(data => {
            const details = document.getElementById('productDetails');
            details.innerHTML = `
                <h2>${data.name}</h2>
                <p>${data.description}</p>
                <p>Price: $${data.price}</p>
                <img src="${data.image_url || 'assets/placeholder.png'}" alt="${data.name}">
            `;
        })
        .catch(err => console.error('Failed to fetch product', err));
});