import React from 'react';
import FormInvalidFeedback from '../FormInvalidFeedback';
import FormRecommend from '../FormRecommend';
import FormGroup from '../FormGroup';
import FormLabel from '../FormLabel';
import dayjs from 'dayjs';
import classNames from 'classnames';
import { TCols } from '../../Grid/Col';

interface IFieldDatePicker
  extends TCols,
    React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  title?: string;
  label?: string;
  format?: string;
  classNameLabel?: string;
  classNameField?: string;
  errorMsg?: string;
  recommendMsg?: string;
  isInvalid?: boolean;
  labelTextSmall?: boolean;
  titleTextSmall?: boolean;
}

function FieldDatePicker({
  title = '',
  label = '',
  value = '',
  format = 'YYYY-MM-DD',
  className = '',
  classNameLabel = '',
  classNameField = '',
  errorMsg = '',
  recommendMsg = '',
  isInvalid = false,
  labelTextSmall = true,
  titleTextSmall = true,
  xs,
  sm,
  md,
  lg,
  xl,
  xxl,
  xxxl,
  children,
  onChange = () => null,
  ...props
}: Readonly<IFieldDatePicker>) {
  const ref = React.useRef<HTMLInputElement>(null!);
  const inputRef = React.useRef<HTMLInputElement>(null!);
  //
  const [showCalendar, setShowCalendar] = React.useState(false);
  const [inputDate, setInputDate] = React.useState(value ? new Date(value as string) : new Date('01/01/1990'));
  //

  //   const onSelectDate = (date) => {
  //     onChange({ target: { value: moment(date) || '', name: props.name } });
  //     setShowCalendar(false);

  //     ref.current.focus();
  //   };

  React.useEffect(() => {
    const setInvalid = () => {
      const _isInvalidClassname = inputRef.current?.classList?.contains('is-invalid');

      if (isInvalid) {
        inputRef.current.setCustomValidity('Invalid field.');

        if (!_isInvalidClassname) inputRef.current.classList.add('is-invalid');
      } else if (_isInvalidClassname) {
        inputRef.current.classList.remove('is-invalid');
      }
    };

    setInvalid();

    return () => inputRef.current.setCustomValidity('');
  }, [isInvalid]);

  return (
    <FormGroup xs={xs} sm={sm} md={md} lg={lg} xl={xl} xxl={xxl} xxxl={xxxl} className={classNameField}>
      {(title || label) && (
        <FormLabel textSmall={labelTextSmall && titleTextSmall} className={classNameLabel} required={props.required}>
          {title || label}
        </FormLabel>
      )}
      {/* validate */}
      <input
        {...props}
        ref={inputRef}
        type="date"
        value={value ? dayjs(value as string).format('YYYY-MM-DD') : ''}
        className="exp-form-control exp-validate-date"
        onChange={() => null} // bypass handle
      />
      {/* display */}
      <div className={classNames('exp-form-date-display', className)}>
        <input
          ref={ref}
          className={classNames('exp-form-control', className)}
          value={value ? dayjs(value as string).format(format) : ''}
          placeholder={props.placeholder || format}
          readOnly
          onClick={() => setShowCalendar(true)}
        />

        {/* <DatePickerCalendar
          autoFocus={showCalendar}
          datePickerRef={ref}
          style={{ position: 'absolute', top: 0, left: 0, zIndex: 10, display: showCalendar ? 'block' : 'none' }}
          value={value || ''}
          placeholder={props.placeholder || formatDate}
          locale={locale}
          format={formatDate}
          onChangeDate={onSelectDate}
        /> */}
      </div>

      {children}
      {errorMsg && <FormInvalidFeedback>{errorMsg}</FormInvalidFeedback>}
      {recommendMsg && <FormRecommend>{recommendMsg}</FormRecommend>}
    </FormGroup>
  );
}

export default FieldDatePicker;
