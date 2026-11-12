type Props = { size?: number; className?: string; variant?: "color" | "light" };

export function Flower({ size = 48, className, variant = "color" }: Props) {
  const petals = Array.from({ length: 5 }, (_, i) => {
    const a = ((i * 72 - 90) * Math.PI) / 180;
    return { cx: 24 + 9 * Math.cos(a), cy: 24 + 9 * Math.sin(a) };
  });
  const light = variant === "light";
  const colors = light
    ? ["rgba(255,255,255,0.85)", "rgba(255,255,255,0.45)"]
    : ["#F5B8B8", "#C3E1D2"];
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" className={className} aria-hidden="true">
      {petals.map((p, i) => (
        <circle key={i} cx={p.cx} cy={p.cy} r={7} fill={colors[i % 2]} />
      ))}
      <circle cx={24} cy={24} r={6} fill={light ? "#F5B8B8" : "#3F5B6E"} />
    </svg>
  );
}
