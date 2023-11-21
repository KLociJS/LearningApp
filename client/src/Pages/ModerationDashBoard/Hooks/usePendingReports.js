import { getPendingReports } from "_Constants/fetchUrl";
import { useEffect, useState } from "react";

export default function usePendingReports() {
  const [pendingReports, setPendingReports] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetch(getPendingReports, {
      credentials: "include"
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error();
        }
      })
      .then((data) => {
        setPendingReports(data);
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }, []);

  return {
    pendingReports,
    setPendingReports,
    isLoading
  };
}
