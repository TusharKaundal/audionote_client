import React from "react";
import TranscribeCard from "./TranscribeCard";
import { useTranscripts } from "../../context/TranscriptContext";

const TranscribeList = () => {
  const { transcriptList } = useTranscripts();
  if (!transcriptList.length) {
    return null;
  }
  return (
    <>
      {transcriptList.map((data, idx) => (
        <TranscribeCard key={data._id} idx={idx} transcriptData={data} />
      ))}
    </>
  );
};

export default TranscribeList;
