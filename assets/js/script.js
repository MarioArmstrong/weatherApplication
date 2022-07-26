//https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}
var requestURL = "https://api.openweathermap.org/data/2.5/onecall?lat=32.71&lon=117.16";

fetch(requestURL)
.then(function(response){
    return response.json();
})

.then(function(data) {
    console.log(data);
});