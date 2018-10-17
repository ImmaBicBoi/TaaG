
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
	$('#pos-attributes').empty();
	$('#first-name').empty();
	$('#last-name').empty();
	$('#email').empty();
	$('#phone').empty();
	document.getElementById('ppl-save-btn').style="display: none;" //hide  button
	document.getElementById('ppl-save-btn').style="display: none;" //hide  button
	console.log('cleared tab');
}