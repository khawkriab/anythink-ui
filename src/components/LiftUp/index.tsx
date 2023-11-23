import React from 'react';
import SlideUp from './LiftUpSlideUp';
import { LiftUpUtils } from './LiftUpUtils';
import { LiftUpWrapper } from './LiftUpWrapper';

export type TLiftUp = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
  show?: boolean;
  showClose?: boolean;
  showPopup?: boolean;
  isClickOutSideClose?: boolean;
  zIndex?: string | number;
  liftResponseSize?: 'XS' | 'SM' | 'MD' | 'LG' | 'XL' | 'XXL' | 'XXXL';
  onClose?: () => void;
};

export function InitLiftUp({ globalPopupRef }: Readonly<{ globalPopupRef: any }>) {
  const forceCode = () => {
    EXPLiftUp.close();
  };

  React.useEffect(() => {
    const registerModal = () => {
      console.log('%c>> registerModal', 'background: #f0f; color: #fff');
      EXPLiftUp.register(globalPopupRef);
    };

    registerModal();
    window.addEventListener('onchangepage', forceCode);

    return () => window.removeEventListener('onchangepage', forceCode);
  }, []); // eslint-disable-next-line react-hooks/exhaustive-deps

  return <LiftUpWrapper ref={(ref) => (globalPopupRef = ref)} />;
}

const EXPLiftUp = {
  register: (ref: HTMLDivElement) => LiftUpUtils.register(ref),
  close: () => LiftUpUtils.closeAll(),
  Init: InitLiftUp,
  slideUp: SlideUp,
};

export { SlideUp };
export default EXPLiftUp;
