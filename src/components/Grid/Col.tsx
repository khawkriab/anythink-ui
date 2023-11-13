import classNames from 'classnames';
import React from 'react';

export type TColOptions = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 'auto' | boolean;
export type TCols = {
  xs?: TColOptions;
  sm?: TColOptions;
  md?: TColOptions;
  lg?: TColOptions;
  xl?: TColOptions;
  xxl?: TColOptions;
  xxxl?: TColOptions;
};

export interface ICol extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, TCols {
  as?: string;
  className?: string;
  children: React.ReactNode;
}

export default function Col({ as, xs, sm, md, lg, xl, xxl, xxxl, className, children, ...props }: Readonly<ICol>) {
  const classCol = React.useMemo(() => {
    return classNames(
      { [`col`]: xs && typeof xs === 'boolean' },
      { [`col-sm`]: sm && typeof sm === 'boolean' },
      { [`col-md`]: md && typeof md === 'boolean' },
      { [`col-lg`]: lg && typeof lg === 'boolean' },
      { [`col-xl`]: xl && typeof xl === 'boolean' },
      { [`col-xxl`]: xxl && typeof xxl === 'boolean' },
      { [`col-xxxl`]: xxxl && typeof xxxl === 'boolean' },
      { [`col-${xs}`]: xs && (typeof xs === 'number' || typeof xs === 'string') },
      { [`col-sm-${sm}`]: sm && (typeof sm === 'number' || typeof sm === 'string') },
      { [`col-md-${md}`]: md && (typeof md === 'number' || typeof md === 'string') },
      { [`col-lg-${lg}`]: lg && (typeof lg === 'number' || typeof lg === 'string') },
      { [`col-xl-${xl}`]: xl && (typeof xl === 'number' || typeof xl === 'string') },
      { [`col-xxl-${xxl}`]: xxl && (typeof xxl === 'number' || typeof xxl === 'string') },
      { [`col-xxxl-${xxxl}`]: xxxl && (typeof xxxl === 'number' || typeof xxxl === 'string') }
    );
  }, [xs, sm, md, lg, xl, xxl, xxxl]);

  return React.createElement(
    as ?? 'fieldset',
    {
      ...props,
      className: classNames(classCol, className),
    },
    children
  );
}
