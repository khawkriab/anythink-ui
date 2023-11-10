import React, { Component } from 'react';
import PopupComponent from './PopupComponent';

export class PopupWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      popups: [], // includes multiple models
    };

    this.totalIndex = 0;
  }

  closeAll = () => {
    let { popups } = this.state;

    // clear all popup
    if (popups.length > 0) popups.splice(0, popups.length);

    this.setState({ popups });
  };

  open = ({ ...args }) => {
    const popup = { ...args };
    let { popups } = this.state;

    // isVisible controls the visibility of bottomsheet
    this.totalIndex++;

    popup.id = `exp-popupjs-${this.totalIndex}`;

    // ref controls the popup behaviour, like closing the popup our update the popup
    if (!popup.ref) {
      popup.ref = React.createRef();
    }
    if (!popup.onClose) {
      popup.onClose = () => null;
    }

    popups.push({ ...popup });
    this.setState({ popups });

    // remove scroll body
    const body = document.body;
    if (!body.classList.contains('exp-popupjs-show')) {
      body.classList.add('exp-popupjs-show');
    }

    // return popup.id
    return popup.id;
  };

  close = (popupId) => {
    const { popups } = this.state;

    if (!popupId) return;

    const indexOfPopupId = popups.findIndex((f) => f.id === popupId);

    setTimeout(() => {
      popups.splice(indexOfPopupId, 1);
      this.setState({ popups });

      if (popups.length <= 0 && document.body.classList.contains('exp-popupjs-show')) {
        document.body.classList.remove('exp-popupjs-show');
      }
    }, 200);

    // in order to return close effect
    if (popups[indexOfPopupId]) {
      popups[indexOfPopupId].style = { display: 'none' };
      popups[indexOfPopupId].onClose();
      this.setState({ popups });
    }
  };

  updateProps = ({ ...props }, popupId) => {
    const { popups } = this.state;

    if (!popupId) return;

    const indexOfPopupId = popups.findIndex((f) => f.id === popupId);

    popups[indexOfPopupId] = { ...popups[indexOfPopupId], ...props };
    this.setState({ popups });
  };

  render() {
    const { popups } = this.state;

    return (
      <>
        {popups.map((popup, index) => (
          <PopupComponent key={popup.id + '' + index} close={() => this.close(popup.id)} {...popup} />
        ))}
      </>
    );
  }
}
