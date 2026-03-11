import { useState, useEffect } from "react";
import { toggleFullscreen } from "../utils/helpers";

export default function FullscreenCornerBtn() {
  const [isFs, setIsFs] = useState(!!document.fullscreenElement);

  useEffect(() => {
    const h = () => setIsFs(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", h);
    return () => document.removeEventListener("fullscreenchange", h);
  }, []);

  return (
    <button
      onClick={toggleFullscreen}
      style={{
        position: "fixed",
        bottom: 12,
        left: 12,
        zIndex: 9999,
        width: 32,
        height: 32,
        borderRadius: 8,
        border: "1px solid rgba(255,255,255,0.15)",
        background: "rgba(0,0,0,0.4)",
        color: "white",
        fontSize: 14,
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        opacity: 0.4,
        transition: "opacity 0.2s",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.opacity = 0.8)}
      onMouseLeave={(e) => (e.currentTarget.style.opacity = 0.4)}
      title={isFs ? "Avsluta fullskärm" : "Fullskärm"}
    >
      {isFs ? "⊗" : "⛶"}
    </button>
  );
}
