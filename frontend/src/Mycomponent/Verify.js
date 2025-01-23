// import React from 'react'
// import './Verify.css'
// // import 'https://smtpjs.com/v3/smtp.js';

// export default function Verify() {
//     function sendOTP () {
//         const Email = document.getElementById ('email');
//         const otpverify = document.getElementsByClassName ('otpverify')[0];

//         let otp_val = Math.floor (Math.random () * 10000);

//         let emailbody = `<h2>Your OTP is </h2>${otp_val}`;

//         Email.send({
//             SecureToken : "90ea817f-4681-4b3a-969f-fb6d3a403f8d",
//             To : Email.value,
//             From : "princekhandelwal412@gmail.com",
//             Subject : "Email Verification",
//             Body : emailbody,
//         }).then(
//             message => {
//                 if (message === "OK") {
//                     alert ("OTP sent to your email " + Email.value);

//                     otpverify.computedStyleMap.display = "flex";
//                     const otp_inp = document.getElementById ("otp_inp");
//                     const otp_btn = document.getElementById ("otp-btn");

//                     otp_btn.addEventListener ('click', () => {
//                         if (otp_inp.value == otp_val) {
//                             alert ("email address verified..........");
//                         }

//                         else {
//                             alert ("Invalid OTP");
//                         }
//                     })
//                 }
//             }
//         );
//     }
//   return (
//     <div>
//       {/* <div className="container50">
//         <div className="container52">
//             <h2>Email Verification</h2>
//             <div className="box28">
//             <label htmlFor="emailverify">Enter your Email</label>
//             <input type="email" name='emailverify' placeholder='enter your email'/>
//             <a href="/">Send Verification Code</a>
//             </div>
//         </div>
//       </div> */}
//       <div className="container50">
//       <div className="form">
//         <h2>Email Verification</h2>
//         <input type="email" id='email' placeholder='Enter email'/>
//         <div className="otpverify">
//             <input type="text" id='otp_inp' placeholder='Enter the otp sent to your email'/>
//             <button className='btn' id='otp-btn'>Verify</button>
//         </div>
//         <button className='btn' onClick={sendOTP}>Send OTP</button>
//       </div>
//       </div>
//       <script src="https://smtpjs.com/v3/smtp.js"></script>
//     </div>
//   )
// }

import React, { useState } from 'react';
import './Verify.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Book from '../Mycomponent/Book';

export default function Verify() {
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [otpSent, setOtpSent] = useState(false);
    const navigate = useNavigate ();

    const sendOTP = async () => {
        try {
            const response = await axios.post("https://great-indian-restrauant-gray.vercel.app/send-otp", { email });
            if (response.data.success) {
                alert(`OTP sent to ${email}`);
                setOtpSent(true);
            } else {
                alert('Failed to send OTP. Try again.');
            }
        } catch (error) {
            console.error(error);
            alert('Error sending OTP. Please check your email and try again.');
        }
    };

    const verifyOTP = async () => {
        try {
            const response = await axios.post("https://great-indian-restrauant-gray.vercel.app/verify-otp", { email, otp });
            if (response.data.success) {
                alert('Email verified successfully!');
                navigate ("/Menu");
                setOtpSent(false); // Reset the process
            } else {
                alert('Invalid OTP. Please try again.');
            }
        } catch (error) {
            console.error(error);
            alert('Error verifying OTP. Try again.');
        }
    };

    return (
        <div className="container50">
            <div className="form">
                <h2>Email Verification</h2>
                <input
                    type="email"
                    id="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={otpSent}
                />
                {otpSent && (
                    <div className="otpverify">
                        <input
                            type="text"
                            id="otp_inp"
                            placeholder="Enter the OTP sent to your email"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                        />
                        <button className="btn" onClick={verifyOTP}>
                            Verify
                        </button>
                    </div>
                )}
                {!otpSent && (
                    <button className="btn" onClick={sendOTP}>
                        Send OTP
                    </button>
                )}
                <p>Note : Verify Your email id and then Book your order</p>

            </div>
        </div>
    );
}
