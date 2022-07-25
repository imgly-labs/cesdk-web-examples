// highlight-setup
import CreativeEngine from 'https://cdn.img.ly/packages/imgly/cesdk-engine/1.7.0-rc.0/index.js';

const config = {
  baseURL: 'https://cdn.img.ly/packages/imgly/cesdk-engine/1.7.0-rc.0/assets'
};

CreativeEngine.init(config).then(async (engine) => {
  const scene = engine.scene.create();
  const page = engine.block.create('page');
  engine.block.appendChild(scene, page);
  // highlight-setup

  // Lifecycle

  // highlight-create
  const block = engine.block.create('shapes/star');
  // highlight-saveToString
  const savedBlocks = await engine.block.saveToString([block]);
  // highlight-loadFromString
  const loadedBlocks = await engine.block.loadFromString(savedBlocks);

  // highlight-getType
  const blockType = engine.block.getType(block);

  // highlight-setName
  engine.block.setName(block, 'someName');
  // highlight-getName
  const name = engine.block.getName(block);

  // highlight-findAll
  const allIds = engine.block.findAll();
  // highlight-findAllPlaceholders
  const allPlaceholderIds = engine.block.findAllPlaceholders();
  // highlight-findByType
  const allStars = engine.block.findByType('shapes/star');
  // highlight-findByName
  const ids = engine.block.findByName('someName');

  // highlight-duplicate
  const duplicate = engine.block.duplicate(block);
  // highlight-destroy
  engine.block.destroy(duplicate);
  // highlight-isValid
  engine.block.isValid(duplicate); // false

  // Hierarchy

  // highlight-insertChild
  engine.block.insertChild(page, block, 0);
  // highlight-getParent
  const parent = engine.block.getParent(block);
  // highlight-getChildren
  const childIds = engine.block.getChildren(block);
  // highlight-appendChild
  engine.block.appendChild(parent, block);

  // Selection and Visibility

  // highlight-setSelected
  engine.block.setSelected(block, true);
  // highlight-isSelected
  const isSelected = engine.block.isSelected(block);
  // highlight-findAllSelected
  const selectedIds = engine.block.findAllSelected();

  // highlight-isVisible
  const isVisible = engine.block.isVisible(block);
  // highlight-setVisible
  engine.block.setVisible(block, true);

  // highlight-isClipped
  const isClipped = engine.block.isClipped(page);
  // highlight-setClipped
  engine.block.setClipped(page, true);

  // Layout

  // highlight-getPositionX
  const x = engine.block.getPositionX(block);
  // highlight-getPositionXMode
  const xMode = engine.block.getPositionXMode(block);
  // highlight-getPositionY
  const y = engine.block.getPositionY(block);
  // highlight-getPositionYMode
  const yMode = engine.block.getPositionYMode(block);
  // highlight-setPositionX
  engine.block.setPositionX(block, 0.25);
  // highlight-setPositionXMode
  engine.block.setPositionXMode(block, 'Percent');
  // highlight-setPositionY
  engine.block.setPositionY(block, 0.25);
  // highlight-setPositionYMode
  engine.block.setPositionYMode(block, 'Percent');

  // highlight-getRotation
  const rad = engine.block.getRotation(block);
  // highlight-setRotation
  engine.block.setRotation(block, Math.PI / 2);
  // highlight-flip
  const flipHorizontal = engine.block.getFlipHorizontal(block);
  const flipVertical = engine.block.getFlipVertical(block);
  engine.block.setFlipHorizontal(block, true);
  engine.block.setFlipVertical(block, false);
  // highlight-flip

  // highlight-getWidth
  const width = engine.block.getWidth(block);
  // highlight-getWidthMode
  const widthMode = engine.block.getWidthMode(block);
  // highlight-getHeight
  const height = engine.block.getHeight(block);
  // highlight-getHeightMode
  const heightMode = engine.block.getHeightMode(block);
  // highlight-setWidth
  engine.block.setWidth(block, 0.5);
  // highlight-setWidthMode
  engine.block.setWidthMode(block, 'Percent');
  // highlight-setHeight
  engine.block.setHeight(block, 0.5);
  // highlight-setHeightMode
  engine.block.setHeightMode(block, 'Percent');
  // highlight-getFrameWidth
  const frameWidth = engine.block.getFrameWidth(block);
  // highlight-getFrameHeight
  const frameHeight = engine.block.getFrameHeight(block);

  // highlight-getGlobalBoundingBoxX
  const globalX = engine.block.getGlobalBoundingBoxX(block);
  // highlight-getGlobalBoundingBoxY
  const globalY = engine.block.getGlobalBoundingBoxY(block);
  // highlight-getGlobalBoundingBoxWidth
  const globalWidth = engine.block.getGlobalBoundingBoxWidth(block);
  // highlight-getGlobalBoundingBoxHeight
  const globalHeight = engine.block.getGlobalBoundingBoxHeight(block);

  // highlight-scale
  engine.block.scale(block, 2.0, 0.5, 0.5);

  // highlight-hasStroke
  const hasStroke = engine.block.hasStroke(block);
  // highlight-setStrokeEnabled
  engine.block.setStrokeEnabled(block, true);
  // highlight-isStrokeEnabled
  const strokeIsEnabled = engine.block.isStrokeEnabled(block);
  // highlight-setStrokeColorRGBA
  engine.block.setStrokeColorRGBA(block, 1.0, 0.75, 0.8, 1.0);
  // highlight-getStrokeColorRGBA
  const strokeColor = engine.block.getStrokeColorRGBA(block);
  // highlight-setStrokeWidth
  engine.block.setStrokeWidth(block, 5);
  // highlight-getStrokeWidth
  const strokeWidth = engine.block.getStrokeWidth(block);
  // highlight-setStrokeStyle
  engine.block.setStrokeStyle(block, 'Dashed');
  // highlight-getStrokeStyle
  const strokeStlye = engine.block.getStrokeStyle(block);
  // highlight-setStrokePosition
  engine.block.setStrokePosition(block, 'Outer');
  // highlight-getStrokePosition
  const strokePosition = engine.block.getStrokePosition(block);
  // highlight-setStrokeCornerGeometry
  engine.block.setStrokeCornerGeometry(block, 'Round');
  // highlight-getStrokeCornerGeometry
  const strokeCornerGeometry = engine.block.getStrokeCornerGeometry(block);

  // highlight-hasDropShadow
  const hasDropShadow = engine.block.hasDropShadow(block);
  // highlight-setDropShadowEnabled
  engine.block.setDropShadowEnabled(block, true);
  // highlight-isDropShadowEnabled
  const dropShadowIsEnabled = engine.block.isDropShadowEnabled(block);
  // highlight-setDropShadowColorRGBA
  engine.block.setDropShadowColorRGBA(block, 1.0, 0.75, 0.8, 1.0);
  // highlight-getDropShadowColorRGBA
  const dropShadowColor = engine.block.getDropShadowColorRGBA(block);
  // highlight-setDropShadowOffsetXY
  engine.block.setDropShadowOffsetX(block, -10);
  engine.block.setDropShadowOffsetY(block, 5);
  // highlight-setDropShadowOffsetXY
  // highlight-getDropShadowOffsetXY
  const dropShadowOffsetX = engine.block.getDropShadowOffsetX(block);
  const dropShadowOffsetY = engine.block.getDropShadowOffsetY(block);
  // highlight-getDropShadowOffsetXY
  // highlight-setDropShadowBlurRadiusXY
  engine.block.setDropShadowBlurRadiusX(block, -10);
  engine.block.setDropShadowBlurRadiusY(block, 5);
  // highlight-setDropShadowBlurRadiusXY
  // highlight-getDropShadowBlurRadiusXY
  const dropShadowBlurRadiusX = engine.block.getDropShadowBlurRadiusX(block);
  const dropShadowBlurRadiusY = engine.block.getDropShadowBlurRadiusY(block);
  // highlight-getDropShadowBlurRadiusXY
  // highlight-setDropShadowClip
  engine.block.setDropShadowClip(block, false)
  // highlight-getDropShadowClip
  const dropShadowClip = engine.block.getDropShadowClip(block);

  // highlight-createFill
  const solidColor = engine.block.createFill('color');
  // highlight-configureFill
  engine.block.setColorRGBA(solidColor, 'color/value', 0.44, 0.76, 0.76, 1.0);
  // highlight-getFill
  const previousFill = engine.block.getFill(block);
  // highlight-destroyFill
  engine.block.destroy(previousFill);
  // highlight-setFill
  engine.block.setFill(block, solidColor);
  // highlight-hasFill
  engine.block.hasFill(block);
  // highlight-setFillEnabled
  engine.block.setFillEnabled(block, false);
  // highlight-isFillEnabled
  engine.block.isFillEnabled(block);

  // highlight-createEffect
  const pixelize = engine.block.createEffect('pixelize');
  // highlight-configureEffect
  engine.block.setInt(pixelize, 'pixelize/horizontalPixelSize', 5);
  // highlight-appendEffect
  engine.block.appendEffect(block, pixelize);
  // highlight-hasEffects
  engine.block.hasEffects(block);
  // highlight-insertEffect
  engine.block.insertEffect(block, pixelize, 0);
  // highlight-removeEffect
  engine.block.removeEffect(block, 1);
  // highlight-getEffects
  engine.block.getEffects(block);
  // highlight-setEffectEnabled
  engine.block.setEffectEnabled(pixelize, false);
  // highlight-isEffectEnabled
  engine.block.isEffectEnabled(pixelize);

  // highlight-createBlur
  const radialBlur = engine.block.createBlur('radial');
  // highlight-configureBlur
  engine.block.setFloat(radialBlur, 'radial/radius', 100.);
  // highlight-setBlur
  engine.block.setBlur(block, radialBlur);
  engine.block.setBlurEnabled(block, true);
  // highlight-setBlur
  // highlight-getBlur
  const existingBlur = engine.block.getBlur(block);

  // highlight-hasFill
  const hasFill = engine.block.hasFill(block);
  // highlight-setFillEnabled
  engine.block.setFillEnabled(block, true);
  // highlight-setFillType
  engine.block.setFillType(block, 'Solid');
  // highlight-setFillSolidColor
  engine.block.setFillSolidColor(block, 255, 192, 203, 255);
  // highlight-setFillGradientType
  engine.block.setFillType(block, 'Gradient');
  engine.block.setFillGradientType(block, 'Linear');
  // highlight-addFillGradientColorStop
  engine.block.addFillGradientColorStop(block, 0.5, 255, 192, 203, 255);

  const member1 = engine.block.create('shapes/star');
  const member2 = engine.block.create('shapes/rect');
  // highlight-isGroupable
  const groupable = engine.block.isGroupable([member1, member2]);
  // highlight-group
  const group = engine.block.group([member1, member2]);
  engine.block.setSelected(group, true);
  // highlight-enterGroup
  engine.block.enterGroup(group);
  engine.block.setSelected(member1, true);
  // highlight-exitGroup
  engine.block.exitGroup(member1);
  // highlight-ungroup
  engine.block.unroup(group);

  // highlight-referencesAnyVariables
  const referencesVariables = engine.block.referencesAnyVariables(block);

  // highlight-export
  const blob = await engine.block.export(scene, 'image/png', {
    pngCompressionLevel: 6
  });
});
