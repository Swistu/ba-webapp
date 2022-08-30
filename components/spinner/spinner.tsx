/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars

const Spinner = ({ className }: { className?: string }) => {
  return <div className={'spinner ' + (className ? className : '')} />;
};

export default Spinner;
