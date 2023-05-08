/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

type Props = {
    children: React.ReactNode;
    className?: string;
    [x: string]: any;
};
const Card: React.FC<Props> = ({children, className, props}) => {
    return (
        <div
            className={'bg-forth rounded-lg shadow-panel ' + (className ? className : '')}
            style={{opacity: 0.9}}
            {...props}
        >
            {children}
        </div>
    );
};

export default Card;
