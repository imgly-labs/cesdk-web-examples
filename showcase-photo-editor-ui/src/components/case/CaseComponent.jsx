'use client';

import { removeBackground } from '@imgly/background-removal';
import APP_ASSETS from './Apps.json';
import FORMAT_ASSETS from './CustomFormats.json';
import CreativeEditor, { useConfig, useConfigure } from './lib/CreativeEditor';
import { getImageSize } from './lib/CreativeEngineUtils';
import loadAssetSourceFromContentJSON from './lib/loadAssetSourceFromContentJSON';
import { caseAssetPath } from './util';

const INITIAL_DEMO_IMAGE_URL = `https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&dl=dom-hill-nimElTcTNyY-unsplash.jpg&w=1920`;

const CaseComponent = () => {
  const config = useConfig(
    () => ({
      role: 'Adopter',
      theme: 'light',
      license: process.env.NEXT_PUBLIC_LICENSE,

      ui: {
        elements: {
          blocks: {
            '//ly.img.ubq/page': {
              stroke: { show: false },
              manage: false
            }
          },
          panels: {
            inspector: {
              show: true,
              position: 'left'
            },
            settings: true
          },

          dock: {
            groups: [
              {
                id: 'ly.img.apps',
                entryIds: ['ly.img.apps']
              },
              {
                id: 'ly.img.formats',
                entryIds: ['ly.img.formats']
              },
              {
                id: 'ly.img.defaultGroup',
                showOverview: false
              }
            ]
          },
          libraries: {
            replace: {
              floating: true,
              autoClose: true
            },
            insert: {
              autoClose: false,
              floating: false,
              entries: (defaultEntries) => {
                return [
                  {
                    id: 'ly.img.apps',
                    sourceIds: ['ly.img.apps'],
                    previewLength: 3,
                    gridColumns: 3,
                    gridItemHeight: 'auto',

                    previewBackgroundType: 'contain',
                    gridBackgroundType: 'cover',
                    cardLabel: (assetResult) => assetResult.label,
                    cardLabelPosition: () => 'bottom',
                    icon: ({ theme }) =>
                      caseAssetPath(`/apps-sizes-large-${theme}.svg`),
                    title: ({ group }) => {
                      if (group) {
                        return `libraries.ly.img.apps.${group}.label`;
                      }
                      return undefined;
                    }
                  },
                  {
                    id: 'ly.img.formats',
                    sourceIds: ['ly.img.formats'],
                    previewLength: 3,
                    gridColumns: 3,
                    gridItemHeight: 'auto',

                    previewBackgroundType: 'contain',
                    gridBackgroundType: 'cover',
                    cardLabel: (assetResult) => assetResult.label,
                    cardLabelPosition: () => 'bottom',
                    icon: ({ theme }) =>
                      caseAssetPath(`/page-sizes-large-${theme}.svg`),
                    title: ({ group }) => {
                      if (group) {
                        return `libraries.ly.img.formats.${group}.label`;
                      }
                      return undefined;
                    }
                  },
                  ...defaultEntries.filter((entry) => {
                    const hiddenEntries = [
                      'ly.img.image',
                      'ly.img.template',
                      'ly.img.upload'
                    ];
                    return !hiddenEntries.includes(entry.id);
                  })
                ];
              }
            }
          },
          navigation: {
            action: {
              export: {
                show: true,
                format: ['image/png', 'application/pdf']
              }
            }
          }
        }
      },
      i18n: {
        en: {
          'libraries.ly.img.apps.label': 'Apps',
          'libraries.ly.img.formats.label': 'Size',
          'libraries.ly.img.formats.social.label': 'Social',
          'libraries.ly.img.formats.print.label': 'Print'
        }
      },
      callbacks: {
        onExport: 'download',
        onUpload: 'local'
      }
    }),
    []
  );
  const configure = useConfigure(async (instance) => {
    await instance.addDefaultAssetSources();
    await instance.addDemoAssetSources({ sceneMode: 'Design' });

    loadAssetSourceFromContentJSON(
      instance.engine,
      FORMAT_ASSETS,
      caseAssetPath(''),
      async (asset) => {
        const engine = instance.engine;
        const checkScopesInAPIsSetting =
          engine.editor.getSettingBool('checkScopesInAPIs');
        engine.editor.setSettingBool('checkScopesInAPIs', false);

        const pages = engine.scene.getPages();
        // Find relevant block to crop:
        const relevantBlock =
          engine.block.findByType('//ly.img.ubq/graphic')[0] ?? pages[0];
        // Set fill mode to cover:
        engine.block.setContentFillMode(relevantBlock, 'Cover');
        // Select it:
        engine.block.setSelected(relevantBlock, true);

        engine.scene.setDesignUnit(asset.meta.designUnit);
        engine.block.resizeContentAware(
          pages,
          parseInt(asset.meta.formatWidth, 10),
          parseInt(asset.meta.formatHeight, 10)
        );
        // restore checkScopesInAPIs setting
        engine.editor.setSettingBool(
          'checkScopesInAPIs',
          checkScopesInAPIsSetting
        );
      }
    );

    loadAssetSourceFromContentJSON(
      instance.engine,
      APP_ASSETS,
      caseAssetPath(''),
      applyAppAsset(instance)
    );
    const engine = instance.engine;

    const url = INITIAL_DEMO_IMAGE_URL;
    const size = await getImageSize(url);
    if (!size || !size.width || !size.height) {
      throw new Error('Could not get image size');
    }
    // hide page title:
    engine.editor.setSettingBool('page/title/show', false);

    const scene = engine.scene.create('Free');
    engine.scene.setDesignUnit('Pixel');
    const page = engine.block.create('page');
    // Add page to scene:
    engine.block.appendChild(scene, page);
    // Set page size:
    engine.block.setWidth(page, size.width);
    engine.block.setHeight(page, size.height);
    // Create image fill"
    const fill = engine.block.createFill('image');
    // Set fill url:
    engine.block.setString(fill, 'fill/image/imageFileURI', url);
    engine.block.setFill(page, fill);
    // Set content fill mode to cover:
    engine.block.setContentFillMode(page, 'Cover');

    // Disable changing fill of page
    engine.block.setScopeEnabled(page, 'fill/change', false);
    // Disable stroke of page, since it does not make sense with current wording and takes up to much space
    engine.block.setScopeEnabled(page, 'stroke/change', false);

    // If nothing is selected: select page by listening to selection changes
    engine.block.onSelectionChanged(() => {
      const selection = engine.block.findAllSelected();
      if (selection.length === 0) {
        const page = engine.scene.getCurrentPage();
        engine.block.setSelected(page, true);
      }
    });

    // Initially select the page
    engine.block.setSelected(page, true);
    engine.editor.setGlobalScope('design/arrange', 'Allow');
    engine.editor.setSettingBool('controlGizmo/showResizeHandles', true);
  }, []);

  return (
    <div className="cesdkWrapperStyle">
      <CreativeEditor
        className="cesdkStyle"
        config={config}
        configure={configure}
      />
    </div>
  );
};

