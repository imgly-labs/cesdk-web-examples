import 'https://cdn.img.ly/packages/imgly/cesdk-js/1.7.0-alpha.3/cesdk.umd.js';

// highlight-element
const element = document.getElementById("image-element");
const imageURL = element.src;
// highlight-element

const config = {
  baseURL: 'https://cdn.img.ly/packages/imgly/cesdk-js/1.7.0-alpha.3/assets',
  // highlight-initialImageURL
  initialImageURL: imageURL
  // highlight-initialImageURL
};

CreativeEditorSDK.init('#cesdk_container', config).then((instance) => {
  /** do something with the instance of CreativeEditor SDK **/
});
