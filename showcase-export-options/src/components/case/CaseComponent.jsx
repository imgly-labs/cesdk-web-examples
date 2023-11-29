import CreativeEditorSDK from '@cesdk/cesdk-js';
import { ExportModal } from './ExportModal/ExportModal';
import { useEffect, useRef, useState } from 'react';

const ExportOptionsCESDK = () => {
  const cesdkContainer = useRef(null);
  const cesdk = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    let localCesdk;
    let config = {
      role: 'Adopter',
      license: process.env.REACT_APP_LICENSE,
      callbacks: {
        onExport: 'download',
        onUpload: 'local'
      },
      ui: {
        elements: {
          panels: {
            settings: true
          }
        }
      }
    };
    if (cesdkContainer.current) {
      CreativeEditorSDK.create(cesdkContainer.current, config).then(
        async (instance) => {
          instance.addDefaultAssetSources();
          instance.addDemoAssetSources({sceneMode: 'Design'});
          localCesdk = instance;
          cesdk.current = localCesdk;
          await localCesdk.loadFromURL(`${window.location.protocol + "//" + window.location.host}/example-1-adopter.scene`) ;
          setIsLoaded(true);
        }
      );
    }
    return () => {
      if (localCesdk) {
        localCesdk.dispose();
      }
    };
  }, [cesdkContainer]);

  return (
    <div style={wrapperStyle}>
      <div style={cesdkWrapperStyle}>
        <div ref={cesdkContainer} style={cesdkStyle}></div>
      </div>
      <ExportModal show={isLoaded} engine={cesdk.current?.engine} />
    </div>
  );
};

const cesdkStyle = {
  position: 'absolute',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0
};

const cesdkWrapperStyle = {
  position: 'relative',
  minHeight: '640px',
  overflow: 'hidden',
  flexGrow: 1,
  display: 'flex',
  borderRadius: '0.75rem',
  boxShadow:
    '0px 0px 2px rgba(22, 22, 23, 0.25), 0px 4px 6px -2px rgba(22, 22, 23, 0.12), 0px 2px 2.5px -2px rgba(22, 22, 23, 0.12), 0px 1px 1.75px -2px rgba(22, 22, 23, 0.12)'
};

const wrapperStyle = {
  minHeight: '640px',
  display: 'flex',
  borderRadius: '0.75rem',
  flexGrow: '1',
  gap: '1rem'
};
export default ExportOptionsCESDK;
