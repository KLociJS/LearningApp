import { Modal } from "Components";
import NoticeModalContent from "../NoticeModalContent/NoticeModalContent";
import NoticePreview from "../NoticePreview/NoticePreview";

export default function NoticeModal({ notice, setNotices }) {
  return (
    <Modal
      modalContent={<NoticeModalContent notice={notice} setNotices={setNotices} />}
      triggerElement={<NoticePreview notice={notice} setNotices={setNotices} />}
    />
  );
}
