import type { NextPage } from 'next'
import { useSession } from 'next-auth/react'
import { Router } from 'next/router';
import { useEffect } from 'react'

const Home: NextPage = () => {
  const { data: session } = useSession();

  return (
    <h1>
      Witaj w panelu {session ? session.user?.name : null}
    </h1>
  )
}



export default Home
