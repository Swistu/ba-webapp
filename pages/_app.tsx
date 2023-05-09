import {SessionProvider} from 'next-auth/react';
import Layout from '../components/layout/layout';
import type {AppContext, AppInitialProps, AppLayoutProps} from 'next/app';
import {GoogleAnalytics} from 'nextjs-google-analytics';
import {NextComponentType} from 'next';
import {ReactNode} from 'react';
import '../styles/globals.css';
import '../styles/panel.css';
import Head from 'next/head';
import {store} from '../store/store';
import {Provider} from 'react-redux';

const MyApp: NextComponentType<AppContext, AppInitialProps, AppLayoutProps> = ({
                                                                                   Component,
                                                                                   pageProps: {session, ...pageProps},
                                                                               }: AppLayoutProps) => {
    const getLayout =
        Component.getLayout || ((page: ReactNode) => <Layout>{page}</Layout>);

    return (
        <Provider store={store}>
            <SessionProvider session={session}>
                <Head>
                    <title>Błękitna Armia - Największy polski klan Foxhole</title>
                    <meta
                        name="description"
                        content="Błękitna Armia jest największym polskim klanem w całej grze. Dołącz już dziś do najlepszego klanu w foxhole."
                    />
                    <link
                        rel="apple-touch-icon"
                        sizes="180x180"
                        href="/apple-touch-icon.png"
                    />
                    <link
                        rel="icon"
                        type="image/png"
                        sizes="32x32"
                        href="/favicon-32x32.png"
                    />
                    <link
                        rel="icon"
                        type="image/png"
                        sizes="16x16"
                        href="/favicon-16x16.png"
                    />
                    <link rel="manifest" href="/site.webmanifest"/>
                    <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5"/>
                    <meta name="msapplication-TileColor" content="#da532c"/>
                    <meta name="theme-color" content="#ffffff"/>
                    <meta
                        property="og:image"
                        content="https://www.blekitna-armia.pl/favicon-32x32.png"
                    />
                </Head>
                {getLayout(
                    <>
                        <GoogleAnalytics trackPageViews/>
                        <Component {...pageProps} />
                    </>
                )}
            </SessionProvider>
        </Provider>
    );
};

export default MyApp;
