import React, { useState, useRef } from "react";
import Button from "../../shared/ui/Button/Button";
import styles from "./AudioRecorder.module.css";

import { useTranscripts } from "../../context/TranscriptContext";

const AudioRecorder = () => {
  const [recording, setRecording] = useState(false);
  const [loading, setLoading] = useState(false);
  const { addTranscript } = useTranscripts();
  const mediaRef = useRef(null);
  const chunksRef = useRef([]);

  const start = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRef.current = new MediaRecorder(stream);

    mediaRef.current.ondataavailable = (e) => chunksRef.current.push(e.data);

    mediaRef.current.onstop = async () => {
      const blob = new Blob(chunksRef.current, { type: "audio/wav" });
      // Transcribe the audio by sending it to the backend
      const fd = new FormData();
      fd.append("audio", blob, "audionote.wav");
      chunksRef.current = [];
      setLoading(true);
      await addTranscript(fd);
      setLoading(false);
    };

    mediaRef.current.start();
    setRecording(true);
  };

  const stop = () => {
    mediaRef.current.stop();
    setRecording(false);
  };

  return (
    <div className={styles.container}>
      {!recording ? (
        <Button size="large" onClick={start}>
          Start Recording
        </Button>
      ) : (
        <Button size="large" onClick={stop}>
          Stop Recording
        </Button>
      )}
      {loading && <h1>Loading...</h1>}
    </div>
  );
};

export default AudioRecorder;
