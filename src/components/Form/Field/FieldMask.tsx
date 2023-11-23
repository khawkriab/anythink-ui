import React from 'react';
import InputMask, { Props } from 'react-input-mask';
import { TCols } from '../../Grid/Col';
import FormGroup from '../FormGroup';
import FormLabel from '../FormLabel';
import FormInvalidFeedback from '../FormInvalidFeedback';
import FormRecommend from '../FormRecommend';
import classNames from 'classnames';

interface IFieldMask extends TCols, Props {
  title?: string;
  label?: string;
  classNameLabel?: string;
  classNameField?: string;
  errorMsg?: string;
  recommendMsg?: string;
  isInvalid?: boolean;
  labelTextSmall?: boolean;
  titleTextSmall?: boolean;
  refInput?: HTMLInputElement;
}

function FieldMask({
  title = '',
  label = '',
  maskChar = null,
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
  refInput,
  children,
  ...props
}: Readonly<IFieldMask>) {
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
          {title || label}
        </FormLabel>
      )}

      <InputMask {...props} className={classNames('form-control', className)} inputRef={inputRef} maskChar={maskChar} />
      {children}
      {errorMsg && <FormInvalidFeedback>{errorMsg}</FormInvalidFeedback>}
      {recommendMsg && <FormRecommend>{recommendMsg}</FormRecommend>}
    </FormGroup>
  );
}

export default FieldMask;
