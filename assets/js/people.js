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
                                    $('#details-title').html(data[i].first_name + " " + data[i].last_name); //insert person title 
                                    $('#first-name').html("<span class='modal-headers'>First Name: </span>" + "<p id = 'name'contenteditable='false'>" + data[i].first_name ) + "</p>"; //insert first name
                                    $('#last-name').html("<span class='modal-headers'>Last Name:</span>" + "<p id = 'name' contenteditable='false'>" + data[i].last_name + "</p>"); //insert last name
									$('#email').html("<span class='modal-headers'>Email:</span>" + "<p id = 'email' contenteditable='false'>" + data[i].email + "</p>"); //insert email
									$('#phone').html("<span class='modal-headers'>Phone:</span>" + "<p id = 'phone' contenteditable='false'>" + data[i].phone + "</p>"); //insert number
									document.getElementById('edit-btn').style = "display: block;" //show EDIT button
                                    document.getElementById('save-btn').style = "display: none;" //hide save button

                                })
                        )
                );
        });
    });
    
    console.log('people loaded.');
};

$('#add-person-btn').click(function(){
    console.log('Add Person clicked.');
    

}); 