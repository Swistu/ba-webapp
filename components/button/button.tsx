import React from 'react';

interface ButtonProps
  extends React.DetailedHTMLProps<
      React.ButtonHTMLAttributes<HTMLButtonElement>,
      HTMLButtonElement
    >,
    React.AriaAttributes {}

const Button: React.FC<ButtonProps> = ({ children, className, ...props }) => {
  return (
    <button
      className={'button ' + (className ? className : 'button-primary')}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
