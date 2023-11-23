import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { liftupComponent } from './liftUpStyle';
import { TLiftUp } from '.';
import useWindowSize from '../../hooks/useWindowSize/useWindowSize';
import { DEFAULT_BREAKPOINTS_SIZE } from '../../utils/breakpoint';

interface IWrapperComponent extends TLiftUp {
  close?: () => void;
}

function WrapperComponent({
  show,
  showClose,
  showPopup = true,
  isClickOutSideClose = true,
  liftResponseSize = 'SM',
  className,
  style,
  zIndex,
  children,
  close = () => null,
  onClose = () => null,
  ...props
}: Readonly<IWrapperComponent>) {
  const { width } = useWindowSize();
  const [isExpaned, setIsExpaned] = useState(false);
  //

  const adjustZIndex = React.useMemo(() => {
    let _adjustZIndex = {};

    if (zIndex) _adjustZIndex = { ..._adjustZIndex, zIndex: zIndex };

    return _adjustZIndex;
  }, [zIndex]);

  const onClickOutsideClose = () => {
    if (!isClickOutSideClose) return;

    onCloseLiftup();
  };

  const onCloseLiftup = (onlyClose = false) => {
    setIsExpaned(false);

    if (!onlyClose) onClose();

    setTimeout(() => {
      close();
    }, 300);
  };

  useEffect(() => {
    let timer = null! as NodeJS.Timeout;
    const onShow = () => {
      if (show) {
        timer = setTimeout(() => {
          setIsExpaned(true);
        }, 300);
      } else if (isExpaned) {
        onCloseLiftup(true);
      }
    };

    onShow();

    return () => clearTimeout(timer);
  }, [show]);

  if (!showPopup && width > 0 && DEFAULT_BREAKPOINTS_SIZE[liftResponseSize] > width) return null;

  return (
    <div
      //   liftSize={liftSize}
      {...props}
      className={classNames(
        liftupComponent,
        { ['show']: isExpaned },
        { [`liftup-tranfrom-${liftResponseSize.toLowerCase()}`]: liftResponseSize },
        className
      )}
      style={{ ...adjustZIndex }}
    >
      <div className="liftup-container" style={style}>
        {showClose && <div className="liftup-close-icon" onClick={() => onCloseLiftup()} />}
        <div className="liftup-scrollbar">
          <div className="liftup-body liftup-inner-scrollbar">{children}</div>
        </div>
      </div>
      <div className="liftup-overlay" onClick={onClickOutsideClose} />
    </div>
  );
}

const LiftUpComponent = React.forwardRef<HTMLDivElement, IWrapperComponent>((props, ref) => (
  <WrapperComponent {...props}>{props.children}</WrapperComponent>
));

export default LiftUpComponent;
