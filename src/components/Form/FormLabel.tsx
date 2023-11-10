import classNames from 'classnames';
import React from 'react';

export interface IFormLabel
  extends React.DetailedHTMLProps<React.LabelHTMLAttributes<HTMLLabelElement>, HTMLLabelElement> {
  textSmall: boolean;
  required: boolean;
  className: string;
  children: React.ReactNode;
}

function FormLabel({ textSmall = false, required = false, className, children, ...props }: Readonly<IFormLabel>) {
  return (
    <label className={classNames('exp-form-label', { 'exp-form-label-small': textSmall }, className)}>
      {children}
      {required && <span className="exp-form-required">*</span>}
    </label>
  );
}
export default FormLabel;
