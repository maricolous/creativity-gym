import BgLayer from "./BgLayer";
import FullscreenCornerBtn from "./FullscreenCornerBtn";
import MuteBtn from "./MuteBtn";

export default function ResultScreen({
  result,
  exercise,
  chosenImage,
  openInfo,
  exIdx,
  setScreen,
  fadeStyle,
  muted,
  toggleMute,
}) {
  const isP = result.exercise === "Perspektivskifte";

  return (
    <div
      className="min-h-screen text-white flex flex-col items-center justify-center p-4 relative"
      style={fadeStyle}
    >
      <FullscreenCornerBtn />
      <MuteBtn muted={muted} onToggle={toggleMute} />
      <BgLayer image={chosenImage} opacity={0.6} />
      <div className="max-w-lg w-full text-center relative z-10 my-12">
        <h2
          className="text-6xl font-bold mb-2"
          style={{
            fontFamily: "'Baloo 2', 'Trebuchet MS', 'Comic Sans MS', cursive",
          }}
        >
          Bra jobbat!
        </h2>
        <p className="text-gray-400 mb-8">{result.exercise}</p>
        <div className="mb-6">
          <span className="text-8xl font-black text-white my-8">
            {result.score}
          </span>
          <span className="text-white text-xl ml-2">poäng</span>
        </div>
        <div
          className="rounded-2xl p-5 mb-6 text-left border border-white/10"
          style={{
            background: "rgba(0,0,0,0.35)",
            backdropFilter: "blur(8px)",
          }}
        >
          <h3 className="font-bold mb-3 text-gray-300">Dina svar:</h3>
          {isP ? (
            Object.entries(result.answers).map(([p, a]) => (
              <div key={p} className="mb-3">
                <div className="text-sm font-bold text-gray-400 mb-1">{p}</div>
                <div className="flex flex-wrap gap-1.5">
                  {a.map((s, i) => (
                    <span
                      key={i}
                      className="bg-white/10 px-2.5 py-1 rounded-lg text-sm"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className="flex flex-wrap gap-1.5">
              {result.answers.map((s, i) => (
                <span
                  key={i}
                  className="bg-white/10 px-2.5 py-1 rounded-lg text-sm"
                >
                  {s}
                </span>
              ))}
            </div>
          )}
          <div className="mt-4 text-sm text-gray-500 italic">
            {exercise.effect}
          </div>
        </div>
        <div className="flex gap-3 justify-center">
          <button
            onClick={() => openInfo(exIdx)}
            className="px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/15 transition-colors font-medium"
          >
            Igen
          </button>
          <button
            onClick={() => setScreen("home")}
            className="px-5 py-2.5 rounded-full bg-gradient-to-r from-violet-600 to-cyan-600 font-bold hover:opacity-90 transition-opacity"
          >
            ← Meny
          </button>
        </div>
      </div>
    </div>
  );
}
