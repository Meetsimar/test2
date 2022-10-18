const express = require("express")
const app = express();
const fs = require('fs');
const path = require("path")

const data = require("./test2_moduleA.js")

const HTTP_PORT = process.env.PORT || 8080

app.use(express.json());

function expressoutput() {
    console.log(`Express http server listening on ${HTTP_PORT}`);
}

app.get('/', (req, res) =>{
    let resText = "<h2>Declaration</h2><br><br>";
    resText += "<body>I declare that this test is my own work in accordance with Seneca Academic Policy. No part of this test has <br> been copied manually or electronically from any other source.</body>"
    resText += "<br><br>Name: ";
    resText += "<mark><b>Meetsimar Kaur</b></mark><br>"
    resText += "<br>Student Number: ";
    resText += "<mark><b>106510217</b></mark><br><br>"
    resText += `<a href = '/CPA'>Click to visit CPA Students</a>`
    resText += `<a href = '/highGPA'>Click to see who has the highest GPA</a>`
    res.send(resText);
})

app.get('/BSD', function (req, res) {
    data.getBSD().
        then(data => {
            res.json(data);
        }).catch(err => {
            console.log(err);
        })
})

app.get('/highGPA', function(req, res){
    data.highGPA().
        then(data => {
            res.json(data);
        }).catch(err => {
            console.log(err);
        })
})

app.use(function (req, res) {
    res.status(404).send("Error 404: page not found");
})

data.init().then(() => { app.listen(HTTP_PORT, expressoutput()) }).catch(() => {
    console.log("unable to start server");
})