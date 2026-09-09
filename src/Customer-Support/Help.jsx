import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

const Help = () => {
    const [msg, setMsg] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [trackingId, setTrackingId] = useState('');
    const [trackingResult, setTrackingResult] = useState(null);
    const [statusMessage, setStatusMessage] = useState('');
    const [activeFaq, setActiveFaq] = useState(null);
    const navigate = useNavigate();

    const faqs = [
        { id: 1, q: "How long does delivery take?", a: "Standard delivery takes between 2 to 5 business days across Gauteng and surrounding provinces." },
        { id: 2, q: "What payment methods are supported?", a: "We accept Instant EFT and standard Debit/Credit card payments at checkout." },
        { id: 3, q: "What is the return policy on refurbished laptops?", a: "All devices come with a standard 30-day warranty for hardware defects." }
    ];

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!msg.trim()) return;

        try {
            const res = await fetch(`${API_URL}/usermessage`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    userUsername: userEmail || 'Allette', 
                    messageContent: msg 
                })
            });

            if (res.ok) {
                setStatusMessage('Your message has been sent to support! We will respond shortly.');
                setMsg('');
            } else {
                setStatusMessage('Failed to send message. Please try again.');
            }
        } catch (err) {
            console.error("Support message error:", err);
            setStatusMessage('Server connection error.');
        }
    };

    const handleTrackOrder = async (e) => {
        e.preventDefault();
        if (!trackingId.trim()) return;

        try {
            const res = await fetch(`${API_URL}/deliverystatus/${trackingId}`);
            const data = await res.json();

            if (res.ok) {
                setTrackingResult(data);
            } else {
                setTrackingResult({ currentStatus: 'Order ID not found.' });
            }
        } catch (err) {
            console.error("Tracking error:", err);
            setTrackingResult({ currentStatus: 'Could not fetch delivery status.' });
        }
    };

    return (
        <div className="HelpContainer">
            <h2 className="pageTitle">CUSTOMER SUPPORT & HELP</h2>

            <div className="supportCard">
                <h3>QUICK TRACK ORDER</h3>
                <form onSubmit={handleTrackOrder}>
                    <input 
                        type="text" 
                        placeholder="Enter Order ID..." 
                        value={trackingId} 
                        onChange={(e) => setTrackingId(e.target.value)}
                    />
                    <button type="submit">Track</button>
                </form>
                {trackingResult && (
                    <div>
                        <strong>Status:</strong> {trackingResult.currentStatus || JSON.stringify(trackingResult)}
                    </div>
                )}
            </div>

            <div className="supportCard">
                <h3>SEND US A MESSAGE</h3>
                {statusMessage && <p className="successMessage">{statusMessage}</p>}
                
                <form onSubmit={handleSendMessage}>
                    <input 
                        type="email" 
                        placeholder="Your Email or Username" 
                        value={userEmail} 
                        onChange={(e) => setUserEmail(e.target.value)} 
                    />
                    <textarea 
                        rows="3" 
                        placeholder="Type your message or inquiry here..." 
                        value={msg} 
                        onChange={(e) => setMsg(e.target.value)}
                    />
                    <button type="submit">SEND MESSAGE</button>
                </form>
            </div>

            <div className="supportCard">
                <h3>FREQUENTLY ASKED QUESTIONS</h3>
                {faqs.map(faq => (
                    <div key={faq.id} className="faqItem">
                        <div 
                            className="faqQuestion"
                            onClick={() => setActiveFaq(activeFaq === faq.id ? null : faq.id)}
                        >
                            <span>{faq.q}</span>
                            <span>{activeFaq === faq.id ? '▲' : '▼'}</span>
                        </div>
                        {activeFaq === faq.id && (
                            <p className="faqAnswer">{faq.a}</p>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Help;