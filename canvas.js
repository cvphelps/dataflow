// Colors
const teal = '#2D758C';
const greenery = '#90BC57';
const brick = '#D95E27';
const gold = '#E8A723';
const white = '#ffffff';


var stage = new Konva.Stage({
  container: 'container',
  width: 1400,
  height: 800
});

// Add Layer
var layer = new Konva.Layer();
stage.add(layer);

// Create Sidebars
var sensorSidebar = new Konva.Layer();
stage.add(sensorSidebar);

var sidebarBox = new Konva.Rect({ x:1000, y:0, width:300, height:800, fill:'white', stroke:'gray', strokeWidth:1 });
sensorSidebar.add(sidebarBox);
sensorSidebar.draw();

// Create Sensors Tab
function drawTab(label, color, text) {
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