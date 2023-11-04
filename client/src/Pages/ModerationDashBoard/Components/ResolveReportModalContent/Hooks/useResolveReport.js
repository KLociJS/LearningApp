import { patchArticleReport } from "_Constants/fetchUrl";
import { useState } from "react";

export default function useResolveReport(report, setPendingReports, setShow) {
  const [status, setStatus] = useState("");
  const [statusError, setStatusError] = useState(false);
  const [details, setDetails] = useState("");
  const [detailsError, setDetailsError] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [fetchError, setFetchError] = useState(false);

  const handleResolveReport = () => {
    if (status === "") {
      setStatusError(true);
      return;
    }
    if (details.length > 200) {
      setDetailsError(true);
      return;
    }
    setIsDisabled(true);

    const reportData = {
      status,
      details
    };

    fetch(`${patchArticleReport}${report.id}`, {
      method: "PATCH",
      credentials: "include",
      headers: {
        "content-type": "application/json"
      },
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
        setPendingReports((prev) =>
          prev.filter((r) => {
            return r.id !== report.id;
          })
        );
        setShow(false);
      })
      .catch((err) => {
        console.log(err);
        setFetchError(true);
      })
      .finally(() => setIsDisabled(false));
  };

  const handleCancel = () => {
    setShow(false);
  };

  return {
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
  };
}
