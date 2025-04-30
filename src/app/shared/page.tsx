import { Suspense } from "react";
import SharePage from "@/components/SharePage";

export default function SharedPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SharePage />
    </Suspense>
  );
}
