//PEOPLE.JS - For JavaScript Functions that are directly related to people.

var firstName = document.getElementById('input-first-name');
var lastName = document.getElementById('input-last-name');
var empPos = document.getElementById('input-emp-position');
var email = document.getElementById('input-email');
var phone = document.getElementById('input-phone');


function loadPeople() {
    $.getJSON('mockdata/mock_people.json', function (data) {
        $.each(data, function (i, field) {
            $("#tab-2 ul").append("<li>" + data[i].id + ": " + data[i].first_name + " " + data[i].last_name + "</li> ");
        });
    });
    console.log('people loaded.')
};

// $('#add-person-btn').click(function(){
//     console.log('');
    

// }); 


$('#add-person-btn').click(function(){
    $('#add-people-modal').modal('show');
    console.log('Add Person clicked.');
    //loadPositions();
}); 

$('#add-people-confirm').click(function(){

    console.log(
        "{" + "\n"
        + "\t" + "first_name: " + firstName.value + "," + "\n"
        + "\t" + "last_name: " + lastName.value + "," + "\n"
        + "\t" + "emp_pos: " + empPos.value + "," + "\n"
        + "\t" + "email: " + email.value + "," + "\n"
        + "\t" + "phone: " + phone.value + "\n"
        + "}"

    );


    loadPeople();
    writePeopleJson();
}); 


// STILL BUGGY
function writePeopleJson() {  

    // Writing to JSON

    var jsonWrite = {
        temp: []
    };

    jsonWrite.temp.push({first_name: firstName, last_name: lastName, emp_pos: empPos, email: email, phone: phone});

    var jsonTemp = JSON.stringify(jsonWrite);

    var fs = require('fs');     // need to use require.js that I (Sam) imported
    fs.writeFile('mockdata/mock_people.new.json', jsonTemp, 'utf8', callback);


    // if you want to append it read the json file and convert it back to an object.... I Think, never tested yet. Second half is basically the same as the top
    // fs.readFile('mockdata/mock_people.new.json', 'utf8', function readFileCallback(err, data){
    //     if (err){
    //         console.log(err);
    //     } else {
    //     obj = JSON.parse(data); //now it an object
    //     obj.table.push({first_name: firstName, last_name: lastName, emp_pos: empPos, email: email, phone: phone}); //add some data
    //     json = JSON.stringify(obj); //convert it back to json
    //     fs.writeFile('myjsonfile.json', json, 'utf8', callback); // write it back 
    // }});


}

