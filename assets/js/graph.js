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

            // Nikhil - alter xmlDoc so that the cell thats being removed from the graph
            // gets removed from xmlDoc
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
    // mxUtils.bind(this, function(evt)
    // 	{
    // 		graph.removeCells([state.cell]);
    // 		mxEvent.consume(evt);
    // 		this.destroy();
    // 	})

    console.log("testing delete btn");

});

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
    var onPositionToolbarChange = function(graph, evt, cell)
    {
        graph.stopEditing(false);
        var pt = graph.getPointForEvent(evt);
        var vertex = graph.getModel().cloneCell(prototype);
        vertex.geometry.x = pt.x;
        vertex.geometry.y = pt.y;

        var xmlPositionNode = xmlDoc.createElement('Position');
        xmlPositionNode.setAttribute('position_id',data.positions[key].position_id);
        xmlPositionNode.setAttribute('name',data.positions[key].name);
        graph.model.setValue(vertex, xmlPositionNode);
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

        mxGraph.prototype.isCellsEditable = false;

        graph.setSelectionCells(graph.importCells([vertex], 0, 0, cell));
    }

    // Creates the image which is used as the drag icon (preview)
    var img = posToolbar.addMode(null, null, onPositionToolbarChange);
    mxUtils.setTextContent(img, data.positions[key].position_id + ": " + data.positions[key].name);
    mxUtils.makeDraggable(img, graph, onPositionToolbarChange);


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
    var onPersonToolbarChange = function(graph, evt, cell)
    {
        graph.stopEditing(false);
        var pt = graph.getPointForEvent(evt);
        var vertex = graph.getModel().cloneCell(prototype);
        vertex.geometry.x = pt.x;
        vertex.geometry.y = pt.y;

        var xmlPersonNode = xmlDoc.createElement('Person');
        xmlPersonNode.setAttribute('person_id',data.persons[key].person_id);
        xmlPersonNode.setAttribute('name',data.persons[key].first_name + " " + data.persons[key].last_name );

        graph.model.setValue(vertex, xmlPersonNode);
        mxGraph.prototype.isCellsEditable = false;

        //graph.model.setValue(vertex, data.persons[key].first_name + " " + data.persons[key].last_name);

        graph.setSelectionCells(graph.importCells([vertex], 0, 0, cell));
        //alert("TEST");
    }
    // Creates the image which is used as the drag icon (preview)

    var img = personToolbar.addMode(null, null, onPersonToolbarChange);
    mxUtils.setTextContent(img, data.persons[key].person_id + ": " + data.persons[key].first_name + " " + data.persons[key].last_name);
    mxUtils.makeDraggable(img, graph, onPersonToolbarChange);

    $(img).click(function(){
        openPersonsTab(data.persons[key].person_id,data.persons[key].first_name,data.persons[key].last_name);
        setCurrentID(data.persons[key].person_id);
    });
    $(img).addClass("draggable-list-button");
}

$('#save-graph-btn').click(function(){
	var encoder  = new mxCodec();
	var node = encoder.encode(graph.getModel());
// xml = mxUtils.getXml(node);
    var xmlText = (new XMLSerializer()).serializeToString(node);
    // console.log("xml text is..");
    // console.log(xmlText);
    var ret = xmlText.replace('<mxGraphModel>','');
    var ret2 = ret.replace('</mxGraphModel>','');
    // console.log(ret2);
// var xmlText = new XMLSerializer().serializeToString(xml);
    console.log('save graph clicked.' +ret2);
    var graphData = {
        "name": "Fairfield Univ",
        "data": ret2

    }
    saveGraph(graphData);

});


function loadGraphInitially(data){

    console.log("inside loadGrpahIntially.");
    var xml = data;

// var xml ='<root><mxCell id="0"/><mxCell id="1" parent="0"/><mxCell id="2" value="CEO" style="shape=rounded" vertex="1" parent="1"><mxGeometry x="90" y="110" width="100" height="40" as="geometry"/></mxCell><mxCell id="3" value="Developer" style="shape=rounded" vertex="1" parent="1"><mxGeometry x="70" y="230" width="100" height="40" as="geometry"/></mxCell><mxCell id="4" value="QA Tester" style="shape=rounded" vertex="1" parent="1"><mxGeometry x="170" y="280" width="100" height="40" as="geometry"/></mxCell><mxCell id="5" edge="1" parent="1" source="2" target="3"><mxGeometry relative="1" as="geometry"/></mxCell><mxCell id="6" edge="1" parent="1" source="2" target="4"><mxGeometry relative="1" as="geometry"/></mxCell></root>';
    console.log(xml);

    var doc = mxUtils.parseXml(xml);
    // XmlNode secondPrice = doc.GetElementsByTagName("root")[1];
    // console.log(secondPrice);
    var codec = new mxCodec(doc);
    var elt = doc.documentElement.firstChild;
    // console.log(elt);
    var cells = [];
    while (elt != null){
        cells.push(codec.decodeCell(elt));
        // graph.refresh();
        elt = elt.nextSibling;
        // console.log(cells);
    }

    graph.addCells(cells);

}

graph.convertValueToString = function(cell)
{
    if (mxUtils.isNode(cell.value))
    {
        return cell.getAttribute('name', '')
    }
};

var cellLabelChanged = graph.cellLabelChanged;
graph.cellLabelChanged = function(cell, newValue, autoSize)
{
    if (mxUtils.isNode(cell.value))
    {
        // Clones the value for correct undo/redo
        var elt = cell.value.cloneNode(true);
        elt.setAttribute('name', newValue);
        newValue = elt;
    }

    cellLabelChanged.apply(this, arguments);
};