/* eslint-disable @next/next/no-page-custom-font */
import { getToken, JWT } from 'next-auth/jwt';
import { signIn, getSession } from 'next-auth/react';
import Head from 'next/head';
import { ReactNode } from 'react';

import styles from '../styles/signin.module.css';

interface UserData extends JWT {
  id: string;
  name: string;
  email: string;
  image: string;
  rank: string;
  corps: string;
  role: string;
  accountActive: boolean;
  userInGuild: boolean;
}

const SignIn = ({ userData }: { userData: UserData }) => {
  const errorMessage = () => {
    if (!!!userData) return null;
    if (!userData.userInGuild)
      return (
        <p className={styles.text_error}>
          Dołącz do nas na discorda i przejdź rekrutacje, aby uzyskać dostęp do
          panelu.
        </p>
      );
    if (userData.role === 'guest')
      return (
        <p className={styles.text_error}>
          Przejdź rekrutacje aby uzsykać dostęp do panelu.
        </p>
      );
    if (userData.role === 'member' && !userData.accountActive)
      return (
        <p className={styles.text_error}>
          Twoje konto nie jest aktywne, zgłoś się do Oficera na naszym
          discordzie.
        </p>
      );

    return (
      <p className={styles.text_error}>
        Wystąpił błąd podczas logowania przy użyciu Twojego konta. Zgłoś się do
        [BA] `Simon
      </p>
    );
  };

  return (
    <>
      <Head key={'aewrawerawer'}>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin={'true'}
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500&display=swap"
          rel="stylesheet"
        />
      </Head>
      <div className={styles.page}>
        <div className={styles.container}>
          <div>
            <h1>Witamy ponownie!</h1>
            <p className={styles.text_info}>
              Zaloguj sie, aby uzyskać pełny dostęp do panelu.
            </p>
          </div>
          {errorMessage()}
          <button
            className={styles.discordButton}
            onClick={() => signIn('discord')}
          >
            Zaloguj się z Disordem
          </button>
        </div>
      </div>
    </>
  );
};

export default SignIn;

SignIn.getLayout = function getLayout(page: ReactNode) {
  return <>{page}</>;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function getServerSideProps(context: any) {
  const { req } = context;
  const session = await getSession({ req });
  const tokenData = await getToken({ req });
  const userData = tokenData?.user as UserData;

  if (
    session &&
    userData &&
    userData.accountActive &&
    userData.role === 'member'
  ) {
    return {
      redirect: { destination: '/panel' },
    };
  }

  return {
    props: {
      userData: userData ? { ...userData } : null,
    },
  };
}
