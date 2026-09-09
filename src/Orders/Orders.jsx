import { useState, useEffect } from 'react';
import '../App.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetch(`${API_URL}/orders`)
            .then(async (res) => {
                if (!res.ok) {
                    throw new Error(`Server returned status ${res.status}`);
                }

                return res.json();
            })
            .then((data) => {
                if (Array.isArray(data)) {
                    setOrders(data);
                } else if (data && typeof data === 'object') {
                    setOrders([data]);
                } else {
                    setOrders([]);
                }
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching orders:", err);
                setError("Could not load orders from server.");
                setLoading(false);
            });
    }, []);

    return (
        <div className="HomeDiv">
            <h2 className="pageTitle">MY ORDERS</h2>

            {loading && <p>Loading orders...</p>}
            {error && <p className="errorMessage">{error}</p>}

            {!loading && !error && orders.length === 0 && (
                <div className="product-card">
                    <p>No orders found yet.</p>
                </div>
            )}

            {!loading && orders.length > 0 && (
                <div className="searchResults">
                    {orders.map((orderItem) => (
                        <div key={orderItem._id || orderItem.orderNumber || Math.random()} className="product-card">
                            <h3>Order Ref: {orderItem.orderNumber || orderItem.orderId || orderItem._id || 'N/A'}</h3>
                            <p><strong>Status:</strong> {orderItem.currentStatus || 'Processing'}</p>
                            <p><strong>User:</strong> {orderItem.userEmail}</p>
                            <small>Date: {orderItem.createdAt ? new Date(orderItem.createdAt).toLocaleDateString() : 'Recent'}</small>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Orders;