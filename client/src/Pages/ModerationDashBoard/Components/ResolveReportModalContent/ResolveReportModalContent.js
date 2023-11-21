import Select from "Components/Input/Select/Select";
import TextArea from "Components/Input/TextArea/TextArea";
import useResolveReport from "./Hooks/useResolveReport";

export default function ResolveReportModalContent({ setShow, report, setPendingReports }) {
  const {
    status,
    setStatus,
    statusError,
    setStatusError,
    details,
    setDetails,
    detailsError,
    setDetailsError,
    isDisabled,
    fetchError,
    handleResolveReport,
    handleCancel
  } = useResolveReport(report, setPendingReports, setShow);

  return (
    <div className="modal" onClick={(e) => e.stopPropagation()}>
      <Select
        error={statusError}
        setError={setStatusError}
        selectValue={status}
        setSelectValue={setStatus}
        isDisabled={isDisabled}
        options={[
          { value: "ActionTaken", text: "Action taken" },
          { value: "Dismissed", text: "Dismissed" }
        ]}
      />
      {status === "ActionTaken" ? (
        <TextArea
          label="Details"
          inputValue={details}
          setInputValue={setDetails}
          error={detailsError}
          setError={setDetailsError}
          isDisabled={isDisabled}
          min={0}
          max={200}
        />
      ) : null}
      {fetchError ? <p className="error-msg">Failed to resolve report</p> : null}
      <button onClick={handleResolveReport} disabled={isDisabled} className="primary-button">
        Resolve report
      </button>
      <button onClick={handleCancel} disabled={isDisabled} className="secondary-button">
        Cancel
      </button>
    </div>
  );
}
