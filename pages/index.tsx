import type { NextPage } from 'next';
import styles from '../styles/Home.module.css';
import Modal from '../components/modal/modal';
import Link from 'next/link';

const Home: NextPage = () => {
  return (
    <>
      <div
        style={{
          backgroundImage: `url('https://cdn.akamai.steamstatic.com/steam/apps/505460/ss_59358512ce9daf7c68e74c3d809514c7e9b55633.1920x1080.jpg?t=1656858811')`,
          backgroundColor: '#222226',
          width: '100%',
          height: '100vh',
          position: 'relative',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundPositionY: 'inherit',
        }}
      >
        <Modal />
        <div className={styles.content}>
          <Link href={'https://discord.gg/6hQZfw9aJJ'}>Dołącz do nas</Link>
        </div>
      </div>
    </>
  );
};

export default Home;
