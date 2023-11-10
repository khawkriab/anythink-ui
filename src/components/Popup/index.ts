import { PopupUtils } from './PopupUtils';
import { PopupWrapper } from './PopupWrapper';
import PopupAlert from './PopupAlert';
import PopupJsx from './PopupJsx';
import PopupSimpleAlert from './PopupSimpleAlert';

const EXPPopupJs = {
  register: (ref: any) => PopupUtils.register(ref),
  close: () => PopupUtils.closeAll(),
  Init: PopupWrapper,
  alert: PopupAlert,
  jsx: PopupJsx,
  simple: PopupSimpleAlert,
};

export default EXPPopupJs;
