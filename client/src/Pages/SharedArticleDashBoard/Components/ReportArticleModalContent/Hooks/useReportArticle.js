import { postArticleReport } from "_Constants/fetchUrl";
import { useState } from "react";
import { useParams } from "react-router-dom";

export default function useReportArticle(setShow) {
  const { id } = useParams();
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
      reportedArticleId: id
    };

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
        setShow(false);
      })
      .catch((err) => {
        setFetchError(true);
        console.log(err);
      })
      .finally(() => setIsDisabled(false));
  };

  return {
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
  };
}
