//Creates XML doc
var xmlDoc = mxUtils.createXmlDocument();

// Creates the model and the graph inside the container
// using the fastest rendering available on the browser
var model = new mxGraphModel();
var graph = new mxGraph(document.getElementById('graphContainer'), model);

// Creates the div for the toolbars
var tbPositionContainer = document.getElementById('position-list');
var tbPersonContainer = document.getElementById('people-list');

				
//document.body.appendChild(tbContainer);
// Creates new toolbar without event processing
var posToolbar = new mxToolbar(tbPositionContainer);
posToolbar.enabled = false;

var personToolbar = new mxToolbar(tbPersonContainer);
personToolbar.enabled = false;



function initializeGraph(container){
            // -------------------- mxGraph initialization ------------------------------------ //
            // Checks if the browser is supported
            // Defines an icon for creating new connections in the connection handler.
			// This will automatically disable the highlighting of the source vertex.
			mxConnectionHandler.prototype.connectImage = new mxImage('images/connector.gif', 16, 16);
		
			// Checks if browser is supported
			if (!mxClient.isBrowserSupported())
			{
				// Displays an error message if the browser is
				// not supported.
				mxUtils.error('Browser is not supported!', 200, false);
			}
			else
			{
				
				
				
				// Creates the div for the graph
				
				
				// Workaround for Internet Explorer ignoring certain styles
				if (mxClient.IS_QUIRKS)
				{
					document.body.style.overflow = 'hidden';
					new mxDivResizer(tbPositionContainer);
					new mxDivResizer(tbPersonContainer);
					new mxDivResizer(container);
				}
	
				
				graph.dropEnabled = true;
				
				// Matches DnD inside the graph
				mxDragSource.prototype.getDropTarget = function(graph, x, y)
				{
					var cell = graph.getCellAt(x, y);
					
					if (!graph.isValidDropTarget(cell))
					{
						cell = null;
					}
					
					return cell;
				};
				// Enables new connections in the graph
				graph.setConnectable(true);
				graph.setMultigraph(false);
				// Stops editing on enter or escape keypress
				var keyHandler = new mxKeyHandler(graph);
				var rubberband = new mxRubberband(graph);
				
				
				
                
                //UNCOMMENT HERE
				// addVertex($('#position-list').append('<div></div>'), 120, 160, 'shape=rounded;', 23, "yoo");
				// addVertex($('#position-list').append('<div></div>'), 100, 40, '', 345, "ewds");
				// addVertex('editors/images/rounded.gif', 100, 40, 'shape=rounded');
				// addVertex('editors/images/ellipse.gif', 40, 40, 'shape=ellipse');
				// addVertex('editors/images/rhombus.gif', 40, 40, 'shape=rhombus');
				// addVertex('editors/images/triangle.gif', 40, 40, 'shape=triangle');
				// addVertex('editors/images/cylinder.gif', 40, 40, 'shape=cylinder');
				// addVertex('editors/images/actor.gif', 30, 40, 'shape=actor');
				// toolbar.addLine();
				
				
																	
			}
        }

function addPositionVertex(icon, w, h, style, data, key)
		{
			var vertex = new mxCell(null, new mxGeometry(0, 0, w, h), style);
			vertex.setVertex(true);
			
			addPositionToolbarItem(graph, posToolbar, vertex, icon, data, key);
		};
		
function addPersonVertex(icon, w, h, style, data, key)
		{
			var vertex = new mxCell(null, new mxGeometry(0, 0, w, h), style);
			vertex.setVertex(true);
			
			addPersonToolbarItem(graph, personToolbar, vertex, icon, data, key);
		};

function makeDraggable(){
   $( ".draggable-list" ).sortable();
   //$( ".draggable-list" ).droppable();

    $( "#graphContainer" ).droppable({
        drop: function( event, ui ) {
          $( this )
            .addClass( "dropped" );
            //insertCell(graph, , )
            graph.insertVertex(parent, null, 'CEO,', 20, 20, 80, 30);
        }
      });
}

function addPositionToolbarItem(graph, posToolbar, prototype, image, data, key)
		{
			// Function that is executed when the image is dropped on
			// the graph. The cell argument points to the cell under
			// the mousepointer if there is one.
			var funct = function(graph, evt, cell)
			{
				graph.stopEditing(false);
				var pt = graph.getPointForEvent(evt);
				var vertex = graph.getModel().cloneCell(prototype);
				vertex.geometry.x = pt.x;
				vertex.geometry.y = pt.y;
				graph.model.setValue(vertex, data.positions[key].name);
				mxGraph.prototype.isCellsEditable = false;
				
				graph.setSelectionCells(graph.importCells([vertex], 0, 0, cell));
				//alert("TEST");
			}
			// Creates the image which is used as the drag icon (preview)
            var img = posToolbar.addMode(null, null, funct);
            mxUtils.setTextContent(img, data.positions[key].position_id + ": " + data.positions[key].name);
			mxUtils.makeDraggable(img, graph, funct);
			var xmlpos = xmlDoc.createElement('Position');
			xmlpos.setAttribute('id',data.positions[key].position_id);
			xmlpos.setAttribute('name',data.positions[key].name);
			// var test = toolbar.addItem(val, null, tryClick);

			// var tryClick = function(){
			// 	console.log('yo');
			// 	alert('yo');
			// }
			
			$(img).click(function(){
				openPositionsTab(data.positions[key].position_id,
                    data.positions[key].name,
                    data.positions[key].person_id);
				setCurrentID(data.positions[key].position_id);
			});
			$(img).addClass("draggable-list-button");
		}



function addPersonToolbarItem(graph, personToolbar, prototype, image, data, key)
{
	// Function that is executed when the image is dropped on
	// the graph. The cell argument points to the cell under
	// the mousepointer if there is one.
	var funct = function(graph, evt, cell)
	{
		graph.stopEditing(false);
		var pt = graph.getPointForEvent(evt);
		var vertex = graph.getModel().cloneCell(prototype);
		vertex.geometry.x = pt.x;
		vertex.geometry.y = pt.y;
		graph.model.setValue(vertex, data.persons[key].first_name + " " + data.persons[key].last_name);
		mxGraph.prototype.isCellsEditable = false;
		
		graph.setSelectionCells(graph.importCells([vertex], 0, 0, cell));
		//alert("TEST");
	}
	// Creates the image which is used as the drag icon (preview)
	var img = personToolbar.addMode(null, null, funct);
	mxUtils.setTextContent(img, data.persons[key].person_id + ": " + data.persons[key].first_name + " " + data.persons[key].last_name);
	mxUtils.makeDraggable(img, graph, funct);
	var xmlperson = xmlDoc.createElement('Person');
	xmlperson.setAttribute('id',data.persons[key].person_id);
	xmlperson.setAttribute('first_name',data.persons[key].first_name);
	xmlperson.setAttribute('last_name',data.persons[key].last_name);

	
	$(img).click(function(){
		openPersonsTab(data.persons[key].person_id,data.persons[key].first_name,data.persons[key].last_name);
                setCurrentID(data.persons[key].person_id);
	});
	$(img).addClass("draggable-list-button");
}	


