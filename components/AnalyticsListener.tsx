import { analytics } from "@/firebase";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { logEvent } from "@firebase/analytics";

export default function AnalyticsListener() {
  const pathname = usePathname();

  useEffect(() => {
    if (!analytics) return;
    // 가상 페이지뷰 전송
    logEvent(analytics, 'page_view', { page_path: pathname });
  }, [pathname]);

  return null;
}
