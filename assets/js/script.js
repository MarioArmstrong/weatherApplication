//https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}
var APIKey = "59ce11a5925422e0542cfcb16e4281b7";

var input = document.getElementById("searchBoxInput");
var cityBtn = document.getElementById("searchCityBTN");
var cityHighlight = document.querySelector(".city");

var dayCards = document.getElementById("dayCards");


                                                                    //Creating Today's Date
var currentDate = new Date();
var day = currentDate.getDate();
var month = currentDate.getMonth() + 1;
var year = currentDate.getFullYear();


function fetchURLInfo(event) {
    event.preventDefault(); 

    var hideHello = document.getElementById("helloSection");
    var hideFiveDayForecast = document.getElementById("fiveDayForecast");


                                                                    //Hiding and unhidding sections
        hideHello.classList.add("d-none");//Hides the Hello Section
        hideFiveDayForecast.classList.remove("d-none");//Unhides the 5-day forecast section


                                                                    //setItems and getItems from localStorage
    let searchedCitiesArray = localStorage.getItem("searched cities");
        // ? JSON.parse(localStorage.setItem("searched cities")) 
        // : []
  

    var requestURL = "https://api.openweathermap.org/data/2.5/weather?q=" + input.value + ",us&units=imperial&appid=59ce11a5925422e0542cfcb16e4281b7";

    fetch(requestURL)
    .then(function(response){//.then is a promise - has to be run after the response
        return response.json();// converts to JSON object - parses data so we can use it below
    })
    
    .then(function(data) {
        var lat = data.coord.lat;
        var lon = data.coord.lon;
        console.log(data);

                                                                        //Creating variables
        var dayHighlight = document.getElementById("cityHighlightArea");
        var name = data.name;
        // console.log(data.name);


                                                                        //Create elements for DOM HTML

        var createHighlightCard = document.createElement("div");

        var locationName = document.createElement("h2");

        var locTempTitle = document.createElement("h3");
        var locWindTitle = document.createElement("h3");
        var locHumTitle = document.createElement("h3");

        var locationTemp = document.createElement("p");
        var locationWind = document.createElement("p");
        var locationHumidity =document.createElement("p");
        var todaysDate = document.createElement("p");

                                                                        //Creating html content
        locationName.textContent = name;
        todaysDate.textContent = month + "/" + day + "/" + year;
        locTempTitle.textContent = "Temp:";
        locationTemp.textContent = data.main.temp + " \u00B0F";
        locWindTitle.textContent ="Wind:";
        locationWind.textContent = data.wind.speed + " MPH";
        locHumTitle.textContent = "Humidity:";
        locationHumidity.textContent = data.main.humidity + " %";

                                                                        //Appending children to parents
        locTempTitle.appendChild(locationTemp);
        locWindTitle.appendChild(locationWind);
        locHumTitle.appendChild(locationHumidity);


        locationName.appendChild(todaysDate);
        locationName.appendChild(locTempTitle);
        locationName.appendChild(locWindTitle);
        locationName.appendChild(locHumTitle);
        

        createHighlightCard.appendChild(locationName);

        dayHighlight.appendChild(createHighlightCard);

                                                                        //Adding Bootstrap classes to elements
        locationTemp.classList.add("col");
        locationWind.classList.add("col");
        locationHumidity.classList.add("col");


        locTempTitle.classList.add("row");
        locWindTitle.classList.add("row");
        locHumTitle.classList.add("row");
        // todaysDate.classList.add("row");


        locationName.classList.add("row");
        locationName.classList.add("justify-content-center");


        createHighlightCard.classList.add("bg-warning");
        createHighlightCard.classList.add("bg-gradient");

        // https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key} -- USE THIS FOR THE NEXT API CALL
        // ******onecall gets you all the temp data you need******
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------

        var urlData = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=" + APIKey;
            fetch(urlData)
            .then(function(response){
                return response.json();
            })

            .then(function(data){
                console.log(data);
                for(var i=0; i< 5; i++){
                                                                            //Creating variables
                    var createCardSection = document.createElement("div")//creating container div for Bootstrap styling

                    var locationDayHeading = document.createElement("h3");
                                                        
                    var locationTempTitle = document.createElement("h4");//creating temperature title
                    var locationWindTitle = document.createElement("h4");//creating wind title
                    var locationHumidityTitle = document.createElement("h4");//creating humidity title

                    var tempMax = document.createElement("p");//creating p tag for temperature value
                    var wind = document.createElement("p");// creating p tag for wind speed value
                    var humidity = document.createElement("p");//creating p tag for humidity value


                    var symbol =document.createElement("i");

                                                                            //Adding html content to DOM

                    locationDayHeading.textContent = "Day " + [i + 1];
                    symbol.textContent = data.daily[i].weather[0].icon;
                    locationTempTitle.textContent = "Temp:";//adding simple title
                    tempMax.textContent = data.daily[i].temp.max + " \u00B0F";//adding data content of temperature max
                    locationWindTitle.textContent = "Wind:";//adding wind simple title
                    wind.textContent = data.daily[i].wind_speed + " MPH";//adding data content of wind value
                    locationHumidityTitle.textContent = "Humidity:";//adding humidity simple title
                    humidity.textContent = data.daily[i].humidity + " %";//adding data content of humidity value



                                                                            //Appending children to parent elements
                    

                    locationTempTitle.appendChild(tempMax);
                    locationWindTitle.appendChild(wind);
                    locationHumidityTitle.appendChild(humidity);


                    createCardSection.appendChild(locationTempTitle);
                    createCardSection.appendChild(locationWindTitle);
                    createCardSection.appendChild(locationHumidityTitle);

                    
                    locationDayHeading.appendChild(createCardSection);
                    dayCards.appendChild(locationDayHeading);

                                                                            //Adding Bootstrap Classes to elements
                    
                    tempMax.classList.add("card-text");
                    wind.classList.add("card-text");
                    humidity.classList.add("card-text");


                    locationTempTitle.classList.add("card-subtitle");
                    locationWindTitle.classList.add("card-subtitle");
                    locationHumidityTitle.classList.add("card-subtitle");


                    locationDayHeading.classList.add("card");
                    locationDayHeading.classList.add("col-sm-2");
                    locationDayHeading.classList.add("bg-dark");                    
                    locationDayHeading.classList.add("bg-gradient");
                    locationDayHeading.classList.add("text-light");
                    locationDayHeading.classList.add("card-title");
                    locationDayHeading.classList.add("align-items-center");

                }//END Forloop
            })//END second .then(function(data))
    });//END first .then(function(data))

}//END fetchURLInfo(event)


                    //EVENT LISTENERS

cityBtn.addEventListener("click", fetchURLInfo);
