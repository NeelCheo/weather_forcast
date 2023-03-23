var time = dayjs();
// document variables
var searchInput = $("#search-input");
var submitBtn = $("#submit-button");
var searchHistory = $("#search-history");
var historyBtn = $("*#historyBtn");
//data storage variables
var searchedHistory = [];
if (localStorage.getItem("searchedHistory") != null) {
  searchedHistory = JSON.parse(localStorage.getItem("searchedHistory"));
  displayInfo(searchedHistory[0]);
} else{
  displayInfo("Fairfield");
}
// renders the search history on load based on local storage
renderHistory();
function renderHistory() {
  if (localStorage.getItem("searchedHistory") === null) {
    return;
  } else {
    searchHistory.html("");
    for (let i = 0; i < searchedHistory.length; i++) {
      let li = $("<button>");
      li.attr("type", "button");
      li.attr("class", "btn btn-primary btn-lg btn-block");
      li.attr("id", "historyBtn");
      li.text(searchedHistory[i]);
      searchHistory.append(li);
    }
  }
}
searchHistory.on("click", "#historyBtn", function (event) {
  console.log("yay");
  displayInfo(this.textContent);
});

//since the app is mainly displaying the info from the api
submitBtn.on("click", function (event) {
  event.preventDefault();
  var city = searchInput.val().trim().toLowerCase();
  city = city.charAt(0).toUpperCase() + city.slice(1);
  if (city == "") {
    return;
  } else if (searchedHistory.includes(city)) {
    //swaps history instead of spamming
    var tmp = searchedHistory[0];
    var prevCity = searchedHistory.indexOf(city);
    delete searchHistory[prevCity];
    searchedHistory[0] = searchedHistory[prevCity];
    searchedHistory[prevCity] = tmp;
    localStorage.setItem("searchedHistory", JSON.stringify(searchedHistory));
    displayInfo(city);
    renderHistory();
  } else {
    displayInfo(city);
    fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + ",US&appid=b117dcb8d3b6343f236365cabe485360&units=imperial").then(function (response) {
      if (response.status === 200) {
        addHistory(city);
        renderHistory();
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
    });
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
          alert("the city you have entered is either not in the US or in the Database please choose another");
          throw new Error("Can't Connect to API/City is invalid/something wrong: geo");
        }
      })
      .then(function (data) {
        if (api == weatherApi) {
          displayWeather(data);
          function displayWeather(data) {
            date.textContent = data.name + " (" + dayjs().format("DD/MM/YYYY") + ")";
            temp.textContent = "Temp: " + data.main.temp + " F";
            wind.textContent = "Wind: " + data.wind.speed + " MPH";
            humidity.textContent = "Humidity: " + data.main.humidity + " %";
            icon.src = "http://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png";
          }
        } else if (api == forecastApi) {
          displayForecast(data);
          function displayForecast(data) {
            var x = 3;
            var y = 0;
            var list = data.list;
            for (let i = 0; i < list.length; i++) {
              if (i == x) {
                date5[y].textContent = dayjs(list[i].dt_txt.split(" ", 1)).format("DD/MM/YYYY");
                icon5[y].src = "http://openweathermap.org/img/wn/" + list[i].weather[0].icon + "@2x.png";
                temp5[y].textContent = "Temp: " + list[i].main.temp + " F";
                wind5[y].textContent = "Wind: " + list[i].wind.speed + " MPH";
                humidity5[y].textContent = "Humidity: " + list[i].main.humidity + " %";
                y++;
                x = x + 8;
              }}
          }
        }
      });
  }
}
