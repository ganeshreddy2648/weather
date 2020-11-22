const express = require("express");
const https = require("https");
const bodyParser=require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({extened:true}));

app.get("/",function(req,res){
   res.sendFile(__dirname+"/index.html");
});

app.post("/",function(req,res){
  console.log(req.body.cityName);
  const query = req.body.cityName;
  const apiKey = "a3280ee7496fef32b7c5df627bb2e111";
  const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey+"&units=metric";
  https.get(url,function(respose){
    console.log(respose.statusCode);

    respose.on("data",function(data){
      const weatherData=JSON.parse(data);
      //console.log(weatherData);
      const temp = weatherData.main.temp;
      const weatherDescription = weatherData.weather[0].description;

      res.send("<h1>The temperature in "+query+" is "+ temp+"degrees celcius and the "+weatherDescription+"</h>");
    })
  })
  console.log("post request received");
})

//  res.send("server is up and running");
app.listen(/*3000*/process.env.PORT || 3000,function(){
  console.log("The server is running on port 3000");
})
