//https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}

var requestURL = "https://api.openweathermap.org/data/2.5/weather?q=San Diego,us&appid=59ce11a5925422e0542cfcb16e4281b7";
// var APIKey = "59ce11a5925422e0542cfcb16e4281b7";
var cityBtn = document.getElementById("searchCityBTN");
var searchBox = document.getElementById("searchBox");

var cityHighlight = document.querySelector(".city");

var forecastDay1 = document.querySelector(".forecastDay1");
var forecastDay2 = document.querySelector(".forecastDay2");
var forecastDay3 = document.querySelector(".forecastDay3");
var forecastDay4 = document.querySelector(".forecastDay4");
var forecastDay5 = document.querySelector(".forecastDay5");


fetch(requestURL)
.then(function(response){
    return response.json();// converts to JSON object
})

.then(function(data) {
    // console.log(data);
    for(var i=0; i< data.length; i++){
        var createTableRow = document.createElement("tr");
        var tableData = document.createElement("td")

    }
});




                    //EVENT LISTENERS

cityBtn.addEventListener("click", function(event){
    event.preventDefault();
    console.log("search button was clicked!");
});