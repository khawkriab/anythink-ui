import React from 'react';
import { getDecadeBetween, splitIntoRows } from './utils';
import dayjs from 'dayjs';
import { type } from 'os';
import AngleDoubleRightIcon from '../../icons/AngleDoubleRightIcon';
import AngleDoubleLeftIcon from '../../icons/AngleDoubleLeftIcon';

interface ICalendarDecadePanel {
  date: dayjs.Dayjs;
  onSelectYear: (year: number, fromDecade: boolean) => void;
}

type TCentury = {
  label: { start: number; end: number };
  select: boolean;
  last: boolean;
  next: boolean;
};

function runCenturyArrays(start: number, end: number, chunkSize = 1, select = 0, last = false, next = false) {
  const result = [] as TCentury[];

  for (let i = start; i <= end; i += chunkSize) {
    result.push({
      label: getDecadeBetween(i),
      select: select === i,
      last: last,
      next: next,
    });
  }

  return result;
}

function CalendarDecadePanel({ date = dayjs(), onSelectYear = () => null }: ICalendarDecadePanel) {
  const [currentYear, setCurrentYear] = React.useState(0);

  const currentYearOfCentury = React.useMemo(() => {
    const decade = getDecadeBetween(currentYear);
    return decade;
  }, [currentYear]);

  const yearOfCentury = React.useMemo(() => {
    const century = 100;
    const centuryStart = currentYear - (currentYear % century);
    const centuryEnd = centuryStart + century;

    const selectCentury = getDecadeBetween(currentYear);

    const chunkSize = 10;
    const _yearOfLastCentury = runCenturyArrays(centuryStart - 10, centuryStart - 10, chunkSize, 0, true, false);
    const _yearOfCentury = runCenturyArrays(centuryStart, centuryEnd - 1, chunkSize, selectCentury.start, false, false);
    const _yearOfNextCentury = runCenturyArrays(centuryEnd, centuryEnd, chunkSize, 0, false, true);

    const _yearOfCenturySplit: TCentury[][] = splitIntoRows(
      [..._yearOfLastCentury, ..._yearOfCentury, ..._yearOfNextCentury],
      3
    );

    return _yearOfCenturySplit;
  }, [currentYear]);

  const onPrevCentury = () => {
    const _currentYear = currentYear - 100;
    setCurrentYear(_currentYear);
  };

  const onNextCentury = () => {
    const _currentYear = currentYear + 100;
    setCurrentYear(_currentYear);
  };

  React.useEffect(() => {
    if (date) setCurrentYear(date.get('year'));
  }, [date]);

  if (currentYear <= 0) return null;

  return (
    <div className="calendar-decade-panel">
      <div className="calendar-decade-panel-header">
        <button className="calendar-decade-panel-prev-century-btn" onClick={onPrevCentury}>
          <AngleDoubleLeftIcon />
        </button>
        <span className="calendar-decade-panel-century">
          {currentYearOfCentury.start}-{currentYearOfCentury.end}
        </span>
        <button className="calendar-decade-panel-next-century-btn" onClick={onNextCentury}>
          <AngleDoubleRightIcon />
        </button>
      </div>
      <div className="calendar-decade-panel-body">
        <table className="calendar-table">
          <tbody className="calendar-tbody">
            {yearOfCentury.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((cell, cellIndex) => (
                  <td
                    key={cellIndex}
                    className={
                      currentYearOfCentury.start === cell.label.start
                        ? 'calendar-decade-panel-cell calendar-decade-panel-selected-cell'
                        : 'calendar-decade-panel-cell'
                    }
                    onClick={() => onSelectYear(cell.label.start, true)}
                  >
                    <div className="calendar-decade-panel-decade">
                      {cell.label.start}-{cell.label.end}
                    </div>
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

export default CalendarDecadePanel;
