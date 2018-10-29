console.log('starting requests');

function loadAllPersons(){
  console.log('loading persons from API');
    $.getJSON( "http://localhost:8080/Taag/service/person", function( data ) {
        var items = [];
       // items.push(data.message);
        $.each( data.persons, function( key, val ) {
          items.push( "<li >" + data.persons[key].person_id + ": " + 
          data.persons[key].first_name+ " " +
          data.persons[key].last_name+ "</li>" );

          $("<li/>", {
              html: data.persons[key].person_id + ": " + 
              data.persons[key].first_name+ " " +
              data.persons[key].last_name
            }).click(function (event){
                openPersonsTab(data.persons[key].person_id,data.persons[key].first_name,data.persons[key].last_name);
                console.log("testing "+ data.persons[key].first_name);
            }).appendTo("#tab-2 ul");

          
        });
       
        // $( "<ul/>", {
        //   "class": "list-unstyled draggable-list",
        //   "id": "people-list",
        //   html: items.join( "" )
        // }).appendTo( "#tab-2" );
      });
}