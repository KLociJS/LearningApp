import { Modal, ModalTriggerElement } from "Components";
import convertDate from "Utility/convertDate";
import { AiOutlineLink } from "react-icons/ai";
import { Link } from "react-router-dom";
import ResolveReportModalContent from "../ResolveReportModalContent/ResolveReportModalContent";

export default function ReportCard({ report, setPendingReports }) {
  return (
    <div className="report-card">
      <div>
        <div className="report-article-title-container">
          <h2 className="reported-article-title">{report.reportedArticleTitle}</h2>
          <Link
            to={`/shared-article/${report.reportedArticleId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="report-article-link">
            <AiOutlineLink className="report-link-icon" />
          </Link>
        </div>
        <h3 className="report-reason">
          Reason: <strong>{report.reason}</strong>
        </h3>
        <p className="report-details">Details: {report.additionalComments}</p>
      </div>
      <div>
        <Link to={`/profile/${report.reporterUserName}`} className="reporter-link">
          {report.reporterUserName}
        </Link>
        <p className="report-date">{convertDate(report.createdAt)}</p>
      </div>
      <Modal
        modalContent={
          <ResolveReportModalContent report={report} setPendingReports={setPendingReports} />
        }
        triggerElement={<ModalTriggerElement text="Resolve report" className="secondary-button" />}
      />
    </div>
  );
}
