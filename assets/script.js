//api variables
// var weatherApi = link;
var time = dayjs();
// document variables
var searchInput = $("#search-input");
var submitBtn = $("#submit-button");
var searchHistory = $("#search-history");
var todayInfo = $("#today-info");
var fiveDayInfo = $("#5-day-info");
//storage variables
var searchedHistory =[];

// renders the search history on load based on local storage
// renderHistory(searchedHistory);

// on click function that will handles everything 
//since the app is mainly displaying the info from the api
submitBtn.on("click",function(event){
  event.preventDefault();
  var city = searchInput.val().trim().toLowerCase();
  city = city.charAt(0).toUpperCase()+city.slice(1);
  console.log(city);
  displayInfo(city);
  // renderHisory();
  //at end clear input
});

//display the info from the api
function displayInfo(city){
  convertNameToData();
  function convertNameToData(){
    // DISCLAIMER: it seems the weather api can use by defualt names instead of coordinates but converted it because the assignemnt asked for it 
    var geoApi = "https://api.openweathermap.org/data/2.5/forecast?q="+city+",US&appid=b117dcb8d3b6343f236365cabe485360";
    console.log(geoApi);
    fetch(geoApi)
    .then(function(response){
      if (response.status === 200) {
        return response.json();
      } else {
        alert("the city you have entered is either not in the US or in the Database please choose another")
        throw new Error("Can't Connect to API/City is invalid/something wrong: geo");
      }
    })
    .then(function (data){
      console.log(data);
      })
      function addHistory(data){};
      function displayToday (data){};
      function displayNextFive(data){};
    }
  };

// function renderHisory(searchedHistory){
// };

