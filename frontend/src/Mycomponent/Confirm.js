import React, { useRef } from 'react'
import './Confirm.css'

export default function Confirm() {
  const audioRef = useRef (null)
  let now;
  now = new Date ();

  console.log (now);

  let dt;
  dt = new Date (1000);

  console.log (dt);

  let newdate = new Date ("2029-09-30");

  console.log (newdate);

  function displaytime () {
    let ti = new Date ();
    console.log (ti);
    document.getElementById ('ti').innerHTML = ti;
  }

  setInterval (displaytime, 1000)
  
  return (
    <div>
      <div className="container74">
          <span id='ti'></span>
        </div>
        
        <div className="container65">
        <h2>Thankyou For Ordering In GIR</h2>
        <h4>Your Order has Been Recored and Your Order Details has been Sent on your Email</h4>
        <p>Please review us for better services</p>
        <p>Visit again</p>
        <a href="/">Back to Home</a>
        </div>

        <div className="music-player">
          <audio ref={audioRef} src="./ding-101492.mp3" autoPlay></audio>
        </div>
    </div>
  )
}
