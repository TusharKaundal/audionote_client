import React, { useState, useRef } from "react";
import { api } from "../../config/api";
import Button from "../../shared/ui/Button/Button";
import styles from "./AudioRecorder.module.css";
const AudioRecorder = () => {
  const [recording, setRecording] = useState(false);
  const mediaRef = useRef(null);
  const chunksRef = useRef([]);

  const start = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRef.current = new MediaRecorder(stream);

    mediaRef.current.ondataavailable = (e) => chunksRef.current.push(e.data);

    mediaRef.current.onstop = async () => {
      const blob = new Blob(chunksRef.current, { type: "audio/wav" });
      const audioUrl = URL.createObjectURL(blob);

      // Transcribe the audio by sending it to the backend
      const fd = new FormData();
      fd.append("audio", blob, "audionote.wav");
      const res = await api.post("/transcribe", fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      chunksRef.current = [];
      console.log(fd, res);
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
        <Button size="large" onClick={start}>Start Recording</Button>
      ) : (
        <Button size="large" onClick={stop}>Stop Recoding</Button>
      )}
    </div>
  );
};

export default AudioRecorder;
