type Props = { value: number; size?: number; stroke?: number };

export default function ScoreRing({ value, size = 200, stroke = 16 }: Props) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const dash = (value / 100) * c;
  return (
    <div className="score-ring" style={{ width: size, height: size }}>
      <svg width={size} height={size}>
        <defs>
          <linearGradient id="ringg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#33CB76" />
            <stop offset="100%" stopColor="#149148" />
          </linearGradient>
        </defs>
        <circle cx={size / 2} cy={size / 2} r={r} stroke="#EEF2F7" strokeWidth={stroke} fill="none" />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke="url(#ringg)"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={`${dash} ${c}`}
          fill="none"
          style={{ transition: "stroke-dasharray 900ms cubic-bezier(.2,.7,.2,1)" }}
        />
      </svg>
      <div className="label">
        <span className="num-big num">{value}</span>
        <span className="num-small">out of 100</span>
      </div>
    </div>
  );
}
