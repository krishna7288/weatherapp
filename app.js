
// ----declaration for express----
const express = require("express");
const https = require("https");
const bodyParser = require("body-parser")

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req,res){

    res.sendFile(__dirname+"/index.html");

   
});

app.post("/", function(req,res){
    const query = req.body.cityName;
    const apiKey = "0f305c7785a41d13d04a27f433baa7ff"
    const exclude = "current"
    const units = "metric"
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query +"&exclude="+ exclude +"&units="+units +"&appid="+ apiKey 
    https.get(url, function(response){
        console.log(response.statusCode);
        
        response.on("data", function(data){
            const weatherDaata = JSON.parse(data)
            const temp = weatherDaata.main.temp
            const cloud = weatherDaata.weather[0].description
            const icon = weatherDaata.weather[0].icon
            const imgurl = "https://openweathermap.org/img/wn/"+icon +"@2x.png"
            res.write("<p>Today "+cloud +"</p>");
            res.write("<h1>today "+ query +" have "+temp +" decgree celsious "+"</h1>");
            res.write("<img src=" +imgurl+">");
            res.send();
        })
    })
});


// ---port 3000---
app.listen(3000, function(){
    console.log("server running on port 3000.");
});


