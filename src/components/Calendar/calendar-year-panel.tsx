import React from 'react';
import { getDecadeBetween, runArrays, splitIntoRows } from './utils';
import dayjs from 'dayjs';
import AngleDoubleLeftIcon from '../../icons/AngleDoubleLeftIcon';
import AngleDoubleRightIcon from '../../icons/AngleDoubleRightIcon';

interface ICalendarYearPanel {
  date: dayjs.Dayjs;
  onSelectYear: (year: number) => void;
  onShowYearOfCentury: () => void;
}

function CalendarYearPanel({
  date = dayjs(),
  onSelectYear = () => null,
  onShowYearOfCentury = () => null,
}: ICalendarYearPanel) {
  const [currentYear, setCurrentYear] = React.useState<number>(0);

  const currentYearOfDecade = React.useMemo(() => {
    const decade = getDecadeBetween(currentYear);
    return decade;
  }, [currentYear]);

  const yearOfDecade = React.useMemo(() => {
    const decade = getDecadeBetween(currentYear);

    const _yearOfLastDecade = runArrays(decade.start - 1, decade.start - 1, true, false);
    const _yearOfDecade = runArrays(decade.start, decade.end, false, false);
    const _yearOfNextDecade = runArrays(decade.end + 1, decade.end + 1, false, true);

    const _yearOfDecadeSplit: Array<Array<{ label: number; last: boolean; next: boolean }>> = splitIntoRows(
      [..._yearOfLastDecade, ..._yearOfDecade, ..._yearOfNextDecade],
      3
    );

    return _yearOfDecadeSplit;
  }, [currentYear]);

  const onPrevDecade = () => {
    const _currentYear = currentYear - 10;
    setCurrentYear(_currentYear);
  };

  const onNextDecade = () => {
    const _currentYear = currentYear + 10;
    setCurrentYear(_currentYear);
  };

  React.useEffect(() => {
    if (date) setCurrentYear(date.get('year'));
  }, [date]);

  if (currentYear <= 0) return null;

  return (
    <div className="calendar-year-panel">
      <div className="calendar-year-panel-header">
        <button className="calendar-year-panel-prev-decade-btn" onClick={onPrevDecade}>
          <AngleDoubleLeftIcon />
        </button>
        <span className="calendar-year-panel-decade-select" onClick={onShowYearOfCentury}>
          {currentYearOfDecade.start}-{currentYearOfDecade.end}
        </span>
        <button className="calendar-year-panel-next-decade-btn" onClick={onNextDecade}>
          <AngleDoubleRightIcon />
        </button>
      </div>
      <div className="calendar-year-panel-body">
        <table className="calendar-table">
          <tbody className="calendar-tbody">
            {yearOfDecade.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((cell, cellIndex) => (
                  <td
                    key={cellIndex}
                    className={
                      currentYear === cell.label ? 'calendar-cell calendar-year-panel-selected-cell' : 'calendar-cell'
                    }
                    onClick={() => onSelectYear(cell.label)}
                  >
                    <div className="calendar-year-panel-year">{cell.label}</div>
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

export default CalendarYearPanel;
