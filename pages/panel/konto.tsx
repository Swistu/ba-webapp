import { ReactNode } from 'react';
import PanelLayout from '../../components/panelLayout/panelLayout';

const Konto = () => {
  return <span>Dane Twojego konta</span>;
};
export default Konto;

Konto.getLayout = function getLayout(page: ReactNode) {
  return <PanelLayout>{page}</PanelLayout>;
};
