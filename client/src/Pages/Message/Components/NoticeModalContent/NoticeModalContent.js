import { getNotice } from "_Constants/fetchUrl";
import { useEffect, useState } from "react";

export default function NoticeModalContent({ notice, setNotices, setShow }) {
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState(false);

  const handleClose = () => setShow(false);

  useEffect(() => {
    setIsLoading(true);
    fetch(`${getNotice}${notice.noticeId}`, { credentials: "include" })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error();
        }
      })
      .then((data) => {
        setMessage(data.message);
        setNotices((prev) =>
          prev.map((n) => (n.noticeId === notice.noticeId ? { ...n, unread: false } : n))
        );
      })
      .catch((err) => {
        console.log(err);
        setFetchError(true);
      })
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="modal">
      <h1>{notice.sender}</h1>
      <h2>{notice.subject}</h2>
      <p>{message}</p>
      <button className="secondary-button" onClick={handleClose}>
        Close
      </button>
    </div>
  );
}
