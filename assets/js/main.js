
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
	$('#person-attributes').empty();
	
	console.log('cleared tab');
}


