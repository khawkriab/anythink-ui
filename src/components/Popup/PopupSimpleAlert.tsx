import { PopupUtils } from './PopupUtils';

/**
 * @version 1.0.1 create
 *
 * @param {'success' | 'warning' | 'error'} icon
 * @param {string | Element} title
 * @param {string | Element} message
 * @returns
 */

function PopupSimpleAlert(icon = '', title = '', message = '') {
  return PopupUtils.open({
    icon: icon,
    type: icon,
    title: title,
    message: message,
    buttons: [{ label: 'ตกลง', variant: 'primary' }],
    classNames: { message: 'font-detail2' },
  });
}

export default PopupSimpleAlert;
