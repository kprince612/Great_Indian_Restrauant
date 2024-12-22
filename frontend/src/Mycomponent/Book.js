// import React from 'react'
// import './Book.css'

// export default function Book() {
//   return (
//     <div>
//       <div className="container3">
//         <h4>Contact Us</h4>
//         <h2>GET IN TOUCH</h2>
//         </div>

//         <div className="container8">
//             <div className="box7">
//                 <div className="cont5">
//                     <div className="contain4">
//                         <div className="bo1">
//                             <div className="image4">

//                             </div>

//                             <div className="text">
//                             <h4>Our Location</h4>
//                             <p>London Eye, London, United Kingdom</p>
//                             </div>
//                         </div>
//                     </div>

//                     <div className="contain5">
//                         <div className="bo2">
//                             <div className="image5">
                                
//                             </div>

//                             <div className="text">
//                             <h4>Book a Table</h4>
//                             <p>(657) 123-456</p>
//                             </div>
//                         </div>
//                     </div>

//                     <div className="contain6">
//                         <div className="bo3">
//                             <div className="image6">
                                
//                             </div>

//                             <div className="text">
//                             <h4>E-mail Us</h4>
//                             <p>Support: info@website.com</p>
//                             </div>
//                         </div>
//                     </div>
//                 </div>

//                 <div className="cont6">
//                     <form action="/">
//                     <label htmlFor="name" id='name'>Name</label><br />
//                     <input type="text" id='input' placeholder='First Name' name='name'/>
//                     <input type="text" placeholder='Last Name' name='name'/>
//                     <br />
//                     <br />

//                     <label htmlFor="email" id='email'>E-mail</label>
//                     <br />
//                     <input type="email" name='email' placeholder='E-mail' id='email'/>
//                     <br />
//                     <br />
//                     <label htmlFor="massage" id='massage'>Comments or Massages</label>
//                     <br />
//                     <textarea name="massage" id="comment" placeholder='write your massages or comments ...........'></textarea>
//                     <br />
//                     <br />
//                     <button>Submit</button>
//                     </form>
//                 </div>
//             </div>
//         </div>
//     </div>
//   )
// }


import React, { useState } from 'react';
import axios from 'axios';
import './Book.css';

export default function Book() {
  const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [otpSent, setOtpSent] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: ''
  });

  const sendInfo = async () => {
    if (!formData.email.trim () || !formData.message.trim ()) {
      alert ("email and order details is required");
    }

    try {
      const response = await axios.post ('http://great-indian-restaurant.onrender.com/send-info', {
        email: formData.email,
        message: formData.message,
      });
      
      if (response.data.success) {
        alert (`Your Order Details is Sent to ${formData.email}`);
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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.firstName.trim () || !formData.lastName.trim () || !formData.email.trim () || !formData.message.trim ()) {
      alert ("All field are required, Please fill all fields");
    }

    else {
    try {
      const response = await axios.post('http://localhost:5000/api/contact', formData);
      console.log('Form data saved:', response.data);

     setFormData({
        firstName: '',
        lastName: '',
        email: '',
        message: ''
      });

      alert ("Thankyou for filling form");
    }
     catch (err) {
      console.error('Error saving form data:', err);
    }
  }
  };

  return (
    <div>
      <div className="container3">
        <h4>Contact Us</h4>
        <h2>GET IN TOUCH</h2>
        <p>"Cooked with Love, Served with Joy."</p>
      </div>

      <div className="container8">
        <div className="box7">
        <div className="cont5">
                     <div className="contain4">
                         <div className="bo1">
                             <div className="image4">

                             </div>

                             <div className="text">
                            <h4>Our Location</h4>
                             <p>London Eye, London, United Kingdom</p>
                             </div>
                         </div>
                     </div>

                     <div className="contain5">
                         <div className="bo2">
                             <div className="image5">
                                
                             </div>

                             <div className="text">
                             <h4>Book a Table</h4>
                             <p>(657) 123-456</p>
                            </div>
                         </div>
                     </div>

                     <div className="contain6">
                         <div className="bo3">
                             <div className="image6">
                                
                             </div>

                            <div className="text">
                             <h4>E-mail Us</h4>
                             <p>Support: info@website.com</p>
                             </div>
                         </div>
                     </div>
                 </div>
          <div className="cont6">
            <form onSubmit={handleSubmit}>
              <div className="flname1">
              <label htmlFor="firstName">Name</label><br />
              <input type="text" name="firstName" id='input' placeholder='First Name' value={formData.firstName} onChange={handleChange} />
              <input type="text" name="lastName" id='input1' placeholder='Last Name' value={formData.lastName} onChange={handleChange} /><br /><br />
              </div>

              <div className="eemail1">
              <label htmlFor="email">E-mail</label><br />
              <input type="email" name="email" id='email1' placeholder='E-mail' value={formData.email} onChange={handleChange} /><br /><br />
              </div>

              <div className="mmessage1">
              <label htmlFor="message">Enter Your message</label><br />
              <textarea name="message" id='comment' placeholder='enter your message.......'
               value={formData.message} onChange={handleChange}></textarea><br /><br />
               </div>

              <button onClick={sendInfo} type="submit">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
