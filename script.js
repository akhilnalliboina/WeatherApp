window.addEventListener('load',()=>{
let long;
let lat;
let temperatureDescription= document.querySelector(".temperature-description");
let temperatureDegree= document.querySelector(".temperature-degree");
let timeZone= document.querySelector(".location-timezone");

if(navigator.geolocation){
navigator.geolocation.getCurrentPosition(position=>{

    long=position.coords.latitude;
    lat=position.coords.longitude;
    const proxy= "https://cors-anywhere.herokuapp.com/";

    const api= `${proxy}https://api.darksky.net/forecast/95d0ef3566527f513d8da4125f054694/${lat},${long}`;
    fetch(api).then(response=>{
        return response.json();
        })
        .then(data=>{
            
            const {temperature,summary,icon }= data.currently;
            let celsius= ( temperature-32)*(5/9);
             temperatureDegree.textContent= Math.floor(celsius);
             temperatureDescription.textContent=summary;
             timeZone.textContent=data.timezone;
             setIcons(icon, document.querySelector(".icon"));
        });
});
} 
else{ h1.textContent="No location available"};
   

function setIcons(icon,iconID)

{

    const skycons = new Skycons({"color": "white"});
    const currentIcon= icon.replace(/-/g, "_").toUpperCase() ;
    skycons.play();
    return skycons.set(iconID,Skycons[currentIcon]);

}

});