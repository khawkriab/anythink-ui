import { PopupUtils } from './PopupUtils';

/**
 * @version 1.0.1 create
 *
 * @param {{
 * title: string | Element,
 * message: string | Element,
 * children: Node,
 * icon: 'success' | 'warning' | 'error' | Element,
 * type: 'success' | 'warning' | 'error',
 * maxWidth: string,
 * showClose: boolean | true,
 * isClickOutSideClose: boolean | true,
 * buttons: Array.<{
 * label:string | TranslationKey,
 * variant:'green' | 'orange',
 * action:(nerver:{loading: (value:boolean)=> void, close: ()=> void, startAction: ()=> void, endAction: ()=> void})=> void
 * }>,
 * classNames:{title: string, message: string, buttons: string}
 * }} props
 * @see showClose: true, isClickOutSideClose: true
 * @returns
 */

function PopupAlert(props) {
  return PopupUtils.open(props);
}

export default PopupAlert;
