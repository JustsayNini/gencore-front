import { useState, useEffect } from 'react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';


const SearchSpace = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async (queryTerm = '') => {
        try {
            setError('');
            const url = queryTerm 
                ? `${API_URL}/productinfo?search=${encodeURIComponent(queryTerm)}` 
                : `${API_URL}/productinfo`;
            
            const res = await fetch(url);
            const data = await res.json();

            if (!res.ok) {
                setProducts([]);
                setError(data.message || 'No products match your search.');
                return;
            }
            
            setProducts(Array.isArray(data) ? data : [data]);
        } catch (err) {
            console.error("Failed to load products:", err);
            setProducts([]);
            setError('Could not connect to backend server.');
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        setSelectedProduct(null);
        fetchProducts(searchTerm);
    };

    const handleAddToCart = async () => {
        if (!selectedProduct) return;

        try {
            setMessage('');
            const res = await fetch(`${API_URL}/addcart`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    deviceName: selectedProduct.deviceName,
                    quantity: Number(quantity),
                    devicePrice: selectedProduct.devicePrice
                })
            });

            if (res.ok) {
                setMessage(`Added ${quantity} x ${selectedProduct.deviceName} to cart!`);
            } else {
                setMessage('Failed to add item to cart.');
            }
        } catch (err) {
            console.error("Cart error:", err);
            setMessage('Server error while adding to cart.');
        }
    };

    return ( 
        <div className="SearchSpaceContainer">
            
            <div className="searchBarWrapper">
                <form className="searchBar" onSubmit={handleSearch}>
                    <input 
                        type="text" 
                        placeholder="What are you looking for?" 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button type="submit">Search</button>
                </form>

                {error && <p style={{ color: 'red', margin: '5px 0' }}>{error}</p>}
                {message && <p style={{ color: 'green', margin: '5px 0' }}>{message}</p>}
            </div>

            
            <div className="searchContentArea">
                {selectedProduct ? (
                    <div className="product-detail-card">
                        <button type="button" onClick={() => setSelectedProduct(null)}>
                            &larr; Go Back to Search Results
                        </button>

                        <h2>{selectedProduct.deviceName}</h2>
                        <p><strong>Category:</strong> {selectedProduct.deviceType || 'Laptop'}</p>
                        <p><strong>Price:</strong> R {selectedProduct.devicePrice}</p>
                        
                        <div className="specs-box">
                            <h4>Specifications:</h4>
                            {typeof selectedProduct.deviceSpecs === 'object' && selectedProduct.deviceSpecs !== null ? (
                                Object.entries(selectedProduct.deviceSpecs).map(([key, value]) => (
                                    <p key={key}>
                                        <strong style={{ textTransform: 'capitalize' }}>
                                            {key.replace(/([A-Z])/g, ' $1')}: 
                                        </strong> {value}
                                    </p>
                                ))
                            ) : (
                                <p>{selectedProduct.deviceSpecs || 'No specifications available.'}</p>
                            )}
                        </div>

                        <div className="addToCartBar">
                            <label>Qty:</label>
                            <input 
                                type="number" 
                                min="1" 
                                value={quantity} 
                                onChange={(e) => setQuantity(e.target.value)}
                            />
                            <button type="button" onClick={handleAddToCart}>
                                Add to Cart
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="searchResults">
                        {products.length > 0 ? (
                            products.map(item => (
                                <div 
                                    key={item?._id || Math.random()} 
                                    className="product-card"
                                    onClick={() => setSelectedProduct(item)}
                                >
                                    <h3>{item?.deviceName}</h3>
                                    <p>Click to view specs & add to cart</p>
                                    <span><strong>R {item?.devicePrice}</strong></span>
                                </div>
                            ))
                        ) : (
                            !error && <p>No products found.</p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default SearchSpace;