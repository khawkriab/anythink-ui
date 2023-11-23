import classNames from 'classnames';
import React from 'react';

function FormRow(props: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>) {
  return React.createElement('div', { ...props, className: classNames('form-row', props.className) }, props.children);
}

export default FormRow;
