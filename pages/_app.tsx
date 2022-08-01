import { SessionProvider } from 'next-auth/react';
import Layout from '../components/layout/layout';
import type { AppContext, AppInitialProps, AppLayoutProps } from 'next/app';
import { NextComponentType } from 'next';
import { ReactNode } from 'react';
import '../styles/globals.css';

const MyApp: NextComponentType<AppContext, AppInitialProps, AppLayoutProps> = ({
  Component,
  pageProps: { session, ...pageProps },
}: AppLayoutProps) => {
  const getLayout =
    Component.getLayout || ((page: ReactNode) => <Layout>{page}</Layout>);

  return (
    <SessionProvider session={session}>
      {getLayout(<Component {...pageProps} />)}
    </SessionProvider>
  );
};

export default MyApp;
