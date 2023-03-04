/* eslint-disable @typescript-eslint/no-explicit-any */
import { getToken } from 'next-auth/jwt';
import React, { ReactNode, useEffect, useState } from 'react';
import ActivityLogComponent from '../../components/activitylog/activitylog';
import PanelLayout from '../../components/panelLayout/panelLayout';
import clientPromise from '../../utility/mongodb';
import {Card} from "flowbite-react";
import Input from "../../components/input/input";
import Button from "../../components/button/button";

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

const Panel = ({ user }: { user: user }) => {
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
      <Card className="xs:col-span-1 lg:col-span-6 xl:col-span-12">
        <h1 className="text-center text-2xl">
          Wojna {warData ? warData.warNumber : null}
        </h1>
      </Card>
      <Card className="xs:col-span-1 lg:col-span-2 xl:col-span-3 row-span-3">
        <div className="profile_short">
          <div>
            <p>Gracz - {user.discordTag}</p>
            <p>Stopień - {user.rankData.rank}</p>
            <p>Korpus - {user.rankData.corps}</p>
          </div>
        </div>
        <p>Aktualne rekomendacje - {user.rankData.currentNumber}</p>
        <p>Liczba wszystkich rekomendacji - {user.rankData.number}</p>
        <p>Gotowy do awansu - {user.rankData.promotion ? 'Tak' : 'Nie'}</p>
      </Card>
      <Card className="xs:col-span-1 lg:col-span-4 xl:col-span-9">
        <h2>Dodatnie rekomendacje</h2>
        <ol>
          {user.rankData.positiveRecommendations.map((element, i) => {
            return <li key={i}>{element?.reason}</li>;
          })}
        </ol>
      </Card>
      <Card className="xs:col-span-1 lg:col-span-4 xl:col-span-9">
        <h2>Ujemne rekomendacje</h2>
        <ol>
          {user.rankData.negativeRecommendations.map((element, i) => {
            return <li key={i}>{element?.reason}</li>;
          })}
        </ol>
      </Card>

      <Card className="xs:col-span-1 lg:col-span-4 xl:col-span-9">
        <h2 className="text-center">Historia awansów</h2>
        Już niedługo :)
      </Card>

      <ActivityLogComponent userID={user.userID} />
    </>
  );
};
export default Panel;

Panel.getLayout = function getLayout(page: ReactNode) {
  return <PanelLayout>{page}</PanelLayout>;
};

export async function getServerSideProps(context: any) {
  const { req } = context;
  const response: any = await getToken({ req });
  if (!response) return { props: { user: null } };

  const mongoConnection = await clientPromise;
  const userData = await mongoConnection
    .db(process.env.DB_NAME)
    .collection('users')
    .findOne({ userID: response.user.id }, { projection: { _id: 0 } });
  if (!userData) return { props: { user: null } };

  return { props: { user: userData } };
}
