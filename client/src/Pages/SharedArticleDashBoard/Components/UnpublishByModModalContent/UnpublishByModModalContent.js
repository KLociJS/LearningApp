import Select from "Components/Input/Select/Select";
import TextArea from "Components/Input/TextArea/TextArea";
import useUnPublishByMod from "./Hooks/useUnPublishByMod";

export default function UnpublishByModModalContent({ setShow }) {
  const {
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
  } = useUnPublishByMod();

  return (
    <div className="modal" onClick={(e) => e.stopPropagation()}>
      <Select
        error={reasonError}
        setError={setReasonError}
        selectValue={reason}
        setSelectValue={setReason}
        isDisabled={isDisabled}
      />
      <TextArea
        label="Additional details"
        error={detailsError}
        setError={setDetailsError}
        inputValue={details}
        setInputValue={setDetails}
        isDisabled={isDisabled}
        min={0}
        max={200}
      />
      {fetchError ? <p className="error-msg">Server error.</p> : null}
      <button className="primary-button" onClick={handleUnpublishByMod}>
        Unpublish
      </button>
      <button className="secondary-button" onClick={handleCancel}>
        cancel
      </button>
    </div>
  );
}
