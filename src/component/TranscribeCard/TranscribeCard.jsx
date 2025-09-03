import React, { useState } from "react";
import styles from "./TranscribeCard.module.css";
import Button from "../../shared/ui/Button/Button";
import TextArea from "../../shared/ui/TextArea/TextArea";
import { useTranscripts } from "../../context/TranscriptContext";
import Loader from "../../shared/ui/Loader/Loader";

const TranscribeCard = ({ transcriptData, idx }) => {
  const [inputText, setInputText] = useState(transcriptData.transcript);
  const { updateTranscript, deleteTranscript, generateSummary } =
    useTranscripts();
  const [isEditable, setIsEditable] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showSummary, setSummary] = useState(transcriptData.summary ?? false);
  function handleInput(e) {
    const { value } = e.target;
    setInputText(value);
  }

  async function handleGenerateSummary(id) {
    setIsLoading(true);
    await generateSummary(id);
    setIsLoading(false);
    setSummary(true);
  }

  function handleDelete(id) {
    deleteTranscript(id);
  }

  function handleEdit() {
    setIsEditable(true);
    setSummary(false);
  }

  function handleSave(id) {
    if (inputText === "") {
      setInputText(transcriptData.transcript);
    }
    updateTranscript(id, inputText);
    setIsEditable(false);
  }

  return (
    <div className={styles.conatiner}>
      <div className={styles.cardContent}>
        {!isEditable ? (
          <p className={styles.text}>{inputText}</p>
        ) : (
          <TextArea idx={idx} value={inputText} onChange={handleInput} />
        )}

        {isLoading ? (
          <Loader text="generating summary ..." />
        ) : (
          showSummary && (
            <div className={styles.summaryContainer}>
              <h3>Summary</h3>
              <p className={styles.text}>{transcriptData.summary}</p>
            </div>
          )
        )}
        <div className={styles.cardAction}>
          <div className={styles.edit_delete_controls}>
            {!isEditable ? (
              <Button
                theme="secondary"
                onClick={handleEdit}
                title="Click to edit transcript"
              >
                Edit
              </Button>
            ) : (
              <Button
                theme="secondary"
                onClick={() => handleSave(transcriptData._id)}
                title="Click to save transcript"
              >
                Save
              </Button>
            )}

            <Button
              theme="secondary"
              onClick={() => handleDelete(transcriptData._id)}
              title="Click to delete transcript"
            >
              Delete
            </Button>
          </div>

          <Button
            theme="primary"
            onClick={() => handleGenerateSummary(transcriptData._id)}
            disabled={isEditable || showSummary}
            title={
              isEditable
                ? "Click save button to Enable this Button"
                : "Click to generate summary"
            }
          >
            Generate Summary
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TranscribeCard;
