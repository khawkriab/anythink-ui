import React from 'react';
import { splitIntoRows } from './utils';
import dayjs from 'dayjs';
import classNames from 'classnames';
import AngleRightIcon from '../../icons/AngleRightIcon';
import AngleLeftIcon from '../../icons/AngleLeftIcon';

interface ICalendarMonthPanel {
  date: dayjs.Dayjs;
  onPrevYear: () => void;
  onNextyear: () => void;
  onSelectMonth: (month: number) => void;
  onShowYearOfDecade: () => void;
}

function CalendarMonthPanel({
  date = dayjs(),
  onPrevYear = () => null,
  onNextyear = () => null,
  onSelectMonth = () => null,
  onShowYearOfDecade = () => null,
}: ICalendarMonthPanel) {
  const monthsShort = dayjs.months();
  const monthOfYear = splitIntoRows(monthsShort, 3);

  return (
    <div className="calendar-month-panel">
      <div className="calendar-month-panel-header">
        <button className="calendar-month-panel-prev-year-btn" onClick={onPrevYear}>
          <AngleLeftIcon />
        </button>
        <span className="calendar-month-panel-year-select" onClick={onShowYearOfDecade}>
          {date.get('year')}
        </span>
        <button className="calendar-month-panel-next-year-btn" onClick={onNextyear}>
          <AngleRightIcon />
        </button>
      </div>
      <div className="calendar-month-panel-body">
        <table className="calendar-table">
          <tbody className="calendar-tbody">
            {monthOfYear.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((cell, cellIndex) => (
                  <td
                    key={cellIndex}
                    className={classNames('calendar-month-panel-cell', {
                      'calendar-month-panel-selected-cell': date.get('month') === rowIndex * 3 + cellIndex,
                    })}
                    onClick={() => onSelectMonth(rowIndex * 3 + cellIndex)}
                  >
                    <div className="calendar-month-panel-month">{cell}</div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CalendarMonthPanel;
