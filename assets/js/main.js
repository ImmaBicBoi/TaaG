
//MAIN.JS - For JavaScript Functions that are not directly related to positions, people, or the graph.
//main.js is loaded after the rest of the document. 

//

var currentID;

function setCurrentID(i){
    currentID = i;
}

function getCurrentID(){
    return currentID;
}

function clearDetailsTab(){
	$('#details-title').empty();
	$('#pos-heldby').empty();
	$('#pos-weight').empty();
	$('#pos-attributes').empty();
	$('#first-name').empty();
	$('#last-name').empty();
	$('#email').empty();
	$('#phone').empty();
	console.log('cleared tab');
}



 $('#edit-btn').click(function(){
  //hide/show edit/save buttons
	document.getElementById('edit-btn').style="display: none;"
	document.getElementById('save-btn').style="display: inline;"
		document.getElementById('delete-btn').style="display: inline;"

	//make editable and focus on the first editable line
	$('#pos-ocname, #pos-weightdata, #Value1, #Value2, #Value3').attr('contenteditable','true');
	$('#pos-ocname').focus();
	//change color to make noticeable
	
	document.getElementById('pos-ocname').setAttribute(
   	"style", "border: solid black; background: none");  //pick any color

   	document.getElementById('pos-weightdata').setAttribute(
   	"style", "border: solid black; background: none");

   	document.getElementById('Value1').setAttribute(
   	"style", "border: solid black; background: none");

   	document.getElementById('Value2').setAttribute(
   	"style", "border: solid black; background: none");

   	document.getElementById('Value3').setAttribute(
   	"style", "border: solid black; background: none");
 
 });
 
 $('#save-btn').click(function(){
     
     ///write new data to the JSON file here

	//get variables
	//var id = document.getElementById('pos-id').innerHTML;
	var namevalue = document.getElementById('pos-ocname').innerHTML;
	var posweightdata = document.getElementById('pos-weightdata').innerHTML;
	var value1 = document.getElementById('Value1').innerHTML;
	var value2 = document.getElementById('Value2').innerHTML;
	var value3 = document.getElementById('Value3').innerHTML;
	//alert('The id is: '+id);  //testing
    console.log(getCurrentID());
	
	//update json here
		//find by id, replace the whole line


	//make UN-editable 
	$('#pos-ocname, #pos-weightdata, #Value1, #Value2, #Value3').attr('contenteditable','false');

	//hide/show save button
	document.getElementById('save-btn').style="display: none;";
	document.getElementById('edit-btn').style="display: block;";
	document.getElementById('delete-btn').style="display: none;";

	//change color

	document.getElementById('pos-ocname').setAttribute(
   	"style", "border: none; background: rgb(124,252,0)");

   	document.getElementById('pos-weightdata').setAttribute(
   	"style", "border: none; background: rgb(124,252,0)");

   	document.getElementById('Value1').setAttribute(
   	"style", "border: none; background: rgb(124,252,0)");

   	document.getElementById('Value2').setAttribute(
   	"style", "border: none; background: rgb(124,252,0)");

   	document.getElementById('Value3').setAttribute(
   	"style", "border: none; background: rgb(124,252,0)");
	

    //Call this function to refresh position list after JSON Edit
    loadPositions();
     
 });
