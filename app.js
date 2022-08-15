require('dotenv').config()
const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const cache = require('./routeCache')


const app = express();

app.use(bodyParser.urlencoded({extended : true}));

app.get("/", cache(300), function(req, res){

   res.sendFile(__dirname + "/index.html")
});

app.post("/", function(req,res){

 
    const query = req.body.newsName;


const url = "https://gnews.io/api/v4/top-headlines?q="+ query + "&max=5&lang=en&token="+ process.env.API_KEY +"";
https.get(url,function(response){
    console.log(response.statusCode);

    response.on("data",function(data){
        const newsData = JSON.parse(data)
        const newsTitle = newsData.articles[0].title
        const newsDescription = newsData.articles[0].description
        const newsContent = newsData.articles[0].content
        
        const newsImage = newsData.articles[0].image
        const newsUrl = newsData.articles[0].url


        res.write("<h1>"+newsTitle+"</h1>");
        res.write("<p>"+newsDescription+"</p>");
        res.write("<p>"+newsContent+"</p>");
        res.write("<img src="+newsImage+">");
        res.write("<p>"+newsUrl+"</p>");
        
        
        
        res.send();

    })
})

   

})


/* */


app.listen(3000, function(){
    console.log("server is running on port 3000.");
})