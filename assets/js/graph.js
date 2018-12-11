//Creates XML doc
var xmlDoc = mxUtils.createXmlDocument();

// Creates the model and the graph inside the container
// using the fastest rendering available on the browser
var model = new mxGraphModel();
var graph = new mxGraph(document.getElementById('graphContainer'), model);

// Creates the div for the toolbars
var tbPositionContainer = document.getElementById('position-list');
var tbPersonContainer = document.getElementById('people-list');


//zoomin button
$('#zoomin-btn').click(function(){
    graph.zoomIn();
    console.log('zoomin clicked.');
   
});
//zoomout button
$('#zoomout-btn').click(function(){
    graph.zoomOut();
    console.log('zoomout clicked.');
    
});

//************************************************************
//enable panning
graph.setCellsMovable(false);
graph.setAutoSizeCells(true);
graph.setPanning(true);
graph.centerZoom = false;
graph.panningHandler.useLeftButtonForPanning = true;

//*************************************************************

				
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
			document.getElementById('delete-cell-btn').disabled = true;
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

//Jay and Nikhil
$('#delete-cell-btn').click(function(){
	
	// graph.setSelectionCell(cell);

	var cells = graph.getSelectionCells();

	for(var i = 0; i < cells.length; i++){

		if(cells[i].value.type == "person"){
			console.log("deleting cell inside " +cells[i].value.parent_id);
			var positionID = cells[i].value.parent_id;
			var parentName = cells[i].getParent().getValue().split(" ");
			if(positionID > 0){
				updateRelationship(0, positionID);
				
				openPositionsTab(positionID,parentName[1],0);


			}else{
				alert("An error occured. Could Not Update relationship.");
				document.getElementById('delete-cell-btn').disabled = true;
				return;
			}
		}
	}
	
	graph.removeCells(cells);
     savetheGraph();
	document.getElementById('delete-cell-btn').disabled = true;
	
});

