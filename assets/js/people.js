//PEOPLE.JS - For JavaScript Functions that are directly related to people.
var firstName = document.getElementById('input-first-name');
var lastName = document.getElementById('input-last-name');
var employeeID = document.getElementById('input-emp-id');
var attPersonArray = [];
var attPersonNameArray = [];


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
                                    $('#first-name').html("<span class='modal-headers'>First Name: </span>" + "<p id = 'ppl-fname' contenteditable='false'>" + data[i].first_name ) + "</p>"; //insert first name
                                    $('#last-name').html("<span class='modal-headers'>Last Name:</span>" + "<p id = 'ppl-lname' contenteditable='false'>" + data[i].last_name + "</p>"); //insert last name
                                    $('#email').html("<span class='modal-headers'>Email:</span>" + "<p id = 'ppl-email' contenteditable='false'>" + data[i].email + "</p>"); //insert email
                                    $('#phone').html("<span class='modal-headers'>Phone:</span>" + "<p id = 'ppl-phone' contenteditable='false'>" + data[i].phone + "</p>"); //insert number
                                    
                                    
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

    var personData = {
        "first_name": firstName.value, 
        "last_name": lastName.value,
        "employee_id" : employeeID.value
    };


    // adding attribute list to array
    for (var attArrayIndex = 1; attArrayIndex <= attCount; attArrayIndex++ ) 
    {
        attPersonArray.push($('#new-person-attribute_'+ attArrayIndex ).val());
        attPersonNameArray.push($('#new-person-attribute-name_'+ attArrayIndex ).val());
       // attArray.push.toString(document.getElementById('new-attribute_'+ attArrayIndex));

    }


    // printing the attribute list
    var i = 0;
    while (i < attPersonNameArray.length) 
    {
        console.log(
            "Attribute Name: " + attPersonNameArray[i] + "\n"
            + "Attribute: " + attPersonArray[i]
            
        );

        i++;
    }

    
    $('#add-people-modal').modal('hide');
    loadAllPersons();
    //writePeopleJson();
}); 


var attCount = 0;

//Dynamically adds new attributes to modal window
$('#add-people-attribute-confirm').click(function () {
    attCount++;

    var table = $(this).closest('form');
    if (table.find('input:text').length < 10) {   // The <20 is how many fields u wanna add of inputs
    //    table.append('<div class="form-group"><label  class="col-sm-2 control-label">Attribute: </label> <div class="col-sm-2 col-sm-10"> <input type="text" class="form-control" id="new-attribute_' + attCount + '" placeholder="Input Attribute"/></div></div>');
    table.append('<div class="form-group"><div class="col-sm-2 col-sm-10"> <input type="text" class="form-control" id="new-person-attribute-name_' + attCount + '" placeholder="Input Attribute Name"/></div> <div class="col-sm-2 col-sm-10"> <input type="text" class="form-control" id="new-person-attribute_' + attCount + '" placeholder="Input Attribute"/></div></div>');
    }
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
    document.getElementById('delete-cell-btn').disabled = "true;"
    document.getElementById('ppl-edit-btn').style="display: none;"
    document.getElementById('ppl-save-btn').style="display: inline;"
    document.getElementById('ppl-delete-btn').style ="display: inline;"
    //make editable and focus on the first editable line
    $('#ppl-fullname, #ppl-fname, #ppl-lname').attr('contenteditable','true');
    $('#ppl-fname').focus();
    //change color to make noticable
    console.log('editing person.');
     document.getElementById('ppl-fname').setAttribute(
    "style", "border: solid black; background: none");

     document.getElementById('ppl-lname').setAttribute(
    "style", "border: solid black; background: none");


    $( "#person-attributes p, #pos-id p" ).attr(
            "style", "border: solid black; background: none");
    $( "#person-attributes p, #pos-id p" ).attr(
            "contenteditable", "true");


});

