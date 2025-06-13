// GlowButton.tsx
import Image from "next/image";

export default function GlowButton({ onClick }: { onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className="w-[120px] h-[120px] bg-transparent relative"
    >
      <Image
        src="src/components/ClockEdUI/UI/Round_Button.png"
        alt="Glowing Round Button"
        fill
        className="object-contain"
      />
    </button>
  );
}