function applyAppAsset(instance) {
  return async (asset) => {
    const engine = instance.engine;
    if (asset.id === 'remove-bg') {
      await applyRemoveBackground(engine);
    }
  };
}

async function applyRemoveBackground(engine) {
  const page = engine.scene.getCurrentPage();
  const fill = engine.block.getFill(page);
  const pageHasImageFill =
    page && engine.block.getType(fill) === '//ly.img.ubq/fill/image';

  // If we already removed the background, we don't need to do it again
  if (!pageHasImageFill) {
    return;
  }
  const checkScopesInAPIsSetting =
    engine.editor.getSettingBool('checkScopesInAPIs');
  engine.editor.setSettingBool('checkScopesInAPIs', false);
  const oldImageUri = engine.block.getString(fill, 'fill/image/imageFileURI');
  await setBlockLoading(engine, page, true);
  const removedBackgroundBlob = await removeBackground(oldImageUri);
  const url = URL.createObjectURL(removedBackgroundBlob);
  await setBlockLoading(engine, page, false);
  const graphic = createNewImageFromImageFill(engine, page);

  // create new color fill for page:
  const newPageFill = engine.block.createFill(
    '//ly.img.ubq/fill/gradient/linear'
  );
  // We replace the background with something more interesting, like a gradient.
  engine.block.setGradientColorStops(
    newPageFill,
    'fill/gradient/colors',
    SAMPLE_GRADIENT_FILL_STOPS
  );

  engine.block.setFill(page, newPageFill);
  engine.block.setString(fill, 'fill/image/imageFileURI', url);

  engine.block.setSelected(graphic, true);
  engine.block.setSelected(page, false);
  engine.editor.addUndoStep();
  // restore checkScopesInAPIs setting
  engine.editor.setSettingBool('checkScopesInAPIs', checkScopesInAPIsSetting);
}

