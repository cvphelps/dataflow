var stage = new Konva.Stage({
  container: 'container',
  // scale appropriate for Chromebook
  width: 1300,
  height: 750
});

// Add Layer
var layer = new Konva.Layer();
stage.add(layer);

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


function buildSensors(sensorsBar) {
  drawSidebar(sensorsBar, greenery);
  var sensorsY = 20;
  sensorsArray.forEach(function(item) {
    drawDraggable(sensorsBar, 1010, sensorsY, teal, item);
    sensorsY += 40;
  });
  sensorsBar.draw();
  sensorsBar.hide();
}

// Build Sensors Sidebar
  var sensorsBar = new Konva.Layer();
  stage.add(sensorsBar);
  buildLogic(sensorsBar);

// Build Logic Sidebar
  var logicBar = new Konva.Layer();
  stage.add(logicBar);
  buildLogic(logicBar);

// Build Actuators Sidebar
  var actBar = new Konva.Layer();
  stage.add(actBar);
  buildActuators(actBar);

// Build Data Sidebar
  var dataBar = new Konva.Layer();
  stage.add(dataBar);
  buildData(dataBar);

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
    actBar.hide();
    dataBar.hide();
    statusBar.hide();
    if (text === 'sensors') {
      sensorBar.show();
    } else if (text === 'logic') {
      logicBar.show();
    } else if (text === 'actuators') {
      actBar.show();
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