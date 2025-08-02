import { Suspense } from "react";
import Loading from "./loading";

export default async function PanelPage() {
  return (
    <Suspense fallback={<Loading />}>
      <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
        <h1>Panel Page</h1>
      </div>
    </Suspense>
  );
}