$('#ppl-save-btn').click(function(){

    //cannot get the current id into here????
    var pplfname = document.getElementById('ppl-fname').innerHTML;
    var ppllname = document.getElementById('ppl-lname').innerHTML;
    var personData;
    var personAttr = [];

    var jsonAttributes = getPerson(getCurrentID()).attributes;
    // FOR LOOP pushes JSON object contents to new array and 
    // pushes all of the local changes to each attribute field
    // to the array.
    for(var i in jsonAttributes){
        console.log(i + " " + jsonAttributes[i]);
        personAttr.push(jsonAttributes[i]);
        personAttr[i].key = $("#attrKey"+i).html();
        personAttr[i].key = personAttr[i].key.substr(0,personAttr[i].key.length-1);
        personAttr[i].value = $("#attrValue"+i).html();
        console.log(i + " " + personAttr[i]);

    }

    personData = {
        "first_name": pplfname,
        "last_name": ppllname,
        "attributes": personAttr
    }
    updatePerson(personData);
    
    //make UN-editable 
    $('#ppl-fullname, #ppl-fname, #ppl-lname').attr('contenteditable','false');
    $( "#person-attributes p, #pos-id p" ).attr(
        "contenteditable", "false");

    //hide/show save button
    document.getElementById('ppl-save-btn').style="display: none;"
    document.getElementById('ppl-edit-btn').style="display: block;"
    document.getElementById('ppl-delete-btn').style ="display: none;"
    //change color   

    document.getElementById('ppl-fname').setAttribute(
    "style", "border: rgb(124,252,0); background: rgb(124,252,0)");

    document.getElementById('ppl-lname').setAttribute(
    "style", "border: rgb(124,252,0); background: rgb(124,252,0)");

    $( "#person-attributes p, #pos-id p" ).attr(
        "style", "border: rgb(124,252,0); background: rgb(124,252,0)");

    updateGraphElements();
});

$('#ppl-delete-btn').click(function(){
    console.log(getCurrentID());
    deletePerson(getCurrentID());

 });


 function openPersonsTab(id,fname,lname, attribute){
    console.log("opening"+fname);
    clearDetailsTab();
    $('#details-title').html(fname + " " + lname); //insert person title 
    $('#first-name').html("<span class='modal-headers'>First Name: </span>" + "<p id = 'ppl-fname' contenteditable='false'>" + fname) + "</p>"; //insert first name
    $('#last-name').html("<span class='modal-headers'>Last Name:</span>" + "<p id = 'ppl-lname' contenteditable='false'>" + lname + "</p>"); //insert last name
    
    var person = getPerson(id);
    $('#person-attributes').html("");
    var empID = person.employee_id;
    $('#pos-id').html("<span class='modal-headers'>Employee ID: </span>" + "<p contenteditable='false'>"+ empID ) + "</p>"; //insert employee id 
    $.each(person.attributes, function (i, val){
        //console.log("app");
        if(person.attributes[i].value == null){
            $('#person-attributes').append("<span id='attrKey" +i+ "' class='modal-headers'>"+ person.attributes[i].key +":</span>" + "<p id='attrValue"+i+ "' contenteditable='false'>N/A</p>"); //insert positon adittional attributes
        }else{
            $('#person-attributes').append("<span id='attrKey" +i+ "' class='modal-headers'>"+ person.attributes[i].key +":</span>" + "<p id='attrValue"+i+ "' contenteditable='false'>"+person.attributes[i].value +"</p>"); //insert positon adittional attributes
 
        }
    });
    //$('#email').html("<span class='modal-headers'>Email:</span>" + "<p id = 'ppl-email' contenteditable='false'>" + attribute + "</p>"); //insert email
    //$('#phone').html("<span class='modal-headers'>Phone:</span>" + "<p id = 'ppl-phone' contenteditable='false'>" + attribute + "</p>"); //insert number
    document.getElementById('ppl-edit-btn').style = "display: block;" //show EDIT button
    document.getElementById('ppl-save-btn').style = "display: none;" //hide  button
    document.getElementById('edit-btn').style = "display: none;" //hide  button
    document.getElementById('save-btn').style = "display: none;" //hide  button

 }

 function getPerson(id){
    var defaultData = "NOT FOUND";
    var returnData;

    if(id == 0){
        console.log("no person found.");
        return null;
    }else{
        returnData = $.ajax({
        url: "http://localhost:8080/Taag/service/person/" + id,
        async: false,
        success: function(data) {
            //stuff
            //...
            }
        });
        //console.log("retrieving person " + jQuery.parseJSON(returnData.responseText));
        return jQuery.parseJSON(returnData.responseText);
}
 }

 function getPersonID(name){
    var personID = 0;
    $.ajax({
        url: "http://localhost:8080/Taag/service/person",
        type: 'GET',
        contentType:'application/json',
        dataType:'json',
        async: false,
        success: function(data,status, jqXHR){
          //On ajax success do this
          //var output = JSON.parse(data);
          //alert(data + " " + status);
         // console.log("response"+data.message + " " + jqXHR.status);
         $.each(data.persons, function (i, field) {
            if(name == data.persons[i].first_name+' '+data.persons[i].last_name){
                console.log("match!");
                personID = data.persons[i].person_id;
            }
            //console.log(data.persons[i].first_name);
        });
         
            },
        error: function(xhr, ajaxOptions, thrownError) {
            //On error do this
              if (xhr.status == 200) {
  
                  alert(ajaxOptions);
              }
              else {
                  alert(xhr.status);
                  alert(thrownError);
              }
          }
      });


    //console.log("no match for " + name );
    return personID;
 }