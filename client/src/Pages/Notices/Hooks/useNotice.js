import { getNotices } from "_Constants/fetchUrl";
import { useEffect, useState } from "react";

export default function useNotice() {
  const [notices, setNotices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetch(getNotices, { credentials: "include" })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error();
        }
      })
      .then((data) => {
        console.log(data);
        setNotices(data.noticePreviews);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setIsLoading(false));
  }, []);

  return {
    notices,
    setNotices,
    isLoading
  };
}
