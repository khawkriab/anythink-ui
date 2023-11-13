import React from 'react';
import { TCols } from '../../Grid/Col';
import FormGroup from '../FormGroup';
import FormLabel from '../FormLabel';
import FieldRadio from './FieldRadio';
import classNames from 'classnames';
import FormInvalidFeedback from '../FormInvalidFeedback';
import FormRecommend from '../FormRecommend';

type TRadioListGroup = TCols & {
  id?: string;
  label: string | number;
  value: string | number;
};

interface IFieldRadioGroup
  extends TCols,
    React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  title?: string;
  value?: string;
  radioListGroup?: TRadioListGroup[];
  classNameLabel?: string;
  classNameField?: string;
  errorMsg?: string;
  recommendMsg?: string;
  isInvalid?: boolean;
  labelTextSmall?: boolean;
  titleTextSmall?: boolean;
}

function FieldRadioGroup({
  title = '',
  value = '',
  radioListGroup = [],
  className = '',
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
}: Readonly<IFieldRadioGroup>) {
  return (
    <FormGroup xs={xs} sm={sm} md={md} lg={lg} xl={xl} xxl={xxl} xxxl={xxxl} className={classNameField}>
      {title && (
        <FormLabel textSmall={titleTextSmall} className={classNameLabel} required={props.required}>
          {title}
        </FormLabel>
      )}
      <div className="exp-form-row">
        {radioListGroup.map((item, index) => (
          <FieldRadio
            {...props}
            key={index}
            type="radio"
            id={item.id ?? `${props.name}-nth-${index}`}
            label={item.label}
            value={item.value || ''}
            checked={value === item.value}
            xs={item.xs}
            sm={item.sm}
            md={item.md}
            lg={item.lg}
            xl={item.xl}
            xxl={item.xxl}
            xxxl={item.xxxl}
            isInvalid={isInvalid}
            className={classNames('exp-form-check-input', { 'exp-form-label-small': titleTextSmall }, className)}
          />
        ))}
        {children}
      </div>
      {errorMsg && <FormInvalidFeedback isInvalid={isInvalid}>{errorMsg}</FormInvalidFeedback>}
      {recommendMsg && <FormRecommend>{recommendMsg}</FormRecommend>}
    </FormGroup>
  );
}

export default FieldRadioGroup;
