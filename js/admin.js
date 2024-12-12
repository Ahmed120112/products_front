document.addEventListener('DOMContentLoaded', () => {
    loadProducts();

    document.getElementById('addProductForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const productData = {
            name: document.getElementById('name').value.trim(),
            price: parseFloat(document.getElementById('price').value),
            description: document.getElementById('description').value.trim(),
            image_url: document.getElementById('image_url').value.trim(),
            category_id: parseInt(document.getElementById('category_id').value)
        };

        fetch('http://127.0.0.1:5000/api/products', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(productData)
        })
        .then(response => {
            if (!response.ok) throw new Error('Failed to add product');
            return response.json();
        })
        .then(() => {
            alert('Product added successfully!');
            loadProducts();
            document.getElementById('addProductForm').reset();
        })
        .catch(err => console.error('Error:', err));
    });
});

function loadProducts() {
    fetch('http://127.0.0.1:5000/api/products')
        .then(response => response.json())
        .then(data => {
            const tableBody = document.getElementById('productTable').querySelector('tbody');
            tableBody.innerHTML = '';

            data.forEach(product => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${product.name}</td>
                    <td>$${product.price.toFixed(2)}</td>
                    <td>${product.description || 'No description available'}</td>
                    <td>
                        <img src="${product.image_url || 'https://via.placeholder.com/50'}" alt="${product.name}" width="50">
                    </td>
                    <td>
                        <button class="btn btn-sm btn-secondary" onclick="editProduct(${product.id}, '${product.name}', ${product.price}, '${product.description || ''}', ${product.category_id})">Edit</button>
                        <button class="btn btn-sm btn-danger" onclick="deleteProduct(${product.id})">Delete</button>
                    </td>
                `;
                tableBody.appendChild(row);
            });
        })
        .catch(err => console.error('Error fetching products:', err));
}

function deleteProduct(productId) {
    if (confirm('Are you sure you want to delete this product?')) {
        fetch(`http://127.0.0.1:5000/api/products/${productId}`, {
            method: 'DELETE'
        })
        .then(response => {
            if (!response.ok) throw new Error('Failed to delete product');
            return response.json();
        })
        .then(() => {
            alert('Product deleted successfully!');
            loadProducts();
        })
        .catch(err => console.error('Error deleting product:', err));
    }
}

function editProduct(id, name, price, description, category_id) {
    const newName = prompt('Edit Name:', name);
    const newPrice = prompt('Edit Price:', price);
    const newDescription = prompt('Edit Description:', description);
    const newCategoryId = prompt('Edit Category ID:', category_id);

    if (newName && newPrice) {
        const updatedData = {
            name: newName,
            price: parseFloat(newPrice),
            description: newDescription,
            category_id: parseInt(newCategoryId)
        };

        fetch(`http://127.0.0.1:5000/api/products/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedData)
        })
        .then(response => {
            if (!response.ok) throw new Error('Failed to update product');
            return response.json();
        })
        .then(() => {
            alert('Product updated successfully!');
            loadProducts();
        })
        .catch(err => console.error('Error updating product:', err));
    }
}