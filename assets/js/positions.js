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
    table.append('<div class="form-group"><div class="col-sm-2 col-sm-10"> <input type="text" class="form-control" id="new-edit-attribute-position-name_' + attCount + '" placeholder="Att Name"/></div> <div class="col-sm-2 col-sm-10"> <input type="text" class="form-control" id="new-attribute_' + attCount + '" placeholder="Attribute"/></div></div>');
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
    document.getElementById('delete-cell-btn').disabled = "true;"
    document.getElementById('edit-btn').style="display: none;"
    document.getElementById('add-attribute-position-edit').style="display: block;"
    document.getElementById('edit-add-att-btn').style="display: block;"
    document.getElementById('edit-position-att-form').style="display: block;" 
    document.getElementById('save-btn').style="display: block;"
    document.getElementById('delete-btn').style ="display: inline;"
    //make editable and focus on the first editable line
    $('#details-title,#pos-ocfname, #pos-oclname, #namespan').attr('contenteditable','true');
    $('#pos-title').focus();
    
    $( "#details-title" ).attr(
        "style", "border: solid black; background: none");
    $( "#pos-attributes p, #pos-id p" ).attr(
        "style", "border: solid black; background: none");
    $( "#pos-attributes p, #pos-id p" ).attr(
        "contenteditable", "true");


    document.getElementById('pos-ocfname').style.display = "none";
    //document.getElementById('pos-oclname').style.display = "none";    
    var CurrentOcName = document.getElementById("pos-ocfname").innerHTML;
    //console.log(CurrentOcName); 

    $('#namespan select').remove();
    $('#namespan').append(
        $('<select/>').append(
        $('<option/>').html(CurrentOcName)
    ));

    $.getJSON('http://localhost:8080/Taag/service/person', function (data) {
        $.each(data.persons, function (i, field) {
            $('#namespan select').append(
                $('<option/>').html(data.persons[i].first_name + " " + data.persons[i].last_name)
            )
            //console.log(data.persons[i].first_name);
        })
    });

});

// Saves changes on the right sidebar once "Save" button is clicked
$('#save-btn').click(function(){
    //make UN-editable 
    $('#pos-ocfname, #pos-oclname, #pos-title, #namespan').attr('contenteditable','false');

    var selectValue = $('#namespan select :selected').val();
    var selectID = getPersonID(selectValue);

    console.log(selectValue + ":" + selectID);

    //hide/show save button
    document.getElementById('save-btn').style="display: none;"
    document.getElementById('add-attribute-position-edit').style="display: none;"
    document.getElementById('edit-add-att-btn').style="display: none;"
    document.getElementById('edit-position-att-form').style="display: none;"  // hide form
    document.getElementById('edit-btn').style="display: block;"
    document.getElementById('delete-btn').style ="display: none;"

    
    //----------------------------------------------------------------------Add Attributes for positions
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

        var positionData = []; 

        var positionAttributes = {
            "key": attNameArray[i], 
            "value": attArray[i]
        };

        positionData.push(positionAttributes);

        updatePositionAttribute(positionAttributes);

        i++;
    }

    $('#add-position-modal').modal('hide');


    attCount = 0;

    $("#edit-position-att-form")[0].reset();
    //document.getElementById('edit-position-att-form').reset();   ALSO WORKS!!
    $('#add-attributes-position-modal').modal('hide');

    // --------------------------------------------------------------------------------------------

    var postitle = document.getElementById('details-title').innerHTML;
    console.log(postitle);

    // This variable contains the Position attributes JSON object from the server
    var jsonAttributes = getPosition(getCurrentID()).attributes;
    var posAttr = [];
   
    
    console.log("attributes json:" + jsonAttributes);

    var jobID = $('#pos-id p').html();
    console.log(jobID);
    var positionData;
    
    // FOR LOOP pushes JSON object contents to new array and 
    // pushes all of the local changes to each attribute field
    // to the array.
    for(var i in jsonAttributes){
        console.log(i + " " + jsonAttributes[i]);
        posAttr.push(jsonAttributes[i]);
        posAttr[i].key = $("#attrKey"+i).html();
        posAttr[i].key = posAttr[i].key.substr(0,posAttr[i].key.length-1);
        posAttr[i].value = $("#attrValue"+i).html();
        console.log(i + " " + posAttr[i]);

    }
    
    if(selectID == 0){

        positionData = {
            "name": postitle,
            "job_id" : jobID,
            "attributes" :  posAttr
        }

    }else{

        positionData = {
            "name": postitle,
            "person_id": selectID,
            "job_id" : jobID,
            "attributes" :  posAttr
        }

    }


    
    updatePosition(positionData);

    //change color   
    $('#namespan select').remove();
    $('#namespan').html("<h9 id = 'pos-ocfname' contenteditable='false'>" + selectValue +"</h9>");
    
    // document.getElementById('pos-oclname').setAttribute(
    // "style", "border: rgb(124,252,0); background: rgb(124,252,0)");
    $( "#details-title" ).attr(
        "style", "border: rgb(124,252,0); background: rgb(124,252,0)");

     
    $( "#pos-attributes p, #pos-id p" ).attr(
        "style", "border: rgb(124,252,0); background: rgb(124,252,0)");

    $('#namespan').attr(
        "style", "border: rgb(124,252,0); background: rgb(124,252,0)");
        
    loadAllPositions();

    //refresh page   --necessary???
    //location.reload();
    
});


