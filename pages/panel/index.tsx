/* eslint-disable @typescript-eslint/no-explicit-any */
import {getToken} from 'next-auth/jwt';
import {ReactNode, useEffect, useState} from 'react';
import Card from '../../components/card/card';
import PanelLayout from '../../components/panelLayout/panelLayout';
import clientPromise from '../../utility/mongodb';

type user = {
    userID: string;
    discordTag: string;
    accountActive: boolean;
    role: string;
    rankData: {
        rank: string;
        corps: string;
        number: number;
        promotion: boolean;
        currentNumber: number;
        positiveRecommendations: Array<Record<string, string>>;
        negativeRecommendations: Array<Record<string, string>>;
    };
};
type warData = {
    warNumber: number;
};

const Panel = ({user}: { user: user }) => {
    const [warData, setWarData] = useState<warData>();

    useEffect(() => {
        const getWarData = async () => {
            const foxholeResponse = await fetch(
                'https://war-service-live.foxholeservices.com/api/worldconquest/war',
                {
                    method: 'GET',
                }
            );
            setWarData((await foxholeResponse.json()) as warData);
        };

        getWarData();
    }, []);

    if (!user) return;

    return (
        <>
            <Card
                className="col-span-1 sm:col-span-1 md:col-span-4 xl:col-span-12 row-span-1 align-middle flex items-center justify-center">
                <p className="text-4xl align-middle">
                    Wojna {warData ? warData.warNumber : null}
                </p>
            </Card>
            <Card
                className="col-span-1 sm:col-span-1 md:col-span-2 xl:col-span-3 row-span-4 text-md">
                <div className={'w-full h-full p-[1rem] flex flex-wrap break-words justify-between gap-[2rem]'}>
                    <div className={'grow-[5] basis-full flex max-h-5 items-center justify-center text-2xl'}>
                        Podgląd klanowicza
                    </div>
                    <div
                        className={'shadow-panel rounded-full bg-[rgba(26,26,46,0.6)] w-[9rem] h-[9rem] flex items-center justify-center'}>
                        {user.rankData.rank}
                    </div>
                    <div
                        className={'shadow-panel rounded-full bg-[rgba(26,26,46,0.6)] w-[9rem] h-[9rem] flex items-center justify-center '}>
                        {user.rankData.corps}
                    </div>
                    <div
                        className={'shadow-panel rounded-full bg-[rgba(26,26,46,0.6)] w-[9rem] h-[9rem] flex items-center justify-center'}>
                        {user.discordTag}
                    </div>
                    <div
                        className={'shadow-panel rounded-full bg-[rgba(26,26,46,0.6)] w-[9rem] h-[9rem] flex items-center justify-center'}>
                        <p>Gotowy do awansu - {user.rankData.promotion ? 'Tak' : 'Nie'}</p>
                    </div>
                    {/*<p>Aktualne rekomendacje - {user.rankData.currentNumber}</p>*/}
                    {/*<p>Liczba wszystkich rekomendacji - {user.rankData.number}</p>*/}
                    {/*<p>Gotowy do awansu - {user.rankData.promotion ? 'Tak' : 'Nie'}</p>*/}
                </div>

            </Card>
            <Card
                className="col-span-1 sm:col-span-1 md:col-span-2 xl:col-span-3 row-span-4">
                <div className={'w-full h-full p-[1rem] flex break-words flex-col gap-[2rem]'}>
                    <div className={'flex items-center max-h-5 justify-center text-2xl'}>
                        Dodatnie rekomendacje
                    </div>
                    {user.rankData.positiveRecommendations.map((element, i) => {
                        return <div key={i}
                                    className={'shadow-panel rounded-full bg-[rgba(26,26,46,0.6)] w-full h-full max-h-5 p-5 flex items-center justify-center'}>
                            {element.reason}
                        </div>;
                    })}
                    <div
                        className={'shadow-panel rounded-full bg-[rgba(26,26,46,0.6)] w-full h-full max-h-5 p-5 flex items-center justify-center'}>
                        asd
                    </div>
                    <div
                        className={'shadow-panel rounded-full bg-[rgba(26,26,46,0.6)] w-full h-full max-h-5 p-5 flex items-center justify-center'}>
                        asd
                    </div>
                    <div
                        className={'shadow-panel rounded-full bg-[rgba(26,26,46,0.6)] w-full h-full max-h-5 p-5 flex items-center justify-center'}>
                        asd
                    </div>
                </div>
            </Card>
            <Card
                className="col-span-1 sm:col-span-1 md:col-span-2 xl:col-span-3 row-span-4">

                <div className={'w-full h-full p-[1rem] flex break-words flex-col gap-[2rem]'}>
                    <div className={'flex items-center max-h-5 justify-center text-2xl'}>
                        Ujemne rekomendacje
                    </div>
                    {user.rankData.negativeRecommendations.map((element, i) => {
                        return <div key={i}
                                    className={'shadow-panel rounded-full bg-[rgba(26,26,46,0.6)] w-full h-full max-h-5 p-5 flex items-center justify-center'}>
                            {element.reason}
                        </div>;
                    })}
                </div>
            </Card>
            <Card
                className="col-span-1 sm:col-span-1 md:col-span-2 xl:col-span-3 row-span-2">
                <h2 className="text-center">Medale</h2>
                Już niedługo :)
            </Card>
            <Card
                className="col-span-1 sm:col-span-1 md:col-span-2 xl:col-span-3 row-span-2">
                <h2 className="text-center">Historia awansów</h2>
                Już niedługo :)
            </Card>
            {/*<ActivityLogComponent userID={user.userID} className="activityLog"/>*/}
        </>
    );
};
export default Panel;

Panel.getLayout = function getLayout(page: ReactNode) {
    return <PanelLayout rows={6}>{page}</PanelLayout>;
};

export async function getServerSideProps(context: any) {
    const {req} = context;
    const response: any = await getToken({req});
    if (!response) return {props: {user: null}};

    const mongoConnection = await clientPromise;
    const userData = await mongoConnection
        .db(process.env.DB_NAME)
        .collection('users')
        .findOne({userID: response.user.id}, {projection: {_id: 0}});
    if (!userData) return {props: {user: null}};

    return {props: {user: userData}};
}
