import React from 'react';
import Header from "../panel/header/header";
import Footer from "../footer/footer";

type Props = {
    children: React.ReactNode;
    rows?: number;
};

const PanelLayout: React.FC<Props> = ({children, rows}) => {
    return (
        <>
            <Header/>
            <div
                className={'bg-gradient-to-t from-primary via-gb-via to-gb-to h-[100vh] w-[100vw] fixed top-0 -z-50'}>
            </div>
            <div
                className={'min-h-panel h-full mt-[76px] p-[1rem] xl:ml-[256px] xl:w-panel xl:p-[2.25rem]'}>
                <main
                    className={`min-h-panel grid grid-cols-1 sm:grid-cols-1 md:grid-cols-4 xl:grid-cols-12 gap-[20px] grid-rows-${rows}`}
                >
                    {children}
                </main>
            </div>
            <Footer/>
        </>
    );
};

export default PanelLayout;
