import React, { useEffect, useState } from 'react';
import { LiftUpUtils } from './LiftUpUtils';
import { TLiftUp } from '.';

interface ISlideUp extends TLiftUp {}

function SlideUp({ show, children, onClose = () => null, ...props }: ISlideUp) {
  const [isShow, setIsShow] = useState<boolean>(false);
  const [liftupId, setLiftupId] = useState<string>(null!);

  useEffect(() => {
    if (show) {
      const _liftupId = LiftUpUtils.open({ show, onClose, children, ...props });
      setLiftupId(_liftupId as string);
      setIsShow(true);
    }

    if (!show && isShow) {
      LiftUpUtils.close(liftupId);
      setIsShow(false);
    }
  }, [show]);

  useEffect(() => {
    if (isShow) {
      console.log('%c>> children:', 'background: #00f; color: #fff', children);
      LiftUpUtils.updateProps({ show, onClose, children, ...props }, liftupId);
    }
  }, [children]);

  return <></>;
}

export default SlideUp;
