export function AreaChart({ data }: { data: number[] }) {
  const width = 520;
  const height = 180;
  const pad = 8;
  const max = Math.max(...data, 1);
  const min = Math.min(...data);
  const range = max - min || 1;
  const step = (width - pad * 2) / (data.length - 1);

  const points = data.map((v, i) => {
    const x = pad + i * step;
    const y = height - pad - ((v - min) / range) * (height - pad * 2);
    return [x, y] as const;
  });

  const line = points
    .map((p, i) => `${i === 0 ? "M" : "L"} ${p[0].toFixed(1)} ${p[1].toFixed(1)}`)
    .join(" ");
  const area = `${line} L ${points[points.length - 1][0].toFixed(1)} ${height - pad} L ${pad} ${height - pad} Z`;

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="h-44 w-full">
      <defs>
        <linearGradient id="areaFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8b5e2b" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#8b5e2b" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill="url(#areaFill)" />
      <path d={line} fill="none" stroke="#8b5e2b" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      {points.map((p, i) => (
        <circle key={i} cx={p[0]} cy={p[1]} r="3" fill="#fff" stroke="#8b5e2b" strokeWidth="2" />
      ))}
    </svg>
  );
}

const donutColors = ["#8b5e2b", "#d2a05f", "#22c55e", "#a86f3d", "#cfa76b", "#9ca3af"];

export function Donut({
  data,
}: {
  data: Array<{ label: string; value: number }>;
}) {
  const total = data.reduce((s, d) => s + d.value, 0) || 1;
  const radius = 60;
  const circ = 2 * Math.PI * radius;
  let offset = 0;

  return (
    <div className="flex items-center gap-6">
      <svg viewBox="0 0 160 160" className="h-40 w-40 -rotate-90">
        {data.map((d, i) => {
          const fraction = d.value / total;
          const dash = fraction * circ;
          const seg = (
            <circle
              key={i}
              cx="80"
              cy="80"
              r={radius}
              fill="none"
              stroke={donutColors[i % donutColors.length]}
              strokeWidth="22"
              strokeDasharray={`${dash} ${circ - dash}`}
              strokeDashoffset={-offset}
            />
          );
          offset += dash;
          return seg;
        })}
      </svg>
      <ul className="space-y-2 text-sm">
        {data.map((d, i) => (
          <li key={d.label} className="flex items-center gap-2 text-muted">
            <span
              className="h-2.5 w-2.5 rounded-full"
              style={{ background: donutColors[i % donutColors.length] }}
            />
            <span className="text-ink">{d.label}</span>
            <span className="ml-auto font-medium">
              {Math.round((d.value / total) * 100)}%
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
