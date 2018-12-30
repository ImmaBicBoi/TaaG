var posAttPreloadCount = 0;
var peopleAttPreloadCount = 0;


$('#cog-settings-btn').click(function(){
    $('#attributes-cog-modal').modal('show');
    console.log('Attribute Cog clicked.');
    //loadPositions();

    // This is to populate the attributes that are already made. You can see the values in postman using the http://localhost:8080/Taag/service/attribute GET call
    var attr = loadAllAttributes();
    
    for(var i = 0; i < attr.position.length; i++){

        var suffix = i + 1;
        posAttPreloadCount = suffix;

        var posAttName = attr.position[i].key;
        var posAttNameForSortable = '<div class="col-sm-2 col-sm-10"> <input type="text" class="form-control" id="attribute-position-cog-name_' + suffix + '" value="' + posAttName + '"/>  </div>';
        if(attr.position[i].is_visible){
           var visibleCheckbox = '<div class="col-sm-2 col-sm-10"><input type="checkbox" id="attribute-position-cog-visible_' + suffix + '" value="Visible" checked> Visible</div>';
        }
        else{
            var visibleCheckbox = '<div class="col-sm-2 col-sm-10"><input type="checkbox" id="attribute-position-cog-visible_' + suffix + '" value="Visible"> Visible</div>';

        }

        var fullSortableAppendPosition = '<li class="ui-state-default" ><span><img src="images/sortable.png" alt="sort-icon" width="30"  height="30";> </span>' + posAttNameForSortable + visibleCheckbox + '</li>';

        $("#sortable").append(fullSortableAppendPosition);

        // Appending Format
        //$("#sortable").append('<li class="ui-state-default" ><span><img src="images/sortable.png" alt="sort-icon" width="30"  height="30" ;></span><div class="col-sm-2 col-sm-10"> <input type="text" class="form-control" id="attribute-position-cog-name_1" value="LocationBOOP"/> </div> <div class="col-sm-2 col-sm-10"><input type="checkbox" name="attribute-position-cog-visible_1" value="Visible" checked> Visible</div> </li>');
    }

    //alert($( "#sortable" ).sortable( "toArray" ).toSource());

    for(var i = 0; i < attr.person.length; i++){

        var suffix = i + 1;
        peopleAttPreloadCount = suffix;

        var peopleAttName = attr.person[i].key;
        var peopleAttNameForSortable = '<div class="col-sm-2 col-sm-10"> <input type="text" class="form-control" id="attribute-people-cog-name_' + suffix + '" value="' + peopleAttName + '"/>  </div>';
        if(attr.person[i].is_visible){
           var visibleCheckbox = '<div class="col-sm-2 col-sm-10"><input type="checkbox" id="attribute-people-cog-visible_' + suffix + '" value="Visible" checked> Visible</div>';
        }
        else{
            var visibleCheckbox = '<div class="col-sm-2 col-sm-10"><input type="checkbox" id="attribute-people-cog-visible_' + suffix + '" value="Visible"> Visible</div>';

        }

        var fullSortableAppendPeople = '<li class="ui-state-default" ><span><img src="images/sortable.png" alt="sort-icon" width="30"  height="30";> </span>' + peopleAttNameForSortable + visibleCheckbox + '</li>';

        $("#sortable-people").append(fullSortableAppendPeople);

         }

    
}); 


var attPosCount = 0;
$('#add-attribute-position-cog').click(function () {
    console.log('add-attribute-position-cog');
    attPosCount++;

    var table = $(this).closest('form');
    if (table.find('input:text').length < 100) {   // The <20 is how many fields u wanna add of inputs
    table.append('<div class="form-group"><div class="col-sm-2 col-sm-10"> <input type="text" class="form-control" id="new-attribute-position-cog-name_' + attPosCount + '" placeholder="Input Attribute Name"/> </div> <div class="col-sm-2 col-sm-10"><label id="new-attribute-position-cog-visible_' + attPosCount + '"><input type="checkbox" id="new-attribute-position-cog-check-visible_' + attPosCount + '" value="Visible"> Visible</label></div></div>');
    }
    
});

var attPeopleCount = 0;
$('#add-attribute-people-cog').click(function () {
    console.log('add-attribute-people-cog');
    attPeopleCount++;

    var table = $(this).closest('form');
    if (table.find('input:text').length < 100) {   // The <20 is how many fields u wanna add of inputs
    table.append('<div class="form-group"><div class="col-sm-2 col-sm-10"> <input type="text" class="form-control" id="new-attribute-people-cog-name_' + attPeopleCount + '" placeholder="Input Attribute Name"/> </div> <div class="col-sm-2 col-sm-10"><label id="new-attribute-people-cog-visible_' + attPeopleCount + '"><input type="checkbox" id="new-attribute-people-cog-check-visible_' + attPeopleCount + '" value="Visible"> Visible</label></div></div>');
    }
});

