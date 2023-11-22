import NoticeModal from "./Components/NoticeModal/NoticeModal";
import useNotice from "./Hooks/useNotice";
import "./Notice.css";

export default function Notice() {
  const { notices, setNotices, isLoading } = useNotice();
  if (isLoading) {
    return <div>loading...</div>;
  }

  return (
    <table className="notice-table">
      <thead>
        <tr>
          <th className="notice-table-data"></th>
          <th className="notice-table-data">Sender</th>
          <th className="notice-table-data">Subject</th>
          <th className="notice-table-data"></th>
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
