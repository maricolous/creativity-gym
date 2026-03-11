import { useState, useEffect } from "react";
import FullscreenCornerBtn from "./FullscreenCornerBtn";
import MuteBtn from "./MuteBtn";
import { EXERCISES } from "../data/exercises";

export default function HomeScreen({
  chosenImage,
  results,
  totalScore,
  openInfo,
  setResults,
  setTotalScore,
  muted,
  toggleMute,
  onChangeBg,
}) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  const slowFade = {
    opacity: visible ? 1 : 0,
    transition: "opacity 2s ease-in-out",
  };

  return (
    <div
      className="min-h-screen text-white flex flex-col items-center justify-center p-4 relative"
      style={{ fontFamily: "'Segoe UI', system-ui, sans-serif" }}
    >
      {/* Bakgrunden visas direkt utan fade */}
      {chosenImage && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 0,
            background: chosenImage.gradient,
          }}
        />
      )}
      {/* Overlay och innehåll fadar in */}
      <div
        style={{
          ...slowFade,
          position: "fixed",
          inset: 0,
          zIndex: 1,
          background: "rgba(0,0,0,0.5)",
        }}
      />
      <FullscreenCornerBtn />
      <MuteBtn muted={muted} onToggle={toggleMute} />
      <div
        className="max-w-lg w-full text-center relative z-10"
        style={slowFade}
      >
        <h1
          className="text-5xl mb-2 bg-gradient-to-r from-violet-400 via-cyan-400 to-amber-400 bg-clip-text"
          style={{
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            fontFamily: "'Baloo 2', 'Trebuchet MS', 'Comic Sans MS', cursive",
            fontWeight: 700,
          }}
        >
          Creativity Gym
        </h1>
        <p className="text-white mb-8 text-lg">
          Tre forskningsbaserade övningar för att trigga din kreativitet
        </p>
        {totalScore > 0 && (
          <div className="mb-6 py-2 px-4 rounded-full bg-white/5 border border-white/10 inline-block">
            <span className="text-gray-400">Totalpoäng:</span>{" "}
            <span className="text-xl font-bold text-amber-400">
              {totalScore}
            </span>
          </div>
        )}
        <div className="space-y-4">
          {EXERCISES.map((e, i) => {
            const done = results.find((r) => r.exercise === e.title);
            return (
              <button
                key={e.id}
                onClick={() => openInfo(i)}
                className="w-full text-left rounded-2xl p-5 border border-white/10 transition-all duration-300 hover:scale-[1.02] hover:border-white/25 active:scale-[0.98]"
                style={{
                  background: "rgba(0,0,0,0.3)",
                  backdropFilter: "blur(8px)",
                }}
              >
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-lg">{e.title}</span>
                      {done && (
                        <span className="text-xs bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full">
                          ✓ {done.score}p
                        </span>
                      )}
                    </div>
                    <div className="text-gray-400 text-sm">
                      {e.subtitle} · {e.duration / 60} min
                    </div>
                  </div>
                  <div className="text-gray-500 text-2xl">→</div>
                </div>
              </button>
            );
          })}
        </div>
        {results.length === 3 && (
          <button
            onClick={() => {
              setResults([]);
              setTotalScore(0);
            }}
            className="mt-6 px-6 py-3 rounded-full bg-gradient-to-r from-violet-600 to-cyan-600 font-bold hover:opacity-90 transition-opacity"
          >
            Spela igen
          </button>
        )}
        <button
          onClick={onChangeBg}
          className="mt-4 text-gray-500 text-sm hover:text-gray-300 transition-colors block mx-auto"
        >
          Byt bakgrund
        </button>
      </div>
    </div>
  );
}
