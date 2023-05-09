import {ReactNode} from 'react';
import Card from '../../components/card/card';
import PanelLayout from '../../components/panelLayout/panelLayout';


const Tools = () => {
    return (
        <>


            <Card className="col-span-1 sm:col-span-1 md:col-span-2 xl:col-span-3 bg-secondary">
                <a href={'https://foxholelogi.com/'} target={'_blank'} rel="noreferrer">
                    <div className="flex flex-col items-center justify-center">
                        <h1> Logistyka </h1>
                    </div>
                </a>
            </Card>
            <Card className="col-span-1 sm:col-span-1 md:col-span-2 xl:col-span-3 bg-secondary">
                <a href={'https://diantos.itch.io/artyleria-kalkulator'} target={'_blank'} rel="noreferrer">
                    <div className="flex flex-col items-center justify-center">
                        <h1> Artyleria </h1>
                    </div>
                </a>
            </Card>
            <Card className="col-span-1 sm:col-span-1 md:col-span-2 xl:col-span-3 bg-secondary">
                <a href={'https://bunker.drownedvale.club/'} target={'_blank'} rel="noreferrer">
                    <div className="flex flex-col items-center justify-center">
                        <h1> Budowlanka (Kreator) </h1>
                    </div>
                </a>
            </Card>
            <Card className="col-span-1 sm:col-span-1 md:col-span-2 xl:col-span-3 bg-secondary">
                <a href={'https://docs.google.com/spreadsheets/d/1z7fxtztOao1AduM47Yb-UicgA3ElpE2dz-4zFw2Swxs/edit#gid=236720178'}
                   target={'_blank'} rel="noreferrer">
                    <div className="flex flex-col items-center justify-center">
                        <h1> Budowlanka (Liczydło) </h1>
                    </div>
                </a>
            </Card>
        </>
    );
};
export default Tools;

Tools.getLayout = function getLayout(page: ReactNode) {
    return <PanelLayout>{page}</PanelLayout>;
};
