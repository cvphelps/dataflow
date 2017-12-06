function drawSidebar(layer, color) {
  var box = new Konva.Rect({ 
  	x:1000, 
  	y:1, 
  	width:220, 
  	height:748,
  	fill:'white', 
  	stroke:color, 
  	strokeWidth:3 
  });
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

function buildSensors(sensorsBar) {
  drawSidebar(sensorsBar, greenery);
  var sensorsY = 20;
  sensorsArray.forEach(function(item) {
    drawDraggable(sensorsBar, 1010, sensorsY, teal, item);
    sensorsY += 40;
  });
  sensorsBar.draw();
}

function buildLogic(logicBar) {
  drawSidebar(logicBar, greenery);
  var logicY = 20;
  logicArray.forEach(function(item) {
    drawDraggable(logicBar, 1010, logicY, greenery, item);
    logicY += 40;
  });
  logicBar.draw();
  logicBar.hide();
}

function buildActuators(actBar) {
  drawSidebar(actBar, brick);
  var actY = 20;
  actuatorArray.forEach(function(item) {
    drawDraggable(actBar, 1010, actY, brick, item);
    actY += 40;
  });
  actBar.draw();
  actBar.hide();
}

function buildData(dataBar) {
  drawSidebar(dataBar, gold);
  dataBar.draw();
  dataBar.hide();
}