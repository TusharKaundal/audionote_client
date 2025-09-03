import AudioRecorder from "./component/AudioRecorder/AudioRecorder";
import TranscribeCard from "./component/TranscribeCard/TranscribeCard";

function App() {
  return (
    <main>
      <header>
        <h1>Voice Notes</h1>
        <p> Record, transcribe, edit, delete, and summarize your voice notes.</p>
      </header>
      <AudioRecorder />
      <TranscribeCard />
    </main>
  );
}

export default App;
