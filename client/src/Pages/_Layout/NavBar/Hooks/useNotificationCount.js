import { useAuth } from "Hooks";
import { useEffect, useState } from "react";

export default function useNotificationCount(fetchUrl, allowedRoles) {
  const [count, setCount] = useState(0);
  const { user } = useAuth();

  const isAllowed = user?.roles.some((r) => allowedRoles.includes(r));

  const fetchPendingReportCount = () => {
    fetch(fetchUrl, { credentials: "include" })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error();
        }
      })
      .then((data) => {
        setCount(data.count);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (isAllowed) {
      fetchPendingReportCount();
      const intervalId = setInterval(fetchPendingReportCount, 10000);
      return () => clearInterval(intervalId);
    }
  }, [isAllowed]);

  return count;
}
