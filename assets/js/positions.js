//POSITIONS.JS - For JavaScript Functions that are directly related to positions.

var positionTitle = document.getElementById('input-pos-title');
var positionID = document.getElementById('input-pos-id');
var attArray = [];
var attNameArray = [];




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

 
    // adding attribute list to array     
    for (var attArrayIndex = 1; attArrayIndex <= attCount; attArrayIndex++ ) 
    {
        attArray.push($('#new-attribute_'+ attArrayIndex ).val());
        attNameArray.push($('#new-attribute-name_'+ attArrayIndex ).val());
       // attArray.push.toString(document.getElementById('new-attribute_'+ attArrayIndex));

    }


    // printing the attribute list
    var i = 0;
    while (i < attNameArray.length) 
    {
        console.log(
            "Attribute Name: " + attNameArray[i] + "\n"
            + "Attribute: " + attArray[i]
            
        );

        i++;
    }

    // console.log(positionTitle.value);
    // console.log(positionID.value);
    // console.log(attOne.value);
    // console.log(attTwo.value);
    // console.log(attThree.value);


    attCount = 0;
    createPosition(positionData);
    loadAllPositions();

    $("#position-form")[0].reset();
    //document.getElementById('position-form').reset();   ALSO WORKS!!
    $('#add-position-modal').modal('hide');
}); 



// $('#add-position-btn').click(function(){
//     $('#add-position-modal').modal('show');
//  }); 


var attCount = 0;

//Dynamically adds new attributes to modal window
$('#add-attribute-confirm').click(function () {
    console.log('Add Attributes clicked');
    attCount++;

    var table = $(this).closest('form');
    if (table.find('input:text').length < 10) {   // The <20 is how many fields u wanna add of inputs
    //    table.append('<div class="form-group"><label  class="col-sm-2 control-label">Attribute: </label> <div class="col-sm-2 col-sm-10"> <input type="text" class="form-control" id="new-attribute_' + attCount + '" placeholder="Input Attribute"/></div></div>');
    table.append('<div class="form-group"><div class="col-sm-2 col-sm-10"> <input type="text" class="form-control" id="new-attribute-name_' + attCount + '" placeholder="Input Attribute Name"/></div> <div class="col-sm-2 col-sm-10"> <input type="text" class="form-control" id="new-attribute_' + attCount + '" placeholder="Input Attribute"/></div></div>');
    }
});

// Add attributes for the edit position function  -------------------------------------------------------------------------------------------------
$('#edit-add-att-btn').click(function(){
    $('#add-attributes-position-modal').modal('show');
    console.log('Add Attributes clicked in the Edit Pane.');
    //loadPositions();
});

$('#add-attribute-position-edit').click(function () {
    console.log('add-attribute-position-edit clicked');
    attCount++;

    var table = $(this).closest('form');
    if (table.find('input:text').length < 10) {   // The <20 is how many fields u wanna add of inputs
    //    table.append('<div class="form-group"><label  class="col-sm-2 control-label">Attribute: </label> <div class="col-sm-2 col-sm-10"> <input type="text" class="form-control" id="new-attribute_' + attCount + '" placeholder="Input Attribute"/></div></div>');
    table.append('<div class="form-group"><div class="col-sm-2 col-sm-10"> <input type="text" class="form-control" id="new-edit-attribute-position-name_' + attCount + '" placeholder="Input Attribute Name"/></div> <div class="col-sm-2 col-sm-10"> <input type="text" class="form-control" id="new-attribute_' + attCount + '" placeholder="Input Attribute"/></div></div>');
    }
});

