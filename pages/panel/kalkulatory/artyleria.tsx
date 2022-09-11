import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { Unity, useUnityContext } from 'react-unity-webgl';

const Artyleria: NextPage = () => {
  const [renderUnity, setRenderUnity] = useState<boolean>(false);

  useEffect(() => {
    setRenderUnity(true);
  }, []);

  const { unityProvider } = useUnityContext({
    loaderUrl: '/Build/UnityLoader.js',
    dataUrl: '/Build/Foxhole 3.0.data.unityweb',
    frameworkUrl: '/Build/Foxhole 3.0.wasm.framework.unityweb',
    codeUrl: '/Build/Foxhole 3.0.wasm.code.unityweb',
  });

  return renderUnity ? (
    <Unity unityProvider={unityProvider} style={{ width: 800, height: 600 }} />
  ) : null;
};

export default Artyleria;
