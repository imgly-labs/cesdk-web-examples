import CreativeEngine from 'https://cdn.img.ly/packages/imgly/cesdk-engine/1.41.1-rc.0/index.js';

const config = {
  license: 'vERESgSXbYj5Rs-FF4DzkMvhdQLh0Mxe6AD8V-doP6wqe_gmYmx_oUKqIlMkwpMu',
  userId: 'guides-user',
  baseURL: 'https://cdn.img.ly/packages/imgly/cesdk-engine/1.41.1-rc.0/assets'
};

CreativeEngine.init(config).then(async (engine) => {
  document.getElementById('cesdk_container').appendChild(engine.element);

  // Add default assets used in scene.
  engine.addDefaultAssetSources();

  const scene = engine.scene.create();
  const text = engine.block.create('text');
  engine.block.appendChild(scene, text);
  engine.block.setWidthMode(text, 'Auto');
  engine.block.setHeightMode(text, 'Auto');

  engine.block.replaceText(text, 'Hello World');
  // Add a "!" at the end of the text
  engine.block.replaceText(text, '!', 11);
  // Replace "World" with "Alex"
  engine.block.replaceText(text, 'Alex', 6, 11);

  engine.scene.zoomToBlock(text, 100, 100, 100, 100);

  // Remove the "Hello "
  engine.block.removeText(text, 0, 6);

  engine.block.setTextColor(text, { r: 1.0, g: 1.0, b: 0.0, a: 1.0 });
  engine.block.setTextColor(text, { r: 0.0, g: 0.0, b: 0.0, a: 1.0 }, 1, 4);
  const allColors = engine.block.getTextColors(text);
  const colorsInRange = engine.block.getTextColors(text, 2, 5);

  engine.block.setTextCase(text, 'Titlecase');

  const textCases = engine.block.getTextCases(text);

  const typeface = {
    name: 'Roboto',
    fonts: [
      {
        uri: 'https://cdn.img.ly/assets/v2/ly.img.typeface/fonts/Roboto/Roboto-Bold.ttf',
        subFamily: 'Bold',
        weight: 'bold'
      },
      {
        uri: 'https://cdn.img.ly/assets/v2/ly.img.typeface/fonts/Roboto/Roboto-BoldItalic.ttf',
        subFamily: 'Bold Italic',
        weight: 'bold',
        style: 'italic'
      },
      {
        uri: 'https://cdn.img.ly/assets/v2/ly.img.typeface/fonts/Roboto/Roboto-Italic.ttf',
        subFamily: 'Italic',
        style: 'italic'
      },
      {
        uri: 'https://cdn.img.ly/assets/v2/ly.img.typeface/fonts/Roboto/Roboto-Regular.ttf',
        subFamily: 'Regular'
      }
    ]
  };
  engine.block.setFont(text, typeface.fonts[3].uri, typeface);

  engine.block.setTypeface(text, typeface);

  const currentDefaultTypeface = engine.block.getTypeface(text);

  const currentTypefaces = engine.block.getTypefaces(text);
  const currentTypefacesOfRange = engine.block.getTypefaces(text, 1, 4);

  if (engine.block.canToggleBoldFont(text)) {
    engine.block.toggleBoldFont(text);
  }
  if (engine.block.canToggleBoldFont(text, 1, 4)) {
    engine.block.toggleBoldFont(text, 1, 4);
  }

  if (engine.block.canToggleItalicFont(text)) {
    engine.block.toggleItalicFont(text);
  }
  if (engine.block.canToggleItalicFont(text, 1, 4)) {
    engine.block.toggleItalicFont(text, 1, 4);
  }

  const fontWeights = engine.block.getTextFontWeights(text);

  const fontStyles = engine.block.getTextFontStyles(text);
});
