import type { NextPage } from 'next'
import styles from '../styles/Home.module.css'
import Modal from '../components/modal/modal'
import Link from 'next/link'

const Home: NextPage = () => {
  return (
    <div style={{
      backgroundImage: `url('https://cdn.cloudflare.steamstatic.com/steam/apps/505460/ss_1c1d60f0dd0c75837caca2aff1babf66401e7984.1920x1080.jpg?t=1656858811')`,
      width: '100%',
      height: 'calc(100vh - 80px)',
      position: 'relative'
    }}>
      <Modal />
      <div className={styles.content}>
        <Link href={'https://discord.gg/6hQZfw9aJJ'}>
          Dołącz do nas
        </Link>
      </div>
    </div>
  )
}



export default Home
