import { useRef, useEffect, useCallback, useState } from "react";
import BgLayer from "./BgLayer";
import FullscreenCornerBtn from "./FullscreenCornerBtn";
import MuteBtn from "./MuteBtn";
import { EXERCISES, motivations } from "../data/exercises";
import { fmt } from "../utils/helpers";

export default function ExerciseScreen({
  exIdx,
  chosenImage,
  challengeData,
  setScreen,
  fadeStyle,
  muted,
  toggleMute,
}) {
  const ex = EXERCISES[exIdx];
  const [timeLeft, setTimeLeft] = useState(ex.duration);
  const [running, setRunning] = useState(true);
  const [input, setInput] = useState("");
  const [answers, setAnswers] = useState([]);
  const [perspectiveAnswers, setPerspectiveAnswers] = useState({});
  const [activePerspective, setActivePerspective] = useState(0);
  const [motivation, setMotivation] = useState("");
  const [pulseAnswer, setPulseAnswer] = useState(false);
  const inputRef = useRef(null);
  const timerRef = useRef(null);

  const pct = ((ex.duration - timeLeft) / ex.duration) * 100;
  const allAnswerCount =
    exIdx === 2
      ? Object.values(perspectiveAnswers).reduce((s, a) => s + a.length, 0)
      : answers.length;

  const beginTimer = useCallback(() => {
    setTimeout(() => inputRef.current?.focus(), 100);
  }, []);

  useEffect(() => {
    beginTimer();
  }, []);

  useEffect(() => {
    if (!running || timeLeft <= 0) return;
    timerRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(timerRef.current);
          setRunning(false);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [running]);

  const addAnswer = useCallback(() => {
    const v = input.trim();
    if (!v) return;
    if (exIdx === 2) {
      const p = challengeData.perspectives[activePerspective];
      setPerspectiveAnswers((prev) => ({
        ...prev,
        [p]: [...(prev[p] || []), v],
      }));
    } else {
      setAnswers((prev) => [...prev, v]);
    }
    setInput("");
    setMotivation(motivations[Math.floor(Math.random() * motivations.length)]);
    setPulseAnswer(true);
    setTimeout(() => setPulseAnswer(false), 600);
    setTimeout(() => setMotivation(""), 2000);
    inputRef.current?.focus();
  }, [input, exIdx, activePerspective, challengeData]);

  const calcScore = useCallback(() => {
    if (exIdx === 2) {
      const filled = Object.values(perspectiveAnswers).filter(
        (a) => a.length > 0,
      ).length;
      const total = Object.values(perspectiveAnswers).reduce(
        (s, a) => s + a.length,
        0,
      );
      return filled * 15 + total * 5;
    }
    const c = answers.length;
    if (exIdx === 0) return c * 10 + (c > 10 ? 50 : 0) + (c > 20 ? 100 : 0);
    return c * 20 + (c >= 3 ? 30 : 0);
  }, [exIdx, answers, perspectiveAnswers]);

  const finishExercise = useCallback(() => {
    const score = calcScore();
    setScreen("result", {
      exercise: EXERCISES[exIdx].title,
      answers: exIdx === 2 ? perspectiveAnswers : answers,
      score,
      challengeData,
    });
  }, [calcScore, exIdx, answers, perspectiveAnswers, challengeData, setScreen]);

  useEffect(() => {
    if (
      timeLeft === 0 &&
      !running &&
      (answers.length > 0 || Object.keys(perspectiveAnswers).length > 0)
    ) {
      finishExercise();
    }
  }, [timeLeft, running]);

  // Renderar ordet/ordparet
  const renderWord = () => {
    if (!running || !challengeData) return null;
    if (exIdx === 0) {
      return (
        <div className="text-6xl font-black text-center text-white my-24">
          {challengeData.name}
        </div>
      );
    }
    if (exIdx === 1) {
      return (
        <div className="flex items-center justify-center gap-4 my-24">
          <span className="text-6xl font-black text-white">
            {challengeData.a}
          </span>
          <span className="text-gray-500 text-4xl">+</span>
          <span className="text-6xl font-black text-white">
            {challengeData.b}
          </span>
        </div>
      );
    }
    if (exIdx === 2) {
      return (
        <div className="text-6xl font-black text-center text-white my-24">
          {challengeData.object}
        </div>
      );
    }
    return null;
  };

  // Renderar perspektivknappar
  const renderPerspectives = () => {
    if (exIdx !== 2 || !running || !challengeData) return null;
    return (
      <div className="flex flex-wrap gap-2 mt-2">
        {challengeData.perspectives.map((p, i) => {
          const count = (perspectiveAnswers[p] || []).length;
          return (
            <button
              key={p}
              onClick={() => {
                setActivePerspective(i);
                inputRef.current?.focus();
              }}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                activePerspective === i
                  ? "bg-amber-500/30 border-amber-500/50 text-amber-300 border"
                  : count > 0
                    ? "bg-white/10 border-white/20 text-white border"
                    : "bg-white/5 border-white/10 text-gray-400 border"
              }`}
            >
              {p}{" "}
              {count > 0 && (
                <span className="ml-1 text-xs opacity-70">({count})</span>
              )}
            </button>
          );
        })}
      </div>
    );
  };

  // Renderar svar-tags
  const renderAnswers = () => {
    if (!running) return null;
    const items =
      exIdx === 2
        ? perspectiveAnswers[challengeData?.perspectives[activePerspective]] ||
          []
        : answers;
    return (
      <div className="mt-3 flex flex-wrap gap-1.5">
        {items.map((a, i) => (
          <span
            key={i}
            className={`bg-white/10 px-2.5 py-1 rounded-lg text-sm ${pulseAnswer && i === items.length - 1 ? "animate-pulse" : ""}`}
          >
            {a}
          </span>
        ))}
      </div>
    );
  };

  return (
    <div
      className="min-h-screen text-white flex flex-col items-center justify-center p-4 relative"
      style={{ ...fadeStyle, fontFamily: "'Segoe UI', system-ui, sans-serif" }}
    >
      <FullscreenCornerBtn />
      <MuteBtn muted={muted} onToggle={toggleMute} />
      <BgLayer image={chosenImage} opacity={0.65} />

      <div className="max-w-lg w-full relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-2">
          <button
            onClick={() => setScreen("home")}
            className="text-gray-400 hover:text-white transition-colors text-sm"
          >
            ← Tillbaka
          </button>
          <span className="font-bold">{ex.subtitle}</span>
          <div className="text-sm text-gray-400">{allAnswerCount} svar</div>
        </div>

        {/* Progress bar */}
        <div className="relative h-2 bg-white/10 rounded-full overflow-hidden mb-1">
          <div
            className={`h-full rounded-full bg-gradient-to-r ${ex.color} transition-all duration-1000`}
            style={{ width: `${100 - pct}%` }}
          />
        </div>

        {/* Timer */}
        <div className="flex justify-between text-sm my-12">
          <div className="flex-1" />
          <span
            className={`font-mono font-bold text-2xl ${timeLeft <= 10 && timeLeft > 0 ? "text-red-400 animate-pulse" : "text-white"}`}
          >
            {fmt(timeLeft)}
          </span>
          <div className="flex-1 flex justify-end">
            {motivation && (
              <span className="text-amber-400 font-medium animate-bounce text-sm">
                {motivation}
              </span>
            )}
          </div>
        </div>

        {/* Ordet */}
        {renderWord()}

        {/* Challenge card */}
        <div
          className="rounded-2xl p-5 mb-5 border border-white/10 relative overflow-hidden"
          style={{ background: "rgba(0,0,0,0.3)", backdropFilter: "blur(8px)" }}
        >
          <div
            className={`absolute inset-0 ${ex.bgGlow} blur-3xl opacity-20`}
          />
          <div className="relative">
            <p className="text-gray-400 text-sm">{ex.description}</p>
            {renderPerspectives()}
          </div>
        </div>

        {/* Input / Finish */}
        {running ? (
          <div className="flex gap-2 mb-4">
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") addAnswer();
              }}
              placeholder={
                exIdx === 2
                  ? `Svar som ${challengeData?.perspectives[activePerspective]}...`
                  : "Skriv ditt svar..."
              }
              className="flex-1 border border-white/15 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-white/30 transition-colors"
              style={{ background: "rgba(0,0,0,0.3)" }}
              autoFocus
            />
            <button
              onClick={addAnswer}
              className={`px-5 rounded-xl bg-gradient-to-r ${ex.color} font-bold hover:opacity-90 transition-opacity active:scale-95`}
            >
              +
            </button>
          </div>
        ) : (
          <button
            onClick={finishExercise}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-green-600 to-emerald-600 font-bold text-lg hover:opacity-90 transition-all"
          >
            Se resultat →
          </button>
        )}

        {/* Answers */}
        {renderAnswers()}

        {/* Stop early */}
        {running && allAnswerCount > 0 && (
          <button
            onClick={() => {
              clearInterval(timerRef.current);
              setRunning(false);
              setTimeLeft(0);
            }}
            className="mt-4 text-gray-500 hover:text-gray-300 text-sm transition-colors block mx-auto"
          >
            Avsluta tidigt →
          </button>
        )}
      </div>
    </div>
  );
}
