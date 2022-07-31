//https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}
var APIKey = "59ce11a5925422e0542cfcb16e4281b7";

var input = document.getElementById("searchBoxInput");
var cityBtn = document.getElementById("searchCityBTN");
var cityHighlight = document.querySelector(".city");
var rows = document.getElementById("row");

function fetchURLInfo(event) {
    event.preventDefault();

    var hideHello = document.getElementById("helloSection");
    
        hideHello.classList.add("d-none");

    var requestURL = "https://api.openweathermap.org/data/2.5/weather?q=" + input.value + ",us&appid=59ce11a5925422e0542cfcb16e4281b7";

    fetch(requestURL)
    .then(function(response){//.then is a promise - has to be run after the response
        return response.json();// converts to JSON object - parses data so we can use it below
    })
    
    .then(function(data) {
        var lat = data.coord.lat;
        var lon = data.coord.lon;
        console.log(data);

        var locationName = document.createElement("h3");

        locationName.textContent = data.name;
        // https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}
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
                    var createCardSection = document.createElement("div")

                    var locationTempTitle = document.createElement("h4");
                    var locationWindTitle = document.createElement("h4");
                    var locationHumidityTitle = document.createElement("h4");

                    var tempMax = document.createElement("p");
                    var wind = document.createElement("p");
                    var humidity = document.createElement("p");

                                                                            //Adding html content to DOM
                    locationTempTitle.textContent = "Temp:";//adding simple title
                    tempMax.textContent = data.daily[i].temp.max;//adding data content of temperature max
                    locationWindTitle.textContent = "Wind:";
                    wind.textContent = data.daily[i].wind_speed;
                    locationHumidityTitle.textContent = "Humidity:";
                    humidity.textContent = data.daily[i].humidity;

                                                                            //Appending chldren to parent elements
                    locationTempTitle.appendChild(tempMax);
                    locationWindTitle.appendChild(wind);
                    locationHumidityTitle.appendChild(humidity);
                    createCardSection.appendChild(locationTempTitle);
                    createCardSection.appendChild(locationWindTitle);
                    createCardSection.appendChild(locationHumidityTitle);
                    rows.appendChild(createCardSection);

                                                                            //Adding Bootstrap Classes to elements
                    tempMax.classList.add("col-sm-2");
                    wind.classList.add("col-sm-2");
                    humidity.classList.add("col-sm-2");
                    locationTempTitle.classList.add("row");
                    locationWindTitle.classList.add("row");
                    locationHumidityTitle.classList.add("row");
                }
            })


    });
    
}
                    //EVENT LISTENERS

cityBtn.addEventListener("click",fetchURLInfo);