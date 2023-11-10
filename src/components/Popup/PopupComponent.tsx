import React from 'react';
import { popupComponentStyle } from './PopupStyle';

const PopupComponent = React.forwardRef(
  /**
   * @version 1.0.1 create
   *
   * @param {{
   * title: string | Element,
   * message: string | Element,
   * icon: 'success' | 'warning' | 'error',
   * type: 'success' | 'warning' | 'error',
   * children: Node,
   * maxWidth: string,
   * showClose: boolean,
   * isClickOutSideClose: boolean,
   * close: ()=> void,
   * buttons: Array.<{
   * label:string,
   * variant: 'green' | 'orange',
   * action:({loading: (value:boolean)=>void, close: ()=>void, startAction: ()=>void, endAction: ()=>void})
   * }>
   * }} props
   * @returns
   */
  function WrapperComponent(
    {
      type,
      children,
      icon,
      title,
      message,
      maxWidth,
      buttons,
      className,
      showClose,
      isClickOutSideClose,
      close,
      ...props
    },
    ref
  ) {
    const inRef = React.useRef();
    const [buttonLoadingList, setButtonLoadingList] = React.useState([]);

    const adjustPopupContentMaxWidth = React.useMemo(() => {
      let _containerMaxWidth = {};

      if (maxWidth) _containerMaxWidth = { maxWidth: maxWidth };

      return _containerMaxWidth;
    });

    const setLoading = (value, index) => {
      let loading = buttonLoadingList;
      loading[index] = value;
      setButtonLoadingList([...loading]);
    };

    const closePopup = () => {
      if (buttonLoadingList.length > 0) {
        setButtonLoadingList([
          ...buttonLoadingList.map(() => {
            return false;
          }),
        ]);
      }
      inRef.current.classList.add('exp-popupjs-content-close');
      close();
    };

    const handleClickButton = (index, action) => {
      if (action) {
        action({
          loading: (value) => setLoading(value, index),
          startAction: () => setLoading(true, index),
          endAction: () => setLoading(false, index),
          close: closePopup,
        });
      } else {
        closePopup();
      }
    };

    React.useEffect(() => {
      if (buttons.length > 0) {
        buttons.forEach(() => {
          setButtonLoadingList([...buttonLoadingList, false]);
        });
      }

      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
      <div {...props} ref={ref} className={classNames('exp-popupjs-container', popupComponentStyle)}>
        {isClickOutSideClose && <div className="exp-popupjs-overlay" onClick={closePopup}></div>}
        <div ref={inRef} {...extendesClassname(['exp-popupjs-content'])} style={{ ...adjustPopupContentMaxWidth }}>
          {showClose && <div className="exp-popupjs-close-icon" onClick={closePopup}></div>}
          <div {...extendesClassname(['exp-popupjs-header', type && `exp-popupjs-${type}`])}>
            {icon === 'success' && (
              <div className="exp-popupjs-icon exp-popupjs-icon-success">
                <div className="exp-popupjs-icon-content">
                  <span className="exp-popupjs-icon-success-line"></span>
                </div>
              </div>
            )}
            {icon === 'warning' && (
              <div className="exp-popupjs-icon exp-popupjs-icon-warning">
                <div className="exp-popupjs-icon-content">!</div>
              </div>
            )}
            {icon === 'error' && (
              <div className="exp-popupjs-icon exp-popupjs-icon-error">
                <div className="exp-popupjs-icon-content">
                  <span className="exp-popupjs-icon-x-mark"></span>
                </div>
              </div>
            )}

            {title && (
              <div {...extendesClassname(['exp-popupjs-title', icon && `exp-popupjs-title-${icon}`, classNames.title])}>
                {title}
              </div>
            )}
          </div>
          <div {...extendesClassname(['exp-popupjs-body', classNames.message])}>
            {!!message && message}

            {children}
          </div>
          {buttons.length > 0 && (
            <div {...extendesClassname(['exp-popupjs-footer', classNames.buttons])}>
              {buttons.map((button, index) => (
                <Button
                  key={index}
                  type="button"
                  variant={button.variant}
                  loader={buttonLoadingList[index]}
                  onClick={() => handleClickButton(index, button.action)}
                  {...extendesClassname([button.className])}
                >
                  {button.label}
                </Button>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }
);

PopupComponent.propTypes = {
  type: PropTypes.oneOf(['success', 'warning', 'error', '']),
  children: PropTypes.node,
  icon: PropTypes.oneOfType([PropTypes.node, PropTypes.oneOf(['success', 'warning', 'error'])]),
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  message: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  maxWidth: PropTypes.string,
  buttons: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      variant: PropTypes.string,
      action: PropTypes.func,
    })
  ),
  classNames: PropTypes.shape({ title: PropTypes.string, message: PropTypes.string, buttons: PropTypes.string }),
  showClose: PropTypes.bool,
  isClickOutSideClose: PropTypes.bool,
  close: PropTypes.func,
};
PopupComponent.defaultProps = {
  buttons: [],
  classNames: { title: '', message: '', buttons: '' },
  showClose: false,
  isClickOutSideClose: true,
};

export default PopupComponent;
