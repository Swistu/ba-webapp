/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import styles from './trainingCard.module.css';
type Props = {
  name: string;
  [x: string]: any;
};
const Tag: React.FC<Props> = ({  name }) => {
  return (
    <span className="mr-2 bg-gray-800 border-2 border-solid border-gray-500 rounded text-white p-0.5 mt-1 text-sm" >
        {name}
    </span>
  );
};

export default Tag;
