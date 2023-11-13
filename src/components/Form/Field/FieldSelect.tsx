import React from 'react';
import { TCols } from '../../Grid/Col';
import FormGroup from '../FormGroup';
import FormLabel from '../FormLabel';
import FormInvalidFeedback from '../FormInvalidFeedback';
import FormRecommend from '../FormRecommend';
import classNames from 'classnames';

type TOptionList = { label: React.ReactNode; value: string };

interface IFieldSelect
  extends TCols,
    React.DetailedHTMLProps<React.SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement> {
  title?: string;
  label?: string;
  optionList?: TOptionList[];
  classNameLabel?: string;
  classNameField?: string;
  errorMsg?: string;
  recommendMsg?: string;
  isInvalid?: boolean;
  labelTextSmall?: boolean;
  titleTextSmall?: boolean;
}

function FieldSelect({
  title = '',
  label = '',
  optionList = [],
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
  ...props
}: Readonly<IFieldSelect>) {
  const selectRef = React.useRef<HTMLSelectElement>(null!);

  React.useEffect(() => {
    const setInvalid = () => {
      const _isInvalidClassname = selectRef.current?.classList?.contains('is-invalid');

      if (isInvalid) {
        selectRef.current.setCustomValidity('Invalid field.');

        if (!_isInvalidClassname) selectRef.current.classList.add('is-invalid');
      } else if (_isInvalidClassname) {
        selectRef.current.classList.remove('is-invalid');
      }
    };

    setInvalid();

    return () => selectRef.current.setCustomValidity('');
  }, [isInvalid]);

  return (
    <FormGroup xs={xs} sm={sm} md={md} lg={lg} xl={xl} xxl={xxl} xxxl={xxxl} className={classNameField}>
      {(title || label) && (
        <FormLabel textSmall={labelTextSmall && titleTextSmall} className={classNameLabel} required={props.required}>
          {title || label}
        </FormLabel>
      )}
      <select {...props} className={classNames('exp-form-control', props.className)} ref={selectRef}>
        {optionList.map((el, index) => (
          <option key={index} value={el.value}>
            {el.label}
          </option>
        ))}
        {children}
      </select>
      {errorMsg && <FormInvalidFeedback>{errorMsg}</FormInvalidFeedback>}
      {recommendMsg && <FormRecommend>{recommendMsg}</FormRecommend>}
    </FormGroup>
  );
}

export default FieldSelect;
