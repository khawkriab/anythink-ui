import React from 'react';
import { TCols } from '../../Grid/Col';
import FormGroup from '../FormGroup';
import FormLabel from '../FormLabel';
import classNames from 'classnames';
import FormInvalidFeedback from '../FormInvalidFeedback';
import FormRecommend from '../FormRecommend';

interface IFieldFile
  extends TCols,
    React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  title?: string;
  label?: string;
  classNameLabel?: string;
  classNameField?: string;
  errorMsg?: string;
  recommendMsg?: string;
  isInvalid?: boolean;
  titleTextSmall?: boolean;
}

function FieldFile({
  title = '',
  label = '',
  classNameLabel = '',
  classNameField = '',
  errorMsg = '',
  recommendMsg = '',
  isInvalid = false,
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
}: Readonly<IFieldFile>) {
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
      {title && (
        <FormLabel textSmall={titleTextSmall} className={classNameLabel} required={props.required}>
          {title}
        </FormLabel>
      )}
      <input
        {...props}
        className={classNames('form-control', props.className)}
        id={props.id ? props.id : props.name}
        ref={inputRef}
        type="file"
      />
      {label && (
        <label htmlFor={props.id ? props.id : props.name} className={classNames(classNameLabel)}>
          {label}
        </label>
      )}
      {children}
      {errorMsg && <FormInvalidFeedback>{errorMsg}</FormInvalidFeedback>}
      {recommendMsg && <FormRecommend>{recommendMsg}</FormRecommend>}
    </FormGroup>
  );
}

export default FieldFile;
