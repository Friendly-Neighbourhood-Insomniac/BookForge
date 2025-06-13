// Divider.tsx
import Image from "next/image";

export default function Divider() {
  return (
    <div className="w-full flex justify-center my-8">
      <Image
        src="src/components/ClockEdUI/UI/divider.png"
        alt="Ornamental Divider"
        width={800}
        height={100}
        className="object-contain"
      />
    </div>
  );
}
