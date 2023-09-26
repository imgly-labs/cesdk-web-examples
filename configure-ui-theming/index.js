import 'https://cdn.img.ly/packages/imgly/cesdk-js/1.17.0-rc.0/cesdk.umd.js';

let config = {
  baseURL: 'https://cdn.img.ly/packages/imgly/cesdk-js/1.17.0-rc.0/assets',
  // docs-theming-theme
  theme: 'light', // 'light' or 'dark'
  ui: {
    scale: ({ containerWidth, isTouch }) => {
      if (containerWidth < 600 || isTouch) {
        return "large"
      } else {
        return "normal"
      }
    }, // or 'normal' or 'large'
    // docs-theming-theme
    // docs-theming-generator
    elements: {
      panels: {
        settings: true
      }
    }
    // docs-theming-generator
  },
  callbacks: { onUpload: 'local' } // Enable local uploads in Asset Library.
};

CreativeEditorSDK.create('#cesdk_container', config).then(async (instance) => {
  // Do something with the instance of CreativeEditor SDK, for example:
  // Populate the asset library with default / demo asset sources.
  instance.addDefaultAssetSources();
  instance.addDemoAssetSources({ sceneMode: 'Design' });
  await instance.createDesignScene();
});
