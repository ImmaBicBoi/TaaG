console.log('starting requests');

function loadAllPersons(){
    $.getJSON( "http://localhost:8080/Taag/service/person", function( data ) {
        var items = [];
        items.push(data.message);
        $.each( data.persons, function( key, val ) {
          items.push( "<li >" + data.persons[key].person_id + ": " + 
          data.persons[key].first_name+ " " +
          data.persons[key].last_name+ "</li>" );
        });
       
        $( "<ul/>", {
          "class": "my-new-list",
          html: items.join( "" )
        }).appendTo( "body" );
      });
}