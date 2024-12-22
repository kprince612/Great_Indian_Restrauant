import React from 'react'
import './Chef.css'

export default function chef() {
  let now;
  now = new Date ();

  console.log (now);

  let dt;
  dt = new Date (1000);

  console.log (dt);

  let newdate = new Date ("2029-09-30");

  console.log (newdate);

  function displaytime () {
    let ti1 = new Date ();
    console.log (ti1);
    document.getElementById ('ti1').innerHTML = ti1;
  }

  setInterval (displaytime, 1000)
  return (
    <div>
      <div className="container74">
          <span id='ti1'></span>
        </div>
        
      <div className="container3">
        <h4>Experienced Team</h4>
        <h2>MEET OUR CHEFS</h2>
        <span>“Part of the secret to success in life is to eat what you like and</span>
        <span>let the food fight it out inside.”</span>
        <span>Mark Twain</span>
      </div>

      <div className="container4">
        <div className="box4">
            <div className="image1">

            </div>
            <p>Gordon Johnson</p>

        </div>

        <div className="box5">
            <div className="image2">
                
            </div>

            <p>Dwaine Andrews</p>
        </div>

        <div className="box6">
            <div className="image3">
                
            </div>

            <p>Anna Brown</p>
        </div>
      </div>
    </div>
  )
}
