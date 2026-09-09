import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

const Checkout = () => {
    const [paymentType, setPaymentType] = useState('EFT');
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    const handleCheckout = async () => {
        try {
            const res = await fetch(`${API_URL}/ordernumber`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userEmail: "Allette" }) 
            });

            const data = await res.json();

            if (res.ok) {
                setSuccessMessage(`Order successful! Your tracking ID is: ${data.orderNumber}`);
            }
        } catch (err) {
            console.error("Checkout failed:", err);
        }
    };

    return (
        <div className="CheckoutDiv">
            <h2 className="pageTitle">CHECKOUT</h2>
            {successMessage && <p className="successMessage">{successMessage}</p>}
            
            <div className="checkoutBox">
                <h3>Choose Payment Method</h3>
                <button type="button" onClick={() => setPaymentType('EFT')}>EFT</button>
                <button type="button" onClick={() => setPaymentType('Card')}>Credit/Debit Card</button>
                
                {paymentType === 'EFT' ? (
                    <div>
                        <p>ACCOUNT NAME: GenCode Cart</p>
                        <p>ACCOUNT NUMBER: 123 456 7890</p>
                        <p>BANK: FNB</p>
                    </div>
                ) : (
                    <div>
                        <input type="text" placeholder="Card Number" />
                        <input type="text" placeholder="CVC" />
                    </div>
                )}
                <button type="button" onClick={handleCheckout}>CONFIRM PAYMENT</button>
            </div>
        </div>
    );
}

export default Checkout;