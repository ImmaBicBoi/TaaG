$('#cog-settings-btn').click(function(){
    $('#attributes-cog-modal').modal('show');
    console.log('Attribute Cog clicked.');
    //loadPositions();
}); 


var attPosCount = 0;
$('#add-attribute-position-cog').click(function () {
    console.log('add-attribute-position-cog');
    attPosCount++;

    var table = $(this).closest('form');
    if (table.find('input:text').length < 100) {   // The <20 is how many fields u wanna add of inputs
    table.append('<div class="form-group"><div class="col-sm-2 col-sm-10"> <input type="text" class="form-control" id="new-attribute-position-cog-name_' + attPosCount + '" placeholder="Input Attribute Name"/> </div> <div class="col-sm-2 col-sm-10"><input type="checkbox" name="new-attribute-position-cog-visible_' + attPosCount + '" value="Visible"> Visible</div></div>');
    }
});

var attPeopleCount = 0;
$('#add-attribute-people-cog').click(function () {
    console.log('add-attribute-people-cog');
    attPeopleCount++;

    var table = $(this).closest('form');
    if (table.find('input:text').length < 100) {   // The <20 is how many fields u wanna add of inputs
    table.append('<div class="form-group"><div class="col-sm-2 col-sm-10"> <input type="text" class="form-control" id="new-attribute-people-cog-name_' + attPeopleCount + '" placeholder="Input Attribute Name"/> </div> <div class="col-sm-2 col-sm-10"><input type="checkbox" name="new-attribute-people-cog-visible_' + attPeopleCount + '" value="Visible"> Visible</div></div>');
    }
});

$('#cog-close').click(function(){
    console.log('cog-close');

    $("#position-cog-form")[0].reset();
    $("#people-cog-form")[0].reset();
    //document.getElementById('edit-position-att-form').reset();   ALSO WORKS!!
    document.getElementById('position-cog-form').reset();
    document.getElementById('people-cog-form').reset();
    $('#attributes-cog-modal').modal('hide');

}); 