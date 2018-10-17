//PEOPLE.JS - For JavaScript Functions that are directly related to people.
var firstName = document.getElementById('input-first-name');
var lastName = document.getElementById('input-last-name');
var empPos = document.getElementById('input-emp-position');
var email = document.getElementById('input-email');
var phone = document.getElementById('input-phone');

function loadPeople() {
 $('#people-list li').remove();
    $.getJSON('mockdata/mock_people.json', function (data) {
        $.each(data, function (i, field) {
            $('#tab-2 ul') //Append each item to the #tab-1 ul <ul>
                .append(
                    $('<li/>') //Append a new <li> element to <ul> #tab-1 ul
                        .html(
                            $('<h9/>') //Create a new <h9> inside of the <li>
                                .html(data[i].id + ": " + data[i].first_name + " " + data[i].last_name)
                                .click(function (event) { //Attach a click event to the <h9> element
                                    clearDetailsTab();
                                    $('#details-title').html(data[i].first_name + " " + data[i].last_name); //insert person title 
                                    $('#first-name').html("<span class='modal-headers'>First Name: </span>" + "<p id = 'name'contenteditable='false'>" + data[i].first_name ) + "</p>"; //insert first name
                                    $('#last-name').html("<span class='modal-headers'>Last Name:</span>" + "<p id = 'name' contenteditable='false'>" + data[i].last_name + "</p>"); //insert last name
									$('#email').html("<span class='modal-headers'>Email:</span>" + "<p id = 'email' contenteditable='false'>" + data[i].email + "</p>"); //insert email
									$('#phone').html("<span class='modal-headers'>Phone:</span>" + "<p id = 'phone' contenteditable='false'>" + data[i].phone + "</p>"); //insert number
                                    document.getElementById('ppl-edit-btn').style = "display: block;" //show EDIT button
                                    document.getElementById('ppl-save-btn').style = "display: none;" //hide  button
                                    document.getElementById('edit-btn').style = "display: none;" //hide  button
                                    document.getElementById('save-btn').style = "display: none;" //hide  button

                                })
                        )
                );
        });
    });
    
    console.log('people loaded.');
};


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
    //writePeopleJson();
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

$('#ppl-edit-btn').click(function(){
    //hide/show edit/save buttons
    document.getElementById('ppl-edit-btn').style="display: none;"
    document.getElementById('ppl-save-btn').style="display: block;"
    //make editable and focus on the first editable line
    $('#ppl-fullname, #ppl-fname, #ppl-lname, #ppl-email, #ppl-phone').attr('contenteditable','true');
    $('#ppl-fname').focus();
    //change color to make noticable
    
     document.getElementById('ppl-fname').setAttribute(
    "style", "border: solid black; background: none");

     document.getElementById('ppl-lname').setAttribute(
    "style", "border: solid black; background: none");

    document.getElementById('ppl-email').setAttribute(
    "style", "border: solid black; background: none");

    document.getElementById('ppl-phone').setAttribute(
    "style", "border: solid black; background: none");
    console.log('edit people');
});

$('#ppl-save-btn').click(function(){


    //cannot get the current id into here????
    var pplfname = document.getElementById('ppl-fname').innerHTML;
    var ppllname = document.getElementById('ppl-lname').innerHTML;
    var pplemail = document.getElementById('ppl-email').innerHTML;
    var pplphone = document.getElementById('ppl-phone').innerHTML;

    console.log(
        "{" + "\n"
        + "\t" + "Name: " + pplfname + " " +ppllname + "," + "\n"
        + "\t" + "E-mail: " + pplemail + "," + "\n"
        + "\t" + "Phone:  " + pplphone + "," + "\n"
        + "}"

    );

    //make UN-editable 
    $('#ppl-fullname, #ppl-fname, #ppl-lname, #ppl-email, #ppl-phone').attr('contenteditable','false');

    //hide/show save button
    document.getElementById('ppl-save-btn').style="display: none;"
    document.getElementById('ppl-edit-btn').style="display: block;"

    //change color   

    document.getElementById('ppl-fname').setAttribute(
    "style", "border: rgb(124,252,0); background: rgb(124,252,0)");

    document.getElementById('ppl-lname').setAttribute(
    "style", "border: rgb(124,252,0); background: rgb(124,252,0)");

    document.getElementById('ppl-email').setAttribute(
    "style", "border: rgb(124,252,0); background: rgb(124,252,0)");

     document.getElementById('ppl-phone').setAttribute(
    "style", "border: rgb(124,252,0); background: rgb(124,252,0)");

    
});