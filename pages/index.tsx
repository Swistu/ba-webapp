import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { useSession, signIn, signOut } from 'next-auth/react'
import img from '../public/foxhole.jpg'
import Modal from '../components/modal/modal'

const Home: NextPage = () => {
  const { data: session } = useSession();

  return (
    <div style={{
      backgroundImage: `url('https://cdn.cloudflare.steamstatic.com/steam/apps/505460/ss_1c1d60f0dd0c75837caca2aff1babf66401e7984.1920x1080.jpg?t=1656858811')`,
      width: '100%',
      height: '100vh',
    }}>
      <Modal>
        <div className={styles.content}>
          {
            session ?
              <>
                {session.user?.email}
                <button onClick={() => signOut()}>Sign out</button>
              </>
              : <button onClick={() => signIn()}>Sign in</button>
          }
        </div>
      </Modal>
    </div>
  )
}



export default Home
