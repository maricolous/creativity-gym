import { useState, useEffect } from "react";

export default function MeditationScreen({ image, onDone }) {
  const [timeLeft, setTimeLeft] = useState(40);
  const [breathPhase, setBreathPhase] = useState("in");
  const [cycleCount, setCycleCount] = useState(0);
  const [scale, setScale] = useState(0.5);
  const [textOpacity, setTextOpacity] = useState(1);

  useEffect(() => {
    const iv = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(iv);
          onDone();
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(iv);
  }, [onDone]);

  useEffect(() => {
    setTimeout(() => setScale(1.2), 50);
    const bv = setInterval(() => {
      setBreathPhase((p) => {
        if (p === "out") setCycleCount((c) => c + 1);
        return p === "in" ? "out" : "in";
      });
    }, 4000);
    return () => clearInterval(bv);
  }, []);

  useEffect(() => {
    setScale(breathPhase === "in" ? 1.2 : 0.85);
  }, [breathPhase]);

  useEffect(() => {
    if (cycleCount >= 1 && textOpacity > 0) {
      const steps = 20;
      const stepTime = 1500 / steps;
      let i = 0;
      const iv = setInterval(() => {
        i++;
        setTextOpacity(1 - i / steps);
        if (i >= steps) clearInterval(iv);
      }, stepTime);
      return () => clearInterval(iv);
    }
  }, [cycleCount]);

  const [bgScale, setBgScale] = useState(1);
  const [bgTransition, setBgTransition] = useState("none");

  useEffect(() => {
    // Zoom in under 18 sekunder
    setTimeout(() => {
      setBgTransition("transform 18s ease-in-out");
      setBgScale(1.15);
    }, 50);
    // Zoom tillbaka under 20 sekunder (startar vid 18s, klar vid 38s – 2s marginal)
    const mid = setTimeout(() => {
      setBgTransition("transform 20s ease-in-out");
      setBgScale(1);
    }, 18000);
    return () => clearTimeout(mid);
  }, []);

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: "-10%",
          background: image.gradient,
          transform: `scale(${bgScale})`,
          transition: bgTransition,
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(0,0,0,0.2)",
        }}
      />

      {/* Andningscirkel – centrerad */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 10,
        }}
      >
        <div
          style={{
            width: 160,
            height: 160,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.08)",
            backdropFilter: "blur(10px)",
            transform: `scale(${scale})`,
            transition: "transform 4s ease-in-out",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 0 60px rgba(255,255,255,0.15)",
          }}
        >
          <span
            style={{
              fontSize: "1.5rem",
              fontWeight: 700,
              color: "white",
              opacity: textOpacity * 0.8,
              textShadow: "0 0 20px rgba(255,255,255,0.3)",
              transition: "opacity 0.3s",
            }}
          >
            {breathPhase === "in" ? "Andas in" : "Andas ut"}
          </span>
        </div>
      </div>

      {/* Timer + hoppa över – nedre högra */}
      <div
        style={{
          position: "absolute",
          bottom: 24,
          right: 24,
          zIndex: 10,
          textAlign: "right",
        }}
      >
        <div
          style={{
            fontSize: "1.5rem",
            fontWeight: 500,
            color: "white",
            opacity: 0.4,
            marginBottom: 8,
          }}
        >
          {timeLeft}
        </div>
        <button
          onClick={onDone}
          style={{
            padding: "6px 16px",
            borderRadius: 9999,
            border: "1px solid rgba(255,255,255,0.15)",
            color: "white",
            fontSize: "0.75rem",
            background: "rgba(255,255,255,0.05)",
            cursor: "pointer",
            opacity: 0.4,
          }}
          onMouseEnter={(e) => (e.target.style.opacity = 0.7)}
          onMouseLeave={(e) => (e.target.style.opacity = 0.4)}
        >
          Hoppa över →
        </button>
      </div>
    </div>
  );
}
