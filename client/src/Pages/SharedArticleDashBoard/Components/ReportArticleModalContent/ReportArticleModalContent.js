import Select from "Components/Input/Select/Select";
import TextArea from "Components/Input/TextArea/TextArea";
import useReportArticle from "./Hooks/useReportArticle";

export default function ReportArticleModalContent({ setShow }) {
  const {
    additionalComments,
    setAdditionalComments,
    commentError,
    setCommentError,
    reason,
    setReason,
    reasonError,
    setReasonError,
    isDisabled,
    fetchError,
    handlePostReport
  } = useReportArticle(setShow);

  return (
    <div className="modal" onClick={(e) => e.stopPropagation()}>
      <h2 className="modal-header">Report article</h2>
      <Select
        selectValue={reason}
        setSelectValue={setReason}
        setError={setReasonError}
        error={reasonError}
        isDisabled={isDisabled}
        options={[
          { value: "PhishingLink", text: "Phishing link" },
          { value: "InappropriateContent", text: "Inappropriate content" },
          { value: "MissInformation", text: "Miss information" },
          { value: "Other", text: "Other" }
        ]}
      />
      <TextArea
        label="Additional info"
        inputValue={additionalComments}
        setInputValue={setAdditionalComments}
        error={commentError}
        setError={setCommentError}
        isDisabled={isDisabled}
        min={0}
        max={200}
      />
      {fetchError ? (
        <p className="error-msg">An error occurred on the server or already reported.</p>
      ) : null}
      <button disabled={isDisabled} className="primary-button" onClick={handlePostReport}>
        {" "}
        Report{" "}
      </button>
      <button disabled={isDisabled} className="secondary-button" onClick={() => setShow(false)}>
        Cancel
      </button>
    </div>
  );
}
