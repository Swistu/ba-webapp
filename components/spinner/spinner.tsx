import React from 'react';

const Spinner = ({ className }: { className?: string }) => {
  return <div className={'spinner ' + (className ? className : '')} />;
};

export default Spinner;
