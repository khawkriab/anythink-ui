import React from 'react';
import FormGroup from '../FormGroup';
import FormLabel from '../FormLabel';
import FormInvalidFeedback from '../FormInvalidFeedback';
import FormRecommend from '../FormRecommend';
import classNames from 'classnames';
import { TCols } from '../../Grid/Col';

interface IFieldNumeric
  extends TCols,
    React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  title?: string;
  label?: string;
  classNameLabel?: string;
  classNameField?: string;
  errorMsg?: string;
  recommendMsg?: string;
  isInvalid?: boolean;
  labelTextSmall?: boolean;
  titleTextSmall?: boolean;
}

function FieldNumeric({
  title = '',
  label = '',
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
}: Readonly<IFieldNumeric>) {
  const inputRef = React.useRef<HTMLInputElement>(null!);

  const onHandleNumber = (event: React.ChangeEvent<HTMLInputElement>) => {
    // const _value = String(event.target.value);
    // if (isNaN(_value)) {
    //   onChange({ ...event, target: { name: event.target.name, value: props.value } });
    // } else if (String(props.value) === '0') {
    //   onChange({ ...event, target: { name: event.target.name, value: _value.replace('0', '') } });
    // } else if (!_value) {
    //   onChange({ ...event, target: { name: event.target.name, value: 0 } });
    // } else {
    //   onChange({ ...event, target: { name: event.target.name, value: _value } });
    // }

    const value = event.target.value
      .replace(/[^0-9.]/g, '')
      .replace(/(\..*?)\..*/g, '$1')
      .replace(/^0[^.]/, '0');

    onChange({ ...event, target: { ...event.target, value: value } });
  };

  React.useEffect(() => {
    const setInvalid = () => {
      if (props.required && !isInvalid && String(props.value) === '0') {
        inputRef.current.setCustomValidity('Invalid field.');
      } else if (props.required && !isInvalid && String(props.value) !== '0') {
        inputRef.current.setCustomValidity('');
      }
    };

    setInvalid();
  }, [props.required, props.value, isInvalid]);

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
      <input
        {...props}
        className={classNames('exp-form-control', props.className)}
        type="tel"
        ref={inputRef}
        onChange={onHandleNumber}
      />
      {children}
      {errorMsg && <FormInvalidFeedback>{errorMsg}</FormInvalidFeedback>}
      {recommendMsg && <FormRecommend>{recommendMsg}</FormRecommend>}
    </FormGroup>
  );
}

export default FieldNumeric;
