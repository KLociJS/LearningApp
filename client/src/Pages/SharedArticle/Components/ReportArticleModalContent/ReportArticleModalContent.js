import Select from "Components/Input/Select/Select";
import TextArea from "Components/Input/TextArea/TextArea";
import { useState } from "react";

export default function ReportArticleModalContent({ setShow }) {
  const [additionalComment, setAdditionalComment] = useState("");
  const [reason, setReason] = useState(null);
  return (
    <div className="modal" onClick={(e) => e.stopPropagation()}>
      <h2 className="modal-header">Report article</h2>
      <Select />
      <TextArea
        label="Additional info"
        inputValue={additionalComment}
        setInputValue={setAdditionalComment}
        min={0}
        max={200}
      />
      <button className="primary-button"> Report </button>
      <button className="secondary-button" onClick={() => setShow(false)}>
        Cancel
      </button>
    </div>
  );
}
