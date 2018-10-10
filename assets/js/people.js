//PEOPLE.JS - For JavaScript Functions that are directly related to people.


function loadPeople() {
    $.getJSON('mockdata/mock_people.json', function (data) {
        $.each(data, function (i, field) {
            $("#tab-2 ul").append("<li>" + data[i].id + ": " + data[i].first_name + " " + data[i].last_name + "</li> ");
        });
    });
    console.log('people loaded.')
};

$('#add-person-btn').click(function(){
    console.log('Add Person clicked.');
    

}); 