function initializeGraph(container){
            // -------------------- mxGraph initialization ------------------------------------ //
            // Checks if the browser is supported
            // Defines an icon for creating new connections in the connection handler.
			// This will automatically disable the highlighting of the source vertex.
		//	mxConnectionHandler.prototype.connectImage = new mxImage('images/connector.gif', 16, 16);
		
			// Checks if browser is supported
			if (!mxClient.isBrowserSupported())
			{
				// Displays an error message if the browser is
				// not supported.
				mxUtils.error('Browser is not supported!', 200, false);
			}
			else
			{
				
				
				// Table icon dimensions and position
				mxSwimlane.prototype.imageSize = 20;
				mxSwimlane.prototype.imageDx = 16;
				mxSwimlane.prototype.imageDy = 4;
				
				// Changes swimlane icon bounds
				mxSwimlane.prototype.getImageBounds = function(x, y, w, h)
				{
					return new mxRectangle(x + this.imageDx, y + this.imageDy, this.imageSize, this.imageSize);
				};
				
				
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
					document.getElementById('delete-cell-btn').disabled = false;
				};
				// Enables new connections in the graph
				graph.setConnectable(true);
				graph.setMultigraph(false);
				graph.setCellsResizable(false);
				// Adds all required styles to the graph (see below)
		configureStylesheet(graph);
        // Enables new connections in the graph
        graph.setConnectable(true);
		graph.setMultigraph(false);
		//disables swimlane nesting
		graph.swimlaneNesting = false;

		//---- Position Swimlane
		// Specifies shadow opacity, color and offset
		mxConstants.SHADOW_OPACITY = 0.5;
		mxConstants.SHADOWCOLOR = '#C0C0C0';
		mxConstants.SHADOW_OFFSET_X = 5;
		mxConstants.SHADOW_OFFSET_Y = 6;

		// Table icon dimensions and position
		mxSwimlane.prototype.imageSize = 20;
		mxSwimlane.prototype.imageDx = 16;
		mxSwimlane.prototype.imageDy = 4;
		// Changes swimlane icon bounds
		mxSwimlane.prototype.getImageBounds = function(x, y, w, h)
		{
			return new mxRectangle(x + this.imageDx, y + this.imageDy, this.imageSize, this.imageSize);
		};

		// Does not allow dangling edges
		graph.setAllowDanglingEdges(false);

		// Only tables are movable
		graph.isCellMovable = function(cell)
		{
			return this.isSwimlane(cell);
		};

		// Columns are dynamically created HTML labels
		graph.isHtmlLabel = function(cell)
		{
			return !this.isSwimlane(cell) &&
				!this.model.isEdge(cell);
		};
		//---- Mouse events for MxIconSet
		graph.addListener(mxEvent.CLICK, function (sender, evt) {

			var cell = evt.getProperty("cell"); // cell may be null
			if (cell != null) {
				// SelectGraphCell(cell);
				graph.setSelectionCell(cell);
				if(cell.value.type == "attribute"){
					document.getElementById('delete-cell-btn').disabled= true;
				}else{
					document.getElementById('delete-cell-btn').disabled= false;
				}
				console.log("testing. is this cell a position?:" + graph.isSwimlane(cell) + " and this cell has " + cell.getChildCount() + " children");
			}else
			document.getElementById('delete-cell-btn').disabled = true;
			evt.consume();
		});


				
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
				var checkCell = me.getCell();
				if(checkCell != null && checkCell.value.type == "attribute"){
					var tmp = graph.view.getState(null);
				}else{
					var tmp = graph.view.getState(me.getCell());

				}
				
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

		// Creates a dynamic HTML label for column fields
		graph.getLabel = function(cell)
		{
			if (this.isHtmlLabel(cell))
			{
				if(getCurrentCell() != null){
					var label = "("+getCurrentCell().value.person_id + ") "+ getCurrentCell().value.name;
				}else var label = ''+ mxUtils.htmlEntities(cell.value.name, false);
				console.log("label looks like: " + label + mxUtils.htmlEntities(cell.value.name, false) + cell.value.name);
				return (label);
			}
			
			return mxGraph.prototype.getLabel.apply(this, arguments); // "supercall"
		};

		// Returns the name field of the user object for the label
		graph.convertValueToString = function(cell)
		{
			console.log("convert value to string");
			if (cell.value != null && cell.value.name != null)
			{
				return cell.value.name;
			}
			return mxGraph.prototype.convertValueToString.apply(this, arguments); // "supercall"
		};

	}
}

function addPositionVertex(icon, w, h, style, data, key)
		{
			var tableObject = new Table('TABLENAME');
			var vertex = new mxCell(tableObject , new mxGeometry(0, 0, 200, 60), 'table');
			vertex.setVertex(true);

			addPositionToolbarItem(graph, posToolbar, vertex, icon, data, key);
		};
		