$('#cog-close').click(function(){
    console.log('cog-close');

    $("#sortable").empty();
    $("#sortable-people").empty();

    $("#position-cog-form")[0].reset();
    $("#people-cog-form")[0].reset();

    // Clear the Adding Attributes form for Position
    for(var i = 1; i <= attPosCount; i++ )
    {
        $('#new-attribute-position-cog-name_' + i).remove();
        $('#new-attribute-position-cog-visible_' + i).remove();
    }


    // Clear the Adding Attributes form for People
    for(var i = 1; i <= attPeopleCount; i++ )
    {
        $('#new-attribute-people-cog-name_' + i).remove();
        $('#new-attribute-people-cog-visible_' + i).remove();
    }

    // Resetting the attCount Variables
    attPosCount = 0;
    attPeopleCount = 0;

    

    //var removePositionName = 'new-attribute-position-cog-name_';
   // $(":contains(removePositionName)").remove();
    
    //document.getElementById('edit-position-att-form').reset();   ALSO WORKS!!
    // document.getElementById('position-cog-form').reset();
    // document.getElementById('people-cog-form').reset();
    $('#attributes-cog-modal').modal('hide');

}); 

$('#add-cog-confirm').click(function(){
    console.log('cog-confirm');
    var posAttributesPreload = [];
    var posAttributes = [];
    var peopleAttributes = [];

    // // loading the preloaded position attributes into the array to load into the attrData to send 
    // for (var i = 1; i <= posAttPreloadCount; ++i) {

    //     var keyName = document.getElementById('attribute-position-cog-name_'+ i);
    //     var order = i;
    //     var checkboxElement = 'attribute-position-cog-visible_' + i;
    //     var visible = false;
        
    //     //if($('#' + checkboxElement).prop('checked'))
    //     //if(document.getElementById(checkboxElement).checked) 
    //     if(document.getElementById(checkboxElement).checked) 
    //     {
    //         visible = 'true';
    //     } else {
    //         visible = 'false';
    //     }


    //     posAttributes[i-1] = {  // -1 to start at index 0
    //         "key": keyName.value,
    //         "order": order, 
    //         "is_visible": visible
    //     };;
    // }

    // loading the new position attributes into the array to load into the attrData to send 
    for (var i = 1; i <= attPosCount; ++i) {


        var keyName = document.getElementById('new-attribute-position-cog-name_'+ i);
        var order = posAttPreloadCount + i; // To increment past since it is after the preloaded attributes
        var checkboxElement = 'new-attribute-position-cog-check-visible_' + i;
        var visible = false;
        
        //if($('#' + checkboxElement).prop('checked'))
        //if(document.getElementById(checkboxElement).checked) 
        if(document.getElementById(checkboxElement).checked) 
        {
            visible = 'true';
        } else {
            visible = 'false';
        }


        posAttributes[i -1] = {    // Adds after the preloaded loop above , -1 because index starts at 0
            "key": keyName.value,
            "order": order, 
            "is_visible": visible
        };;
    }

    // loading the preloaded people attributes into the array to load into the attrData to send 
    // for (var i = 1; i <= peopleAttPreloadCount; ++i) {

    //     var keyName = document.getElementById('attribute-people-cog-name_'+ i);
    //     var order = i;
    //     var checkboxElement = 'attribute-people-cog-visible_' + i;
    //     var visible = false;
        
    //     //if($('#' + checkboxElement).prop('checked'))
    //     //if(document.getElementById(checkboxElement).checked) 
    //     if(document.getElementById(checkboxElement).checked) 
    //     {
    //         visible = 'true';
    //     } else {
    //         visible = 'false';
    //     }


    //     peopleAttributes[i-1] = {  // -1 to start at index 0
    //         "key": keyName.value,
    //         "order": order, 
    //         "is_visible": visible
    //     };;
    // }

    // loading the new people attributes into the array to load into the attrData to send 
    for (var i = 1; i <= attPeopleCount; ++i) {


        var keyName = document.getElementById('new-attribute-people-cog-name_'+ i);
        var order = peopleAttPreloadCount + i; // To increment past since it is after the preloaded attributes
        var checkboxElement = 'new-attribute-people-cog-check-visible_' + i;
        var visible = false;
        
        //if($('#' + checkboxElement).prop('checked'))
        //if(document.getElementById(checkboxElement).checked) 
        if(document.getElementById(checkboxElement).checked) 
        {
            visible = 'true';
        } else {
            visible = 'false';
        }


        peopleAttributes[i-1] = {    // Adds after the preloaded loop above  , -1 because index starts at 0
            "key": keyName.value,
            "order": order, 
            "is_visible": visible
        };;
    }

    var attrData = {
        "position": posAttributes, 
        "person": peopleAttributes
    };

    clearAndUpdateAttributes(attrData);

    //---------------------------------------------- Code Under basically clears the cog like the close button 

    $("#sortable").empty();
    $("#sortable-people").empty();

    $("#position-cog-form")[0].reset();
    $("#people-cog-form")[0].reset();

    // Clear the Adding Attributes form for Position
    for(var i = 1; i <= attPosCount; i++ )
    {
        $('#new-attribute-position-cog-name_' + i).remove();
        $('#new-attribute-position-cog-visible_' + i).remove();
    }


    // Clear the Adding Attributes form for People
    for(var i = 1; i <= attPeopleCount; i++ )
    {
        $('#new-attribute-people-cog-name_' + i).remove();
        $('#new-attribute-people-cog-visible_' + i).remove();
    }

    // Resetting the attCount Variables
    attPosCount = 0;
    attPeopleCount = 0;

    $('#attributes-cog-modal').modal('hide');

});


// For the sortable attribute Cog
$( function() {
    $( "#sortable" ).sortable();
    $( "#sortable" ).disableSelection();
  } );

$( function() {
    $( "#sortable-people" ).sortable();
    $( "#sortable-people" ).disableSelection();
} );


    
