import React, { useCallback } from 'react';
import { TCols } from '../../Grid/Col';
import FieldCheckbox from './FieldCheckbox';
import classNames from 'classnames';
import FormGroup from '../FormGroup';
import FormLabel from '../FormLabel';
import FormInvalidFeedback from '../FormInvalidFeedback';
import FormRecommend from '../FormRecommend';

type TCheckListGroup = TCols & {
  label: string | number;
  value: string | number;
};

interface IFieldCheckboxGroup
  extends TCols,
    React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  title?: string;
  value?: string[];
  checkListGroup?: TCheckListGroup[];
  classNameLabel?: string;
  classNameField?: string;
  errorMsg?: string;
  recommendMsg?: string;
  isInvalid?: boolean;
  labelTextSmall?: boolean;
  titleTextSmall?: boolean;
}

function FieldCheckboxGroup({
  title = '',
  value = [],
  checkListGroup = [],
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
}: Readonly<IFieldCheckboxGroup>) {
  const getCheckedListGroup = useCallback(
    (currentValue: string | number) => {
      if (Array.isArray(value) && value.length > 0) return value.some((e) => e === currentValue);

      return false;
    },
    [value.length]
  );

  const getRequired = React.useMemo(() => {
    if (props.required && Array.isArray(value) && value.length >= 1) return false;

    return props.required;
  }, [value.length]);

  return (
    <FormGroup xs={xs} sm={sm} md={md} lg={lg} xl={xl} xxl={xxl} xxxl={xxxl} className={classNameField}>
      {title && (
        <FormLabel textSmall={titleTextSmall} className={classNameLabel} required={props.required}>
          {title}
        </FormLabel>
      )}
      <div className="form-row">
        {checkListGroup.map((item, index) => (
          <FieldCheckbox
            {...props}
            key={index}
            className={classNames('form-check-input', props.className)}
            type="checkbox"
            id={props.id ? `${props.id}-nth-${index}` : `${props.name}-nth-${index}`}
            label={item.label}
            value={item.value}
            checked={getCheckedListGroup(item.value)}
            required={getRequired}
            isInvalid={isInvalid}
            xs={item.xs}
            sm={item.sm}
            md={item.md}
            lg={item.lg}
            xl={item.xl}
            xxl={item.xxl}
            xxxl={item.xxxl}
          />
        ))}
        {children}
      </div>
      {errorMsg && <FormInvalidFeedback isInvalid={isInvalid}>{errorMsg}</FormInvalidFeedback>}
      {recommendMsg && <FormRecommend>{recommendMsg}</FormRecommend>}
    </FormGroup>
  );
}

export default FieldCheckboxGroup;
