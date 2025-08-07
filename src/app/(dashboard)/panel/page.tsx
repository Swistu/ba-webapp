"use client";

import { Suspense } from "react";
import Loading from "./loading";
import { signOut, useSession } from "next-auth/react";
export default function PanelPage() {
  const signOutHandler = async () => {
    signOut({ redirectTo: "/" });
  };
  const { data: session } = useSession({
    required: true,
  });

  console.log("Session data:", session);
  return (
    <Suspense fallback={<Loading />}>
      <div>helalo</div>
      <button onClick={signOutHandler}>Wyloguj</button>
    </Suspense>
  );
}
