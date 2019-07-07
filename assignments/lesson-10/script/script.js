var date = new Date();
var days = new Array('Sunday','Monday','Tuesday','Wednesday','Thirsday','Friday','Saturday');
var daysb = new Array('Sun','Mon','Tue','Wed','Thi','Fri','Sat');
var month = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
document.getElementById("currentDate").innerHTML = days[date.getDay()] + ", " + date.getDate() + " " + month[date.getMonth()] + " " + date.getFullYear();

function cityId(){
    if (document.title=="Preston Town")
        return "5604473";
    if (document.title=="Soda Springs")
        return "5607916";
    if(document.title=="Fish Haven")
        return "5585010";
}

let weatherRequest = new XMLHttpRequest();
let urlCurrentApi = "http://api.openweathermap.org/data/2.5/weather?id=" + cityId() + "&units=imperial&APPID=6c9bd331a857f7a81eb1d8c376e8d309";
weatherRequest.open('Get', urlCurrentApi, true);
weatherRequest.send();

weatherRequest.onload = function(){
    let weatherData = JSON.parse(weatherRequest.responseText);

    document.getElementById("weatherDesc").innerHTML = weatherData.weather[0].description;
    document.getElementById("airTemp").innerHTML = weatherData.main.temp_max;
    document.getElementById("humidity").innerHTML = weatherData.main.humidity;
    document.getElementById("windSpeed").innerHTML = weatherData.wind.speed;

    let windChill = 35.74 + Math.pow(0.6215, weatherData.main.temp_max) - 35.75 * Math.pow(weatherData.wind.speed, 0.16) + 0.4275 * weatherData.main.temp_max * Math.pow(weatherData.wind.speed, 0.16);
    document.getElementById("windChill").innerHTML = parseFloat(windChill.toFixed(2));
}

let forecastRequest = new XMLHttpRequest();
let urlForecastApi = "http://api.openweathermap.org/data/2.5/forecast?id=" + cityId() + "&units=imperial&APPID=6c9bd331a857f7a81eb1d8c376e8d309";
forecastRequest.open('Get', urlForecastApi, true);
forecastRequest.send();

forecastRequest.onload = function(){
    let weatherData = JSON.parse(forecastRequest.responseText);
    console.log(weatherData);

    for(let i=0;i<5;i++){
        document.getElementById("forecast").rows[0].cells[i].innerHTML = daysb[(date.getDay()+i)%7];
    }
    
    var temps = new Array(5);
    var icons = new Array(5);
    var descs = new Array(5);
    let index = 0;
    for(let i=0;i<40;i++){
        if(weatherData.list[i].dt_txt.includes("18:00:00")){
            temps[index] = weatherData.list[i].main.temp;
            icons[index] = weatherData.list[i].weather[0].icon;
            descs[index] = weatherData.list[i].weather[0].description;
            index++;
        }
    }
    for(let i=0;i<5;i++){
        document.getElementById("forecast").rows[2].cells[i].innerHTML = temps[i] + " ºF";
        document.getElementById("forecast").rows[1].cells[i].innerHTML = "<img src='http://openweathermap.org/img/wn/" + icons[i] + "@2x.png' alt='" + descs[1] + "' id='weather'/>";
    }
}