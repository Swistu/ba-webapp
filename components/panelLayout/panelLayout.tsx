import React from 'react';
import Footer from '../footer/footer';
import Header from '../header/header';

type Props = {
  children: React.ReactNode;
};

const PanelLayout: React.FC<Props> = ({ children }) => {
  return (
    <>
      <Header panel={true} />
      <div className="panel_container">
        <main className="panel_content">{children}</main>
      </div>
      <Footer />
    </>
  );
};

export default PanelLayout;
