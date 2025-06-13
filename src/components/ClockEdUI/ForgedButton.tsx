// ForgedButton.tsx
import Image from "next/image";

export default function ForgedButton({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <button onClick={onClick} className="relative w-[320px] h-[80px]">
      <Image
        src="src/components/ClockEdUI/UI/Big_Button.png"
        alt="Forged Button"
        fill
        className="object-contain"
      />
      <span className="absolute inset-0 flex items-center justify-center text-white font-bold z-10">
        {children}
      </span>
    </button>
  );
}
