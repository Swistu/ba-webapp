import React from 'react';
import Footer from '../footer/footer';
import Header from '../header/header';
import Sidebar from '../sidebar/sidebar';

type Props = {
  children: React.ReactNode;
};

const PanelLayout: React.FC<Props> = ({ children }) => {
  return (
    <>
      <Header panel={true} />
      <div className="panel_container">
        <Sidebar />
        <main className="panel_content">{children}</main>
      </div>
      <Footer />
    </>
  );
};

export default PanelLayout;
