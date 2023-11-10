import classNames from 'classnames';
import React from 'react';

interface IRow extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  className: string;
  children: React.ReactNode;
}
export default function Row({ children, className, ...props }: Readonly<IRow>) {
  return (
    <div {...props} className={classNames('row', className)}>
      {children}
    </div>
  );
}
