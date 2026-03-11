import { useState, useEffect } from "react";
import { BG_IMAGES } from "../data/bgImages";

export default function ImagePicker({ onSelect }) {
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
    <div className="min-h-screen bg-gray-950 text-white flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-5xl text-center" style={slowFade}>
        <h2 className="text-3xl font-bold mb-2">Välj din stämning</h2>
        <p className="text-gray-400 mb-6">
          Vilken bakgrund inspirerar dig mest idag?
        </p>
        <div
          className="grid grid-cols-2 gap-3"
          style={{ height: "calc(100vh - 160px)" }}
        >
          {BG_IMAGES.map((img) => (
            <button
              key={img.id}
              onClick={() => onSelect(img)}
              className="relative rounded-2xl overflow-hidden border-2 border-white/10 hover:border-white/40 transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] group"
            >
              <div
                className="absolute inset-0"
                style={{ background: img.thumb }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
