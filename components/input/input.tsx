/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

interface Props
  extends React.DetailedHTMLProps<
      React.InputHTMLAttributes<HTMLInputElement>,
      HTMLInputElement
    >,
    React.AriaAttributes {}

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
