/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
type Props = {
  className?: string;
  type?: string;
  value?: string | number;
  onClick?: any;
  onChange?: any;
};
const Input: React.FC<Props> = ({ className, type, ...props }) => {
  return (
    <input
      type={type ? type : 'text'}
      className={'input ' + (className ? className : 'input-primary')}
      {...props}
    />
  );
};

export default Input;
