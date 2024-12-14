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
                        <img src="${product.image_url || 'assets/images/placeholders/default.png'}" alt="${product.name}" width="50">
                    </td>
                    <td>
                        <button class="btn btn-sm btn-secondary" onclick="editProduct(${product.id})">Edit</button>
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
            method: 'DELETE',
        })
        .then(response => {
            if (!response.ok) throw new Error('Failed to delete product');
            alert('Product deleted successfully!');
            loadProducts();
        })
        .catch(err => console.error('Error deleting product:', err));
    }
}

function editProduct(productId) {
    // التحقق من ID المنتج
    if (!productId) {
        console.error('Product ID is undefined');
        return;
    }

    // جلب بيانات المنتج
    fetch(`http://127.0.0.1:5000/api/products/${productId}`)
        .then(response => {
            if (!response.ok) throw new Error('Failed to fetch product');
            return response.json();
        })
        .then(product => {
         
            if (!product) {
                console.error('Product not found');
                return;
            }

        
            const newName = prompt('Edit Name:', product.name) || product.name;
            const newPrice = parseFloat(prompt('Edit Price:', product.price)) || product.price;
            const newDescription = prompt('Edit Description:', product.description || 'No description') || product.description;
            const newCategoryId = parseInt(prompt('Edit Category ID:', product.category_id)) || product.category_id;

        
            const updatedProduct = {
                name: newName,
                price: newPrice,
                description: newDescription,
                category_id: newCategoryId,
            };

         
            return fetch(`http://127.0.0.1:5000/api/products/${productId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedProduct),
            });
        })
        .then(response => {
            if (!response.ok) throw new Error('Failed to update product');
            alert('Product updated successfully!');
            loadProducts(); // تحديث القائمة
        })
        .catch(err => console.error('Error editing product:', err));
}