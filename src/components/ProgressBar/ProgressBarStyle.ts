import { css } from '@emotion/css';

export const progressContainer = css`
  label: progressbar;

  position: relative;
  display: flex;
  justify-content: center;
  height: var(--progressbar-height);
  padding: var(--progressbar-padding);
  overflow: hidden;

  &.progressbar-default {
    --progressbar-height: auto;
    --progressbar-padding: 1.5rem 0;
    --progressbar-point-color: #000;
    --progressbar-point-color-active: #fff;
    --progressbar-point-color-disabled: #000;
    --progressbar-point-border-color: #00f;
    --progressbar-point-border-color-active: #00f;
    --progressbar-point-border-color-disabled: #00f;
    --progressbar-point-border-size: 4px;
    --progressbar-point-background-color: #ebebeb;
    --progressbar-point-background-color-active: #00f;
    --progressbar-point-background-color-disabled: #777;
    --progressbar-point-size: 30px;
    --progressbar-point-size-active: 35px;
    --progressbar-line-width: 100px;
    --progressbar-line-height: 4px;
    --progressbar-line-background-color: #00f;
    --progressbar-line-background-color-active: #ff0000;
    --progressbar-label-color: #000;
    --progressbar-label-color-active: #000;
    --progressbar-label-font-size: 1rem;
  }

  .scroll-container {
    position: relative;
    display: flex;
    max-width: 100%;
    overflow: hidden hidden;

    &::-webkit-scrollbar {
      width: 1px;
    }

    .scroll-drag::after {
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      display: block;
      z-index: 9;
      background-color: #00000099;
    }
  }

  .inner-scroll-container {
    display: flex;
    width: auto;
    padding: 0 calc(var(--progressbar-line-width) / 2);
  }

  .progressbar-item {
    position: relative;
    width: calc(var(--progressbar-point-size) + var(--progressbar-line-width));

    .progressbar-point {
      position: relative;
      width: 100%;
      height: var(--progressbar-point-size-active);
    }

    .progressbar-button {
      position: absolute;
      top: calc(50% - (var(--progressbar-point-size) / 2));
      left: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      width: var(--progressbar-point-size);
      height: var(--progressbar-point-size);
      color: var(--progressbar-point-color);
      font-size: 1em;
      border: var(--progressbar-point-border-size) solid var(--progressbar-point-border-color);
      border-radius: 100%;
      background-color: var(--progressbar-point-background-color);
      cursor: pointer;
      overflow: hidden;
      z-index: 1;

      &:disabled {
        color: var(--progressbar-point-color-disabled);
        border-color: var(--progressbar-point-border-color-disabled);
        background-color: var(--progressbar-point-background-color-disabled);
        cursor: not-allowed;
      }
    }

    .progressbar-line {
      position: absolute;
      top: calc(50% - (var(--progressbar-line-height) / 2));
      left: var(--progressbar-point-size);
      width: var(--progressbar-line-width);
      height: var(--progressbar-line-height);
      background-color: var(--progressbar-line-background-color);

      .progressbar-percent {
        position: relative;
        width: 0;
        height: 100%;
        background-color: var(--progressbar-line-background-color-active);
      }
    }

    .progressbar-label {
      width: var(--progressbar-line-width);
      color: var(--progressbar-label-color);
      font-size: var(--progressbar-label-font-size);
      text-align: center;
      word-break: break-word;
      margin-left: calc((var(--progressbar-line-width) / 2 * -1) + (var(--progressbar-point-size) / 2));
      cursor: default;
    }
  }
  .progressbar-item:last-of-type {
    width: var(--progressbar-point-size);

    .progressbar-line {
      display: none;
    }
  }

  .progressbar-item.progressbar-in-progress .progressbar-button,
  .progressbar-item.progressbar-complete .progressbar-button {
    top: 0;
    width: var(--progressbar-point-size-active);
    height: var(--progressbar-point-size-active);
    color: var(--progressbar-point-color-active);
    border-color: var(--progressbar-point-border-color-active);
    background-color: var(--progressbar-point-background-color-active);
  }
  .progressbar-item.progressbar-in-progress .progressbar-label,
  .progressbar-item.progressbar-complete .progressbar-label {
    color: var(--progressbar-label-color-active);
  }
`;
