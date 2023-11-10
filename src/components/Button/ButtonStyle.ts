import { css } from '@emotion/css';

export const buttonStyle = css`
  label: button;

  .spinner {
    position: relative;
    display: inline-block;

    &.loading::after {
      content: '';
      position: absolute;
      top: calc(50% - 0.5rem);
      left: calc(100% + 6px);
      display: block;
      width: 1rem;
      height: 1rem;
      border-radius: 50%;
      border: 3px solid var(--second-color);
      border-right-color: transparent;
      animation: spinnerAnimetion 0.75s linear infinite;
    }
  }

  & + .fetch-loading-overlay {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 100;
    background-color: transparent;
    .fetch-loading-line {
      position: relative;
      height: 4px;
      background-color: var(--primary-color);
      animation: lineAnimetion 15s linear infinite;
    }
  }
  @keyframes spinnerAnimetion {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  @keyframes lineAnimetion {
    from {
      width: 0%;
    }
    to {
      width: 100%;
    }
  }
`;
