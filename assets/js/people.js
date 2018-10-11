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
                                    $('#details-title').html(data[i].pos_name); //insert position title 
                                    $('#first-name').html("<span class='modal-headers'>First Name: </span>" + "<p id = 'name'contenteditable='false'>" + data[i].first_name ) + "</p>"; //insert first name
                                    $('#last-name').html("<span class='modal-headers'>Last Name:</span>" + "<p id = 'name' contenteditable='false'>" + data[i].last_name + "</p>"); //insert last name
									$('#Email').html("<span class='modal-headers'>Email:</span>" + "<p id = 'email' contenteditable='false'>" + data[i].email + "</p>"); //insert email
                                    $('#pos-attributes').html(""); //insert email
									$('#Phone').html("<span class='modal-headers'>Phone:</span>" + "<p id = 'phone' contenteditable='false'>" + data[i].phone + "</p>"); //insert number
									$('#pos-attributes').html(""); //insert number
                                    $('#pos-attributes').append("<span class='modal-headers'>Key 1:</span>" + "<p id ='Value1' contenteditable='false'>Value 1</p>"); //insert positon adittional attributes
                                    $('#pos-attributes').append("<span class='modal-headers'>Key 2:</span>" + "<p id ='Value2' contenteditable='false'>Value 2</p>"); //insert positon adittional attributes
                                    $('#pos-attributes').append("<span class='modal-headers'>Key 3</span>" + "<p id ='Value3' contenteditable='false'>Value 3</p>"); //insert positon adittional attributes
                                    document.getElementById('edit-btn').style = "display: block;" //show EDIT button
                                    document.getElementById('save-btn').style = "display: none;" //hide save button

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