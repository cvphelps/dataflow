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

function drawButton(sensor, text, color) {
  sensor.add(new Konva.Tag({
    fill: color,
    cornerRadius: 20
  }));
  sensor.add(new Konva.Text({
    text: text,
    fontSize: 14,
    fill: 'white',
    align: 'center',
    width: 200,
    padding: 10
  }));
}

// Build Sensor Sidebar
  var sensorBar = new Konva.Layer();
  stage.add(sensorBar);
  // Bounding Box
  var sensorBox = new Konva.Rect({ x:1000, y:1, width:220, height:748, fill:'white', stroke:teal, strokeWidth:3 });
  sensorBar.add(sensorBox);
  // temperature
  var temperature = new Konva.Label({ x: 1010, y: 20, draggable: true });
  drawButton(temperature, 'temperature', teal);
  sensorBar.add(temperature);
  // humidity
  var humidity = new Konva.Label({ x: 1010, y: 60 });
  drawButton(humidity, 'humidity', teal);
  sensorBar.add(humidity);
  // light
  var light = new Konva.Label({ x: 1010, y: 100 });
  drawButton(light, 'light', teal);
  sensorBar.add(light);
  // CO2
  var CO2 = new Konva.Label({ x: 1010, y: 140 });
  drawButton(CO2, 'CO2', teal);
  sensorBar.add(CO2);
  // soil moisture
  var soilMoisture = new Konva.Label({ x: 1010, y: 180 });
  drawButton(soilMoisture, 'soil moisture', teal);
  sensorBar.add(soilMoisture);
  // wet temperature
  var wetTemperature = new Konva.Label({ x: 1010, y: 220 });
  drawButton(wetTemperature, 'wet temp', teal);
  sensorBar.add(wetTemperature);
  
  sensorBar.draw();

// Build Logic Sidebar
  var logicBar = new Konva.Layer();
  stage.add(logicBar);
  // bounding box
  var logicBox = new Konva.Rect({ x:1000, y:1, width:220, height:748, fill:'white', stroke:greenery, strokeWidth:3 });
  logicBar.add(logicBox);
  // number
  var number = new Konva.Label({ x: 1010, y: 20 });
  drawButton(number, 'number', greenery);
  logicBar.add(number);
  // and
  var and = new Konva.Label({ x: 1010, y: 60 });
  drawButton(and, 'and', greenery);
  logicBar.add(and);
  // or
  var or = new Konva.Label({ x: 1010, y: 100 });
  drawButton(or, 'or', greenery);
  logicBar.add(or);
  // greater than
  var greaterThan = new Konva.Label({ x: 1010, y: 140 });
  drawButton(greaterThan, 'greater than', greenery);
  logicBar.add(greaterThan);
  // less than
  var lessThan = new Konva.Label({ x: 1010, y: 180 });
  drawButton(lessThan, 'less than', greenery);
  logicBar.add(lessThan);
  // equal to
  var equalTo = new Konva.Label({ x: 1010, y: 220 });
  drawButton(equalTo, 'equal to', greenery);
  logicBar.add(equalTo);
  // not equal to
  var notEqualTo = new Konva.Label({ x: 1010, y: 260 });
  drawButton(notEqualTo, 'not equal to', greenery);
  logicBar.add(notEqualTo);
  // clock
  var clock = new Konva.Label({ x: 1010, y: 300 });
  drawButton(clock, 'clock', greenery);
  logicBar.add(clock);

  logicBar.draw();
  logicBar.hide();

// Build Actuators Sidebar
  var actuatorsBar = new Konva.Layer();
  stage.add(actuatorsBar);
  // bounding box
  var actuatorsBox = new Konva.Rect({ x:1000, y:1, width:220, height:748, fill:'white', stroke:brick, strokeWidth:3 });
  actuatorsBar.add(actuatorsBox);
  // relay
  var relay = new Konva.Label({ x: 1010, y: 20 });
  drawButton(relay, 'relay', brick);
  actuatorsBar.add(relay);
  // scaled output
  var scaledOutput = new Konva.Label({ x: 1010, y: 60 });
  drawButton(scaledOutput, 'scaled output', brick);
  actuatorsBar.add(scaledOutput);

  actuatorsBar.draw();
  actuatorsBar.hide();

// Build Data Sidebar
  var dataBar = new Konva.Layer();
  stage.add(dataBar);
  // bounding box
  var dataBox = new Konva.Rect({ x:1000, y:1, width:220, height:748, fill:'white', stroke:gold, strokeWidth:3 });
  dataBar.add(dataBox);

  dataBar.draw();
  dataBar.hide();

// Build Status Sidebar
  var statusBar = new Konva.Layer();
  stage.add(statusBar);
  // bounding box
  var statusBox = new Konva.Rect({ x:1000, y:1, width:220, height:748, fill:'white', stroke:'gray', strokeWidth:3 });
  statusBar.add(statusBox);

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