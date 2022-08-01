import { ReactNode } from 'react';
import PanelLayout from '../../components/panelLayout/panelLayout';

const Awanse = () => {
  return <span>Historia Twoich awansów</span>;
};
export default Awanse;

Awanse.getLayout = function getLayout(page: ReactNode) {
  return <PanelLayout>{page}</PanelLayout>;
};
