import { toggleFullscreen } from "../utils/helpers";

// Avkommentera och byt till din bild:
import welcomeImg from "../assets/bilder/welcome.png";

export default function WelcomeScreen({ onStart }) {
  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Bakgrundsbild – avkommentera style-raden nedan när du har en bild */}
      <div
        className="absolute inset-0"
        style={{
          background: `url(${welcomeImg}) center/cover no-repeat`,
        }}
      />
      <div className="absolute inset-0 bg-black/40" />

      <div className="max-w-md w-full text-center relative z-10">
        <h1
          className="text-5xl mb-4 bg-gradient-to-r from-violet-400 via-cyan-400 to-amber-400 bg-clip-text"
          style={{
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            fontFamily: "'Baloo 2', 'Trebuchet MS', 'Comic Sans MS', cursive",
            fontWeight: 700,
          }}
        >
          Creativity Gym
        </h1>
        <p className="text-gray-400 mb-10 text-lg">
          Tre forskningsbaserade övningar för att trigga din kreativitet
        </p>
        <button
          onClick={() => {
            toggleFullscreen();
            setTimeout(onStart, 300);
          }}
          className="px-10 py-4 rounded-2xl bg-gradient-to-r from-violet-600 via-cyan-600 to-amber-500 font-bold text-lg hover:opacity-90 transition-all active:scale-[0.97]"
        >
          Starta upplevelsen
        </button>
        <button
          onClick={onStart}
          className="block mx-auto mt-4 text-gray-600 text-sm hover:text-gray-400 transition-colors"
        >
          Fortsätt utan fullskärm →
        </button>
      </div>
    </div>
  );
}
