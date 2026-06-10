import { PipelineToolbar } from './toolbar';
import { Canvas } from './canvas/Canvas';
import { SubmitButton } from './submit';

function App() {
  return (
    <div className="app">
      <PipelineToolbar />
      <main className="app-main">
        <Canvas />
        <SubmitButton />
      </main>
    </div>
  );
}

export default App;