const SAMPLE_GRADIENT_FILL_STOPS = [
  {
    color: { r: 0.278, g: 0.102, b: 1.0, a: 1.0 },
    stop: 0
  },
  {
    color: { r: 0.678, g: 0.0, b: 1.0, a: 1.0 },
    stop: 0.33
  },
  {
    color: { r: 0.949, g: 0.047, b: 0.373, a: 1.0 },
    stop: 0.66
  },
  { color: { r: 1.0, g: 0.361, b: 0.0, a: 1.0 }, stop: 1 }
];

function createNewImageFromImageFill(engine, page) {
  // create new graphics block with image fill:
  const graphic = engine.block.create('graphic');
  const shape = engine.block.createShape('//ly.img.ubq/shape/rect');
  engine.block.setShape(graphic, shape);
  const existingWidth = engine.block.getWidth(page);
  const existingHeight = engine.block.getHeight(page);
  engine.block.setWidth(graphic, existingWidth);
  engine.block.setHeight(graphic, existingHeight);
  engine.block.appendChild(page, graphic);
  engine.block.setScopeEnabled(page, 'fill/change', true);
  engine.block.setScopeEnabled(page, 'fill/changeType', false);
  const disabledScopes = [
    'appearance/adjustments',
    'appearance/filter',
    'appearance/effect',
    'appearance/blur',
    'appearance/shadow'
  ];
  disabledScopes.forEach((scope) => {
    engine.block.setScopeEnabled(page, scope, false);
  });
  engine.block.setScopeEnabled(graphic, 'fill/change', false);
  // Attaches the page fill to the graphic. It is currently attached to both the page and the graphic.
  const pageFill = engine.block.getFill(page);
  engine.block.setFill(graphic, pageFill);

  const effects = engine.block.getEffects(page);
  effects.forEach((effect) => {
    engine.block.appendEffect(graphic, effect);
  });
  engine.block
    .getEffects(page)
    .forEach(() => engine.block.removeEffect(page, 0));

  engine.block.setScopeEnabled(graphic, 'stroke/change', false);

  return graphic;
}

async function setBlockLoading(engine, block, isLoading) {
  const fill = engine.block.getFill(block);
  if (isLoading) {
    const uri = engine.block.getString(fill, 'fill/image/imageFileURI');
    engine.block.setString(fill, 'fill/image/previewFileURI', uri);
    engine.block.setString(fill, 'fill/image/imageFileURI', '');
  } else {
    const uri = engine.block.getString(fill, 'fill/image/previewFileURI');
    engine.block.setString(fill, 'fill/image/previewFileURI', '');
    engine.block.setString(fill, 'fill/image/imageFileURI', uri);
    // TODO: Remove this workaround, it's currently needed to get rid of the background spinner.
    await new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 100);
    });
  }
}

export default CaseComponent;
