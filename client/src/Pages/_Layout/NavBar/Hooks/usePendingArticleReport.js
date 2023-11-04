import { useAuth } from "Hooks";
import { getPendingArticleReportCount } from "_Constants/fetchUrl";
import { useEffect, useState } from "react";

export default function usePendingArticleReport() {
  const [pendingArticleReportCount, setPendingArticleReportCount] = useState(0);
  const { user } = useAuth();

  const roles = ["Admin", "Moderator"];
  const isAdminOrMod = user?.roles.some((r) => roles.includes(r));

  const fetchPendingReportCount = () => {
    fetch(getPendingArticleReportCount, { credentials: "include" })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error();
        }
      })
      .then((data) => {
        setPendingArticleReportCount(data.pendingReportCount);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (isAdminOrMod) {
      fetchPendingReportCount();
      const intervalId = setInterval(fetchPendingReportCount, 10000);
      return () => clearInterval(intervalId);
    }
  }, [isAdminOrMod]);

  return { pendingArticleReportCount };
}
