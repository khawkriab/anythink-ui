import { css } from '@emotion/css';

export const calendarContianer = css`
  label: calendar;

  color: rgba(0, 0, 0, 0.65);
  margin: 0;
  padding: 0;
  list-style: none;
  z-index: 1050;

  .calendar {
    position: relative;
    width: 280px;
    text-align: left;
    list-style: none;
    border-radius: 4px;
    border: 1px solid #fff;
    background-color: #fff;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  }

  .calendar-input-wrap {
    padding: 6px 10px;
    border-bottom: 1px solid #e8e8e8;
  }
  .calendar-input {
    width: 100%;
    height: 22px;
    color: rgba(0, 0, 0, 0.65);
    background: #fff;
    border: 0;
    outline: 0;
    cursor: auto;
  }

  .calendar-header {
    width: 100%;
    height: 40px;
    line-height: 40px;
    text-align: center;
    border-bottom: 1px solid #e8e8e8;

    span:hover {
      color: #40a9ff;
      cursor: pointer;
    }
  }

  .calendar-month-select {
    display: inline-block;
    padding: 0 2px;
    font-weight: 500;
    line-height: 40px;
  }

  .calendar-header .calendar-century-select,
  .calendar-header .calendar-decade-select,
  .calendar-header .calendar-year-select,
  .calendar-header .calendar-month-select {
    display: inline-block;
    padding: 0 2px;
    font-weight: 500;
    line-height: 40px;
  }

  .calendar-month-panel-header,
  .calendar-year-panel-header,
  .calendar-decade-panel-header {
    position: relative;
    height: 40px;
    border-bottom: 1px solid #e8e8e8;
  }

  .calendar-prev-month-btn,
  .calendar-next-month-btn,
  .calendar-prev-year-btn,
  .calendar-next-year-btn,
  .calendar-month-panel-prev-year-btn,
  .calendar-month-panel-next-year-btn,
  .calendar-year-panel-prev-decade-btn,
  .calendar-year-panel-next-decade-btn,
  .calendar-decade-panel-prev-century-btn,
  .calendar-decade-panel-next-century-btn {
    position: absolute;
    top: calc(50% - 0.5em);
    display: inline-block;
    border: none;
    background-color: transparent;
    cursor: pointer;
  }

  .calendar-prev-month-btn {
    left: 2em;
  }

  .calendar-next-month-btn {
    right: 2em;
  }

  .calendar-prev-year-btn,
  .calendar-month-panel-prev-year-btn,
  .calendar-year-panel-prev-decade-btn,
  .calendar-decade-panel-prev-century-btn {
    left: 0.5em;
  }
  .calendar-next-year-btn,
  .calendar-month-panel-next-year-btn,
  .calendar-year-panel-next-decade-btn,
  .calendar-decade-panel-next-century-btn {
    right: 0.5em;
  }

  .calendar-body {
    padding: 8px 12px;
  }

  .calendar-month-panel-body,
  .calendar-year-panel-body,
  .calendar-decade-panel-body {
    height: calc(100% - 40px);
  }

  .calendar table,
  .calendar th,
  .calendar td {
    text-align: center;
    border: 0;
  }

  .calendar table {
    width: 100%;
    max-width: 100%;
    height: 100%;
    background-color: transparent;
    border-collapse: collapse;
    table-layout: fixed;
  }

  .calendar-cell {
    height: 30px;
    padding: 3px 0;
  }

  .calendar-date {
    display: block;
    width: 24px;
    height: 24px;
    margin: 0 auto;
    padding: 0;
    line-height: 22px;
    text-align: center;
    background: transparent;
    border: 1px solid transparent;
    border-radius: 2px;
    transition: background 0.3s ease;

    &:hover {
      background: #e6f7ff;
      cursor: pointer;
    }
  }

  .calendar-selected-day .calendar-date {
    background: #bae7ff;
  }

  .calendar-year-panel {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 10;
    background: #fff;
    border-radius: 4px;
    outline: none;
  }

  .calendar-year-panel-year {
    display: inline-block;
    height: 24px;
    margin: 0 auto;
    padding: 0 8px;
    color: rgba(0, 0, 0, 0.65);
    line-height: 24px;
    text-align: center;
    background: transparent;
    border-radius: 2px;
    transition: background 0.3s ease;

    &:hover {
      background: #e6f7ff;
      cursor: pointer;
    }
  }

  .calendar-year-panel-selected-cell .calendar-year-panel-year {
    color: #fff;
    background: #1890ff;
  }

  .calendar-month-panel {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 10;
    background: #fff;
    border-radius: 4px;
    outline: none;
  }

  .calendar-month-panel-selected-cell .calendar-month-panel-month {
    color: #fff;
    background: #1890ff;
  }

  .calendar-month-panel-month {
    display: inline-block;
    height: 24px;
    margin: 0 auto;
    padding: 0 8px;
    color: rgba(0, 0, 0, 0.65);
    line-height: 24px;
    text-align: center;
    background: transparent;
    border-radius: 2px;
    transition: background 0.3s ease;

    &:hover {
      background: #e6f7ff;
      cursor: pointer;
    }
  }

  .calendar-decade-panel {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 10;
    display: flex;
    flex-direction: column;
    background: #fff;
    border-radius: 4px;
    outline: none;
  }

  .calendar-decade-panel-decade {
    display: inline-block;
    height: 24px;
    margin: 0 auto;
    padding: 0 6px;
    color: rgba(0, 0, 0, 0.65);
    line-height: 24px;
    text-align: center;
    background: transparent;
    border-radius: 2px;
    transition: background 0.3s ease;

    &:hover {
      background: #e6f7ff;
      cursor: pointer;
    }
  }

  .calendar-decade-panel-selected-cell .calendar-decade-panel-decade {
    color: #fff;
    background: #1890ff;
  }

  .calendar-last-month-cell .calendar-date,
  .calendar-next-month-btn-day .calendar-date,
  .calendar-last-month-cell .calendar-date:hover,
  .calendar-next-month-btn-day .calendar-date:hover {
    color: rgba(0, 0, 0, 0.25);
    background: transparent;
    border-color: transparent;
  }
`;
