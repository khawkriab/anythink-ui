import { css } from '@emotion/css';
import breakpoint from '../../utils/breakpoint';

export const popupComponentStyle = css`
  label: popupjs-container;

  --popup-zindex: 1060;
  --popup-max-width: 400px;
  --popup-content-border-radius: 0.3125rem;

  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  background: #00000050;
  z-index: var(--popup-zindex);

  .exp-popupjs-overlay {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: #00000050;
  }
  .exp-popupjs-content {
    position: relative;
    width: 96%;
    max-width: var(--popup-max-width);
    padding: 30px;
    margin: auto;
    border-radius: var(--popup-content-border-radius);
    z-index: 2;
    text-align: center;
    background-color: #fff;
    animation: exp-popupjs-show 0.3s;
  }

  .exp-popupjs-content-close {
    animation: exp-popupjs-close 0.15s forwards;
  }

  .exp-popupjs-header {
    display: flex;
    flex-direction: column;
  }

  .exp-popupjs-title {
    font-size: 1.225rem;
    font-weight: 600;
    text-align: center;
    color: var(--primary-color);

    ${breakpoint('XS')} {
      padding: 0;
    }

    .exp-popupjs-title-error {
      color: var(--red-2);
    }
  }

  .exp-popupjs-body {
    font-size: 1.125rem;
  }

  .exp-popupjs-footer {
    display: flex;
    z-index: 1;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    width: 100%;
    margin: 1.25em auto 0;

    button {
      min-width: 140px;
      margin: 0.3125em;

      &:hover {
        background-image: linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1));
      }
    }

    ${breakpoint('XS')} {
      &.footer-button-revers {
        flex-wrap: wrap-reverse;
      }
    }
  }

  .exp-popupjs-icon {
    position: relative;
    width: 2.25rem;
    height: 2.25rem;
    box-sizing: content-box;
    display: flex;
    justify-content: center;
    margin: 1.25rem auto 1em;
  }

  .exp-popupjs-icon-content {
    position: relative;
    width: 100%;
    height: 100%;
    border: 0.25rem solid transparent;

    border-radius: 50%;
    background-color: transparent;
  }
  .exp-popupjs-icon-success .exp-popupjs-icon-content {
    border-color: #a5dc86;
    background-color: #fff;

    .exp-popupjs-icon-success-line {
      display: inline-block;

      &::before,
      &::after {
        position: absolute;
        content: '';
        height: 0.3125rem;
        border-radius: 0.125rem;
        background-color: #a5dc86;
      }
      /* line short */
      &::before {
        top: 0.975rem;
        left: 0.125rem;
        width: 0.775rem;
        transform: rotate(45deg);
      }

      /* line long */
      &::after {
        top: 0.775rem;
        right: 0.125rem;
        width: 1.275rem;
        transform: rotate(-45deg);
      }
    }
  }
  .exp-popupjs-icon-warning .exp-popupjs-icon-content {
    font-size: 2.25rem;
    color: var(--white-1);
    line-height: 1.475rem;
    border-color: var(--primary-color);
    background-color: var(--primary-color);
  }
  .exp-popupjs-icon-error .exp-popupjs-icon-content {
    border-color: var(--red-2);
    background-color: #fff;

    .exp-popupjs-icon-x-mark {
      display: inline-block;

      &::before,
      &::after {
        position: absolute;
        content: '';
        width: 1.475rem;
        height: 0.3125rem;
        border-radius: 0.125rem;
        background-color: var(--red-2);
      }

      /* top left */
      &::before {
        top: calc(50% - (0.3125rem / 2));
        left: calc(50% - (1.475rem / 2));
        transform: rotate(45deg);
      }

      /* top right */
      &::after {
        top: calc(50% - (0.3125rem / 2));
        right: calc(50% - (1.475rem / 2));
        transform: rotate(-45deg);
      }
    }
  }

  .exp-popupjs-error {
    .exp-popupjs-title {
      color: var(--red-2);
    }
    .exp-popupjs-icon-warning .exp-popupjs-icon-content {
      border-color: var(--red-2);
      background-color: var(--red-2);
    }
  }

  .exp-popupjs-close-icon {
    position: absolute;
    top: 10px;
    right: 10px;
    width: 1.375rem;
    height: 1.375rem;
    font-size: 0;
    border: none;
    padding: 0;
    background-color: transparent;
    cursor: pointer;

    &::after {
      content: '';
      position: absolute;
      top: calc(50% - 2px);
      left: 0;
      display: block;
      width: 100%;
      height: 4px;
      border-radius: 4px;
      background-color: var(--gray-2);
      transform: rotate(45deg);
    }

    &::before {
      content: '';
      position: absolute;
      top: calc(50% - 2px);
      left: 0;
      display: block;
      width: 100%;
      height: 4px;
      border-radius: 4px;
      background-color: var(--gray-2);
      transform: rotate(45deg);
      transform: rotate(-45deg);
    }
  }

  // Appearance animation
  @keyframes exp-popupjs-show {
    0% {
      transform: scale(0.7);
    }

    45% {
      transform: scale(1.05);
    }

    80% {
      transform: scale(0.95);
    }

    100% {
      transform: scale(1);
    }
  }

  // Disppearance animation
  @keyframes exp-popupjs-close {
    0% {
      transform: scale(1);
      opacity: 1;
    }

    100% {
      transform: scale(0.5);
      opacity: 0;
    }
  }
`;
