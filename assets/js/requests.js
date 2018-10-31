console.log('starting requests');

function loadAllPersons(){
  $('#people-list li').remove();
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
                setCurrentID(data.persons[key].person_id);
            }).appendTo("#tab-2 ul");


          
        });
      });
}


function loadAllPositions(){
  $('#position-list li').remove();
    console.log('loading positions from API');
      $.getJSON( "http://localhost:8080/Taag/service/position", function( data ) {
          var items = [];
         // items.push(data.message);
          $.each( data.positions, function( key, val ) {
            items.push( "<li >" + data.positions[key].position_id + ": " + 
            data.positions[key].name +"</li>" );
  
            $("<li/>", {
                html: data.positions[key].position_id + ": " + 
                data.positions[key].name
              }).click(function (event){
                  openPositionsTab(
                    data.positions[key].position_id,
                    data.positions[key].name,
                    data.positions[key].person_id);
                    setCurrentID(data.positions[key].position_id);
                  //console.log("testing "+ data.positions[key].attributes);
              }).appendTo("#tab-1 ul");
  
            
          });
        });
  }


  function createPosition(positionData){
    //var data = {'bob':'foo','paul':'dog'};
    console.log("sending data: "+ JSON.stringify(positionData));
    $.ajax({
      url: "http://localhost:8080/Taag/service/position",
      type: 'POST',
      contentType:'application/json',
      data: JSON.stringify(positionData),
      dataType:'json',
      async: false,
      success: function(data,status, jqXHR){
        //On ajax success do this
        //var output = JSON.parse(data);
        //alert(data + " " + status);
        console.log("response"+data.message + " " + jqXHR.status);
          },
      error: function(xhr, ajaxOptions, thrownError) {
          //On error do this
            if (xhr.status == 200) {

                alert(ajaxOptions);
            }
            else {
                alert(xhr.status);
                alert(thrownError);
            }
        }
    });
  }

function createPerson(personData){
    //var data = {'bob':'foo','paul':'dog'};
    console.log("sending data: "+ JSON.stringify(personData));
    $.ajax({
      url: "http://localhost:8080/Taag/service/person",
      type: 'POST',
      contentType:'application/json',
      data: JSON.stringify(personData),
      dataType:'json',
      async: false,
      success: function(data,status, jqXHR){
        //On ajax success do this
        //var output = JSON.parse(data);
        //alert(data + " " + status);
        console.log("response "+data + " " + jqXHR.status);
          },
      error: function(xhr, ajaxOptions, thrownError) {
          //On error do this
            if (xhr.status == 200) {

                alert(ajaxOptions);
            }
            else {
                alert(xhr.status);
                alert(thrownError);
            }
        }
    });
  }