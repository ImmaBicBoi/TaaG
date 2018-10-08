
// $('#edit-btn').click(function(){
//     $('#main-modal').modal('show');
//  }); 
 
$('#add').click(function(){
    console.log(5 + 6);
}); 

 $('#edit-btn').click(function(){
     //hide/show edit/save buttons
     document.getElementById('edit-btn').style="display: none;";
     document.getElementById('save-btn').style="display: block;";
     //make editable and focus on the first editable line
     $('#pos-ocname, #pos-weightdata, #Value1, #Value2, #Value3').attr('contenteditable','true');
     $('#pos-ocname').focus();
     //change color to make noticable
     document.getElementById('pos-ocname').style.background = 'yellow';
     document.getElementById('pos-weightdata').style.background = 'yellow';
     document.getElementById('Value1').style.background = 'yellow';
     document.getElementById('Value2').style.background = 'yellow';
     document.getElementById('Value3').style.background = 'yellow';
 
 });
 
 $('#save-btn').click(function(){
     
     //write new data to the JSON file here
 
     //get variables
     var id;
     var namevalue;
     var posweight;
     var keyvalue1;
     var keyvalue2;
     var keyvalue3;
     //update json here
 
 
 
     //make UN-editable 
     $('#pos-ocname, #pos-weightdata, #Value1, #Value2, #Value3').attr('contenteditable','false');
 
     //hide/show save button
     document.getElementById('save-btn').style="display: none;"
     document.getElementById('edit-btn').style="display: block;"
 
     //change color
     document.getElementById('pos-ocname').style.background = 'rgb(124,252,0)';
     document.getElementById('pos-weightdata').style.background = 'rgb(124,252,0)';
     document.getElementById('Value1').style.background = 'rgb(124,252,0)';
     document.getElementById('Value2').style.background = 'rgb(124,252,0)';
     document.getElementById('Value3').style.background = 'rgb(124,252,0)';
 
     //refresh page   --necessary???
     //location.reload();
     
 });