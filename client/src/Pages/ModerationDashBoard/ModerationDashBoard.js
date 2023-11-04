import ModerationDashBoardSkeleton from "./Components/ModerationDashBoardSkeleton/ModerationDashBoardSkeleton";
import ReportCard from "./Components/ReportCard/ReportCard";
import usePendingReports from "./Hooks/usePendingReports";
import "./ModerationDashBoard.css";

export default function ModerationDashBoard() {
  const { pendingReports, setPendingReports, isLoading } = usePendingReports();

  if (isLoading) {
    return <ModerationDashBoardSkeleton />;
  }

  return (
    <section className="report-page-container">
      {pendingReports.map((report) => (
        <ReportCard key={report.id} report={report} setPendingReports={setPendingReports} />
      ))}
    </section>
  );
}