function addPersonVertex(icon, w, h, style, data, key)
		{
			// Adds sidebar icon for the column object
			var columnObject = new Column('COLUMNNAME');
			var vertex = new mxCell(columnObject, new mxGeometry(0, 0, 200, 26), style);
			vertex.setVertex(true);
			vertex.setConnectable(false);

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
				var posValue = data.positions[key].position_id +" "+ data.positions[key].name;
                if (checkIfPositionExists(posValue)){
                    alert("Position already exists in the graph");
                   // $('#messages').html("Position already exists in the graph");
                    return;
                }
				graph.stopEditing(false);
				var pt = graph.getPointForEvent(evt);
				var vertex = graph.getModel().cloneCell(prototype);
				vertex.geometry.x = pt.x;
				vertex.geometry.y = pt.y;
				graph.model.setValue(vertex, data.positions[key].position_id +" "+ data.positions[key].name);
				mxGraph.prototype.isCellsEditable = false;
				
				graph.setSelectionCells(graph.importCells([vertex], 0, 0, cell));
				//alert("TEST");
				updateGraphElements();
				openPositionsTab(data.positions[key].position_id,data.positions[key].name,data.positions[key].person_id);

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
				document.getElementById('delete-cell-btn').disabled = true;
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
		var parent = graph.getDefaultParent();
		var isTable = graph.isSwimlane(prototype);
		var name = data.persons[key].first_name + " " + data.persons[key].last_name;
		if (!isTable)
		{
			parent = cell;
			if (cell == null) {
                //$('#messages').html("Please drag person into Position correctly!");
				alert("Please drag person into Position correctly!");
				return;
			}
			var parentID = parent.getValue().split(" ");
            newPersonColumn(parent, name, data.persons[key].person_id);
			openPositionsTab(parentID[0],parentID[1],data.persons[key].person_id);
            // var pstate = graph.getView().getState(parent);
			// var childCount = graph.model.getChildCount(parent);
			// if (parent == null || pstate == null)
			// {
			// 	//mxUtils.alert('Drop target must be a table');
			// 	return;
			// }
			// if (childCount > 0)
			// {
			// 	//mxUtils.alert('Drop target is full');
			// 	return;
			// }
            //
			// pt.x -= pstate.x;
			// pt.y -= pstate.y;
			// var columnCount = graph.model.getChildCount(parent)+1;
			//parentPos = graph.
			//parent.setGeometry(new mxGeometry(pstate.x, pstate.y, 200, 60));
			//parent.imageSize = 50;
			//name = mxUtils.prompt('Enter name for new column', 'COLUMN'+columnCount);
		}
        //
		// if (name != null)
		// 		{
		// 			var v1 = model.cloneCell(vertex);
		//
		// 			model.beginUpdate();
		// 			try
		// 			{
		// 				v1.value.name = name;
		// 				v1.value.person_id = data.persons[key].person_id;
		// 				v1.geometry.x = pt.x;
		// 				v1.geometry.y = pt.y;
		// 				console.log("just dropped person with id: "+ v1.value.person_id + " and name " + v1.value.name);
		// 				//graph.addCell(v1, parent);
		// 				setCurrentCell(v1);
		// 				if (isTable)
		// 				{
		// 					v1.geometry.alternateBounds = new mxRectangle(0, 0, v1.geometry.width, v1.geometry.height);
		// 					v1.children[0].value.name = name + '_ID';
		// 					//parent.insert(v1);
		// 					//graph.addCell(v1, parent);
		// 				}
		// 			}
		// 			finally
		// 			{
		// 				model.endUpdate();
		// 			}
		//
		// 			graph.setSelectionCell(v1);
		// 		}
        //
        //
		// vertex.geometry.x = pt.x;
		// vertex.geometry.y = pt.y;
		// graph.model.setValue(vertex, data.persons[key].first_name + " " + data.persons[key].last_name);
		// mxGraph.prototype.isCellsEditable = false;
		// //console.log("dropped person: " + data.persons[key].first_name + " " + data.persons[key].last_name);
		//
		//
		// graph.setSelectionCells(graph.importCells([vertex], 0, 0, cell));
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
                document.getElementById('delete-cell-btn').disabled = true;
	});
	$(img).addClass("draggable-list-button");
}	




$('#save-graph-btn').click(function(){
	savetheGraph();
});

function savetheGraph(){
	var encoder  = new mxCodec();
	var node = encoder.encode(graph.getModel());
	var xmlText = (new XMLSerializer()).serializeToString(node);
	console.log('save graph clicked.' + xmlText);
	var graphData = {
		"name": "Fairfield Univ",
		"data": xmlText

	}
	saveGraph(graphData);
}


function loadGraphInitially(data){

	console.log("inside loadGrpahIntially.");
	var xml = data;
	console.log(xml);

    var doc = mxUtils.parseXml(xml);
    var codec = new mxCodec(doc);
    codec.decode(doc.documentElement, graph.getModel());
    graph.refresh();
}   


// Defines the table user object
function Table(name)
{
	this.name = name;
};

Table.prototype.clone = function()
{
	return mxUtils.clone(this);
};
// Defines the column user object
function Column(name)
{
	this.name = name;
};
Column.prototype.type = 'TEXT';

