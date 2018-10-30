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
                                    
                                    $('#pos-attributes').html(""); //insert position attributes
                                    $('#pos-attributes').append("<span class='modal-headers'>Key 1:</span>" + "<p id ='Value1' contenteditable='false'>Value 1</p>"); //insert positon adittional attributes
                                    $('#pos-attributes').append("<span class='modal-headers'>Key 2:</span>" + "<p id ='Value2' contenteditable='false'>Value 2</p>"); //insert positon adittional attributes
                                    $('#pos-attributes').append("<span class='modal-headers'>Key 3</span>" + "<p id ='Value3' contenteditable='false'>Value 3</p>"); //insert positon adittional attributes
                                    
                                    setCurrentID(data[i].id);
                                    document.getElementById('edit-btn').style = "display: block;" //show EDIT button
                                    document.getElementById('ppl-save-btn').style = "display: none;" //hide  button
                                    document.getElementById('ppl-edit-btn').style = "display: none;" //hide  button
                                    document.getElementById('ppl-delete-btn').style = "display: none;"
                                    document.getElementById('delete-btn').style = "display: none;"
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
        // + "\t" + "Arrtibute_One: " + attOne.value + "," + "\n"  // Hardcoded
        // + "\t" + "Attribute_Two: " + attTwo.value + "," + "\n"
        // + "\t" + "Attribute_Three: " + attThree.value + "\n"
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



$('#edit-btn').click(function(){
    //hide/show edit/save buttons
    document.getElementById('edit-btn').style="display: none;"
    document.getElementById('save-btn').style="display: inline;"
    document.getElementById('delete-btn').style ="display: inline;"
    //make editable and focus on the first editable line
    $('#details-title,#pos-ocfname, #pos-oclname, #namespan, #key1, #key1, #key2, #key3, #Value1, #Value2, #Value3').attr('contenteditable','true');
    $('#pos-title').focus();
    
    
   // var postitle = document.getElementById('pos-title').innerHTML;

    //var select = document.getElementById('pos-title').innerHTML;
    document.getElementsByTagName("p")[0].setAttribute('type', 'button'); 
    document.getElementsByTagName("p")[0].setAttribute('class', 'btn btn-primary dropdown-toggle');
    document.getElementsByTagName("p")[0].setAttribute('data-toggle', 'dropdown'); 

    document.getElementsByTagName("span")[4].setAttribute('type', 'button'); 
    document.getElementsByTagName("span")[4].setAttribute('class', 'btn btn-primary dropdown-toggle');
    document.getElementsByTagName("span")[4].setAttribute('data-toggle', 'dropdown'); 
    //  document.getElementById('pos-title').setAttribute(
    // "style", "border: solid black; background: none");

   // $('#pos-title').click(function(event){
   //      //load data from json
   //       $.getJSON('mockdata/mock_positions.json', function(data){    
   //          $.each(data, function(i, field){
   //              $select.append(
   //                  $('<li/>') 
   //                          .html(
   //                              $('<h9/>')
   //                                      .html(data[i].id +": " + data[i].pos_name)
      
   //                              )
   //                      );
   //              });
   //          });




   // var $select = $('dropdown');
   //  //request the JSON data and parse into the select element
   //  $.getJSON('mockdata/mock_positions.json', function(data){
   //    //clear the current content of the select
   //   //$select.html(postitle);
   //   console.log('lol');
     
   //    //iterate over the data and append a select option
   //    $.each(data, function(i, field){
   //      $select.append(data[i].pos_name);
   //    })
   //  });


    document.getElementById('pos-title').setAttribute(
    "style", "border: solid black; background: gray");

    document.getElementById('namespan').setAttribute(
    "style", "border: solid black; background: silver");


    // document.getElementById('pos-ocfname').setAttribute(
    // "style", "border: solid black; background: none");  //pick any color

    // document.getElementById('pos-oclname').setAttribute(
    // "style", "border: solid black; background: none");

    document.getElementById('key1').setAttribute(
    "style", "border: solid black; background: none");

    document.getElementById('key2').setAttribute(
    "style", "border: solid black; background: none");

    document.getElementById('key3').setAttribute(
    "style", "border: solid black; background: none");

    document.getElementById('Value1').setAttribute(
    "style", "border: solid black; background: none");

    document.getElementById('Value2').setAttribute(
    "style", "border: solid black; background: none");

    document.getElementById('Value3').setAttribute(
    "style", "border: solid black; background: none");

});

