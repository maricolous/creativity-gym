export default function BgLayer({ image, opacity = 0.5 }) {
  if (!image) return null;
  return (
    <>
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
          background: image.gradient,
        }}
      />
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 1,
          background: `rgba(0,0,0,${opacity})`,
        }}
      />
    </>
  );
}