Column.prototype.defaultValue = null;

Column.prototype.person_id = 0;

Column.prototype.parent_id = 0;

Column.prototype.autoIncrement = false;

Column.prototype.notNull = false;

Column.prototype.unique = false;

Column.prototype.clone = function()
{
	return mxUtils.clone(this);
};




function configureStylesheet(graph)
		{
			var style = new Object();
			style[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_RECTANGLE;
			style[mxConstants.STYLE_PERIMETER] = mxPerimeter.RectanglePerimeter;
			style[mxConstants.STYLE_ALIGN] = mxConstants.ALIGN_LEFT;
			style[mxConstants.STYLE_VERTICAL_ALIGN] = mxConstants.ALIGN_MIDDLE;
			style[mxConstants.STYLE_FONTCOLOR] = '#000000';
			style[mxConstants.STYLE_FONTSIZE] = '11';
			style[mxConstants.STYLE_FONTSTYLE] = 0;
			style[mxConstants.STYLE_SPACING_LEFT] = '4';
			style[mxConstants.STYLE_IMAGE_WIDTH] = '48';
			style[mxConstants.STYLE_IMAGE_HEIGHT] = '48';
			graph.getStylesheet().putDefaultVertexStyle(style);
			style = new Object();
			style[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_SWIMLANE;
			style[mxConstants.STYLE_PERIMETER] = mxPerimeter.RectanglePerimeter;
			style[mxConstants.STYLE_ALIGN] = mxConstants.ALIGN_CENTER;
			style[mxConstants.STYLE_VERTICAL_ALIGN] = mxConstants.ALIGN_TOP;
			style[mxConstants.STYLE_GRADIENTCOLOR] = '#41B9F5';
			style[mxConstants.STYLE_FILLCOLOR] = '#8CCDF5';
			style[mxConstants.STYLE_SWIMLANE_FILLCOLOR] = '#ffffff';
			style[mxConstants.STYLE_STROKECOLOR] = '#1B78C8';
			style[mxConstants.STYLE_FONTCOLOR] = '#000000';
			style[mxConstants.STYLE_STROKEWIDTH] = '2';
			style[mxConstants.STYLE_STARTSIZE] = '28';
			style[mxConstants.STYLE_VERTICAL_ALIGN] = 'middle';
			style[mxConstants.STYLE_FONTSIZE] = '12';
			style[mxConstants.STYLE_FONTSTYLE] = 1;
			//style[mxConstants.STYLE_IMAGE] = 'images/icons48/table.png';
			// Looks better without opacity if shadow is enabled
			//style[mxConstants.STYLE_OPACITY] = '80';
			style[mxConstants.STYLE_SHADOW] = 1;
			graph.getStylesheet().putCellStyle('table', style);
			style = graph.stylesheet.getDefaultEdgeStyle();
			style[mxConstants.STYLE_LABEL_BACKGROUNDCOLOR] = '#FFFFFF';
			style[mxConstants.STYLE_STROKEWIDTH] = '2';
			style[mxConstants.STYLE_ROUNDED] = true;
			style[mxConstants.STYLE_EDGE] = mxEdgeStyle.TopToBottom;

		};

var currentCell;
function setCurrentCell(cell){
	currentCell = cell;
}

function getCurrentCell(){
	return currentCell;
}

function updateGraphElements(){
	var positions = graph.getChildCells(graph.getDefaultParent(), true, true);
	var attr = getVisiblePosAttributes();
	var cellHeight = 60 + (attr.length)*26;
	console.log("new height:" + cellHeight);
	var pstate;
	var positionArr;
	var positionID;
	for (var i = 0; i < positions.length; i++){
		if(graph.isSwimlane(positions[i])){
			pstate = graph.getView().getState(positions[i]);
			positionArr = positions[i].value.split(" ");
			positionID = parseInt(positionArr[0]);
			//console.log(positions[i].value);
			console.log("changing size of cell to accomodate attribute count for ID " + positionID);
			positions[i].setGeometry(new mxGeometry(pstate.x, pstate.y, 200, cellHeight));
			for(var j=0; j < positions[i].getChildCount();j++){
				
				if(positions[i].children[j].value.type == "attribute"){
					positions[i].children[j].value.name = "";
					positions[i].children[j].remove();
				}
				
			}			
			//newColumn(positions[i], "", pstate, 0);
			for(var j = 0; j < attr.length; j++){
				
				// if(positions[i].children != null && positions[i].children[j] != null){
				// 	if(positions[i].children[j].value.type == "attribute"){
				// 		console.log("removing " + positions[i].children[j].value.name + " from "+ positions[i].value);
						
				// 		console.log(positions[i].remove(j));
				// 		//graph.removeCells(positions[i].children[j]);
				// 		//graph.removeCell(positions[i].children[j]);
				// 	}
					
				// }
				console.log("adding " + attr[j].key + " to " + positions[i].value);
				newColumn(positions[i], attr[j].key+ ": "+ findPosValueByKey(positionID,attr[j].key), pstate, j+1);
			}
			graph.getView().clear(positions[i], false, false);
			graph.getView().validate();
		}
	}

}

function newColumn(parent, text, pstate, index){

	var columnObject = new Column(text);
	var vertex = new mxCell(columnObject, new mxGeometry(0, (index)*26, 200, 26), 'shape=rounded');
	vertex.setVertex(true);
	vertex.setConnectable(false);
	vertex.value.name = text;
	vertex.value.type = "attribute";
	var model = graph.getModel();
	graph.addCell(vertex, parent,index);
}

function newPersonColumn(parent, text, personId) {
	var existingChildCount = parent.getChildCount();
	if (checkIfPositionHasPerson(parent)) {
        alert("Person already exists in this Position");
       // $('#messages').html("Person already exists in this Position");
        return;
    }
    if (checkIfPersonExistsInAnotherPosition(personId)) {
        alert("Person already exists in another Position");
       // $('#messages').html("Person already exists in another Position");
        return;
    }
    var columnObject = new Column(text);
    columnObject.person_id = personId;


    var vertex = new mxCell(columnObject, new mxGeometry(0, (existingChildCount+1)*26, 200, 26), 'shape=rounded');
    vertex.setVertex(true);
    vertex.setConnectable(false);
	vertex.value.name = text;
	vertex.value.type = "person";
    var model = graph.getModel();
	graph.addCell(vertex, parent);
	console.log(parent.value);
	var posID = parent.getValue().split(" ");
	vertex.value.parent_id = posID[0];
	updateRelationship(personId, parseInt(posID[0]));
}

function checkIfPositionHasPerson(parent) {
    var existingChildCount = parent.getChildCount();
    for(var i =0; i<existingChildCount; i++) {
        if (parent.children[i].value.person_id != undefined && parent.children[i].value.person_id != 0) {
            return true;
        }
    }
    return false;
}
function checkIfPersonExistsInAnotherPosition(PersonId) {
	var ExistingPersonId = PersonId;
    var existingPositionsNodeCount = graph.getDefaultParent().getChildCount();

    for(var i =0; i<existingPositionsNodeCount;i++){
    	var parent = graph.getDefaultParent().children[i];
    	var childCount = parent.getChildCount();
        for(var j =0; j<childCount; j++) {
            if (parent.children[j].value.person_id != undefined && parent.children[j].value.person_id != 0) {
                if(parent.children[j].value.person_id == ExistingPersonId){
                    return true;
				}
            }
        }

	}
	return false;
}
function checkIfPositionExists(PositionValue){
 var ExistingPos = PositionValue;
    var existingPositionsNodeCount = graph.getDefaultParent().getChildCount();
    for(var i =0; i<existingPositionsNodeCount;i++){
        var position = graph.getDefaultParent().children[i];
        if(position.value ==  ExistingPos){
        	return true;
		}
    }
    return false;
}