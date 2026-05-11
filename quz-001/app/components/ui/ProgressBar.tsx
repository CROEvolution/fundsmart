type Props = { value: number; label?: string };

export default function ProgressBar({ value, label }: Props) {
  return (
    <div className="stack gap-2" style={{ width: "100%" }}>
      {label && (
        <div className="between">
          <span className="tiny" style={{ fontWeight: 600, color: "var(--muted)" }}>
            {label}
          </span>
          <span
            className="tiny num"
            style={{ fontWeight: 700, color: "var(--green-700)" }}
          >
            {Math.round(value)}%
          </span>
        </div>
      )}
      <div className="progress" role="progressbar" aria-valuenow={value}>
        <span style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}
