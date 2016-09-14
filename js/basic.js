// This function upon clicking the alert button (Display in alert) will respond to the variable that corresponds to the text box, i.e. the 'submit' box using the function
//getElementById  corresponding to the id tag 'submitCity'. Then, it passes the city name, a variable called 'cty'' into the function makeURL. 
$('#submitCity').click(function () {
    var cty = document.getElementById('city').value;
    makeURL(cty, grabJSON);
});
// makeURL needs two inputs, the city name 'cty' and the grabJSON function (which is also an object, as functions can be passed as objects). 
//First, it takes 'cty' and appends it to the appropriate strings, creating a variable called apiURL, which will be later used to perform an API call (not sure about the method) to openWeatherMap.com. 
//It then grabs the JSON data using the variable aVar. 
function makeURL(cty, callback) {
    var apiURL = "http://api.openweathermap.org/data/2.5/weather?q=" + cty + "&APPID=" + "249a94a9f08ea1882283b0d60a837918";
    callback(apiURL);
}
;
//The function grabJSON takes the variable apiURL and passes it as aVar, to do something with it; in this case do the urp API call. 
//Once complete, the JSON data will be displayed in the console if successful. 
var grabJSON = function (aVar) {
    var weather = $('#weather');
    var pageheader = $("#page-header")[0];
    $.ajax({
        url: aVar,
        success: function (datas) {
            weather.append('<li> ' + datas.name + '&#39;s Forecast : ' + datas.weather[0].main + '. Temperature Outside: ' + (datas.main.temp - 273.15).toFixed(2) + '\xB0C Max: '
                + (datas.main.temp_max - 273.15).toFixed(2) + '\xB0C, Min: ' + (datas.main.temp_min - 273.15).toFixed(2) + '\xB0C' + '</li>');
            pageheader.innerHTML = "Looks like there's a bit of " + datas.weather[0].description + " out there mate!";
            $("#myImage").attr("src", "http://openweathermap.org/img/w/" + datas.weather[0].icon + ".png");
        }
    })
        .done(function (datas) {
        if (datas.length != 0) {
            // output to the console the JSON data if it the API call works
            console.log('success', datas);
        }
        else {
            console.log('Something went wrong with the API call');
        }
    })
        .fail(function (error) {
        console.log('Something went wrong again');
    });
};
