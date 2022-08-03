import { useSession } from 'next-auth/react';
import { ReactNode, useEffect } from 'react';
import Card from '../../components/card/card';
import PanelLayout from '../../components/panelLayout/panelLayout';

const Panel = () => {
  const { data: session } = useSession();

  useEffect(() => {
    console.log('session', session);
  }, [session]);

  return (
    <Card>
      Witaj w panelu {session ? session.rank + ' ' + session.user?.name : null}
    </Card>
  );
};
export default Panel;

Panel.getLayout = function getLayout(page: ReactNode) {
  return <PanelLayout>{page}</PanelLayout>;
};
