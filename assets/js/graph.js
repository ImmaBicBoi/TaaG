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

// Defines a new class for all icons
function mxIconSet(state)
{
	this.images = [];
	var graph = state.view.graph;

	
	// Delete
	var img = mxUtils.createImage('images/delete.png');
	img.setAttribute('title', 'Delete');
	img.style.position = 'absolute';
	img.style.cursor = 'pointer';
	img.style.width = '16px';
	img.style.height = '16px';
	img.style.left = (state.x + state.width) + 'px';
	img.style.top = (state.y - 16) + 'px';
	
	mxEvent.addGestureListeners(img,
		mxUtils.bind(this, function(evt)
		{
			// Disables dragging the image
			mxEvent.consume(evt);
		})
	);
	
	mxEvent.addListener(img, 'click',
		mxUtils.bind(this, function(evt)
		{
			graph.removeCells([state.cell]);
			mxEvent.consume(evt);
			this.destroy();
		})
	);
	
	state.view.graph.container.appendChild(img);
	this.images.push(img);
};

mxIconSet.prototype.destroy = function()
{
	if (this.images != null)
	{
		for (var i = 0; i < this.images.length; i++)
		{
			var img = this.images[i];
			img.parentNode.removeChild(img);
		}
	}
	
	this.images = null;
};

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

				
				// Defines the tolerance before removing the icons
				var iconTolerance = 20;
				// Shows icons if the mouse is over a cell
				graph.addMouseListener(
				{
					currentState: null,
					currentIconSet: null,
					mouseDown: function(sender, me)
					{
						// Hides icons on mouse down
						if (this.currentState != null)
						{
							this.dragLeave(me.getEvent(), this.currentState);
							this.currentState = null;
						}
					},
					mouseMove: function(sender, me)
					{
						if (this.currentState != null && (me.getState() == this.currentState ||
							me.getState() == null))
						{
							var tol = iconTolerance;
							var tmp = new mxRectangle(me.getGraphX() - tol,
								me.getGraphY() - tol, 2 * tol, 2 * tol);
							if (mxUtils.intersects(tmp, this.currentState))
							{
								return;
							}
						}
						
						var tmp = graph.view.getState(me.getCell());
						
						// Ignores everything but vertices
						// if (graph.isMouseDown || (tmp != null && !graph.getModel().isVertex(tmp.cell)))
						// {
						// 	tmp = null;
						// }
						if (tmp != this.currentState)
						{
							if (this.currentState != null)
							{
								this.dragLeave(me.getEvent(), this.currentState);
							}
						
							this.currentState = tmp;
						
							if (this.currentState != null)
							{
								this.dragEnter(me.getEvent(), this.currentState);
							}
						}
					},
					mouseUp: function(sender, me) { },
					dragEnter: function(evt, state)
					{
						if (this.currentIconSet == null)
						{
							this.currentIconSet = new mxIconSet(state);
						}
					},
					dragLeave: function(evt, state)
					{
						if (this.currentIconSet != null)
						{
							this.currentIconSet.destroy();
							this.currentIconSet = null;
						}
					}
				});
				

				// Stops editing on enter or escape keypress
				var keyHandler = new mxKeyHandler(graph);
				var rubberband = new mxRubberband(graph);			
																	
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


