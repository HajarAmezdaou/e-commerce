import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';

function Header() {
    return (
        <header className="header">
            <h1>Mon E-commerce</h1>
            <Link to="/cart">Panier</Link>
        </header>
    );
}

function Product({ product, addToCart }) {
    return (
        <div className="product-card">
            <img src={product.image} alt={product.name} className="product-image" />
            <h2>{product.name}</h2>
            <p className="price">Prix : {product.price} dh</p>
            <button className="add-to-cart" onClick={() => addToCart(product)}>
                Ajouter au panier
            </button>
        </div>
    );
}

function ProductList({ products, addToCart }) {
    return (
        <div className="product-list">
            {products.map((product) => (
                <Product key={product.name} product={product} addToCart={addToCart} />
            ))}
        </div>
    );
}

function Cart({ cartItems }) {
    const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    return (
        <div className="cart">
            <h3>Panier</h3>
            {cartItems.length === 0 ? (
                <p>Votre panier est vide</p>
            ) : (
                cartItems.map((item, index) => (
                    <div key={index} className="cart-item">
                        <p>Produit : {item.name}</p>
                        <p>Quantité : {item.quantity}</p>
                        <p>Prix : {item.price * item.quantity} dh</p>
                    </div>
                ))
            )}
            <h3>Total : {totalPrice} dh</h3>
        </div>
    );
}

function CategoryFilter({ categories, selectCategory }) {
    return (
        <div className="category-filter">
            
            <select onChange={(e) => selectCategory(e.target.value)}>
                <option value="">Toutes les catégories</option>
                {categories.map((category, index) => (
                    <option key={index} value={category}>
                        {category}
                    </option>
                ))}
            </select>
        </div>
    );
}

function App() {
    const [cartItems, setCartItems] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [products] = useState([
        { name: 'Produit 1', price: 2000, category: 'Accessoires', image: 'collier2.jpg' },
        { name: 'Produit 2', price: 200, category: 'Vêtements', image: 'pontalon.jpg' },
        { name: 'Produit 3', price: 3000, category: 'Accessoires', image: 'bague.jpg' },
        { name: 'Produit 4', price: 100, category: 'Accessoires', image: 'collier.jpg' },
        { name: 'Produit 5', price: 250, category: 'Vêtements', image: 'chemise.jpg' }
    ]);

    const categories = ['Vêtements', 'Accessoires'];

    const addToCart = (product) => {
        const existingProduct = cartItems.find(item => item.name === product.name);
        if (existingProduct) {
            setCartItems(cartItems.map(item =>
                item.name === product.name ? { ...item, quantity: item.quantity + 1 } : item
            ));
        } else {
            setCartItems([...cartItems, { ...product, quantity: 1 }]);
        }
    };

    const selectCategory = (category) => {
        setSelectedCategory(category);
    };

    const filteredProducts = selectedCategory
        ? products.filter(product => product.category === selectedCategory)
        : products;

    return (
        <Router>
            <div>
                <Header />
                <CategoryFilter categories={categories} selectCategory={selectCategory} />
                <Routes>
                    <Route path="/" element={<ProductList products={filteredProducts} addToCart={addToCart} />} />
                    <Route path="/cart" element={<Cart cartItems={cartItems} />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;