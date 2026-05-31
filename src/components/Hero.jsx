import React, { useState } from "react";
function Hero(){
    const [move, setMove] = useState(false);
    return(
        <section className="hero" onClick={() => setMove(!move)}>
        <div className={`hero_content ${move ? "circleMove" : ""}`}>
            <h1>Report Waste. Track Cleanliness. Build a Cleaner Campus.</h1>
            <p>CleanTrack helps students report waste and pollution issues quickly,
        so the campus stays clean and well managed.</p>
            <button>Report Issue</button>
        </div>
        </section>
    )
}
export default Hero;