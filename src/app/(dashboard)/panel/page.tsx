import { Suspense } from "react";
import Loading from "./loading";

export default async function PanelPage() {
  return (
    <Suspense fallback={<Loading />}>
      <div>helalo</div>
    </Suspense>
  );
}
