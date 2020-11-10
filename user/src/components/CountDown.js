import React, { useEffect, useState } from "react";
import NepaliDate from 'nepali-date-converter'

function CountDown(props) {
  const calculateTimeLeft = () => {
    let nepDate = new NepaliDate(new Date()).toJsDate()
    const difference = props.dateAD ? (+new Date(props.date) - +new Date() ): (+new NepaliDate(props.date).toJsDate() - +nepDate);
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        // hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        // minutes: Math.floor((difference / 1000 / 60) % 60),
        // seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [year] = useState(new Date().getFullYear());

  useEffect(() => {
    setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
  },[]);

  const timerComponents = [];

  Object.keys(timeLeft).forEach((interval) => {
      let Colour
    if(timeLeft[interval] > 5){
        Colour = "green"
    }
    else {
       Colour="red"
    }
    if (!timeLeft[interval]) {
      return;
    }
        {timerComponents.push(
        <span key={interval} className="cdown day">
            <span className="time-count" style={{color:Colour}}><b>{timeLeft[interval]}</b></span> 
            {/* <p>{interval}</p> */}
        </span>
        )}
  });
  return (
      <div className="countdown">
        {timerComponents.length ? timerComponents : <span style={{backgroundColor:"#000",color:"#fff",padding:"0.15rem .5rem", }}>Closed</span> }
      </div>
  );
}

export default CountDown;