import { useNavigate } from 'react-router-dom';
import '../App.css';

const Cart = () => {
    const navigate = useNavigate();

    return ( 
        <div className="CartDiv">
            <h2 className="pageTitle">YOUR CART</h2>
            <div className="cartBox">
                <p>Dell Latitude E5270 Core i5 - 6th Gen</p>
                <p><strong>TOTAL PRICE: R 3 899</strong></p>
            </div>
            <button type="button" onClick={() => navigate('/checkout')}>Confirm and go to checkout</button>
        </div>
    );
}

export default Cart;