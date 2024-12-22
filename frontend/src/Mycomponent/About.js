
import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import './About.css'

export default function About() {
  const [visitCount, setVisitCount] = useState(0);

  useEffect(() => {
    // Get the current visit count from local storage
    let count = localStorage.getItem('visitCount');
    
    // If it's the user's first visit, initialize the count
    if (!count) {
      count = 1;
    } else {
      count = parseInt(count) + 1;
    }
    
    // Update the local storage with the new count
    localStorage.setItem('visitCount', count);
    
    // Update the state to show the visit count
    setVisitCount(count);
  }, []);
  return (
    <div>
    <div className="floating-bg"></div>
      <div className="container2">
        <div className="box1">
            <h4>Our Story</h4>
            <h2>ABOUT US</h2>
            <p className='a'>. . . . . . . . . . . . . . . . . . . . . . . . . . . . . .</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde possimus natus deleniti! Eius distinctio natus aspernatur, harum quibusdam maiores, provident optio voluptatum illum sit sunt. Laboriosam porro ab, blanditiis ad odit a neque dolore iusto, quis ipsam labore numquam iste itaque? Cumque vel sequi libero quisquam, aspernatur alias.</p>
            <br />
            <div className="a1">
            <a href="/Verify">Order Now</a>
            <a id="review" href="/Book">Review Us</a>
            </div>
        </div>

        <div className="box2">

        </div>
      </div>

      {/* <div className="container78">
        <div className="container60">
          <ReactPlayer url='https://streamable.com/km49g6'
          playing
          loop
          muted
          height='350px'
          width='500px'
          ></ReactPlayer>
        </div>
      </div> */}

      <div className="container26">
        <h4>This Page is Visited</h4>
        <h2 className='counter'>{visitCount}+</h2>
        <p>Times</p>
      </div>
    </div>
  )
}
