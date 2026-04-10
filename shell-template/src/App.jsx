import { lazy, Suspense } from "react";

const RemoteGreeting = lazy(() =>
  import("hoiPoi/components").then((mod) => ({ default: mod.Greeting }))
);

function App() {
  return (
    <div>
      <h1>Shell App</h1>
      <Suspense fallback={<p>Loading remote component...</p>}>
        <RemoteGreeting name="Hoi-Poi" />
      </Suspense>
    </div>
  );
}

export default App;
