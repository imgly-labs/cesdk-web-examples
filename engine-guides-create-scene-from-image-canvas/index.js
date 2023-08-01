import CreativeEngine from 'https://cdn.img.ly/packages/imgly/cesdk-engine/1.13.1-rc.0-republish-android/index.js';

// Draw the text 'img.ly' to the demo canvas
const canvas = document.getElementById("my-canvas");
const ctx = canvas.getContext("2d");
ctx.font = "100px Arial";
ctx.fillText("img.ly", 120, 270);

// highlight-dataURL
const dataURL = canvas.toDataURL();
// highlight-dataURL

const config = {
  baseURL: 'https://cdn.img.ly/packages/imgly/cesdk-engine/1.13.1-rc.0-republish-android/assets'
};

CreativeEngine.init(config).then(async (engine) => {
  // highlight-initialImageURL
  let scene = await engine.scene.createFromImage(dataURL);
  // highlight-initialImageURL

  // highlight-find-image
  // Find the automatically added image element in the scene.
  const image = engine.block.findByType('image')[0];
  // highlight-find-image

  // highlight-set-opacity
  // Change its opacity.
  engine.block.setOpacity(image, 0.5);
  // highlight-set-opacity

  // Attach engine canvas to DOM
  document.getElementById('cesdk_container').append(engine.element);
});
