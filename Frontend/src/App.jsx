import { useCallback, useEffect, useState } from "react";
import { Routes, Route } from "react-router";
import Home from "./pages/Home";
import "./App.css";
import Navbar from "./components/Navbar";
import Loading from "./components/Loading";

import useBodyScrollLock from "./hooks/useBodyScrollLock";

function App() {
  const [phase, setPhase] = useState("loading");
  const handleLoaded = useCallback(() => setPhase("docking"), []);
  const handleDocked = useCallback(() => setPhase("done"), []);

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    window.scrollTo(0, 0);
  }, []);

  useBodyScrollLock(phase !== "done");

  return (
    <>
      <div className="w-full min-h-screen bg-gray-950 text-white">
        <Navbar phase={phase} onDocked={handleDocked} />

        {phase !== "done" && <Loading phase={phase} onDone={handleLoaded} />}

        <Routes>
          <Route path="/" element={<Home active={phase === "done"} />} />
        </Routes>
      </div>
    </>
  );
}

export default App;