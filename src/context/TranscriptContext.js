import { createContext, useContext } from "react";

const TranscriptContext = createContext();

export const useTranscripts = () => {
  const context = useContext(TranscriptContext);
  if (!context) {
    throw new Error("useTranscripts must be used within a TranscriptProvider");
  }
  return context;
};

export default TranscriptContext;
