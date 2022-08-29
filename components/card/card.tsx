/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import styles from './card.module.css';
type Props = {
  children: React.ReactNode;
  className?: string;
  [x: string]: any;
};
const Card: React.FC<Props> = ({ children, className, props }) => {
  return (
    <div
      className={styles.content + ' ' + (className ? className : '')}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
