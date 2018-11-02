//PEOPLE.JS - For JavaScript Functions that are directly related to people.


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
                                    $('#details-title').html("<p i='ppl-fullname'>" + data[i].first_name + " " + data[i].last_name +"</p>"); //insert person title 
                                    $('#first-name').html("<span class='modal-headers'>First Name: </span>" + "<p id = 'ppl-fname'contenteditable='false'>" + data[i].first_name ) + "</p>"; //insert first name
                                    $('#last-name').html("<span class='modal-headers'>Last Name:</span>" + "<p id = 'ppl-lname'contenteditable='false'>" + data[i].last_name + "</p>"); //insert last name
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
    
    console.log('people loaded.')
};

$('#add-person-btn').click(function(){
    console.log('Add Person clicked.');

}); 


$('#ppl-edit-btn').click(function(){
    //hide/show edit/save buttons
    document.getElementById('ppl-delete-btn').style="display: block;";
    document.getElementById('ppl-edit-btn').style="display: none;"
    document.getElementById('ppl-save-btn').style="display: inline;"
    document.getElementById('ppl-delete-btn').style= "display: inline;"
    //make editable and focus on the first editable line
    $('#ppl-fullname, #ppl-fname, #ppl-lname, #ppl-email, #ppl-phone').attr('contenteditable','true');
    $('#ppl-fname').focus();
    //change color to make noticable
    console.log('editing person.');
     document.getElementById('ppl-fname').setAttribute(
    "style", "border: solid black; background: none");

     document.getElementById('ppl-lname').setAttribute(
    "style", "border: solid black; background: none");

    document.getElementById('ppl-email').setAttribute(
    "style", "border: solid black; background: none");

    document.getElementById('ppl-phone').setAttribute(
    "style", "border: solid black; background: none");

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
    document.getElementById('ppl-edit-btn').style="display: inline;"
    document.getElementById('ppl-delete-btn').style = "display: inline;"
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
$('#ppl-delete-btn').click(function(){

    console.log(getCurrentID());

     var pplfname = document.getElementById('ppl-fname').innerHTML;
    var ppllname = document.getElementById('ppl-lname').innerHTML;
     var pplemail = document.getElementById('ppl-email').innerHTML;
    var pplphone = document.getElementById('ppl-phone').innerHTML;

    console.log(
        "{" + "\n"
         + "\t" + "first_name: " + pplfname + "," + "\n"
        + "\t" + "last_name: " + ppllname + "," + "\n"
        + "\t" + "email: " + pplemail + "," + "\n"
        + "\t" + "phone: " + pplphone + "\n"
        + "}"

    );


    console.log("deleting the json");
    


       clearDetailsTab();

    document.getElementById('ppl-save-btn').style="display: none;";
    document.getElementById('ppl-edit-btn').style="display: none;";
    document.getElementById('ppl-delete-btn').style="display: none;";


 });