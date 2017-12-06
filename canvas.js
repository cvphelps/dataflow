// Colors
const teal = '#2D758C';
const greenery = '#90BC57';
const brick = '#D95E27';
const gold = '#E8A723';
const white = '#ffffff';

var stage = new Konva.Stage({
  container: 'container',
  // scale appropriate for Chromebook
  width: 1300,
  height: 750
});

// Add Layer
var layer = new Konva.Layer();
stage.add(layer);

var contents = {};

function drawSidebar(layer, color) {
  var box = new Konva.Rect({ x:1000, y:1, width:220, height:748, fill:'white', stroke:color, strokeWidth:3 });
  layer.add(box);
}

function drawButton(node, text, color) {
  node.add(new Konva.Tag({
    fill: color,
    cornerRadius: 20
  }));
  node.add(new Konva.Text({
    text: text,
    fontSize: 14,
    fill: 'white',
    align: 'center',
    width: 200,
    padding: 10
  }));
}

function drawBlock(node, text, color) {
  node.add(new Konva.Tag({
    fill: color,
    cornerRadius: 20
  }));

  var labelText = new Konva.Text({
    text: text,
    fontSize: 14,
    fill: 'white',
    align: 'center',
    width: 120,
    padding: 10
  });
  node.add(labelText);

  node.on('dblclick', function() {
    console.log('double clicked ' + text);
    var x = node.x();
    var y = node.y();
    // create editable text area
    var textarea = document.createElement('textarea');
    document.body.appendChild(textarea);

    textarea.value = labelText.text();
    textarea.style.position = 'absolute';
    textarea.style.left = x + 'px';
    textarea.style.top = y + 'px';
    textarea.style.width = 100;
    textarea.style.height = 20;
    textarea.style.rows = 1;
    textarea.focus();

    textarea.addEventListener('keydown', function (e) {
      // hide textbox when user presses Enter
      if (e.keyCode === 13) {
        labelText.text(textarea.value);
        layer.draw();
        document.body.removeChild(textarea);
      }
    });
  });
}

function drawDraggable(thisLayer, x, y, color, text) {
  // Static Button
  var static = new Konva.Label({x:x,y:y});
  drawButton(static, text, color);
  thisLayer.add(static);
  // Draggable Button
  var drag = new Konva.Label({x:x,y:y, draggable:true });
  drawButton(drag, text, color);
  thisLayer.add(drag);

  // on dragend, reset draggable button to original location, create new block at destination
  drag.on('dragend', function() {
    if (drag.x() < 1000 && drag.x() > 0 && drag.y() < 750 && drag.y() > 0) {
      console.log("drag and dropped!");
    }
    var newX = drag.x();
    var newY = drag.y();
    console.log("newX: " + newX);
    console.log("newY: " + newY);
    var newBlock = new Konva.Label({x:newX,y:newY, draggable:true});
    drawBlock(newBlock, text, color);
    layer.add(newBlock);
    layer.draw();

    drag.x(x);
    drag.y(y);
    thisLayer.draw();
  });
}

// temperature sensor array
  var temperatureArray = [];

// Build Sensor Sidebar
  var sensorBar = new Konva.Layer();
  stage.add(sensorBar);
  drawSidebar(sensorBar, teal);
  drawDraggable(sensorBar, 1010, 20, teal, 'temperature');
  drawDraggable(sensorBar, 1010, 60, teal, 'humidity');
  drawDraggable(sensorBar, 1010, 100, teal, 'light');
  drawDraggable(sensorBar, 1010, 140, teal, 'CO2');
  drawDraggable(sensorBar, 1010, 180, teal, 'soil moisture');
  drawDraggable(sensorBar, 1010, 220, teal, 'wet temp');
  sensorBar.draw();

// Build Logic Sidebar
  var logicBar = new Konva.Layer();
  stage.add(logicBar);
  drawSidebar(logicBar, greenery);
  drawDraggable(logicBar, 1010, 20, greenery, 'number');
  drawDraggable(logicBar, 1010, 60, greenery, 'and');
  drawDraggable(logicBar, 1010, 100, greenery, 'or');
  drawDraggable(logicBar, 1010, 140, greenery, 'greater than');
  drawDraggable(logicBar, 1010, 180, greenery, 'less than');
  drawDraggable(logicBar, 1010, 220, greenery, 'equal to');
  drawDraggable(logicBar, 1010, 260, greenery, 'not equal to');
  drawDraggable(logicBar, 1010, 300, greenery, 'clock');
  logicBar.draw();
  logicBar.hide();

// Build Actuators Sidebar
  var actuatorsBar = new Konva.Layer();
  stage.add(actuatorsBar);
  drawSidebar(actuatorsBar, brick);
  drawDraggable(actuatorsBar, 1010, 20, brick, 'relay');
  drawDraggable(actuatorsBar, 1010, 60, brick, 'scaled output');
  actuatorsBar.draw();
  actuatorsBar.hide();

// Build Data Sidebar
  var dataBar = new Konva.Layer();
  stage.add(dataBar);
  drawSidebar(dataBar, gold);
  dataBar.draw();
  dataBar.hide();

// Build Status Sidebar
  var statusBar = new Konva.Layer();
  stage.add(statusBar);
  drawSidebar(statusBar, gold);
  statusBar.draw();
  statusBar.hide();

// Create Sensors Tab
function drawTab(label, color, text, sidebar, bar) {
  label.add(new Konva.Tag({
    fill: color,
    cornerRadius: 10
  }));
  label.add(new Konva.Text({
    text: text,
    fontSize: 14,
    fill: 'white',
    align: 'center',
    width: 100,
    padding: 13
  }));
  label.on('click', function() {
    sensorBar.hide();
    logicBar.hide();
    actuatorsBar.hide();
    dataBar.hide();
    statusBar.hide();
    if (text === 'sensors') {
      sensorBar.show();
    } else if (text === 'logic') {
      logicBar.show();
    } else if (text === 'actuators') {
      actuatorsBar.show();
    } else if (text === 'data') {
      dataBar.show();
    } else if (text === 'simulated') {
      statusBar.show();
    } else if (text === 'connected') {
      statusBar.show();
    }
  });
  label.on('mouseover', function() {
    document.body.style.cursor = 'pointer';
  });
  label.on('mouseout', function() {
    document.body.style.cursor = 'default';
  })
}

var tabSensors = new Konva.Label({ x: 10, y: -5 });
var tabLogic = new Konva.Label({ x: 120, y: -5 });
var tabActuators = new Konva.Label({ x: 230, y: -5 });
var tabData = new Konva.Label({ x: 340, y: -5 });
var tabStatus = new Konva.Label({ x: 450, y: -5 });

drawTab(tabSensors, teal, 'sensors');
drawTab(tabLogic, greenery, 'logic');
drawTab(tabActuators, brick, 'actuators');
drawTab(tabData, gold, 'data');
drawTab(tabStatus, gold, 'simulated');

layer.add(tabSensors);
layer.add(tabLogic);
layer.add(tabActuators);
layer.add(tabData);
layer.add(tabStatus);

layer.draw();