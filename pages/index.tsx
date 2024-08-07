import type { NextPage } from 'next';
import styles from '../styles/Home.module.css';
import Modal from '../components/modal/modal';
import Link from 'next/link';

const Home: NextPage = () => {
  return (
    <>
      <div
        style={{
          backgroundImage: `url('https://cdn.discordapp.com/attachments/856634919751778384/1024703248722055218/FLAGA_STARA_BA_1.png')`,
          backgroundColor: '#222226',
          width: '100%',
          height: '100vh',
          position: 'relative',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundPositionY: 'inherit',
          backgroundSize: 'cover',
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
