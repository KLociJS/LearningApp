import Select from "Components/Input/Select/Select";
import TextArea from "Components/Input/TextArea/TextArea";
import { postArticleReport } from "_Constants/fetchUrl";
import { useState } from "react";

export default function ReportArticleModalContent({ setShow, articleId }) {
  const [additionalComments, setAdditionalComments] = useState("");
  const [reason, setReason] = useState("");
  const [reasonError, setReasonError] = useState(false);
  const [commentError, setCommentError] = useState(false);

  const [fetchError, setFetchError] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);

  const handlePostReport = () => {
    if (additionalComments.length > 200) {
      setCommentError(true);
      return;
    }

    if (reason === "") {
      setReasonError(true);
      return;
    }
    const reportData = {
      additionalComments,
      reason,
      reportedArticleId: articleId
    };
    console.log(reportData);
    setIsDisabled(true);
    fetch(postArticleReport, {
      method: "POST",
      headers: { "content-type": "application/json" },
      credentials: "include",
      body: JSON.stringify(reportData)
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error();
        }
      })
      .then((data) => {
        console.log(data);
        setShow(false);
      })
      .catch((err) => {
        setFetchError(true);
        console.log(err);
      })
      .finally(() => setIsDisabled(false));
  };

  return (
    <div className="modal" onClick={(e) => e.stopPropagation()}>
      <h2 className="modal-header">Report article</h2>
      <Select
        selectValue={reason}
        setSelectValue={setReason}
        setError={setReasonError}
        error={reasonError}
        isDisabled={isDisabled}
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
