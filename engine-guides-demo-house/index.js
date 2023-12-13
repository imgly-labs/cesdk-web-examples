import 'https://cdn.img.ly/packages/imgly/cesdk-js/1.19.0/cesdk.umd.js';

const config = {
  license: 'vERESgSXbYj5Rs-FF4DzkMvhdQLh0Mxe6AD8V-doP6wqe_gmYmx_oUKqIlMkwpMu',
  userId: 'guides-user',
  baseURL: 'https://cdn.img.ly/packages/imgly/cesdk-js/1.19.0/assets'
};

CreativeEditorSDK.create('#cesdk_container', config).then(async (instance) => {
  var engine = instance.engine;
  const scene = engine.scene.create();
  const page = engine.block.create('page');
  engine.block.appendChild(scene, page);
  const page_size = { width: 1280, height: 800 };
  const l = page_size.height / 2;
  const thickness = page_size.height / 200;
  engine.block.setWidth(page, page_size.width);
  engine.block.setHeight(page, page_size.height);
  const camera = engine.block.findByType('camera')[0];
  const c = { x: page_size.width / 2, y: page_size.height / 2 };
  engine.block.setPositionX(camera, c.x);
  engine.block.setPositionY(camera, c.y);
  const line = engine.block.create('graphic');
  engine.block.setShape(block, engine.block.createShape('line'));
  engine.block.setFill(block, engine.block.createFill('color'));
  engine.block.appendChild(page, line);
  let lines = [line];

  setLineParams(line, c.x - l / 2, c.y + l / 2 + l / 4, l, Math.PI);
  addLine(c.x - l / 2, c.y - l / 4, (l * Math.sqrt(2)) / 2, 1.25 * Math.PI);
  addLine(c.x, c.y - l / 4 - l / 2, (l * Math.sqrt(2)) / 2, 1.75 * Math.PI);
  addLine(c.x + l / 2, c.y - l / 4, l, 0.5 * Math.PI);
  addLine(c.x - l / 2, c.y - l / 4, l * Math.sqrt(2), 1.75 * Math.PI);
  addLine(c.x + l / 2, c.y + l / 2 + l / 4, l, Math.PI);
  addLine(c.x + l / 2, c.y - l / 4, l * Math.sqrt(2), 0.25 * Math.PI);
  addLine(c.x - l / 2, c.y + l / 2 + l / 4, l, 1.5 * Math.PI);

  function addLine(x, y, length, angle) {
    line = engine.block.duplicate(line);
    lines.push(line);
    setLineParams(line, x, y, length, angle);
  }

  function setLineParams(line, x, y, length, angle) {
    engine.block.setWidth(line, thickness);
    engine.block.setHeight(line, length);
    engine.block.setRotation(line, angle);
    engine.block.setPositionX(line, x - 0.5 * thickness * Math.cos(angle));
    engine.block.setPositionY(line, y - 0.5 * thickness * Math.sin(angle));
    engine.block.appendChild(page, line);
  }

  lines.forEach((line) => engine.block.setVisible(line, false));
  for (let i = 0; i < lines.length; i++) {
    engine.block.setVisible(lines[i], true);
    await grow(lines[i]);
  }

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async function grow(line) {
    const height = engine.block.getHeight(line);
    for (let h = 0; h < height; h += 10) {
      engine.block.setHeight(line, h);
      await sleep(16);
    }
    engine.block.setHeight(line, height);
  }
});
