import BgLayer from "./BgLayer";

export default function InfoPanel({ exercise, chosenImage, onStart }) {
  return (
    <div className="min-h-screen text-white flex flex-col items-center justify-center p-4 relative">
      <BgLayer image={chosenImage} opacity={0.6} />
      <div className="max-w-lg w-full relative z-10">
        <button
          onClick={onStart}
          className="text-gray-400 hover:text-white transition-colors text-sm mb-4"
        >
          ← Tillbaka
        </button>
        <div className="text-center mb-6">
          <h2
            className="text-4xl font-bold mb-1"
            style={{
              fontFamily: "'Baloo 2', 'Trebuchet MS', 'Comic Sans MS', cursive",
            }}
          >
            {exercise.infoTitle}
          </h2>
          <span className="inline-block bg-white/10 text-gray-300 px-3 py-1 rounded-full text-sm mt-1">
            ⏱ {exercise.infoTime}
          </span>
        </div>
        <div className="space-y-4 mb-8">
          {exercise.infoSections.map((s, i) => (
            <div
              key={i}
              className="border border-white/10 rounded-xl p-4"
              style={{
                background: "rgba(0,0,0,0.35)",
                backdropFilter: "blur(8px)",
              }}
            >
              <h3
                className="font-bold text-sm uppercase tracking-wider mb-2"
                style={{
                  color:
                    exercise.id === 1
                      ? "#a78bfa"
                      : exercise.id === 2
                        ? "#67e8f9"
                        : "#fbbf24",
                }}
              >
                {s.heading}
              </h3>
              {s.label && (
                <p className="text-gray-300 text-sm mb-1.5">{s.label}</p>
              )}
              {s.text && (
                <p className="text-gray-300 text-sm leading-relaxed">
                  {s.text}
                </p>
              )}
              {s.items && (
                <ul className="space-y-1">
                  {s.items.map((item, j) => (
                    <li
                      key={j}
                      className="text-gray-300 text-sm flex items-start gap-2"
                    >
                      <span
                        className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0"
                        style={{
                          background:
                            exercise.id === 1
                              ? "#a78bfa"
                              : exercise.id === 2
                                ? "#67e8f9"
                                : "#fbbf24",
                        }}
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
        <button
          onClick={() => onStart("play")}
          className={`w-full py-4 rounded-2xl bg-gradient-to-r ${exercise.color} font-bold text-lg hover:opacity-90 transition-all active:scale-[0.98]`}
        >
          ▶ Starta övningen
        </button>
      </div>
    </div>
  );
}
