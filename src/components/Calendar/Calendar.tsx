import { useEffect, useState, useMemo, useRef, useCallback } from 'react';
import classNames from 'classnames';
import { calendarContianer } from './CalendarStyle';
import dayjs from 'dayjs';
import localeData from 'dayjs/plugin/localeData';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import LocalizedFormat from 'dayjs/plugin/localizedFormat';

import { splitIntoRows } from './utils';
import CalendarMonthPanel from './calendar-month-panel';
import CalendarYearPanel from './calendar-year-panel';
import CalendarDecadePanel from './calendar-decade-panel';
import AngleDoubleLeftIcon from '../../icons/AngleDoubleLeftIcon';
import AngleLeftIcon from '../../icons/AngleLeftIcon';
import AngleRightIcon from '../../icons/AngleRightIcon';
import AngleDoubleRightIcon from '../../icons/AngleDoubleRightIcon';

dayjs.extend(localeData);
dayjs.extend(LocalizedFormat);
dayjs.extend(customParseFormat);

export interface ICalender {
  value: dayjs.Dayjs;
  format?: string;
  placeholder?: string;
  autoFocus?: boolean;
  showInput?: boolean;
  headerRender?: (nerver: { date: dayjs.Dayjs; onChange: (date: dayjs.Dayjs) => void }) => React.ReactNode;
  onSelect?: (date: dayjs.Dayjs) => void;
  disableDate?: (date: dayjs.Dayjs) => boolean;
}

type TCalender = {
  date: dayjs.Dayjs;
  isLastMonth: boolean;
  isNextMonth: boolean;
  disable: boolean;
};

