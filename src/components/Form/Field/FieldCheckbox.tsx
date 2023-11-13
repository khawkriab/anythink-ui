import React from 'react';
import Col, { TCols } from '../../Grid/Col';
import classNames from 'classnames';

interface IFieldCheckbox
  extends TCols,
    React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  label?: string | number;
  classNameLabel?: string;
  classNameField?: string;
  isInvalid?: boolean;
}
function FieldCheckbox({
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
}: Readonly<IFieldCheckbox>) {
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
        ref={inputRef}
        id={props.id ? props.id : props.name}
        type="checkbox"
        className={classNames('exp-form-check-input', props.className)}
      />
      <label htmlFor={props.id ? props.id : props.name} className={classNames(classNameLabel)}>
        {label}
      </label>
      {children}
    </Col>
  );
}

export default FieldCheckbox;
