import React, { useEffect, useState } from 'react';
import { PopupUtils } from './PopupUtils';

/**
 * @version 1.0.1 create
 * @see showClose: true, isClickOutSideClose: true
 *
 * @param {{
 * show: boolean,
 * title: string | Element,
 * message: string | Element,
 * children: Node,
 * icon: 'success' | 'warning' | 'error' | Element,
 * type: 'success' | 'warning' | 'error',
 * maxWidth: string,
 * showClose: boolean | true,
 * isClickOutSideClose: boolean | true,
 * onClose:()=> void,
 * buttons: Array.<{
 * label:string,
 * variant:'primary' | 'second' | 'danger' | 'info',
 * action:({loading: (value:boolean)=>void, close: ()=>void, startAction: ()=>void, endAction: ()=>void})
 * }>,
 * classNames:{title: string, message: string, buttons: string}
 * }} props
 * @returns
 */

function PopupJsx({ show, children, ...props }) {
  const [isShow, setIsShow] = useState(false);
  const [popupId, setPopupId] = useState(null);

  useEffect(() => {
    if (show) {
      const _popupId = PopupUtils.open({ children, ...props });
      setPopupId(_popupId);
      setIsShow(true);
    }

    if (!show && isShow) {
      PopupUtils.close(popupId);
      setIsShow(false);
    }
  }, [show]);

  useEffect(() => {
    if (isShow && popupId) PopupUtils.updateProps({ children, ...props }, popupId);
  }, [children, popupId]);

  return <></>;
}

export default PopupJsx;
