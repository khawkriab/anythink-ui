import React, { useEffect } from 'react';

export default function useHandleSwitchDom() {
  useEffect(() => {
    console.log('useEffect: switch dom');
    const onChangePage = new Event('onchangepage');

    return () => {
      console.log('unmount: switch dom');
      window.dispatchEvent(onChangePage);
    };
  }, [window.location.pathname]);
}
