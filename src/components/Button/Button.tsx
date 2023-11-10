import classNames from 'classnames';
import React from 'react';
import { buttonStyle } from './ButtonStyle';

interface IButton extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  loading?: boolean;
  showSpinner: boolean;
}

function Button({ loading, showSpinner = true, disabled, className, children, ...props }: Readonly<IButton>) {
  const r = React.useRef<HTMLDivElement>(null!);

  const clearLoadingOverflow = () => {
    const bodyElement = document.body;

    if (bodyElement.contains(r.current)) bodyElement.removeChild(r.current);
  };

  React.useEffect(() => {
    const bodyElement = document.body;
    const loadingElement = document.createElement('div');
    const loadingLineElement = document.createElement('div');

    loadingLineElement.className = 'fetch-loading-line';
    loadingElement.className = 'fetch-loading-overlay';
    loadingElement.style.position = 'fixed';
    loadingElement.style.top = '0px';
    loadingElement.style.left = '0px';
    loadingElement.style.bottom = '0px';
    loadingElement.style.right = '0px';
    loadingElement.style.zIndex = '100';
    loadingElement.style.backgroundColor = 'transparent';
    // loadingElement.appendChild(loadingLineElement)

    const loadingOverflow = () => {
      if (loading) {
        // set global element
        r.current = loadingElement;
        bodyElement.appendChild(r.current);
      } else {
        clearLoadingOverflow();
      }
    };

    loadingOverflow();
  }, [loading]);

  React.useEffect(() => {
    window.addEventListener('onchangepage', () => clearLoadingOverflow());

    return () => window.removeEventListener('onchangepage', () => clearLoadingOverflow());
  }, [r.current]);

  return (
    <button {...props} disabled={loading ?? disabled} className={classNames(buttonStyle, className)}>
      <span className={`spinner ${loading && showSpinner ? 'loading' : 'loaded'}`}>{children}</span>
    </button>
  );
}

export default Button;
