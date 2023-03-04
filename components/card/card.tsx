/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import styles from './card.module.css';
import Tag from "../trainingCard/tag";
type Props = {
  children: React.ReactNode;
  className?: string;
  [x: string]: any;
};
const Card: React.FC<Props> = ({ children, className, props }) => {
  return (
      <div
          className={`mb-4 bg-gray-500  border-2 border-solid border-indigo-900 rounded text-white bg-indigo-800 p-1 flex flex-col ${className}`}
          {...props}
      >
        {children}
      </div>
  );
};

export default Card;