$('#delete-btn').click(function(){
    console.log(getCurrentID());
    deletePosition(getCurrentID());

 });

//Opens the Right sidebar to show position details
function openPositionsTab(id,name, occupantID,){
    //console.log("opening "+name);
    clearDetailsTab();

    var occupant = getPerson(occupantID);
    var occupantName = "";
    
    if(occupantID == 0){
        occupantName = "N/A"
    }else{
        occupantName = occupant.first_name + " " + occupant.last_name;
    }
    
   // console.log("personnn " + occupant.first_name);
    $('#details-title').html(name); //insert position title 
    $('#pos-heldby').html("<span class='modal-headers'>Position Held By: </span> <br>" + "<p><span id='namespan'>"+"<h9 id = 'pos-ocfname' contenteditable='false'>" + occupantName +"</h9>" + " " +" </span> </p><br>"); //insert position heldby name

    $('#pos-attributes').html(""); //insert position attributes
    //console.log(attributes);
    var position = getPosition(id);
    var jobID = position.job_id;
    $('#pos-id').html("<span class='modal-headers'>Job ID: </span>" + "<p contenteditable='false'>"+ jobID ) + "</p>"; //insert position heldby name

    $.each(position.attributes, function (i, val){
        console.log("app");
       $('#pos-attributes').append("<span id='attrKey"+ i +"' class='modal-headers'>"+ position.attributes[i].key +":</span>" + "<p id ='attrValue"+ i+ "' contenteditable='false'>"+position.attributes[i].value +"</p>"); //insert positon adittional attributes

    });
    

    setCurrentID(id);
    document.getElementById('edit-btn').style = "display: block;" //show EDIT button
    document.getElementById('add-attribute-position-edit').style="display: none;" // hide button
    document.getElementById('edit-add-att-btn').style = "display: none;" //hide  button
    document.getElementById('edit-position-att-form').style="display: none;"  // hide form
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
                                    $('#pos-heldby').html("<span class='modal-headers'>Position Held By: </span> <br>" + "<p><span id='namespan'>"+"<h9 id = 'pos-ocfname' contenteditable='false'>" + data[i].pos_occupant_first_name +"</h9>" + " " + "<h9 id = 'pos-oclname'contenteditable='false'>" + data[i].pos_occupant_last_name)+"</h9>"+" </span> </p><br>"; //insert position heldby name
                                                                                
                                    $('#pos-attributes').html(""); //insert position attributes
                                    $('#pos-attributes').append("<span class='modal-headers' >Key 1:</span>" + "<p id ='Value1'  contenteditable='false'>Value 1</p>"); //insert positon adittional attributes
                                    $('#pos-attributes').append("<span class='modal-headers'>Key 2:</span>" + "<p id ='Value2' contenteditable='false'>Value 2</p>"); //insert positon adittional attributes
                                    $('#pos-attributes').append("<span class='modal-headers'>Key 3</span>" + "<p id ='Value3' contenteditable='false'>Value 3</p>"); //insert positon adittional attributes
                                    
                                    setCurrentID(data[i].id);
                                    document.getElementById('edit-btn').style = "display: block;" //show EDIT button
                                    document.getElementById('ppl-save-btn').style = "display: none;" //hide  button
                                    document.getElementById('ppl-edit-btn').style = "display: none;" //hide  button
                                    document.getElementById('save-btn').style = "display: none;" //hide  button
                                    document.getElementById('add-attribute-position-edit').style="display: none;"  // hide button
                                    document.getElementById('edit-position-att-form').style="display: none;"  // hide form
                                    document.getElementById('edit-add-att-btn').style = "display: none;" //hide  button
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