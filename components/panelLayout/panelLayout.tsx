import React from 'react';
import Footer from '../footer/footer';
import Header from '../header/header';

type Props = {
    children: React.ReactNode;
    className?: string;
};

const PanelLayout: React.FC<Props> = ({children, className}) => {
    return (
        <>
            <Header panel={true}/>
            <div className={'bg-main-background min-h-panel w-full h-full mt-[76px] p-[1rem]'}>
                <main
                    className={`panel_content ${className ? className : 'content_grid'}`}
                >
                    {children}
                </main>
            </div>
            <Footer/>
        </>
    );
};

export default PanelLayout;
