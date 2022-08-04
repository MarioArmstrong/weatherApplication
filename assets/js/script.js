//https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}
var APIKey = "59ce11a5925422e0542cfcb16e4281b7";

var input = document.getElementById("searchBoxInput");
var cityBtn = document.getElementById("searchCityBTN");
var cityHighlight = document.querySelector(".city");

var dayCards = document.getElementById("dayCards");

function fetchURLInfo(event) {
    event.preventDefault(); 

    var hideHello = document.getElementById("helloSection");
    
        hideHello.classList.add("d-none");

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

                                                                        //Creating html content
        locationName.textContent = name;
        locTempTitle.textContent = "Temp:";
        locationTemp.textContent = data.main.temp;
        locWindTitle.textContent ="Wind:";
        locationWind.textContent = data.wind.speed;
        locHumTitle.textContent = "Humidity:";
        locationHumidity.textContent = data.main.humidity;

                                                                        //Appending children to parents
        locTempTitle.appendChild(locationTemp);
        locWindTitle.appendChild(locationWind);
        locHumTitle.appendChild(locationHumidity);

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
        locationName.classList.add("row");

        locTempTitle.classList.add("justify-content-center");
        locWindTitle.classList.add("justify-content-center");
        locHumTitle.classList.add("justify-content-center");
        locationName.classList.add("justify-content-center");


        createHighlightCard.classList.add("container");  
        createHighlightCard.classList.add("border");
        createHighlightCard.classList.add("border-warning");


        // https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key} -- USE THIS FOR THE NEXT API CALL
        // ******onecall gets you all the temp data you need******


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
                                                        
                    var locationTempTitle = document.createElement("h4");//creating temperature title
                    var locationWindTitle = document.createElement("h4");//creating wind title
                    var locationHumidityTitle = document.createElement("h4");//creating humidity title

                    var tempMax = document.createElement("p");//creating p tag for temperature value
                    var wind = document.createElement("p");// creating p tag for wind speed value
                    var humidity = document.createElement("p");//creating p tag for humidity value

                                                                            //Adding html content to DOM

                    locationTempTitle.textContent = "Temp:";//adding simple title
                    tempMax.textContent = data.daily[i].temp.max;//adding data content of temperature max
                    locationWindTitle.textContent = "Wind:";//adding wind simple title
                    wind.textContent = data.daily[i].wind_speed;//adding data content of wind value
                    locationHumidityTitle.textContent = "Humidity:";//adding humidity simple title
                    humidity.textContent = data.daily[i].humidity;//adding data content of humidity value


                                                                            //Appending children to parent elements
                    locationTempTitle.appendChild(tempMax);
                    locationWindTitle.appendChild(wind);
                    locationHumidityTitle.appendChild(humidity);

                    createCardSection.appendChild(locationTempTitle);
                    createCardSection.appendChild(locationWindTitle);
                    createCardSection.appendChild(locationHumidityTitle);

                    dayCards.appendChild(createCardSection);

                                                                            //Adding Bootstrap Classes to elements
                    tempMax.classList.add("card-text");
                    wind.classList.add("card-text");
                    humidity.classList.add("card-text");

                    locationTempTitle.classList.add("card-title");
                    locationWindTitle.classList.add("card-title");
                    locationHumidityTitle.classList.add("card-title");

                    createCardSection.classList.add("card");
                    createCardSection.classList.add("col-sm-2");
                }
            })
    });
    
}
                    //EVENT LISTENERS

cityBtn.addEventListener("click",fetchURLInfo);