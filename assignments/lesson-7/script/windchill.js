let airTemp = parseInt(document.getElementById("airTemp").innerHTML);
let windSpeed = parseInt(document.getElementById("windSpeed").innerHTML);
let windChill = 35.74 + Math.pow(0.6215, airTemp) - 35.75 * Math.pow(windSpeed, 0.16) + 0.4275 * airTemp * Math.pow(windSpeed, 0.16);
document.getElementById("windChill").innerHTML = parseFloat(windChill.toFixed(2));