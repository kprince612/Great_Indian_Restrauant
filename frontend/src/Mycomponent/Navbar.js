// import React, { useState } from 'react';
// import './Navbar.css'

// export default function Navbar() {
//   const [menuOpen, setMenuOpen] = useState(false);

//   const toggleMenu = () => {
//     setMenuOpen(!menuOpen);
//   };
//   return (
//     <div>
//       <>
//       <div className="container">
//         <p id='logo'>Delicious.com</p>
//         <button className="menu-toggle" onClick={toggleMenu}>
//         ☰ Menu
//         </button>
//         <ul>
//             <li><a href="/">Home</a></li>
//             <li><a href="/About">About Us</a></li>
//             <li><a href="/chef">Our Chefs</a></li>
//             <li><a href="/Menu">Our Menu</a></li>
//             <li><a href="/News">Our News</a></li>
//             <li><a href="/Book">Book Now</a></li>
//         </ul>
//       </div>
//       </>
//     </div>
//   )
// }

import React, { useState } from "react";
import "./Navbar.css";

export default function Navbar() {
  // State to manage the menu visibility
  const [menuOpen, setMenuOpen] = useState(false);

  // Function to toggle the menu state
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div>
      <div className="container">
        <div className="lo">
          <div className="logo1"></div>
          <p id="logo">
            <a href="/">GreatIndian.com</a>
          </p>
        </div>
        {/* <img src="./image140.webp" alt="logo" /> */}

        {/* Menu toggle button visible on mobile */}
        <button className="menu-toggle" onClick={toggleMenu}>
          ☰
        </button>

        {/* Conditionally apply the 'show' class if menuOpen is true */}
        <ul className={menuOpen ? "show" : ""}>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/About">About Us</a>
          </li>
          <li>
            <a href="/chef">Our Chefs</a>
          </li>
          <li>
            <a href="/Verify">Our Menu</a>
          </li>
          <li>
            <a href="/News">Our News</a>
          </li>
          <li>
            <a href="/Previous">Previous Orders</a>
          </li>
          {/* <li><a href="/Book">Review Now</a></li> */}
        </ul>
      </div>
    </div>
  );
}
