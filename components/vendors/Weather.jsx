import React, { useState, useEffect } from "react";

const api = {
  key: "",
  base: "https://api.openweathermap.org/data/2.5/",
};

const Weather = () => {
  const [weather, setWeather] = useState({});
  const [timeOfDay, setTimeOfDay] = useState('');

   useEffect(() => {
     fetch(`${api.base}weather?q=Springfield&units=imperial&APPID=${api.key}`)
       .then((res) => res.json())
       .then((result) => {
         setWeather(result);
       });
   }, []);

   useEffect(() => {
     if (typeof weather.main != "undefined") {
       let weatherTimpstamp = weather.sys.sunset;
       let currentTime = Math.floor(Date.now() / 1000);
       let sampletime = 1635251500;

       const date = new Date(weatherTimpstamp * 1000);

       console.log("============weather========================");
       console.log(weather);
       console.log('====================================');


       if (
         currentTime > weather.sys.sunrise &&
         currentTime < weather.sys.sunset
       ) {
         console.log("====================================");
         console.log("show the sun");
         console.log("====================================");

         setTimeOfDay('daytime')
       } else {
         console.log("====================================");
         console.log("show the moon");
         console.log("====================================");
         setTimeOfDay('nighttime')
       }
     }
   });

   
     return (
       <React.Fragment>
         {typeof weather.main != "undefined" ? (
           <React.Fragment>
             <div className="weather-box">
               {/* <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} 
               alt="" /> */}
               <img
                 src={`/images/weather/2x/${weather.weather[0].icon}.png`}
                 alt=""
               />
               {/* <div className="temp">{Math.round(weather.main.temp)}° f</div> */}
               <div className={`temp ${timeOfDay == 'daytime' ? 'day-time' : 'night-time' }`}>{Math.round(weather.main.temp)}° f</div>
             </div>
           </React.Fragment>
         ) : (
           ""
         )}
       </React.Fragment>
     );

   }



export default Weather;
