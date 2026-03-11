import { useState, useEffect, useCallback } from "react";
import { useAudio } from "./hooks/useAudio";
import { AUDIO } from "./data/audio";
import { EXERCISES } from "./data/exercises";
import { WORD_POOL } from "./data/wordPool";
import { shuffle } from "./utils/helpers";

import WelcomeScreen from "./components/WelcomeScreen";
import ImagePicker from "./components/ImagePicker";
import MeditationScreen from "./components/MeditationScreen";
import InfoPanel from "./components/InfoPanel";
import HomeScreen from "./components/HomeScreen";
import ResultScreen from "./components/ResultScreen";
import ExerciseScreen from "./components/ExerciseScreen";
import FullscreenCornerBtn from "./components/FullscreenCornerBtn";
import MuteBtn from "./components/MuteBtn";

export default function App() {
  const [screen, setScreenState] = useState("welcome");
  const [chosenImage, setChosenImage] = useState(null);
  const [exIdx, setExIdx] = useState(0);
  const [challengeData, setChallengeData] = useState(null);
  const [results, setResults] = useState([]);
  const [totalScore, setTotalScore] = useState(0);
  const [lastResult, setLastResult] = useState(null);

  const audio = useAudio();
  const [muted, setMuted] = useState(false);

  const toggleMute = useCallback(() => {
    const next = !muted;
    setMuted(next);
    audio.setMuted(next);
  }, [muted, audio]);

  // Screen setter som också kan ta emot result-data
  const setScreen = useCallback((newScreen, resultData) => {
    if (resultData) {
      setLastResult(resultData);
      setResults((prev) => [...prev, resultData]);
      setTotalScore((prev) => prev + resultData.score);
    }
    setScreenState(newScreen);
  }, []);

  // 🔊 Ljudhantering
  useEffect(() => {
    if (screen === "meditation" || screen === "home" || screen === "info") {
      if (AUDIO.meditation) audio.play(AUDIO.meditation);
    } else if (screen === "exercise") {
      const key = `exercise${exIdx + 1}`;
      if (AUDIO[key]) {
        audio.fadeOut(500);
        setTimeout(() => audio.play(AUDIO[key]), 600);
      }
    } else if (screen === "result") {
      audio.fadeOut(1000);
    } else {
      audio.stop();
    }
  }, [screen]);

  // Challenge generator
  const pickChallenge = useCallback((idx) => {
    if (idx === 0) {
      const w = shuffle(WORD_POOL)[0];
      return { name: w.charAt(0).toUpperCase() + w.slice(1) };
    }
    if (idx === 1) {
      const p = shuffle(WORD_POOL).slice(0, 2);
      return {
        a: p[0].charAt(0).toUpperCase() + p[0].slice(1),
        b: p[1].charAt(0).toUpperCase() + p[1].slice(1),
      };
    }
    return shuffle(EXERCISES[idx].prompts)[0];
  }, []);

  // Navigation handlers
  const handleImagePick = useCallback((img) => {
    setChosenImage(img);
    setScreen("meditation");
  }, []);

  const handleChangeBg = useCallback(() => {
    setScreen("pick_image_nobreathe");
  }, []);

  const handleMeditationDone = useCallback(() => setScreen("home"), []);

  const openInfo = useCallback((idx) => {
    setExIdx(idx);
    setScreen("info");
  }, []);

  const startExercise = useCallback(
    (action) => {
      if (action !== "play") {
        setScreen("home");
        return;
      }
      setChallengeData(pickChallenge(exIdx));
      setScreen("exercise");
    },
    [exIdx, pickChallenge],
  );

  // Fade-in
  const [fadeIn, setFadeIn] = useState(false);
  useEffect(() => {
    setFadeIn(false);
    const t = setTimeout(() => setFadeIn(true), 50);
    return () => clearTimeout(t);
  }, [screen]);
  const fadeStyle = {
    opacity: fadeIn ? 1 : 0,
    transition: "opacity 0.8s ease-in-out",
  };

  const ex = EXERCISES[exIdx];

  // ---- SCREENS ----

  if (screen === "welcome") {
    return <WelcomeScreen onStart={() => setScreen("pick_image")} />;
  }

  if (screen === "pick_image" || screen === "pick_image_nobreathe") {
    const handleSelect = (img) => {
      setChosenImage(img);
      if (screen === "pick_image_nobreathe") {
        setScreen("home");
      } else {
        setScreen("meditation");
      }
    };
    return (
      <div style={fadeStyle}>
        <FullscreenCornerBtn />
        <MuteBtn muted={muted} onToggle={toggleMute} />
        <ImagePicker onSelect={handleSelect} />
      </div>
    );
  }

  if (screen === "meditation") {
    return (
      <>
        <MuteBtn muted={muted} onToggle={toggleMute} />
        <MeditationScreen image={chosenImage} onDone={handleMeditationDone} />
      </>
    );
  }

  if (screen === "info") {
    return (
      <div style={fadeStyle}>
        <FullscreenCornerBtn />
        <MuteBtn muted={muted} onToggle={toggleMute} />
        <InfoPanel
          exercise={ex}
          chosenImage={chosenImage}
          onStart={startExercise}
        />
      </div>
    );
  }

  if (screen === "home") {
    return (
      <HomeScreen
        chosenImage={chosenImage}
        results={results}
        totalScore={totalScore}
        openInfo={openInfo}
        setResults={setResults}
        setTotalScore={setTotalScore}
        muted={muted}
        toggleMute={toggleMute}
        onChangeBg={handleChangeBg}
      />
    );
  }

  if (screen === "result" && lastResult) {
    return (
      <ResultScreen
        result={lastResult}
        exercise={ex}
        chosenImage={chosenImage}
        openInfo={openInfo}
        exIdx={exIdx}
        setScreen={setScreen}
        fadeStyle={fadeStyle}
        muted={muted}
        toggleMute={toggleMute}
      />
    );
  }

  if (screen === "exercise") {
    return (
      <ExerciseScreen
        exIdx={exIdx}
        chosenImage={chosenImage}
        challengeData={challengeData}
        setScreen={setScreen}
        fadeStyle={fadeStyle}
        muted={muted}
        toggleMute={toggleMute}
      />
    );
  }

  return null;
}
