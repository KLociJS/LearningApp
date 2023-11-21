import { deleteNotice } from "_Constants/fetchUrl";
import { HiOutlineMail, HiOutlineMailOpen } from "react-icons/hi";
import { RiDeleteBinLine } from "react-icons/ri";

export default function NoticePreview({ notice, setShow, setNotices }) {
  const handleShow = () => setShow(true);
  const unreadClassName = notice.unread ? "unread" : "";
  const isUnread = notice.unread;

  const handleDelete = (e) => {
    e.stopPropagation();

    fetch(`${deleteNotice}${notice.noticeId}`, { method: "DELETE", credentials: "include" })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error();
        }
      })
      .then(() => {
        setNotices((prev) => prev.filter((n) => n.noticeId !== notice.noticeId));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <tr onClick={handleShow} className={`notice-table-row ${unreadClassName}`}>
      <td className="notice-table-data">{isUnread ? <HiOutlineMail /> : <HiOutlineMailOpen />}</td>
      <td className="notice-table-data">{notice.sender}</td>
      <td className="notice-table-data">{notice.subject}</td>
      <td onClick={handleDelete} className="notice-table-data">
        <RiDeleteBinLine className="delete-icon" />
      </td>
    </tr>
  );
}