$('#save-btn').click(function(){


    
    var postitle = document.getElementById('pos-title').innerHTML;
    var fnamevalue = document.getElementById('pos-ocfname').innerHTML;
    var lnamevalue = document.getElementById('pos-oclname').innerHTML;
    var value1 = document.getElementById('Value1').innerHTML;
    var value2 = document.getElementById('Value2').innerHTML;
    var value3 = document.getElementById('Value3').innerHTML;

    var key1 = document.getElementById('key1').innerHTML;
    var key2 = document.getElementById('key2').innerHTML;
    var key3 = document.getElementById('key3').innerHTML;

//print to console
    console.log(
        "{" + "\n"
        + "\t" + "Name: " + fnamevalue + " " +lnamevalue + "," + "\n"
        + "\t" + "Position_Title: " + postitle + "," + "\n"
        + "\t" + "Position_ID: " + getCurrentID() + "," + "\n"
        + "\t" + "Arrtibute_One: " + value1 + "," + "\n"
        + "\t" + "Attribute_Two: " + value2 + "," + "\n"
        + "\t" + "Attribute_Three: " + value3 + "\n"
        + "}"

    );
    //print to console
    console.log(
        "Position related stuff: " + 
        "{"+ "\n"
        + "\t" + "Position_Title: " + postitle + "," + "\n"
        + "\t" + "Arrtibute_One: " + key1 + "," + "\n"
        + "\t" + "Attribute_Two: " + key2 + "," + "\n"
        + "\t" + "Attribute_Three: " + key3 + "\n"
        + "}"

    );
    
   
    //update json here
        //find by id, replace the whole line


    //make UN-editable 
    $('#pos-ocfname, #pos-oclname, #namespan, #key1, #pos-title, #key1, #key2, #key3, #Value1, #Value2, #Value3').attr('contenteditable','false');

    //hide/show save button
    document.getElementById('save-btn').style="display: none;"
    document.getElementById('edit-btn').style="display: block;"

    //change color   

    document.getElementById('pos-title').setAttribute(
    "style", "border: rgb(124,252,0); background: rgb(124,252,0)");

    document.getElementById('namespan').setAttribute(
    "style", "border: rgb(124,252,0); background: rgb(124,252,0)");

    // document.getElementById('pos-oclname').setAttribute(
    // "style", "border: rgb(124,252,0); background: rgb(124,252,0)");

     document.getElementById('key1').setAttribute(
    "style", "border: rgb(124,252,0); background: rgb(124,252,0)");

    document.getElementById('key2').setAttribute(
    "style", "border: rgb(124,252,0); background: rgb(124,252,0)");

    document.getElementById('key3').setAttribute(
    "style", "border: rgb(124,252,0); background: rgb(124,252,0)");


    document.getElementById('Value1').setAttribute(
    "style", "border: rgb(124,252,0); background: rgb(124,252,0)");

    document.getElementById('Value2').setAttribute(
    "style", "border: rgb(124,252,0); background: rgb(124,252,0)");

    document.getElementById('Value3').setAttribute(
    "style", "border: rgb(124,252,0); background: rgb(124,252,0)");
    

    //refresh page   --necessary???
    //location.reload();
    
});

$('#delete-btn').click(function(){

    console.log(getCurrentID());
    var postitle = document.getElementById('pos-title').innerHTML;
    var key1 = document.getElementById('key1').innerHTML;
    var key2 = document.getElementById('key2').innerHTML;
    var key3 = document.getElementById('key3').innerHTML;
    var value1 = document.getElementById('Value1').innerHTML;
    var value2 = document.getElementById('Value2').innerHTML;
    var value3 = document.getElementById('Value3').innerHTML;


    console.log("deleting the json");
    console.log(
        "{" + "\n"
        + "\t" + "Position_Title: " + postitle + "," + "\n"
        + "\t" + "Arrtibute_One: " + key1 + "," + "\n"
        + "\t" + "Attribute_Two: " + key2 + "," + "\n"
        + "\t" + "Attribute_Three: " + key3 + "\n"
        + "}"

    );

    


      clearDetailsTab();

    // document.getElementById('save-btn').style="display: none;";
    // document.getElementById('edit-btn').style="display: none;";
    // document.getElementById('delete-btn').style="display: none;";


 });