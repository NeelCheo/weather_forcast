//api variables
// var geoApi = link; //also make sure it matches US country 
// var weatherApi = link;
time = dayjs();
// document variables
var searchInput = $("#search-input");
var submitBtn = $("#submit-button");
var searchHistory = $("#search-history");
var todayInfo = $("#today-info");
var fiveDayInfo = $("#5-day-info");
//storage variables
searchedHistory =[];

// renders the search history on load based on local storage
renderHistory(searchedHistory);

// on click function that will handles everything 
//since the app is mainly displaying the info from the api
submitBtn.on(click,function(event){
  event.preventDefault(); 
  displayInfo();
  renderHisory();
  //at end clear input
});

//display the info from the api
function displayInfo(){
  function convertNameToGeo(geoApi, searchInput){
    fetch()
    .then(function(response){})
    .then(function (data){
      function addHistory(data){};
      function displayToday (data){};
      function displayNextFive(data){};
    })
  }
};

function renderHisory(searchedHistory){
};

