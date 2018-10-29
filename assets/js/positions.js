//POSITIONS.JS - For JavaScript Functions that are directly related to positions.

var positionTitle = document.getElementById('input-pos-title');
var positionID = document.getElementById('input-pos-id');
var attArray = [];




//Makes positions on the left sidebar draggable
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



//loads modal window once "Add Position" button is clicked
$('#add-position-btn').click(function(){
    $('#add-position-modal').modal('show');
    console.log('Add Position clicked.');
    //loadPositions();
}); 

//Extracts Values onces "Confirm" button is clicked 
$('#add-position-confirm').click(function(){
    var positionData = {
        "name": positionTitle.value, 
        "parent_position_id": 0,
        "job_id": positionID.value
    };
    console.log(
        "{" + "\n"
        + "\t" + "Position_Title: " + positionTitle.value + "," + "\n"
        + "\t" + "Position_ID: " + positionID.value + "," + "\n"
        // + "\t" + "Arrtibute_One: " + attOne.value + "," + "\n"  // Hardcoded
        // + "\t" + "Attribute_Two: " + attTwo.value + "," + "\n"
        // + "\t" + "Attribute_Three: " + attThree.value + "\n"
        + "}"

    );

 

    for (var attArrayIndex = 1; attArrayIndex <= attCount; attArrayIndex++ ) 
    {
        attArray.push($('#new-attribute_'+ attArrayIndex ).val());
       // attArray.push.toString(document.getElementById('new-attribute_'+ attArrayIndex));

    }


    // printing the attribute list
    var i = 0;
    while (i < attArray.length) 
    {
        console.log(
            "Attribute: " + attArray[i]
            
        );

        i++;
    }

    // console.log(positionTitle.value);
    // console.log(positionID.value);
    // console.log(attOne.value);
    // console.log(attTwo.value);
    // console.log(attThree.value);

    $('#add-position-modal').modal('hide');

    attCount = 0;
    createPosition(positionData);
    loadAllPositions();
}); 



// $('#add-position-btn').click(function(){
//     $('#add-position-modal').modal('show');
//  }); 


var attCount = 0;

//Dynamically adds new attributes to modal window
$('#add-attribute-confirm').click(function () {
    attCount++;

    var table = $(this).closest('form');
    if (table.find('input:text').length < 10) {   // The <20 is how many fields u wanna add of inputs
        table.append('<div class="form-group"><label  class="col-sm-2 control-label">Attribute: </label> <div class="col-sm-2 col-sm-10"> <input type="text" class="form-control" id="new-attribute_' + attCount + '" placeholder="Input Attribute"/></div></div>');
    }
});


//Changes Right sidebar to edit mode once "Edit" button is clicked
$('#edit-btn').click(function(){
    //hide/show edit/save buttons
    document.getElementById('edit-btn').style="display: none;"
    document.getElementById('save-btn').style="display: block;"
    //make editable and focus on the first editable line
    $('#details-title,#pos-ocfname, #pos-oclname, #namespan').attr('contenteditable','true');
    $('#pos-title').focus();
    
    
   // var postitle = document.getElementById('pos-title').innerHTML;

    //var select = document.getElementById('pos-title').innerHTML;
  

    document.getElementsByTagName("span")[4].setAttribute('type', 'button'); 
    document.getElementsByTagName("span")[4].setAttribute('class', 'btn btn-primary dropdown-toggle');
    document.getElementsByTagName("span")[4].setAttribute('data-toggle', 'dropdown'); 





    // document.getElementById('pos-ocfname').setAttribute(
    // "style", "border: solid black; background: none");  //pick any color

    // document.getElementById('pos-oclname').setAttribute(
    // "style", "border: solid black; background: none");

    $( "#details-title" ).attr(
        "style", "border: solid black; background: none");
    $( "#pos-attributes p" ).attr(
        "style", "border: solid black; background: none");
    $( "#pos-attributes p" ).attr(
        "contenteditable", "true");


});

// Saves changes on the right sidebar once "Save" button is clicked
$('#save-btn').click(function(){
    //make UN-editable 
    $('#pos-ocfname, #pos-oclname, #pos-title').attr('contenteditable','false');

    //hide/show save button
    document.getElementById('save-btn').style="display: none;"
    document.getElementById('edit-btn').style="display: block;"

    //change color   

    
    // document.getElementById('pos-oclname').setAttribute(
    // "style", "border: rgb(124,252,0); background: rgb(124,252,0)");
    $( "#details-title" ).attr(
        "style", "border: rgb(124,252,0); background: rgb(124,252,0)");

     
    $( "#pos-attributes p" ).attr(
        "style", "border: rgb(124,252,0); background: rgb(124,252,0)");

    //refresh page   --necessary???
    //location.reload();
    
});

//Opens the Right sidebar to show position details
function openPositionsTab(id,name, occupantID){
    //console.log("opening "+name);
    clearDetailsTab();

    var occupant = getPerson(occupantID);
    var occupantName = ""
    if(occupantID == 0){
        occupantName = "-"
    }else{
        occupantName = occupant.first_name + " " + occupant.last_name;
    }
   // console.log("personnn " + occupant.first_name);
    $('#details-title').html(name); //insert position title 
    $('#pos-heldby').html("<span class='modal-headers'>Position Held By: </span>" + "<p id = 'pos-ocname'contenteditable='false'>"+ occupantName ) + "</p>"; //insert position heldby name
    
    $('#pos-attributes').html(""); //insert position attributes
    //console.log(attributes);
    var position = getPosition(id);
    $.each(position.attributes, function (i, val){
        console.log("app");
       $('#pos-attributes').append("<span class='modal-headers'>"+ position.attributes[i].key +":</span>" + "<p id ='Value"+ i+ "' contenteditable='false'>"+position.attributes[i].value +"</p>"); //insert positon adittional attributes

    });
    
    setCurrentID(id);
    document.getElementById('edit-btn').style = "display: block;" //show EDIT button
    document.getElementById('ppl-save-btn').style = "display: none;" //hide  button
    document.getElementById('ppl-edit-btn').style = "display: none;" //hide  button
    document.getElementById('save-btn').style = "display: none;" //hide  button

 }

 //gets JSON Object for the requested position from server
 function getPosition(id){
    var defaultData = "NOT FOUND";
    var returnData;

    
    if(id == 0){
        console.log("position retrieval error");
        return null;
    }else{
        returnData = $.ajax({
        url: "http://localhost:8080/Taag/service/position/" + id,
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



//------------------------Deprecated Functions------------------------------//

// loads positions from local mock json file
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
                                    
                                    $('#pos-attributes').html(""); //insert position attributes
                                    $('#pos-attributes').append("<span class='modal-headers'>Key 1:</span>" + "<p id ='Value1' contenteditable='false'>Value 1</p>"); //insert positon adittional attributes
                                    $('#pos-attributes').append("<span class='modal-headers'>Key 2:</span>" + "<p id ='Value2' contenteditable='false'>Value 2</p>"); //insert positon adittional attributes
                                    $('#pos-attributes').append("<span class='modal-headers'>Key 3</span>" + "<p id ='Value3' contenteditable='false'>Value 3</p>"); //insert positon adittional attributes
                                    
                                    setCurrentID(data[i].id);
                                    document.getElementById('edit-btn').style = "display: block;" //show EDIT button
                                    document.getElementById('ppl-save-btn').style = "display: none;" //hide  button
                                    document.getElementById('ppl-edit-btn').style = "display: none;" //hide  button
                                    document.getElementById('save-btn').style = "display: none;" //hide  button
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