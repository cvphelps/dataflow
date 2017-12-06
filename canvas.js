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

function drawSensor(sensor, text) {
  sensor.add(new Konva.Tag({
    fill: teal,
    cornerRadius: 20
  }));
  sensor.add(new Konva.Text({
    text: text,
    fontSize: 14,
    fill: 'white',
    align: 'center',
    width: 140,
    padding: 10
  }));
}

// Build Sensor Sidebar
  var sensorBar = new Konva.Layer();
  stage.add(sensorBar);
  // Bounding Box
  var sensorBox = new Konva.Rect({ x:995, y:1, width:300, height:748, fill:'white', stroke:teal, strokeWidth:3 });
  sensorBar.add(sensorBox);
  // temperature
  var temperature = new Konva.Label({ x: 1000, y: 20 });
  drawSensor(temperature, 'temperature');
  sensorBar.add(temperature);
  // humidity
  var humidity = new Konva.Label({ x: 1150, y: 20 });
  drawSensor(humidity, 'humidity');
  sensorBar.add(humidity);
  // light
  var light = new Konva.Label({ x: 1000, y: 60 });
  drawSensor(light, 'light');
  sensorBar.add(light);
  // CO2
  var CO2 = new Konva.Label({ x: 1150, y: 60 });
  drawSensor(CO2, 'CO2');
  sensorBar.add(CO2);
  // soil moisture
  var soilMoisture = new Konva.Label({ x: 1000, y: 100 });
  drawSensor(soilMoisture, 'soil moisture');
  sensorBar.add(soilMoisture);
  // wet temperature
  var wetTemperature = new Konva.Label({ x: 1150, y: 100 });
  drawSensor(wetTemperature, 'wet temp');
  sensorBar.add(wetTemperature);
  sensorBar.draw();

// Build Logic Sidebar
  var logicBar = new Konva.Layer();
  stage.add(logicBar);
  // bounding box
  var logicBox = new Konva.Rect({ x:995, y:1, width:300, height:748, fill:'white', stroke:greenery, strokeWidth:3 });
  logicBar.add(logicBox);
  // number
  var number = new Konva.Label({ x: 1000, y: 20 });
  drawSensor(number, 'number');
  logicBar.add(number);

  logicBar.draw();

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
    console.log(text + " tab clicked!");
    // sidebar.stroke(color);
    // bar.draw();
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