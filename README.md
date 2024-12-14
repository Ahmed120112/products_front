README.md

# E-Commerce Frontend

This is a frontend for an e-commerce application, providing both user and admin interfaces. The project allows users to browse products, manage their cart, and admins to manage the product inventory (add, edit, delete products).

---

## **Project Structure**

project/
│
├── admin/
│   ├── index.html        # Admin Dashboard for managing products
│
├── user/
│   ├── index.html        # Main page for users to browse products
│   ├── product.html      # Product details page
│
├── assets/
│   ├── admin/            # Admin-specific resources
│   │   ├── css/          # Admin styles
│   │   │   ├── admin.css
│   │   ├── js/           # Admin scripts
│   │   │   ├── admin.js
│   │
│   ├── user/             # User-specific resources
│   │   ├── css/          # User styles
│   │   │   ├── index.css
│   │   │   ├── product.css
│   │   ├── js/           # User scripts
│   │   │   ├── index.js
│   │   │   ├── cart.js
│   │   │   ├── product.js

---

## **Features**

### **User Interface**
- Browse products displayed on the homepage.
- View product details on a separate page.
- Add products to the cart.
- Manage the cart:
  - View cart items.
  - Increase or decrease item quantity.
  - Clear the cart.

### **Admin Interface**
- View all products in a table format.
- Add new products (Name, Price, Description, Image URL, Category).
- Edit existing products.
- Delete products.

---

## **Setup**

### Prerequisites
- A basic HTTP server (e.g., Python's HTTP server or a live server).
- A modern web browser (e.g., Chrome, Firefox).

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/Ahmed120112/products_front.git

	2.	Navigate to the project directory:

cd products_front


	3.	Run a local server to serve the files:
	
	•	Using any live server (e.g., VSCode’s Live Server).

	4.	Open the browser and navigate to:

http://127.0.0.1:5050/user/index.html

Usage

Navigation
	•	The navbar includes links to:
	•	Home: Opens the user interface (user/index.html).
	•	Admin: Opens the admin dashboard (admin/index.html).

User Interface
	•	Products are displayed as cards with details.
	•	Clicking “Add to Cart” adds the product to the cart.
	•	Click “View Cart” to open the cart sidebar.

Admin Interface
	•	The admin dashboard provides a form to add new products.
	•	Products are displayed in a table with “Edit” and “Delete” actions.

Technologies Used
	•	HTML: Structure of the pages.
	•	CSS: Styling using custom styles and Bootstrap.
	•	JavaScript: Dynamic functionalities for user and admin interactions.
	•	Bootstrap: Responsive design and pre-built components.

API Endpoints

User
	•	GET /api/products - Fetch all products.
	•	POST /api/cart - Add product to the cart.
	•	GET /api/cart - Fetch cart items.
	•	PUT /api/cart/:productId - Update product quantity in the cart.
	•	DELETE /api/cart/:productId - Remove a product from the cart.
	•	DELETE /api/cart/clear - Clear all items in the cart.

Admin
	•	POST /api/products - Add a new product.
	•	PUT /api/products/:productId - Edit an existing product.
	•	DELETE /api/products/:productId - Delete a product.

Screenshots

User Homepage

Admin Dashboard

Contributing
	1.	Fork the repository.
	2.	Create a new branch:

git checkout -b feature-name


	3.	Commit your changes:

git commit -m "Add your message here"


	4.	Push to the branch:

git push origin feature-name


	5.	Open a pull request.

License

This project is licensed under the MIT License.

