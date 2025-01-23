import React from 'react'
import { useState, useRef } from 'react';
import './Home.css'

export default function Home() {
  const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(true);

    // const togglePlay = () => {
    //     if (isPlaying) {
    //         audioRef.current.pause();
    //     } else {
    //         audioRef.current.play();
    //     }
    //     setIsPlaying(!isPlaying);
    // };
  return (
    <div>
      <div className="container1">
        <div className="box15">

        </div>

        <div className="box20">
            <h2>Exquisite &</h2>
            <h4>Hedonistic Food</h4>
            <p id='a'>. . . . . . . . . . . . . . . .</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat facere iusto sapiente. Accusamus veniam blanditiis magni optio alias officia quibusdam.</p>
            <br />
            <a href="/Verify">Order Now</a>
        </div>
      </div>
      <div className="music-player">
                {/* <button onClick={togglePlay}>
                    {isPlaying ? 'Pause Music' : 'Play Music'}
                </button> */}
                <audio ref={audioRef} src="./background-music.mp3" loop autoPlay/>
            </div>
    </div>
  )
}
