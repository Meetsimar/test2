/*************************************************************************
* BTI325– Test 2
* I declare that this assignment is my own work in accordance with Seneca Academic
Policy. No part * of this assignment has been copied manually or electronically from any
other source
* (including 3rd party web sites) or distributed to other students.
*
* Name: Meetsimar Kaur Student ID: 106510217 Date: 18/10/2022
*
* Your app’s URL (from Cyclic) : https://light-hat-pike.cyclic.app
*
*************************************************************************/

const express = require("express")
const app = express();
const fs = require('fs');
const path = require('path')

const data = require("./test2_moduleA.js")

const HTTP_PORT = process.env.PORT || 8080

app.use(express.json());

function expressoutput() {
    console.log(`Express http server listening on ${HTTP_PORT}`);
}

app.get('/', (req, res) =>{
    let resText = "<h2>Declaration (test size in heading 2)</h2><br>";
    resText += "<body>I acknowledge the College's academic integrity policy - and my own integrity - remain in effect <br> whether my work is done remotely or onsite. Any test or assignment is an act of trust between <br> me and my instructor, and especially with my classmates... even when no one is watching. I <br> declare I will not break that trust.</body>"
    resText += "<br><br>Name: ";
    resText += "<mark><b>Meetsimar Kaur</b></mark><br>"
    resText += "<br>Student Number: ";
    resText += "<mark><b>106510217</b></mark><br><br>"
    resText += `<a href = '/BSD'>Click to visit BSD Students</a><br><br>`
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
            let resText = "<h1>Highest GPA</h1>";
            resText += "<p>Student ID: " + data.studId + "<br>"
           resText += "<p>Name: " + data.name + "<br>"
           resText += "<p>Program: " + data.program + "<br>"
           resText += "<p>GPA: " + data.gpa + "</p>"

           res.send(resText);
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