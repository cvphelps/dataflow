// Colors
const teal = '#2D758C';
const greenery = '#90BC57';
const brick = '#D95E27';
const gold = '#E8A723';
const white = '#ffffff';


var stage = new Konva.Stage({
  container: 'container',
  width: window.innerWidth,
  height: window.innerHeight
});

// Add Layer
var layer = new Konva.Layer();
stage.add(layer);

// Create Shape
var box = new Konva.Rect({
  x: 50,
  y: 50,
  width: 100,
  height: 50,
  fill: '#298409',
  stroke: 'black',
  strokeWidth: 10,
  draggable: true
});
layer.add(box);

layer.draw();

// cursor styling
box.on('mouseover', function() {
  document.body.style.cursor = 'pointer';
});
box.on('mouseout', function() {
  document.body.style.cursor = "default";
});