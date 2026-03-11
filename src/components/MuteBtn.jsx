export default function MuteBtn({ muted, onToggle }) {
  return (
    <button
      onClick={onToggle}
      style={{
        position: "fixed",
        bottom: 12,
        left: 52,
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
      title={muted ? "Slå på ljud" : "Stäng av ljud"}
    >
      {muted ? "🔇" : "🔊"}
    </button>
  );
}
