import React from 'react';
import { TCols } from '../../Grid/Col';
import FormGroup from '../FormGroup';
import FormLabel from '../FormLabel';
import classNames from 'classnames';
import FormInvalidFeedback from '../FormInvalidFeedback';
import FormRecommend from '../FormRecommend';

interface IFieldControl
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

function FieldControl({
  title,
  label,
  classNameLabel,
  classNameField,
  errorMsg,
  recommendMsg,
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
  ...props
}: Readonly<IFieldControl>) {
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
    <FormGroup xs={xs} sm={sm} md={md} lg={lg} xl={xl} xxl={xxl} xxxl={xxxl} className={classNameField}>
      {(title || label) && (
        <FormLabel textSmall={labelTextSmall && titleTextSmall} className={classNameLabel} required={props.required}>
          {title ?? label}
        </FormLabel>
      )}
      <input {...props} className={classNames('form-control', props.className)} ref={inputRef} />
      {children}
      {errorMsg && <FormInvalidFeedback>{errorMsg}</FormInvalidFeedback>}
      {recommendMsg && <FormRecommend>{recommendMsg}</FormRecommend>}
    </FormGroup>
  );
}

export default FieldControl;
