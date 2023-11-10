import React from 'react';
import classNames from 'classnames';

interface IFormInvalidFeedback extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  isInvalid: boolean;
  className: string;
  children: React.ReactNode;
}

function FormInvalidFeedback({ isInvalid = false, className, children, ...props }: Readonly<IFormInvalidFeedback>) {
  return (
    <div {...props} className={classNames('exp-invalid-feedback', { 'is-invalid': isInvalid }, className)}>
      {children}
    </div>
  );
}
export default FormInvalidFeedback;
