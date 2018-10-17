//POSITIONS.JS - For JavaScript Functions that are directly related to positions.

var positionTitle = document.getElementById('input-pos-title');
var positionID = document.getElementById('input-pos-id');
var attOne = document.getElementById('input-att-one');
var attTwo = document.getElementById('input-att-two');
var attThree = document.getElementById('input-att-three');

function loadPositions() {

    
    //Removes any Existing List Items for the update
    $('#position-list li').remove();
    $.getJSON('mockdata/mock_positions.json', function (data) {
        $.each(data, function (i, field) {
            $('#tab-1 ul') //Append each item to the #tab-1 ul <ul>
                .append(
                    $('<li/>') //Append a new <li> element to <ul> #tab-1 ul
                        .html(
                            $('<h9/>') //Create a new <h9> inside of the <li>
                                .html(data[i].id + ": " + data[i].pos_name)
                                .click(function (event) { //Attach a click event to the <h9> element
                                    clearDetailsTab();
                                    $('#details-title').html(data[i].pos_name); //insert position title 
                                    $('#pos-heldby').html("<span class='modal-headers'>Position Held By: </span>" + "<p id = 'pos-ocname'contenteditable='false'>" + data[i].pos_occupant_first_name + " " + data[i].pos_occupant_last_name) + "</p>"; //insert position heldby name
                                    $('#pos-weight').html("<span class='modal-headers'>Position Weight:</span>" + "<p id = 'pos-weightdata' contenteditable='false'>" + data[i].pos_weight + "</p>"); //insert positon weight
                                    $('#pos-attributes').html(""); //insert position attributes
                                    $('#pos-attributes').append("<span class='modal-headers'>Key 1:</span>" + "<p id ='Value1' contenteditable='false'>Value 1</p>"); //insert positon adittional attributes
                                    $('#pos-attributes').append("<span class='modal-headers'>Key 2:</span>" + "<p id ='Value2' contenteditable='false'>Value 2</p>"); //insert positon adittional attributes
                                    $('#pos-attributes').append("<span class='modal-headers'>Key 3</span>" + "<p id ='Value3' contenteditable='false'>Value 3</p>"); //insert positon adittional attributes
                                    
                                    setCurrentID(data[i].id);
                                    document.getElementById('edit-btn').style = "display: block;" //show EDIT button
                                    document.getElementById('save-btn').style = "display: none;" //hide save button

                                })
                        )
                );
        });
    });

    makeDraggable();

     $('#position-list li').each(function(i) {
        console.log('list item'+ (i+1));

        $(this).attr('id', 'pos-item'+(i+1));
    });
    console.log('positions loaded.');
    
};


function loadDraggablePositions() {

    
    //Removes any Existing List Items for the update
    $('#position-list li').remove();
    $.getJSON('mockdata/mock_positions.json', function (data) {
        $.each(data, function (i, field) {
            $('<li />').appendTo('#tab-1 ul').ready(function(){ /* callback */ 
                addToolbarItem(graph, toolbar);
            });
        });
    });


    
};



$('#add-position-btn').click(function(){
    $('#add-position-modal').modal('show');
    console.log('Add Position clicked.');
    //loadPositions();
}); 

$('#add-position-confirm').click(function(){

    console.log(
        "{" + "\n"
        + "\t" + "Position_Title: " + positionTitle.value + "," + "\n"
        + "\t" + "Position_ID: " + positionID.value + "," + "\n"
        + "\t" + "Arrtibute_One: " + attOne.value + "," + "\n"
        + "\t" + "Attribute_Two: " + attTwo.value + "," + "\n"
        + "\t" + "Attribute_Three: " + attThree.value + "\n"
        + "}"

    );

    // console.log(positionTitle.value);
    // console.log(positionID.value);
    // console.log(attOne.value);
    // console.log(attTwo.value);
    // console.log(attThree.value);


    loadPositions();
}); 


// $('#add-position-btn').click(function(){
//     $('#add-position-modal').modal('show');
//  }); 


$('#add-attribute-confirm').click(function () {
    var table = $(this).closest('form');
    if (table.find('input:text').length < 10) {   // The <20 is how many fields u wanna add of inputs
        table.append('<div class="form-group"><label  class="col-sm-2 control-label">Attribute: </label> <div class="col-sm-2 col-sm-10"> <input type="text" class="form-control id="new-attribute" placeholder="Input Attribute"/></div></div>');
    }
});