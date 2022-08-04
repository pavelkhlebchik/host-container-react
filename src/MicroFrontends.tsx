import React, { useEffect, FC } from 'react';
import { BrowserHistory } from 'history';

interface IMicroFrontendProps {
  name: string;
  host: string | undefined;
  history: string | BrowserHistory;
}

const MicroFrontend: FC<IMicroFrontendProps> = ({ name, host, history }) => {
  useEffect(() => {
    const scriptId = `micro-frontend-script-${name}`;

    const renderMicroFrontend = () => {
      (window as any)[`render${name}`](`${name}-container`, history);
    };

    if (document.getElementById(scriptId)) {
      renderMicroFrontend();
      return;
    }

    fetch(`${host}/asset-manifest.json`)
      .then((res) => res.json())
      .then((manifest) => {
        const script = document.createElement('script');
        script.id = scriptId;
        script.crossOrigin = '';
        script.src = `${host}${manifest.files['main.js']}`;
        script.onload = () => {
          renderMicroFrontend();
        };
        document.head.appendChild(script);
      });

    if ((window as any)[`unmount${name}`]) {
      (window as any)[`unmount${name}`](`${name}-container`);
    }
  }, []);

  return <main id={`${name}-container`} />;
};

export default MicroFrontend;
