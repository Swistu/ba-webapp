import React from 'react';
import Footer from '../footer/footer';
import Header from '../panel/header/header';

type Props = {
    children: React.ReactNode;
};

const PanelLayout: React.FC<Props> = ({children}) => {
    return (
        <>
            <Header/>
            <div
                className={'bg-primary min-h-panel w-full h-full mt-[76px] p-[1rem] xl:ml-[256px] xl:w-panel xl:p-[2.25rem]'}>
                <main
                    className={`grid grid-cols-1 sm:grid-cols-1 md:grid-cols-4 xl:grid-cols-12 gap-[20px]`}
                >
                    {children}
                </main>
            </div>
            <Footer/>
        </>
    );
};

export default PanelLayout;
