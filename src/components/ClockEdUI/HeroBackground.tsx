// HeroBackground.tsx
export default function HeroBackground() {
  return (
    <video
      autoPlay
      muted
      loop
      playsInline
      className="absolute inset-0 w-full h-full object-cover z-0"
    >
      <source src="src/components/ClockEdUI/UI/Hero background.webm" type="video/webm" />
    </video>
  );
}
