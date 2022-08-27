import React from 'react';
import styles from './card.module.css';
type Props = {
  children: React.ReactNode;
  className?: string;
};
const Card: React.FC<Props> = ({ children, className }) => {
  return (
    <div className={styles.content + ' ' + (className ? className : '')}>
      {children}
    </div>
  );
};

export default Card;
