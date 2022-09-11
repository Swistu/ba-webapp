/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ChangeEvent, useEffect, useState } from 'react';
import Button from '../button/button';
import Card from '../card/card';
import Input from '../input/input';
import PieChart from '../piechart/piechart';
import Spinner from '../spinner/spinner';

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
const ActivityLogComponent: React.FC<Props> = ({ userID }) => {
  const [activityLogData, setActivityLogData] = useState<activityLogData[]>();
  const [userActivityLog, setUserActivityLog] = useState<any>();
  const [clanActivityLog, setClanActivityLog] = useState<any>();
  const [newPlayerData, setNewPlayerData] = useState<any>([]);
  const [chartData, setChartData] = useState<any>([]);
  const [bestPlayerActivityLog, setBestPlayerActivityLog] = useState<any>();
  const [playerID, setPlayerID] = useState<string>();

  useEffect(() => {
    const getActivityLogData = async () => {
      console.log('pobieram');
      const apiResponse = await fetch('/api/activitylog', {
        method: 'GET',
      });
      const clanData: activityLogData[] = await apiResponse.json();
      const obj: any = {
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
          obj[key] = (obj[key] + element[key]) as number;

          if (element[key] > bestPlayer[key]) bestPlayer[key] = element[key];
        });

        if (element['userID'] === userID) setUserActivityLog(element);
      });

      setClanActivityLog(obj);
      setBestPlayerActivityLog(bestPlayer);
      setActivityLogData(clanData as activityLogData[]);
    };

    getActivityLogData();
  }, [userID]);

  useEffect(() => {
    console.log(playerID);
  }, [playerID]);

  const createChartData = (data: any) => {
    return {
      id: data.userID,
      label: data.userID,
      data: [data ? data['EnemyPlayerDamage'] : 0],
      backgroundColor: '#FFDD54',
      color: '#ffffff',
    };
  };

  const addNewPlayer = () => {
    const newPlayerObj = activityLogData?.find(
      (player) => player.userID === playerID
    );

    if (!newPlayerObj) return;

    const playerChartdata = createChartData(newPlayerObj);
    setNewPlayerData([...newPlayerData, newPlayerObj]);
    setChartData([...chartData, playerChartdata]);

    console.log('chartData', chartData);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPlayerID(event.currentTarget.value);
  };

  return (
    <>
      <Card className="activityLog">
        <h2 className="text-center">Activity log</h2>
        <Input placeholder="ID gracza" id="playerID" onChange={handleChange} />
        <Button onClick={addNewPlayer}>Dodaj gracza</Button>
      </Card>
      {activityLogData
        ? [
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
          ].map((names: any) => {
            return (
              <Card className="activityLog" key={names}>
                <h2 className="text-center">{names}</h2>
                <PieChart
                  chartData={{
                    labels: [names],
                    datasets: chartData.map((element: any) => element),
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