$('#add-attribute-position-edit-confirm').click(function(){
 
    attNameArray = [];
    attArray = [];

    // adding attribute list to array     
    for (var attArrayIndex = 1; attArrayIndex <= attCount; attArrayIndex++ ) 
    {
        attArray.push($('#new-attribute_'+ attArrayIndex ).val());
        attNameArray.push($('#new-edit-attribute-position-name_'+ attArrayIndex ).val());
       // attArray.push.toString(document.getElementById('new-attribute_'+ attArrayIndex));

    }


    // printing the attribute list
    var i = 0;
    while (i < attNameArray.length) 
    {
        console.log(
            "Attribute Name: " + attNameArray[i] + "\n"
            + "Attribute: " + attArray[i]
            
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

    $("#edit-position-att-form")[0].reset();
    //document.getElementById('edit-position-att-form').reset();   ALSO WORKS!!
    $('#add-attributes-position-modal').modal('hide');

    loadAllPositions();
}); 





//------------------------------------------------------------------------------------------------------------------------------------------------


//Changes Right sidebar to edit mode once "Edit" button is clicked
$('#edit-btn').click(function(){
    //hide/show edit/save buttons
    document.getElementById('edit-btn').style="display: none;"
    document.getElementById('edit-add-att-btn').style="display: block;"
    document.getElementById('save-btn').style="display: block;"
    //make editable and focus on the first editable line
    $('#details-title,#badge badge-pill badge-secondary, #pos-ocfname, #pos-oclname, #namespan').attr('contenteditable','true');
    $('#pos-title').focus();
    
    
      $( "#details-title" ).attr(
        "style", "border: solid black; background: none");
    $( "#pos-attributes p, #pos-id p" ).attr(
        "style", "border: solid black; background: none");
    $( "#pos-attributes p, #pos-id p" ).attr(
        "contenteditable", "true");

    document.getElementById('pill1').style = "display: inline;" //hide  pill
    document.getElementById('pill2').style = "display: inline;" //hide  pill
    document.getElementById('pill3').style = "display: inline;" //hide  pill

    $('#pill1').click(function() {
         var key1 = document.getElementById('key1').innerHTML;
         document.getElementById('key1').style = "display: none";
         var value1 = document.getElementById('Value1').innerHTML;
         document.getElementById('Value1').style = "display: none";
         document.getElementById('pill1').style = "display: none;" //hide  pill
         console.log("Deleting values" + key1 +" and " + value1);
         
    })
    $('#pill2').click(function() {
         var key2 = document.getElementById('key2').innerHTML;
         document.getElementById('key2').style = "display: none";
         var value2 = document.getElementById('Value2').innerHTML;
         document.getElementById('Value2').style = "display: none";
         document.getElementById('pill2').style = "display: none;" //hide  pill
         console.log("Deleting values" + key2 +" and " + value2);
         
    })

    $('#pill3').click(function() {
         var key3 = document.getElementById('key3').innerHTML;
         document.getElementById('key3').style = "display: none";
         var value3 = document.getElementById('Value3').innerHTML;
         document.getElementById('Value3').style = "display: none";
         document.getElementById('pill3').style = "display: none;" //hide  pill
         console.log("Deleting values" + key3 +" and " + value3);
         
    })


});

// Saves changes on the right sidebar once "Save" button is clicked
$('#save-btn').click(function(){
    //make UN-editable 
    $('#pos-ocfname, #pos-oclname, #pos-title').attr('contenteditable','false');

    //hide/show save button
    document.getElementById('save-btn').style="display: none;"
    document.getElementById('edit-add-att-btn').style="display: none;"
    document.getElementById('edit-btn').style="display: block;"

    var postitle = document.getElementById('details-title').innerHTML;
    console.log(postitle);

    var positionData = {
        "name": postitle
    }
    updatePosition(positionData);

    //change color   

    
    // document.getElementById('pos-oclname').setAttribute(
    // "style", "border: rgb(124,252,0); background: rgb(124,252,0)");
    $( "#details-title" ).attr(
        "style", "border: rgb(124,252,0); background: rgb(124,252,0)");

     
    $( "#pos-attributes p, #pos-id p" ).attr(
        "style", "border: rgb(124,252,0); background: rgb(124,252,0)");

    //refresh page   --necessary???
    //location.reload();
    document.getElementById('pill1').style = "display: none;" //hide  pill
    document.getElementById('pill2').style = "display: none;" //hide  pill
    document.getElementById('pill3').style = "display: none;" //hide  pill
    
});

//Opens the Right sidebar to show position details
function openPositionsTab(id,name, occupantID,){
    //console.log("opening "+name);
    clearDetailsTab();

    var occupant = getPerson(occupantID);
    var occupantName = "";
    
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
    var jobID = position.job_id;
    $('#pos-id').html("<span class='modal-headers'>Job ID: </span>" + "<p contenteditable='false'>"+ jobID ) + "</p>"; //insert position heldby name

    $.each(position.attributes, function (i, val){
        console.log("app");
       $('#pos-attributes').append("<span class='modal-headers'>"+ position.attributes[i].key +":</span>" + "<p id ='Value"+ i+ "' contenteditable='false'>"+position.attributes[i].value +"</p>"); //insert positon adittional attributes

    });
    

    setCurrentID(id);
    document.getElementById('edit-btn').style = "display: block;" //show EDIT button
    document.getElementById('edit-add-att-btn').style = "display: none;" //hide  button
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
                                    $('#pos-attributes').append("<span class='modal-headers' id='key1'>Key 1:      </span>" + "<span class='badge badge-pill badge-secondary float-right m-10' id='pill1'>X</span>"+ "<p id ='Value1' contenteditable='false'>Value 1</p>"); //insert positon adittional attributes
                                    $('#pos-attributes').append("<span class='modal-headers' id='key2'>Key 2:      </span>" + "<span class='badge badge-pill badge-secondary float-right m-10' id='pill2'>X</span>"+ "<p id ='Value2' contenteditable='false'>Value 2</p>"); //insert positon adittional attributes
                                    $('#pos-attributes').append("<span class='modal-headers' id='key3'>Key 3:      </span>" + "<span class='badge badge-pill badge-secondary float-right m-10' id='pill3'>X</span>"+ "<p id ='Value3' contenteditable='false'>Value 3</p>"); //insert positon adittional attributes
                                    
                                    setCurrentID(data[i].id);
                                    document.getElementById('edit-btn').style = "display: block;" //show EDIT button
                                    document.getElementById('ppl-save-btn').style = "display: none;" //hide  button
                                    document.getElementById('ppl-edit-btn').style = "display: none;" //hide  button
                                    document.getElementById('save-btn').style = "display: none;" //hide  button
                                    document.getElementById('edit-add-att-btn').style = "display: none;" //hide  button
                                    document.getElementById('pill1').style = "display: none;" //hide  pill
                                    document.getElementById('pill2').style = "display: none;" //hide  pill
                                    document.getElementById('pill3').style = "display: none;" //hide  pill
                
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