import React, { Component } from 'react';
import LiftUpComponent from './LiftUpComponent';
import { TLiftUp } from '.';

export class LiftUpWrapper extends Component {
  totalIndex: number;
  state: { lifts: TLiftUp[] };

  constructor(props: any) {
    super(props);
    this.state = {
      lifts: [], // includes multiple models
    };

    this.totalIndex = 0;
  }

  // control from utils
  open = ({ ...args }: TLiftUp) => {
    const lift = { ...args };
    let { lifts } = this.state;

    // isVisible controls the visibility of bottomsheet
    this.totalIndex++;

    lift.id = `liftup-${this.totalIndex}`;

    // ref controls the lift behaviour, like closing the lift our update the lift
    if (!lift.ref) {
      lift.ref = React.createRef<HTMLDivElement>();
    }
    if (!lift.onClose) {
      lift.onClose = () => null;
    }

    lifts.push({ ...lift });
    this.setState({ lifts });

    return lift.id;
  };

  // control from utils
  close = (liftupId: string) => {
    const { lifts } = this.state;

    if (!liftupId) return;

    const indexOfPopupId = lifts.findIndex((f) => f.id === liftupId);

    setTimeout(() => {
      lifts.splice(indexOfPopupId, 1);
      this.setState({ lifts });

      if (lifts.length <= 0 && document.body.classList.contains('liffup-show')) {
        document.body.classList.remove('liffup-show');
      }
    }, 200);

    // in order to return close effect
    if (lifts[indexOfPopupId]) {
      lifts[indexOfPopupId].style = { display: 'none' };

      const _onClose = lifts[indexOfPopupId].onClose;
      if (_onClose) _onClose();

      this.setState({ lifts });
    }
  };

  // control from utils
  closeAll = () => {
    let { lifts } = this.state;

    // clear all lift
    if (lifts.length > 0) lifts.splice(0, lifts.length);

    this.setState({ lifts });
  };

  // control from utils
  updateProps = ({ ...props }, index = this.state.lifts.length - 1) => {
    const { lifts } = this.state;
    lifts[index] = { ...lifts[index], ...props };
    this.setState({ lifts });
  };

  render() {
    const { lifts } = this.state;
    return (
      <>
        {lifts.map((lift) => (
          <LiftUpComponent
            key={lift.id}
            show={lift.show}
            showClose={lift.showClose}
            showPopup={lift.showPopup}
            isClickOutSideClose={lift.isClickOutSideClose}
            liftResponseSize={lift.liftResponseSize}
            zIndex={lift.zIndex}
            onClose={lift.onClose}
            close={() => this.close(lift.id as string)}
          >
            {lift.children}
          </LiftUpComponent>
        ))}
      </>
    );
  }
}
