import React, { useState, useRef } from "react";
import { api } from "../config/api";

const AudioRecorder = () => {
  const [recording, setRecording] = useState(false);
  const [recordedUrl, setRecordedUrl] = useState("");
  const mediaRef = useRef(null);
  const chunksRef = useRef([]);

  const start = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRef.current = new MediaRecorder(stream);

    mediaRef.current.ondataavailable = (e) => chunksRef.current.push(e.data);

    mediaRef.current.onstop = async () => {
      const blob = new Blob(chunksRef.current, { type: "audio/wav" });
      const audioUrl = URL.createObjectURL(blob);
      const fd = new FormData();
      fd.append("audio", blob, "audionote.wav");
      const res = await api.post("/transcribe", fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      chunksRef.current = [];
      setRecordedUrl(audioUrl);
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
    <div>
      <audio {...(recordedUrl && { src: recordedUrl })} controls />
      {!recording ? (
        <button onClick={start}>Start</button>
      ) : (
        <button onClick={stop}>Stop</button>
      )}
    </div>
  );
};

export default AudioRecorder;
