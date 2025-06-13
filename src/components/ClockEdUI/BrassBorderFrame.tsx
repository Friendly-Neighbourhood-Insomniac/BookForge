// BrassBorderFrame.tsx
export default function BrassBorderFrame({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="relative p-4"
      style={{
        backgroundImage: `url('src/components/ClockEdUI/UI/brass border.svg')`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "100% 100%",
      }}
    >
      <div className="relative z-10">{children}</div>
    </div>
  );
}
