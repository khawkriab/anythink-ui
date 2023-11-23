import { css } from '@emotion/css';
import breakpoint from '../../utils/breakpoint';

export const liftupComponent = css`
  label: liftup-component;

  --liftup-zindex: 999;
  --liftup-padding: 12px 16px;

  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: all 0.2s ease-in-out;
  z-index: var(--liftup-zindex);

  &.show {
    opacity: 1;
  }

  ${breakpoint('XS')} {
    &.liftup-tranfrom-xs.show .liftup-container {
      top: 5vh;
      bottom: 0;
    }
    &.liftup-tranfrom-xs .liftup-container {
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      bottom: -100%;
      width: 100%;
      max-width: unset;
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
    }
  }
  ${breakpoint('SM')} {
    &.liftup-tranfrom-sm.show .liftup-container {
      top: 5vh;
      bottom: 0;
    }
    &.liftup-tranfrom-sm .liftup-container {
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      bottom: -100%;
      width: 100%;
      max-width: unset;
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
    }
  }
  ${breakpoint('MD')} {
    &.liftup-tranfrom-md.show .liftup-container {
      top: 5vh;
      bottom: 0;
    }
    &.liftup-tranfrom-md .liftup-container {
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      bottom: -100%;
      width: 100%;
      max-width: unset;
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
    }
  }
  ${breakpoint('LG')} {
    &.liftup-tranfrom-lg.show .liftup-container {
      top: 5vh;
      bottom: 0;
    }
    &.liftup-tranfrom-lg .liftup-container {
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      bottom: -100%;
      width: 100%;
      max-width: unset;
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
    }
  }
  ${breakpoint('XL')} {
    &.liftup-tranfrom-xl.show .liftup-container {
      top: 5vh;
      bottom: 0;
    }
    &.liftup-tranfrom-xl .liftup-container {
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      bottom: -100%;
      width: 100%;
      max-width: unset;
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
    }
  }
  ${breakpoint('XXL')} {
    &.liftup-tranfrom-xxl.show .liftup-container {
      top: 5vh;
      bottom: 0;
    }
    &.liftup-tranfrom-xxl .liftup-container {
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      bottom: -100%;
      width: 100%;
      max-width: unset;
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
    }
  }
  ${breakpoint('XXXL')} {
    &.liftup-tranfrom-xxxl.show .liftup-container {
      top: 5vh;
      bottom: 0;
    }
    &.liftup-tranfrom-xxxl .liftup-container {
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      bottom: -100%;
      width: 100%;
      max-width: unset;
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
    }
  }

  .liftup-overlay {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 1;
    background-color: #00000080;
  }

  .liftup-container {
    position: relative;
    width: 90%;
    max-width: 750px;
    padding: var(--liftup-padding);
    border-radius: 24px;
    overflow: hidden;
    transition: all 0.3s ease-in-out;
    background-color: #fff;
    z-index: 2;
    box-sizing: border-box;
  }

  .liftup-scrollbar {
    max-height: 90vh;
    overflow-y: auto;
  }

  .liftup-body {
    position: relative;
    width: 100%;
    height: 100%;
  }

  .liftup-close-icon {
    position: absolute;
    top: 15px;
    right: 15px;
    width: 1.375rem;
    height: 1.375rem;
    font-size: 0;
    border: none;
    padding: 0;
    z-index: 10;
    background-color: transparent;
    cursor: pointer;

    &::after,
    &::before {
      content: '';
      position: absolute;
      top: calc(50% - 4px);
      display: block;
      width: 100%;
      height: 4px;
      border-radius: 4px;
      background-color: #707070;
      transform: rotate(45deg);
    }

    &::before {
      transform: rotate(-45deg);
    }
  }
`;
