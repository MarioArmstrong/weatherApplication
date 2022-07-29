//https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}
var APIKey = "59ce11a5925422e0542cfcb16e4281b7";

var input = document.getElementById("searchBoxInput");
var cityBtn = document.getElementById("searchCityBTN");
var cityHighlight = document.getElementById("city");
var rows = document.getElementById("row");

// const Fahrenheit = ((kelvin - 273.15) * 1.8) + 32

function fetchURLInfo(event) {
    event.preventDefault();
    var requestURL = "https://api.openweathermap.org/data/2.5/weather?q=" + input.value + ",us&appid=59ce11a5925422e0542cfcb16e4281b7";

    fetch(requestURL)
    .then(function(response){//.then is a promise - has to be run after the response
        return response.json();// converts to JSON object - parses data so we can use it below
    })
    
    .then(function(data) {
        var lat = data.coord.lat;
        var lon = data.coord.lon;
        console.log(data);
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

                    var createCardSection = document.createElement("div")
                    var createCardHeading = document.createElement("h3");            
                    var cardContent = document.createElement("p");
            
                    cardContent.textContent = data.daily[i].temp.max;
                    // createCardHeading.textContent = data.name;

                    cardContent.classList.add("card-text");
                    createCardHeading.classList.add("card-title");
                    createCardSection.classList.add("card-body");


                    createCardHeading.appendChild(cardContent);
                    createCardSection.appendChild(createCardHeading);
                    rows.appendChild(createCardSection);            


                }
            })


    });
    
}
                    //EVENT LISTENERS

cityBtn.addEventListener("click",fetchURLInfo);