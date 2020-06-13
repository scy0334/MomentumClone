const COORDS = 'coords';
const API_KEY = "ca04ec66892b2bae94f5c0b778ff3a6d";
const weather = document.querySelector(".js-weather")

function saveCoords(coordsObj) {
     localStorage.setItem(COORDS, JSON.stringify(coordsObj))
}

function getWeather(lat, lon) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`)
    .then(function(response){
        return response.json()
    }).then(function(json){
        const temperature = json.main.temp
        const place = json.name
        weather.innerText = `${temperature} @ ${place}`
        weather.classList.add("js-weather")
    })
}

function handleGeoSuccess(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
         latitude,
         longitude
     };
    saveCoords(coordsObj);
    getWeather(latitude, longitude);
}
 
function handleGeoError() {
    console.log("Can't access Geolocation")
 }
 
function askForCoords() {
     navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError)
}
 
function loadCoords() {
    const loadedCoords = localStorage.getItem(COORDS);
    if(loadedCoords === null) {
        askForCoords();
    } else {
        const parsedCoords = JSON.parse(loadedCoords);
        getWeather(parsedCoords.latitude, parsedCoords.longitude);
    }
}
 
function init() {
    loadCoords();
}

init();