import "../../GlobalStyle/Component.css";
import NoticeModal from "./Components/NoticeModal/NoticeModal";
import useNotice from "./Hooks/useNotice";
import "./Notice.css";

export default function Notice() {
  const { notices, setNotices, isLoading } = useNotice();
  if (isLoading) {
    return <div>loading...</div>;
  }

  return (
    <table className="table">
      <thead>
        <tr>
          <th className="table-data"></th>
          <th className="table-data">Sender</th>
          <th className="table-data">Subject</th>
          <th className="table-data"></th>
        </tr>
      </thead>
      <tbody>
        {notices.map((notice) => (
          <NoticeModal notice={notice} setNotices={setNotices} key={notice.noticeId} />
        ))}
      </tbody>
    </table>
  );
}
