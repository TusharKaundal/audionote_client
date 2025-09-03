import AudioRecorder from "./component/AudioRecorder/AudioRecorder";
import TranscribeList from "./component/TranscribeCard/TranscribeList";
import TranscriptProvider from "./context/TransciptProvider";

function App() {
  return (
    <TranscriptProvider>
      <div className="app">
        <main>
          <header>
            <h1>Voice Notes</h1>
            <p>
              Record, transcribe, edit, delete, and summarize your voice notes.
            </p>
          </header>
          <AudioRecorder />
          <TranscribeList />
        </main>
      </div>
    </TranscriptProvider>
  );
}

export default App;
