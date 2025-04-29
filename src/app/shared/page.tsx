import { Suspense } from "react";
import SharePage from "@/components/SharePage"; // 先ほどの "use client" がついたコンポーネント

export default function SharedPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SharePage />
    </Suspense>
  );
}
