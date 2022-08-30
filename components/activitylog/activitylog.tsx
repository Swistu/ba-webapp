/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import Card from '../card/card';
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
  const [bestPlayerActivityLog, setBestPlayerActivityLog] = useState<any>();

  useEffect(() => {
    const getActivityLogData = async () => {
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

  return (
    <>
      <Card className="activityLog">
        <h2 className="text-center">Activity log</h2>
      </Card>
      {activityLogData ? (
        [
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
        ].map((element: any) => {
          return (
            <Card className="activityLog" key={element}>
              <h2 className="text-center">{element}</h2>
              <PieChart
                chartData={{
                  labels: [element],
                  datasets: [
                    {
                      id: 1,
                      label: 'Twoje dane',
                      data: [userActivityLog ? userActivityLog[element] : 0],
                      backgroundColor: '#00FA96',
                      color: '#ffffff',
                    },
                    {
                      id: 2,
                      label: 'Średnia klanu',
                      data: [
                        clanActivityLog
                          ? clanActivityLog[element] / activityLogData.length
                          : 0,
                      ],
                      backgroundColor: '#249CFF',
                      color: '#ffffff',
                    },
                    {
                      id: 3,
                      label: 'Najlepszy gracz',
                      data: [
                        bestPlayerActivityLog
                          ? bestPlayerActivityLog[element]
                          : 0,
                      ],
                      backgroundColor: '#FFDD54',
                      color: '#ffffff',
                    },
                  ],
                }}
              />
            </Card>
          );
        })
      ) : (
        <Spinner />
      )}
    </>
  );
};

export default ActivityLogComponent;
