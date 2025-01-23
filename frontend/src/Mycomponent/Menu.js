import React, { useState } from 'react'
import axios from 'axios'
import './Menu.css'
import { useNavigate } from 'react-router-dom';
import Confirm from '../Mycomponent/Confirm.js'

export default function Menu() {
  const [Pshow, setPshow] = useState (false);
  const [orderData, setorderData] = useState ({
    Braised_Turtle: '',
    Cheesy_Tokbokki: '',
    Chicken_Skewers: '',
    Fried_Quail_Eggs: '',
    Gyeran_Jjim: '',
    Steak_with_Herbes: '',
    Braised_Turtle1: '',
    Cheesy_Tokbokki1: '',
    firstname: '',
    lastname: '',
    email2: '',
    phone: '',
    address: '',
    totalAmount: '',
    status: '',
  });

  const navigate = useNavigate ();

  const prices = {
    Braised_Turtle: 49,
    Cheesy_Tokbokki: 38,
    Chicken_Skewers: 26,
    Fried_Quail_Eggs: 23,
    Gyeran_Jjim: 63,
    Steak_with_Herbes: 29,
    Braised_Turtle1: 49,
    Cheesy_Tokbokki1: 26
  };

  const sendOrder = async () => {
    const total = 
    (orderData.Braised_Turtle * prices.Braised_Turtle) +
    (orderData.Cheesy_Tokbokki * prices.Cheesy_Tokbokki) +
    (orderData.Chicken_Skewers * prices.Chicken_Skewers) +
    (orderData.Fried_Quail_Eggs * prices.Fried_Quail_Eggs) +
    (orderData.Gyeran_Jjim * prices.Gyeran_Jjim) +
    (orderData.Steak_with_Herbes * prices.Steak_with_Herbes) +
    (orderData.Braised_Turtle1 * prices.Braised_Turtle1) +
    (orderData.Cheesy_Tokbokki1 * prices.Cheesy_Tokbokki1);

    orderData.totalAmount = total;

    if (!orderData.email2.trim () || !orderData.Braised_Turtle.trim () || !orderData.Braised_Turtle1.trim () || !orderData.Cheesy_Tokbokki.trim () || !orderData.Cheesy_Tokbokki1.trim () || !orderData.Chicken_Skewers.trim () || !orderData.Fried_Quail_Eggs.trim () || !orderData.Gyeran_Jjim.trim () || !orderData.Steak_with_Herbes.trim ()) {
      alert ("All fields are required, Please fill all field");
    }

    else {
      try {
        const response = await axios.post ("https://the-great-indian-restrauant.vercel.app/send-order", {
          item1: orderData.Braised_Turtle,
          item2: orderData.Braised_Turtle1,
          item3: orderData.Cheesy_Tokbokki,
          item4: orderData.Cheesy_Tokbokki1,
          item5: orderData.Chicken_Skewers,
          item6: orderData.Fried_Quail_Eggs,
          item7: orderData.Gyeran_Jjim,
          item8: orderData.Steak_with_Herbes,
          firstname: orderData.firstname,
          lastname: orderData.lastname,
          email: orderData.email2,
          phone: orderData.phone,
          address: orderData.address,
          total: orderData.totalAmount,
          status: orderData.status,
        });

        if (response.data.success) {
          alert (`Your Order Details is Sent to ${orderData.email2}`);
          navigate ('/Confirm');
        }

        else {
          alert ("failed to send order details");
        }
      }

      catch (error) {
        console.error (error);
        alert ("error in sending email");
      }
    }
  }

  const handleChange = (e) => {
    setorderData ({
      ...orderData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault ();

    if (!orderData.firstname || !orderData.lastname || !orderData.email2 || !orderData.phone || !orderData.address) {
      alert ("All fields are required, Please fill all field");
      return;
    }

    else {
    try {
      const response = await axios.post ("https://the-great-indian-restrauant.vercel.app/api/save-order", orderData);
      console.log ('order data saved: ', response.data);

      setorderData ({
        Braised_Turtle: '',
        Cheesy_Tokbokki: '',
        Chicken_Skewers: '',
        Fried_Quail_Eggs: '',
        Gyeran_Jjim: '',
        Steak_with_Herbes: '',
        Braised_Turtle1: '',
        Cheesy_Tokbokki1: '',
        firstname: '',
        lastname: '',
        email2: '',
        phone: '',
        address: '',
        totalAmount: '',
        status: '',
      });

      alert ("Thankyou for Ordering");
    }

    catch (err) {
      console.log ('error saving order data: ', err);
      alert ('error in saving data')
    }
  }
  };

  const Personal = async () => {
    if (!orderData.Braised_Turtle.trim () || !orderData.Braised_Turtle1.trim () || !orderData.Cheesy_Tokbokki.trim () || !orderData.Cheesy_Tokbokki1.trim () || !orderData.Chicken_Skewers.trim () || !orderData.Fried_Quail_Eggs.trim () || !orderData.Gyeran_Jjim.trim () || !orderData.Steak_with_Herbes.trim ()) {
      alert ("All fields are required, Please fill all field");
      return;
    }

    try {
      const response = 1;
      if (response === 1) {
        alert ("Enter Personal Details for Order Purpose");
        setPshow (true);
      }

      else {
        alert ("failed to show Personal Details");
      }
    }

    catch (error) {
      console.error (error);
      alert ("error in showing Personal details");
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
      <div className="container3">
        <h4>Today's Offer</h4>
        <h2>MENU LIST</h2>
        <p>“Pull up a chair. Take a taste. Come join us. Life is so endlessly delicious.”</p>
        <p>Ruth Reichl</p>

        {/* <input type="email" name='email2' id='email2' value={orderData.email2} placeholder='enter email where order has to sent' onChange={handleChange}/> */}
      </div>

      {!Pshow && (
      <div className="container5">
        <div className="box25">
            <div className="item1">
                <div className="img1">

                </div>

                <p>Braised Turtle</p>
                <input type="number" name='Braised_Turtle' id='counter' min={0} value={orderData.Braised_Turtle} onChange={handleChange}/>
                <p id='d'>$49</p>
            </div>

            <div className="item2">
                <div className="img2">

                </div>

                <p>Cheesy Tokbokki</p>
                <input type="number" name='Cheesy_Tokbokki' id='counter' min={0} onChange={handleChange} value={orderData.Cheesy_Tokbokki}/>
                <p id='d'>$38</p>
            </div>

            <div className="item3">
                <div className="img3">

                </div>

                <p>Chicken Skewers</p>
                <input type="number" name='Chicken_Skewers' id='counter' min={0} value={orderData.Chicken_Skewers} onChange={handleChange}/>
                <p id='d'>$26</p>
            </div>

            <div className="item4">
                <div className="img4">

                </div>

                <p>Fried Quail Eggs</p>
                <input type="number" name='Fried_Quail_Eggs' id='counter' min={0} onChange={handleChange} value={orderData.Fried_Quail_Eggs}/>
                <p id='d'>$23</p>
            </div>
        </div>

        <div className="box8">
        <div className="item5">
                <div className="img5">

                </div>

                <p>Gyeran Jjim</p>
                <input type="number" name='Gyeran_Jjim' id='counter' min={0} value={orderData.Gyeran_Jjim} onChange={handleChange}/>
                <p id='d'>$63</p>
            </div>

            <div className="item6">
                <div className="img6">

                </div>

                <p>Steak with Herbes</p>
                <input type="number" name='Steak_with_Herbes' id='counter' min={0} onChange={handleChange} value={orderData.Steak_with_Herbes}/>
                <p id='d'>$29</p>
            </div>

            <div className="item7">
                <div className="img7">

                </div>

                <p>Braised Turtle</p>
                <input type="number" name='Braised_Turtle1' id='counter' min={0} onChange={handleChange} value={orderData.Braised_Turtle1}/>
                <p id='d'>$49</p>
            </div>

            <div className="item8">
                <div className="img8">

                </div>

                <p>Baked Chicken</p>
                <input type="number" name='Cheesy_Tokbokki1' id='counter' min={0} onChange={handleChange} value={orderData.Cheesy_Tokbokki1}/>
                <p id='d'>$26</p>
            </div>
        </div>
      </div>
      )}

      {Pshow && (
        <div className="container76">
        {/* <form onSubmit={handleSubmit}> */}
        <h2>Personal Details</h2>
        <div className="flname">
        <label htmlFor="firstname">Enter First Name</label>
        <br />
        <input type="text" name='firstname' placeholder='enter first name' onChange={handleChange} value={orderData.firstname}/>
        <br />
  
        <label htmlFor="lastname"> Enter Last Name</label>
        <br />
        <input type="text" name='lastname' placeholder='enter last name' onChange={handleChange} value={orderData.lastname}/>
        <br />
        </div>

        <div className="eemail">
        <label htmlFor="email2">Enter Email</label>
        <br />
        <input type="email" name='email2' placeholder='enter email' onChange={handleChange} value={orderData.email2}/>
        <br />
        </div>

        <div className="pphone">
        <label htmlFor="phone">Enter Phone Number</label>
        <br />
        <input type="tel" name='phone' placeholder='enter phone number' onChange={handleChange} value={orderData.phone}/>
        <br />
        </div>

        <div className="rremark">
        <label htmlFor="address">Enter Address</label>
        <br />
        <textarea name="address" id="address" placeholder='enter address' onChange={handleChange} value={orderData.address}></textarea>
        <br />
        </div>

        <button onClick={sendOrder}>Order Now</button>
        {/* </form> */}
      </div>
      )}

      {!Pshow && (
        <button onClick={Personal} id='button1'>Order Now</button>
      )}
      </form>

      {/* <button onClick={() => navigate('/PreviousOrders')}>View Previous Orders</button> */}
    </div>
  )
}
