import classNames from 'classnames';
import React from 'react';

function FormRecommend(props: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>) {
  return React.createElement(
    'div',
    { ...props, className: classNames('form-recommend', props.className) },
    props.children
  );
}
export default FormRecommend;