export default function Calendar({
  value,
  format = 'YYYY-MM-DD',
  placeholder,
  autoFocus = false,
  showInput = false,
  headerRender,
  onSelect = () => null,
  disableDate,
  ...props
}: Readonly<ICalender>) {
  const inputDateRef = useRef<HTMLInputElement>(null!);
  const [showMonth, setShowMonth] = useState<boolean>(false);
  const [showYear, setShowYear] = useState<boolean>(false);
  const [showYearOfDecade, setShowYearOfDecade] = useState(false);
  const [inputDate, setInputDate] = useState('');
  const [dateSelect, setDateSelect] = useState<dayjs.Dayjs>(dayjs());

  const onNextMonth = () => {
    const _dateSelect = dateSelect.add(1, 'month');

    setDateSelect(_dateSelect);
  };

  const onPrevMonth = () => {
    const _dateSelect = dateSelect.add(-1, 'month');

    setDateSelect(_dateSelect);
  };

  const onPrevYear = () => {
    const _dateSelect = dateSelect.add(-1, 'year');

    setDateSelect(_dateSelect);
  };

  const onNextyear = () => {
    const _dateSelect = dateSelect.add(1, 'year');

    setDateSelect(_dateSelect);
  };

  const onSelectMonth = (value = 0) => {
    const _dateSelect = dateSelect.set('month', value);

    setDateSelect(_dateSelect);
    setShowMonth(false);
  };

  const onSelectYear = (value = 0, fromDecade = false) => {
    const _dateSelect = dateSelect.set('year', value);

    setDateSelect(_dateSelect);

    if (fromDecade) {
      setShowYearOfDecade(false);
    } else {
      setShowYear(false);
    }
  };

  const onSelectDate = (date: dayjs.Dayjs) => {
    setDateSelect(date);
    setInputDate(date.format(format));
    // callback
    if (onSelect) onSelect(date);
  };

  const onChangeInputDate = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputDate(value);
  };

  const onBlurInputDate = () => {
    const isValid = dayjs(inputDate, format, true).isValid();

    if (!isValid) {
      setInputDate(dateSelect.format(format));
    }
  };

  const onEnterKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const isValid = dayjs(inputDate, format, true).isValid();

      if (isValid) {
        setDateSelect(dayjs(inputDate, format));

        // callback
        onSelect(dayjs(inputDate, format));
      }

      // onBlurInputDate
      inputDateRef.current.blur();
    }
  };

  const renderHeader = useCallback(() => {
    if (headerRender) {
      const header = headerRender({
        date: dateSelect,
        onChange: (date: dayjs.Dayjs) => setDateSelect(date),
      });

      return header;
    }

    return (
      <div style={{ position: 'relative' }}>
        <button className="calendar-prev-year-btn" onClick={onPrevYear}>
          <AngleDoubleLeftIcon />
        </button>
        <button className="calendar-prev-month-btn" onClick={onPrevMonth}>
          <AngleLeftIcon />
        </button>
        <span className="calendar-month-select" onClick={() => setShowMonth(true)}>
          {dateSelect.format('MMMM')}
        </span>{' '}
        <span className="calendar-year-select" onClick={() => setShowYear(true)}>
          {dateSelect.format('YYYY')}
        </span>
        <button className="calendar-next-month-btn" onClick={onNextMonth}>
          <AngleRightIcon />
        </button>
        <button className="calendar-next-year-btn" onClick={onNextyear}>
          <AngleDoubleRightIcon />
        </button>
      </div>
    );
  }, [headerRender, dateSelect]);

  const calendar = useMemo(() => {
    if (dateSelect) {
      const _startOfMonth = dateSelect.startOf('month');
      const _daysOfWeek = _startOfMonth.get('day');
      const _currentMonth = dateSelect.get('month');
      let _startOfCalendar = _startOfMonth.add(_daysOfWeek * -1, 'day');

      const calendarOfLength = 42; // 7 day * 6 week
      const _calender = [] as TCalender[];

      for (let i = 1; i <= calendarOfLength; i++) {
        const _disable = disableDate ? disableDate(_startOfCalendar) : false;
        const _thisMonth = _startOfCalendar.get('month');
        _calender.push({
          date: _startOfCalendar,
          isLastMonth: _thisMonth < _currentMonth,
          isNextMonth: _thisMonth > _currentMonth,
          disable: _disable,
        });

        _startOfCalendar = _startOfCalendar.set('date', _startOfCalendar.get('date') + 1);
      }

      const _weeksOfCalendar = splitIntoRows(_calender, 7) as TCalender[][];

      return _weeksOfCalendar;
    }

    return [];
  }, [dateSelect]);

  useEffect(() => {
    if (value) {
      const isDate = dayjs.isDayjs(value);
      const isValid = dayjs(value).isValid();

      if (isDate && isValid) {
        setDateSelect(value);
        setInputDate(dayjs(value).format(format));
      } else {
        setInputDate(dateSelect.format(format));
        console.warn('WARNING!!! invalid date type, date type of dayjs');
      }
    }
  }, [value]);

  return (
    <div {...props}>
      <div className={calendarContianer}>
        <div className="calendar">
          <div className="calendar-panel">
            {showInput && (
              <div className="calendar-input-wrap">
                <input
                  ref={inputDateRef}
                  value={inputDate}
                  placeholder={placeholder || format}
                  className="calendar-input"
                  onKeyUp={onEnterKey}
                  onBlur={onBlurInputDate}
                  onChange={onChangeInputDate}
                />
              </div>
            )}
            <div className="calendar-date-panel">
              <div className="calendar-header">
                {renderHeader()}
                {showMonth && (
                  <CalendarMonthPanel
                    date={dateSelect}
                    onPrevYear={onPrevYear}
                    onNextyear={onNextyear}
                    onSelectMonth={onSelectMonth}
                    onShowYearOfDecade={() => setShowYear(true)}
                  />
                )}
                {showYear && (
                  <CalendarYearPanel
                    date={dateSelect}
                    onSelectYear={onSelectYear}
                    onShowYearOfCentury={() => setShowYearOfDecade(true)}
                  />
                )}
                {showYearOfDecade && <CalendarDecadePanel date={dateSelect} onSelectYear={onSelectYear} />}
              </div>
            </div>
            <div className="calendar-body">
              <table className="calendar-table">
                <thead>
                  <tr>
                    {dayjs.weekdaysMin().map((item, index) => (
                      <th key={index} className="calendar-column-header">
                        <span className="calendar-column-header-inner">{item}</span>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="calendar-tbody">
                  {calendar.map((week, weekIndex) => (
                    <tr key={weekIndex}>
                      {week?.map((item, dayIndex) => (
                        <td
                          key={dayIndex}
                          title={item.date.format('LL')}
                          className={classNames(
                            'calendar-cell',
                            { 'calendar-selected-day': dateSelect.format('DDMMYYYY') === item.date.format('DDMMYYYY') },
                            { 'calendar-last-month-cell': item.isLastMonth },
                            { 'calendar-next-month-btn-day': item.isNextMonth }
                          )}
                          onClick={() => onSelectDate(item.date)}
                        >
                          <div className="calendar-date">{item.date.get('date')}</div>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
