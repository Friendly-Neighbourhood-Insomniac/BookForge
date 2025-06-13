// Logo.tsx
import Image from "next/image";

export default function Logo() {
  return (
    <Image
      src="src/components/ClockEdUI/UI/ClockEd-In-BookForge-Logo.jpg"
      alt="ClockEd-In BookForge Logo"
      width={300}
      height={120}
      priority
    />
  );
}
