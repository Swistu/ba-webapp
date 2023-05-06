/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {ChangeEvent, useEffect, useState} from 'react';
import Button from '../button/button';
import Card from '../card/card';
import Input from '../input/input';
import PieChart from '../piechart/piechart';

type Props = {
    children?: React.ReactNode;
    className?: string;
    title?: string;
    userID?: string;
    [x: string]: any;
};

type activityLogData = {
    userID: string;
    EnemyPlayerDamage: number;
    EnemyStructureVehicleDamage: number;
    FriendlyConstruction: number;
    FriendlyHealing: number;
    FriendlyPlayerDamage: number;
    FriendlyRepairing: number;
    FriendlyRevivals: number;
    FriendlyStructureVehicleDamage: number;
    MaterialsGathered: number;
    MaterialsSubmitted: number;
    SupplyValueDelivered: number;
    VehicleSelfDamage: number;
    VehiclesCapturedByEnemy: number;
};
const activityLogNames = [
    'EnemyPlayerDamage',
    'EnemyStructureVehicleDamage',
    'FriendlyConstruction',
    'FriendlyHealing',
    'FriendlyPlayerDamage',
    'FriendlyRepairing',
    'FriendlyRevivals',
    'FriendlyStructureVehicleDamage',
    'MaterialsGathered',
    'MaterialsSubmitted',
    'SupplyValueDelivered',
    'VehicleSelfDamage',
    'VehiclesCapturedByEnemy',
];

const ActivityLogComponent: React.FC<Props> = ({userID}) => {
    const [activityLogData, setActivityLogData] = useState<activityLogData[]>();
    const [chartData, setChartData] = useState<any>([]);
    const [playerID, setPlayerID] = useState<string>();

    useEffect(() => {
        const getActivityLogData = async () => {
            const apiResponse = await fetch('/api/activitylog', {
                method: 'GET',
            });
            const basicActivityData: activityLogData[] = [];

            const clanData: activityLogData[] = await apiResponse.json();
            const clanSum: any = {
                EnemyPlayerDamage: 0,
                EnemyStructureVehicleDamage: 0,
                FriendlyConstruction: 0,
                FriendlyHealing: 0,
                FriendlyPlayerDamage: 0,
                FriendlyRepairing: 0,
                FriendlyRevivals: 0,
                FriendlyStructureVehicleDamage: 0,
                MaterialsGathered: 0,
                MaterialsSubmitted: 0,
                SupplyValueDelivered: 0,
                VehicleSelfDamage: 0,
                VehiclesCapturedByEnemy: 0,
            };
            const bestPlayer: any = {
                EnemyPlayerDamage: 0,
                EnemyStructureVehicleDamage: 0,
                FriendlyConstruction: 0,
                FriendlyHealing: 0,
                FriendlyPlayerDamage: 0,
                FriendlyRepairing: 0,
                FriendlyRevivals: 0,
                FriendlyStructureVehicleDamage: 0,
                MaterialsGathered: 0,
                MaterialsSubmitted: 0,
                SupplyValueDelivered: 0,
                VehicleSelfDamage: 0,
                VehiclesCapturedByEnemy: 0,
            };

            clanData.forEach((element: any) => {
                Object.keys(element).forEach((key: string) => {
                    clanSum[key] = (clanSum[key] + element[key]) as number;

                    if (element[key] > bestPlayer[key]) bestPlayer[key] = element[key];
                });

                if (element['userID'] === userID)
                    basicActivityData.push({
                        ...element,
                        userID: 'Twoje dane',
                        backgroundColor: '#00FA96',
                    });
            });

            Object.keys(clanSum).forEach((key: string) => {
                clanSum[key] = clanSum[key] / clanData.length;
            });

            basicActivityData.push({
                ...clanSum,
                userID: 'Średnia graczy',
                backgroundColor: '#249CFF',
            });
            basicActivityData.push({
                ...bestPlayer,
                userID: 'Najlepszy gracz',
                backgroundColor: '#FFDD54',
            });

            const newChartData = activityLogNames.flatMap((name) => {
                return basicActivityData.map((element: any) => {
                    return {
                        id: element.userID,
                        label: element.userID,
                        data: [element[name]],
                        backgroundColor: element.backgroundColor
                            ? element.backgroundColor
                            : '#00FA96',
                        color: '#ffffff',
                        activityName: name,
                    };
                });
            });

            setChartData(newChartData);
            setActivityLogData(clanData as activityLogData[]);
        };

        getActivityLogData();
    }, [userID]);

    const addNewPlayer = () => {
        const newPlayerObj: any = activityLogData?.find(
            (player) => player.userID === playerID
        );

        if (!newPlayerObj) {
            alert('Niestety nie znaleziono gracza z takim ID');
            return;
        }

        const newPlayer = activityLogNames.map((name: string) => {
            return {
                id: newPlayerObj.userID,
                label: newPlayerObj.userID,
                data: [newPlayerObj[name]],
                backgroundColor: '#BD5C78',
                color: '#ffffff',
                activityName: name,
            };
        });

        setChartData([...chartData, ...newPlayer]);
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setPlayerID(event.currentTarget.value);
    };

    return (
        <>
            <Card className={'col-span-1 sm:col-span-1 md:col-span-4 xl:col-span-12'}>
                <h2 className="text-center">Activity log</h2>
                <Input placeholder="ID gracza" id="playerID" onChange={handleChange}/>
                <Button onClick={addNewPlayer}>Dodaj gracza</Button>
                <br/>
                <br/>
                <a
                    href="https://support.discord.com/hc/en-us/articles/206346498-Where-can-I-find-my-User-Server-Message-ID-"
                    target="_blank"
                    style={{fontSize: '1.2rem'}}
                    rel="noreferrer"
                >
                    Kliknij, a się dowiesz jak znaleźć ID gracza
                </a>
            </Card>
            {chartData
                ? activityLogNames.map((name: any) => {
                    return (
                        <Card className={'col-span-1 sm:col-span-1 md:col-span-2 xl:col-span-6'}
                              key={name}>
                            <h2 className="text-center">{name}</h2>

                            <PieChart
                                chartData={{
                                    labels: [name],
                                    datasets: chartData.filter(
                                        (element: any) => element.activityName == name
                                    ),
                                }}
                            />
                        </Card>
                    );
                })
                : null}
        </>
    );
};

export default ActivityLogComponent;
