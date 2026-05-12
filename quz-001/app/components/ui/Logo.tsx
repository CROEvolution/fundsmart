// Real Fundsmart wordmark logo. Renders white-on-transparent, so it works
// across navy backgrounds (topbar, footer). For light-background contexts
// the brand would need a dark variant; not used in the current page.
type Props = { height?: number };

export default function Logo({ height = 28 }: Props) {
  return (
    <a
      href="#"
      onClick={(e) => e.preventDefault()}
      className="logo-row"
      aria-label="Fundsmart"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/fundsmart-logo.webp"
        alt="Fundsmart"
        height={height}
        style={{ height, width: "auto", display: "block" }}
      />
    </a>
  );
}
