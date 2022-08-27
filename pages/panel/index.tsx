/* eslint-disable @typescript-eslint/no-explicit-any */
import { getToken } from 'next-auth/jwt';
import { useSession } from 'next-auth/react';
import { ReactNode, useEffect } from 'react';
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

const Panel = ({ user }: { user: user }) => {
  const { data: session } = useSession();

  console.log(user);
  useEffect(() => {
    console.log('session', session);
  }, [session]);

  console.log('user', user);

  if (!user) return;
  console.log('recco', user.rankData.positiveRecommendations);

  return (
    <>
      <Card className="war_number">
        <h1 className="text-center">Wojna 94</h1>
      </Card>
      <Card className="profile_description">
        <div className="profile_short">
          <div>
            <p>Gracz - {user.discordTag}</p>
            <p>Stopień - {user.rankData.rank}</p>
            <p>Korpus - {user.rankData.corps}</p>
          </div>
          <img
            src="https://cdn.discordapp.com/avatars/375345238165946368/36a65eaefe92dfc0b2bd9efa34dca14f.jpeg"
            alt=""
          />
        </div>
        <p>Aktualne rekomendace - {user.rankData.currentNumber}</p>
        <p>Wszystkie rekomendacji - {user.rankData.number}</p>
        <p>Gotowy do awansu - {user.rankData.promotion ? 'Tak' : 'Nie'}</p>
      </Card>
      <Card className="positiveRecommendations">
        <h2>Dodatnie rekomendacje</h2>
        <ol>
          {user.rankData.positiveRecommendations.map((element, i) => {
            return <li key={i}>{element?.reason}</li>;
          })}
        </ol>
      </Card>
      <Card className="negativeRecommendations">
        <h2>Ujemne rekomendacje</h2>
        <ol>
          {user.rankData.negativeRecommendations.map((element, i) => {
            return <li key={i}>{element?.reason}</li>;
          })}
        </ol>
      </Card>
      <Card className="promotionHistory">
        <h2 className="text-center">Historia awansów</h2>
      </Card>
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
