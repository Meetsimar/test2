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
            var temp;
            for (var i = 0; i < students.length; i++) {
                for (var j = i + 1; j < students.length; j++) { // using bubble sort algorithm
                    if (students[i].gpa > students[j].gpa) {
                        temp = students[i];
                        students[i] = students[j];
                        students[j] = temp;
                    }
                }
            }

             
            //  If more than one
            //  student has the same highest GPA, this function returns the first student with the
            //  highest GPA. 
            // function defined below


            for (var i in students) {
                if (students[students.length - 1] != students[i]) {
                    if (students[students.length - 1].gpa == students[i].gpa) {
                        if (students[students.length - 1].studId > students[i].studId)
                        {
                            highgpa = students[i];
                            resolve(students[i]);
                            break;
                        }
                    }
                }
            }

            resolve(students[students.length - 1]);
        }

        else {
            reject("no results returned");
        }
    })
}