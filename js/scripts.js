$(function() {
    $("#inputCity").submit(function() {
        getWeather($("#cityInput").val());
        return false;
    });
});

function getWeather(cityInput) {

// Richiamo la stringa per prelevare i dati dal OpenWeatherMap
 let key = "3872fc775b8e4760f6b780f6f15d22fb";
 let apiCall = "https://api.openweathermap.org/data/2.5/weather?q=" + cityInput + "&lang=it&units=metric&appid=" + key;

 // Estraggo la data e gestisco lo stile del sito alla pressione del tasto ricerca
    let data = new Date();
    let mese = data.getMonth();
    let date = data.getDate();
    let year = data.getFullYear();

    if(mese == 0) mese = "Gennaio";
    if(mese == 1) mese = "Febbraio";
    if(mese == 2) mese = "Marzo";
    if(mese == 3) mese = "Aprile";
    if(mese == 4) mese = "Maggio";
    if(mese == 5) mese = "Giugno";
    if(mese == 6) mese = "Luglio";
    if(mese == 7) mese = "Agosto";
    if(mese == 8) mese = "Settembre";
    if(mese == 9) mese = "Ottobre";
    if(mese == 10) mese = "Novembre";
    if(mese == 11) mese = "Dicembre";

    currentTime = date + " " + mese + " " + year;
    document.getElementById('date').innerHTML = currentTime;

    document.getElementById("main-area").style.display = "block";
    document.getElementById("search-area").style.top = "12%";
    document.getElementById("logo").style.top = "5%";
    document.getElementById("error").style.display = "none";
 
 
 // Gestisco le casistiche di errore ricerca città
 $.ajax({
    dataType: "json",
    url: apiCall,
    data: "",
    success: function(){ console.log("Richiesta completata") },
    statusCode: {
        400: function(){
            document.getElementById("main-area").style.display = "none";
            document.getElementById("error").style.display = "flex";
            document.getElementById("404").style.display = "none";
        },

        404: function(){
            document.getElementById("main-area").style.display = "none";
            document.getElementById("error").style.display = "flex";
            document.getElementById("400").style.display = "none";
        }
    }
});
 
 // gestisco i dati prelevati dall'API OpenWeatherMap e li inserisco nell'HTML
 $.getJSON(apiCall, weatherCall);

 function weatherCall(weatherData) {
    $("#city").html( weatherData.name + " (" + weatherData.sys.country + ")");
    $("#temp").html(Math.round(weatherData.main.temp) + "<span class='unit'>°C</span>");
    $("#minTemp").html(Math.round(weatherData.main.temp_min) + "°C");
    $("#maxTemp").html(Math.round(weatherData.main.temp_max) + "°C");
    $("#percTemp").html(Math.round(weatherData.main.feels_like) + "°C");
    $("#umidity").html(weatherData.main.humidity + "%");
    $("#wind").html(weatherData.wind.speed + " m/s");

    let sunrise = new Date( weatherData.sys.sunrise * 1000 ) ;
    let sunset = new Date( weatherData.sys.sunset * 1000 );

    $("#sunrise").html( sunrise.getHours() + ":" + sunrise.getMinutes() );
    $("#sunset").html( sunset.getHours() + ":" + sunset.getMinutes() );

    let condition = weatherData.weather[0].description;
    $("#condition").html("&nbsp;" + condition[0].toUpperCase() + condition.slice(1));
    $("#condition-img").attr( "src", "./img/png/" + weatherData.weather[0].icon + ".png" );
     
 }

    
    

}