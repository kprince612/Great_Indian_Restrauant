import React, {useState} from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Previous.css'

export default function Previous() {
    const [email, setEmail] = useState('');
  const [orders, setOrders] = useState([]);
  const [found, setFound] = useState (false);
  const [found1, setFound1] = useState (false);
  const [otp, setOtp] = useState ("");
  const [otpSent, setOtpSent] = useState (false);
  const [otpVerify, setOtpVerify] = useState (false);
  const navigate = useNavigate();

  const sendOrderOTP = async () => {
    try {
      const response = await axios.post ("https://great-indian-restrauant-gray.vercel.app/send-order-otp", {email});
      if (response.data.success) {
        alert (`OTP sent to ${email}`);
        setOtpSent (true);
      }

      else {
        alert ('failed to send OTP, try again');
      }
    }

    catch (error) {
      console.error (error);
      alert ('error sending OTP, please check your email and try again');
    }
  }

  const fetchOrders = async () => {
    if (!email.trim()) {
      alert('Please enter a valid email address.');
      return;
    }

    try {
      const response = await axios.get("https://great-indian-restrauant-gray.vercel.app/api/orders", {
        params: { email },
      });

      if (response.data.success) {
        setOrders(response.data.orders);
      } else {
        alert(response.data.message || 'Failed to fetch orders.');
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
      alert('Error fetching orders.');
    }
  };

  const verifyOrderOTP = async () => {
    try {
      const response = await axios.post ("https://great-indian-restrauant-gray.vercel.app/verify-order-otp", {email, otp});
      if (response.data.success) {
        alert ('Email verification Completed');
        setOtpVerify (true);
        fetchOrders ();
      }

      else {
        alert ('Invaild OTP, please try again');
      }
    }

    catch (error) {
      console.error (error);
      alert ('error verifying OTP, try again');
    }
  };

  return (
    <div>
      <div className="container55">
      <div className="previous-orders-container">
        <img src="https://www.upload.ee/image/17664550/image140.webp" alt="logo" />
      <h2 id='head'>Previous Orders</h2>
      
      {!otpSent && (
        <>
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <button onClick={sendOrderOTP}>Fetch Orders</button>
      </>
    )}

    {otpSent && !otpVerify && (
      <>
      <input type="text" value={otp} onChange={(e) => setOtp (e.target.value)} placeholder='enter OTP'/>
      <button onClick={verifyOrderOTP}>Verify</button>
      </>
    )}

      {otpSent && otpVerify && (
      <div className="orders-list">  
          <ul>
          <h4>List of orders at this E-mail address</h4>
            {orders.map((order, index) => (
                <>
              <li key={index} className="order-item">
              <p><strong>Order_id: </strong>{order._id}</p>
                <p><strong>Order Date:</strong> {new Date(order.orderDate).toLocaleString()}</p>
                <p><strong>Braised Turtle:</strong> {order.Braised_Turtle}</p>
                <p><strong>Cheesy Tokbokki:</strong> {order.Cheesy_Tokbokki}</p>
                <p><strong>Chicken Skewers:</strong> {order.Chicken_Skewers}</p>
                <p><strong>Fried Quail Eggs:</strong> {order.Fried_Quail_Eggs}</p>
                <p><strong>Gyeran Jjim:</strong> {order.Gyeran_Jjim}</p>
                <p><strong>Steak with Herbes:</strong> {order.Steak_with_Herbes}</p>
                <p><strong>Total: $</strong>{order.totalAmount}</p>
                <p style={{color: 'green'}}><strong>Status: {!order.status.trim ()?"Pending":order.status}</strong></p>
              </li>
              <hr />
              </>
            ))}

            {otpSent && otpVerify && orders.length === 0 && (
        <p id='para1'>No Previous Orders are found</p>
      )}
            <hr />
          </ul>

          <button id='btn1' onClick={() => navigate('/Menu')}>Back to Menu</button>
      </div>
      )}

      {/* {!found && !found1 && (
        <>
        <p>Order is not found through this Email id</p>
        <button onClick={() => navigate('/Menu')}>Back to Menu</button>
        </>
      )} */}

      {/* {!found && (
        <p id='para'>Order is not found through this Email id</p>
    )} */}


      {/* {found && !found1 && ( */}
      {/* )} */}
    </div>
    </div>
    </div>
  )
}
