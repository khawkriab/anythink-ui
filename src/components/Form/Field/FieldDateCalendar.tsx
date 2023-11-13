import classNames from 'classnames';
import dayjs from 'dayjs';
import React from 'react';
import FormGroup from '../FormGroup';
import FormLabel from '../FormLabel';
import FormInvalidFeedback from '../FormInvalidFeedback';
import FormRecommend from '../FormRecommend';
import { TCols } from '../../Grid/Col';
import { css } from '@emotion/css';
import breakpoint from '../../../utils/breakpoint';

interface IFieldDateCalendar
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

const DatePickerSlideup = css`
  label: datepicker-slideup;

  position: relative;
  margin-top: auto;
  height: inherit;
  display: flex;
  .datepicker-background-overlay,
  .datepicker-overlay {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  }

  .datepicker-body {
    position: relative;
    width: 100%;
    max-width: 750px;

    padding: 1rem 0;
    border-radius: 24px;
    overflow: hidden;
    background-color: #fff;
    transition: all 0.3s ease-in-out;

    ${breakpoint('MD')} {
      margin-top: auto;
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
    }
  }

  .datepicker-accept {
    width: 100%;
    color: var(--primary-color);
    font-size: 1rem;
    text-align: center;
    padding: 0.5rem 1rem 0;
    margin-top: 1rem;

    button {
      width: 80%;
      max-width: 350px;
    }
  }

  .datepicker.ios {
    position: relative;
    font-family: var(--font-body);
    font-size: 1rem;
    background-color: #fff;

    .datepicker-content {
      padding-top: 0;

      .datepicker-wheel {
        color: var(--primary-color);
        border-color: var(--lightseagreen-transparent-15);
        background-color: var(--lightseagreen-transparent-45);
      }

      .datepicker-viewport {
        &::after {
          background: linear-gradient(var(--white), transparent 20%, transparent 80%, var(--white));
        }
      }
    }
  }

  &[aria-expanded='true'] {
    opacity: 1;

    .datepicker-body {
      bottom: 0;
    }
  }
`;

const ReactMobileDatepickerConfig = {
  date: {
    format: 'DD',
    caption: 'Day',
    step: 1,
  },
  month: {
    format: (value: string) => dayjs(value).format('MMMM'),
    caption: 'Mon',
    step: 1,
  },
  year: {
    format: 'YYYY',
    caption: 'Year',
    step: 1,
  },
};

function FieldDateCalendar({
  title = '',
  label = '',
  value,
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
}: Readonly<IFieldDateCalendar>) {
  const ref2 = React.useRef<HTMLInputElement>(null!);
  const inputRef = React.useRef<HTMLInputElement>(null!);
  //
  const [showCalendar, setShowCalendar] = React.useState(false);
  const [inputDate, setInputDate] = React.useState(value ? new Date(value as string) : new Date('01/01/1990'));
  //

  //   const onSelectDate = (date) => {
  //     onChange({ target: { value: moment(date) || '', name: props.name } });
  //     setShowCalendar(false);

  //     ref2.current.focus();
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
          className={classNames('exp-form-control', className)}
          ref={ref2}
          value={value ? dayjs(value as string).format(format) : ''}
          placeholder={props.placeholder || format}
          readOnly
          onClick={() => setShowCalendar(true)}
        />

        {/* <EXPLiftUp.slideUp
          show={showCalendar}
          className="d-flex"
          backgroundColor="transparent"
          onClose={() => setShowCalendar(false)}
        >
          <DatePickerSlideup>
            <div className="datepicker-overlay" onClick={() => setShowCalendar(false)}></div>
            <div className="datepicker-body">
              <ReactMobileDatepicker
                theme="ios"
                isOpen={true}
                isPopup={false}
                showFooter={false}
                showHeader={false}
                dateConfig={ReactMobileDatepickerConfig}
                value={inputDate}
                max={props.max ? new Date(props.max) : undefined}
                min={props.min ? new Date(props.min) : undefined}
                onChange={(date) => setInputDate(date)}
              />
              <div className="datepicker-accept">
                <button className="theme-btn theme-btn-primary" onClick={() => onSelectDate(inputDate)}>
                  OK
                </button>
              </div>
            </div>
          </DatePickerSlideup>
        </EXPLiftUp.slideUp> */}
      </div>

      {children}
      {errorMsg && <FormInvalidFeedback>{errorMsg}</FormInvalidFeedback>}
      {recommendMsg && <FormRecommend>{recommendMsg}</FormRecommend>}
    </FormGroup>
  );
}

export default FieldDateCalendar;
