const canvasSketch = require('canvas-sketch');
const { math, random, color } = require('canvas-sketch-util');
const Tweakpane = require('Tweakpane');

let image;

const parentEl = document.getElementById('app-canvas');

const settings = {
  dimensions: [ 2560 * 0.5, 1440 ],
  animate: true,
  parent: parentEl
};

const params = {
  columns: 18,
  rows: 24,
  scaleMin: 2,
  scaleMax: 18,
  frequency: 0.003,
  amplitude: 0.2,
  frame: 0,
  animate: true,
  lineCap: 'round'
}

const imageCanvas = document.createElement('canvas');
const imageContext = imageCanvas.getContext('2d');

const sketch = () => {
  return ({ context, width, height, frame }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    const columns = params.columns;
    const rows = params.rows;
    const cellTotalCount = columns * rows;

    // imageCanvas.width = params.columns;
    // imageCanvas.height = params.rows;

    const gridWidth = width;
    const gridHeight = height;

    const cellWidth = gridWidth / columns; 
    const cellHeight = gridHeight / rows;

    const gridMarginX = (width - gridWidth) * 0.5;
    const gridMarginY = (height - gridHeight) * 0.5;

    imageContext.fillStyle = 'white';
    imageCanvas.width = width;
    imageCanvas.height = height;
    imageContext.drawImage(image, 0, 0, columns, rows);
    const imageData = imageContext.getImageData(0, 0, columns, rows).data;
    // console.log(imageData);
    // context.drawImage(imageCanvas, 0, 0); return;

    for (let i = 0; i < cellTotalCount; i++) {
      const col = i % columns;
      const row = Math.floor(i / columns);

      const x = col * cellWidth;
      const y = row * cellHeight;
      const w = cellWidth * 0.6;
      const h = cellHeight * 0.6;
      const f = (params.animate) ? frame : params.frame;

      const r = imageData[i * 4 + 0];
      const g = imageData[i * 4 + 1];
      const b = imageData[i * 4 + 2];

      // const n = random.noise2D(x + frame * 50, y, params.frequency);
      const n = random.noise3D(x, y, f * 10, params.frequency);
      const angle = n * Math.PI * params.amplitude;
      const scale = math.mapRange(n, -1, 1, params.scaleMin, params.scaleMax);

      context.save();
      context.translate(x, y);
      context.translate(gridMarginX, gridMarginY);
      context.translate(cellWidth * 0.5, cellHeight * 0.5);
      context.rotate(angle);

      context.lineWidth = scale;
      context.lineCap = params.lineCap;

      context.beginPath();
      context.moveTo(w * -0.5, 0);
      context.lineTo(w * 0.5, 0);
      // context.strokeStyle = colors[Math.floor(random.range(0, colors.length))];
      context.strokeStyle = `rgb(${r}, ${g}, ${b})`;
      context.stroke();
      context.restore();
    }
  };
};

const createPane = () => {
  const pane = new Tweakpane.Pane();
  let folder;

  folder = pane.addFolder({ title: 'Grid' });
  folder.addInput(params, 'lineCap', {options: { butt: 'butt', round: 'round', square: 'square' } });
  folder.addInput(params, 'columns', { min: 2, max: 50, step: 1 });
  folder.addInput(params, 'rows', { min: 2, max: 50, step: 1 });
  folder.addInput(params, 'scaleMin', { min: 1, max: 100 });
  folder.addInput(params, 'scaleMax', { min: 1, max: 100 });

  
  folder = pane.addFolder({ title: 'Noise' });
  folder.addInput(params, 'frequency', { min: -0.01, max: 0.01 });
  folder.addInput(params, 'amplitude', { min: 0, max: 1 });
  folder.addInput(params, 'animate');
  folder.addInput(params, 'frame', { min: 0, max: 999 });
}

const getImage = (imageUrl) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = resolve(img);
    img.onerror = reject();
    img.src = imageUrl;
  })
}

const startCanvas = async () => {
  let imageUrl = 'gradient-bg.png';
  image = await getImage(imageUrl);
  canvasManager = await canvasSketch(sketch, settings);
  // console.log(canvasManager);
};

createPane();
startCanvas();
