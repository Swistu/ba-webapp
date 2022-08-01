import { useSession } from 'next-auth/react';
import { ReactNode, useEffect } from 'react';
import PanelLayout from '../../components/panelLayout/panelLayout';

const Panel = () => {
  const { data: session } = useSession();

  useEffect(() => {
    console.log('session', session);
  }, [session]);

  return (
    <span>
      Witaj w panelu {session ? session.rank + ' ' + session.user?.name : null}
    </span>
  );
};
export default Panel;

Panel.getLayout = function getLayout(page: ReactNode) {
  return <PanelLayout>{page}</PanelLayout>;
};
