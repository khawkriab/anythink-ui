import React from 'react';
import Col, { TCols } from '../../Grid/Col';
import classNames from 'classnames';

interface IFieldRadio
  extends TCols,
    React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  label?: string | number;
  classNameLabel?: string;
  classNameField?: string;
  isInvalid?: boolean;
}

function FieldRadio({
  label = '',
  classNameLabel = '',
  classNameField = '',
  isInvalid = false,
  xs,
  sm,
  md,
  lg,
  xl,
  xxl,
  xxxl,
  children,
  ...props
}: Readonly<IFieldRadio>) {
  const inputRef = React.useRef<HTMLInputElement>(null!);

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
    <Col
      className={classNames('exp-form-check', classNameField)}
      xs={xs}
      sm={sm}
      md={md}
      lg={lg}
      xl={xl}
      xxl={xxl}
      xxxl={xxxl}
    >
      <input
        {...props}
        className={classNames(['exp-form-check-input', props.className])}
        ref={inputRef}
        type="radio"
        id={props.id ? props.id : props.name}
      />
      <label htmlFor={props.id ? props.id : props.name} className={classNames([classNameLabel])}>
        {label}
      </label>
      {children}
    </Col>
  );
}

export default FieldRadio;
