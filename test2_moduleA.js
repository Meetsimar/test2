const { resolve } = require('dns');
var fs = require('fs');

var students = [];
var highgpa;

exports.init = function () {
    return new Promise(function (resolve, reject) {
        fs.readFile('./students.json', (err, data) => {
            if (err) {
                reject("Failure to read file students.json!");
            }
            else {
                students = JSON.parse(data);
                resolve(students);
            }
        })

    })
}

exports.getBSD = function () {
    return new Promise(function (resolve, reject) {
        if (students.length > 0) {
            resolve(students);
        }
        else {
            reject("no results returned");
        };
    })
}

exports.highGPA = function () {
    return new Promise(function (resolve, reject) {
        if (students.length > 0) {
            for (var i in students) {

                if(students[i].gpa > students[i + 1].gpa)
                {
                    highgpa = students[i];
                }
                
            }

            resolve(highgpa);
        }
        else {
            reject("no results returned");
        };
    })
}