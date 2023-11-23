import { unPublishByMod } from "_Constants/fetchUrl";
import { useState } from "react";
import { useParams } from "react-router-dom";

export default function useUnPublishByMod(setShow) {
  const { id } = useParams();
  const [reason, setReason] = useState("");
  const [reasonError, setReasonError] = useState(false);
  const [details, setDetails] = useState("");
  const [detailsError, setDetailsError] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [fetchError, setFetchError] = useState(false);

  const handleUnpublishByMod = () => {
    if (reason === "") {
      setReasonError(true);
      return;
    }
    if (details.length > 200) {
      setDetailsError(true);
      return;
    }
    setIsDisabled(true);
    const unPublishData = {
      reason,
      details
    };

    fetch(`${unPublishByMod}${id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json"
      },
      credentials: "include",
      body: JSON.stringify(unPublishData)
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

  const handleCancel = () => setShow(false);

  return {
    reason,
    setReason,
    reasonError,
    setReasonError,
    details,
    setDetails,
    detailsError,
    setDetailsError,
    isDisabled,
    fetchError,
    handleCancel,
    handleUnpublishByMod
  };
}
