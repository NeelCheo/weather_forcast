var time = dayjs();
// document variables
var searchInput = $("#search-input");
var submitBtn = $("#submit-button");
var searchHistory = $("#search-history");
var todayInfo = $("#today-info");
var fiveDayInfo = $("#5-day-info");
//data storage variables
var searchedHistory = [];
var temp5Day = [];
var wind5Day = [];
var humididity5Day = [];
var icon5Day = [];
var cityName = ''
var todayTemp = ''
var todayWind = ''
var todayHumididity = ''
var todayIcon = '';
if (localStorage.getItem("searchedHistory") != null) {
  searchedHistory = JSON.parse(localStorage.getItem("searchedHistory"));
}
// renders the search history on load based on local storage
// renderHistory(searchedHistory); !!!!!!!!!!!!!!!!!

// on click function that will handles everything 
//since the app is mainly displaying the info from the api
submitBtn.on("click", function (event) {
  event.preventDefault();
  var city = searchInput.val().trim().toLowerCase();
  city = city.charAt(0).toUpperCase() + city.slice(1);
  if (city == "") {
    return
  } else if(searchedHistory.includes(city)){ //swaps history instead of spamming 
    var tmp = searchedHistory[0];
    var prevCity = searchedHistory.indexOf(city);
    delete searchHistory[prevCity];
    searchedHistory[0]=searchedHistory[prevCity];
    searchedHistory[prevCity]=tmp;
    localStorage.setItem("searchedHistory", JSON.stringify(searchedHistory));
    displayInfo(city);
  }else{
    displayInfo(city);
    fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + ",US&appid=b117dcb8d3b6343f236365cabe485360&units=imperial")
      .then(function (response) {
        if (response.status === 200) {
          addHistory(city);
          function addHistory(city) {
            if (localStorage.getItem("searchedHistory") === null) {
              searchedHistory.push(city);
              localStorage.setItem("searchedHistory", JSON.stringify(searchedHistory));
            } else {
              searchedHistory = JSON.parse(localStorage.getItem("searchedHistory"));
              searchedHistory.unshift(city);
              localStorage.setItem("searchedHistory", JSON.stringify(searchedHistory));
            }
          }
        }
      })
    // renderHisory(); !!!!!!!!!!!!!!!!!
    // function renderHisory(searchedHistory){}; !!!!!!!!!!!!!!!!!
    //at end clear input !!!!!!!!!!!!!!!!
  }
});

//display the info from the api to the screen
function displayInfo(city) {
  // DISCLAIMER: it seems the weatherAPI doesnt need the coordinates and can use city name isntead 
  var forecastApi = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + ",US&appid=b117dcb8d3b6343f236365cabe485360&units=imperial";
  var weatherApi = "https://api.openweathermap.org/data/2.5/weather?q=" + city + ",US&appid=b117dcb8d3b6343f236365cabe485360&units=imperial";
  dsiaplayApiData(forecastApi);
  dsiaplayApiData(weatherApi);
  function dsiaplayApiData(api) {
    fetch(api)
      .then(function (response) {
        if (response.status === 200) {
          return response.json();
        } else {
          alert("the city you have entered is either not in the US or in the Database please choose another")
          throw new Error("Can't Connect to API/City is invalid/something wrong: geo");
        }
      })
      .then(function (data) {
        if (api == weatherApi) {
          displayWeather(data);
          function displayWeather(data) {
            cityName = data.name;
            todayTemp = data.main.temp;
            todayWind = data.wind.speed;
            todayHumididity = data.main.humidity;
            todayIcon = data.weather[0].icon;
          }
        } else if (api == forecastApi) {
          var x = 3
          var list = data.list;
          temp5Day = [];
          wind5Day = [];
          humididity5Day = [];
          icon5Day = [];
          for (i = 0; i < list.length; i++) {
            if (i == x) {
              temp5Day.push(list[i].main.temp)
              wind5Day.push(list[i].wind.speed)
              humididity5Day.push(list[i].main.humidity)
              icon5Day.push(list[i].weather[0].icon)
              x = x + 8;
            }
          }
        }
      })
  };

};



