import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

const Home = () => {
    const [featuredProducts, setFeaturedProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`${API_URL}/productinfo`)
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) setFeaturedProducts(data);
                else setFeaturedProducts([data]);
            })
            .catch(err => console.error("Error loading home products:", err));
    }, []);

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
        <div className="HomeDiv">
            <h2 className="pageTitle">WELCOME TO GENCORE</h2>
            {message && <p className="successMessage">{message}</p>}

            {selectedProduct ? (
                <div className="product-detail-card">
                    <button type="button" onClick={() => setSelectedProduct(null)}>
                        &larr; Back to Featured Items
                    </button>

                    <h2>{selectedProduct.deviceName}</h2>
                    <p><strong>Price:</strong> R {selectedProduct.devicePrice}</p>
                    
                    <div className="specs-box">
                        <h4>Specifications:</h4>
                        <div className="specs-list">
                            {typeof selectedProduct.deviceSpecs === 'object' && selectedProduct.deviceSpecs !== null ? (
                                Object.entries(selectedProduct.deviceSpecs).map(([key, value]) => (
                                    <p key={key}>
                                        <strong>{key.replace(/([A-Z])/g, ' $1')}: </strong> {value}
                                    </p>
                                ))
                            ) : (
                                <p>{selectedProduct.deviceSpecs || 'No additional specifications available.'}</p>
                            )}
                        </div>
                    </div>

                    <div className="addToCartBar">
                        <label><strong>Qty:</strong></label>
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
                <div>
                    <h3>FEATURED LAPTOPS & DEVICES</h3>
                    <div className="product-grid">
                        {featuredProducts.map(item => (
                            <div 
                                key={item?._id || Math.random()} 
                                className="product-card"
                                onClick={() => setSelectedProduct(item)}
                            >
                                <h4>{item?.deviceName}</h4>
                                <p>R {item?.devicePrice}</p>
                                <small>Click to view details</small>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Home;