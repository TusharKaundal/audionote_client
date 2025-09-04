import { useState, useCallback } from "react";
import { api } from "../config/api";
import TranscriptContext from "./TranscriptContext";

const TranscriptProvider = ({ children }) => {
  const [transcriptList, setTranscriptList] = useState([]);

  // Add a new transcript
  const addTranscript = useCallback(async (fileData) => {
    const { data } = await api.post("/transcribe", fileData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    const noteData = data.note;

    setTranscriptList((prev) => [noteData, ...prev]);
  }, []);

  // Delete a transcript
  const deleteTranscript = useCallback(async (data) => {
    let deletedIndex = 0;

    setTranscriptList((prev) =>
      prev.filter((item, idx) => {
        if (item._id === data._id) {
          deletedIndex = idx;
        }
        return item._id !== data._id;
      })
    );

    try {
      const response = await api.delete(`/note/${data._id}`);
      if (response.status !== 200) {
        setTranscriptList((prev) => {
          const newList = [...prev];
          newList.splice(deletedIndex, 0, data);
          return newList;
        });
      }
    } catch (error) {
      console.error("Delete failed:", error);
      // rollback the data if error came
      setTranscriptList((prev) => {
        const newList = [...prev];
        newList.splice(deletedIndex, 0, data);
        return newList;
      });
    }
  }, []);

  // Update a item
  const updateTranscript = useCallback(async (id, updatedTransrcipt) => {
    const { data } = await api.patch(`/note/${id}`, {
      transcript: updatedTransrcipt,
    });
    if (data.status === "success") {
      setTranscriptList((prev) =>
        prev.map((item) =>
          item._id === id ? { ...data.note, summary: "" } : item
        )
      );
    }
  }, []);

  // Generate summary for a transcript
  const generateSummary = useCallback(async (id) => {
    const { data } = await api.patch(`/note/${id}/summarize`);
    console.log(data);
    if (data.status === "success") {
      setTranscriptList((prev) =>
        prev.map((item) => (item._id === id ? data.note : item))
      );
    }
  }, []);

  return (
    <TranscriptContext.Provider
      value={{
        transcriptList,
        addTranscript,
        deleteTranscript,
        updateTranscript,
        generateSummary,
      }}
    >
      {children}
    </TranscriptContext.Provider>
  );
};

export default TranscriptProvider;
