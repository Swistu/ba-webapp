import type { NextPage } from 'next'
import { getSession, useSession } from 'next-auth/react'
import { useEffect } from 'react';

const Panel: NextPage = () => {
  const { data: session } = useSession();

  useEffect(() => {
    console.log("session", session);
  }, [session])

  return (
    <h1>
      Witaj w panelu {session ? session.rank + ' ' + session.user?.name : null}
    </h1 >
  )
}

export default Panel;
