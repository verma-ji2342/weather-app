const express = require("express");
const bodyParse = require("body-parser");
const https = require("https");


const app = express();
app.use(bodyParse.urlencoded({extended: true}));

app.get("/", function(request, response){
    const url = "https://api.openweathermap.org/data/2.5/weather?&q=punjab,india&appid=3d1d18f50a5f8c6a947f1b4786e9a5f0&units=metric";
    https.get(url, function(res){
        console.log(res.statusCode);

        res.on("data", function(data){
            const weather = JSON.parse(data);
            // console.log(weather);
            const t = weather.main.temp;
            const p = weather.main.pressure;
            const h = weather.main.humidity;
            const s = weather.wind.speed;
            const c = weather.name;
            // console.log(t+" "+p+" "+h+" "+s+" "+c);
            const icon = weather.weather[0].icon;
            const imageurl = "https://openweathermap.org/img/wn/"+icon+"@2x.png";
            response.write("<p>The weather is currently "+ weather.weather[0].description + "</p>");
            response.write("<h1>The temperature in Punjab is"+ t + "degree Celcius.</h1>");
            response.write("<img src=" + imageurl + ">");
        }); 
    });


    // response.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res){
    var city = req.body.city;
    var country = req.body.country;
});

app.listen(4000, function(){
    console.log("Server is running on port 4000");
});