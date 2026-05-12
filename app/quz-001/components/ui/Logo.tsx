// Fundsmart wordmark — uses the official brand image from /public.
// The source asset is dark (navy text + green chart), so on dark
// backgrounds we apply `filter: invert(1)` via the `.logo-img.light`
// class. Pass variant="dark" to render the source colors unchanged
// for light backgrounds.
type Props = { variant?: "light" | "dark"; className?: string };

export default function Logo({ variant = "light", className }: Props) {
  return (
    <a
      href="#"
      onClick={(e) => e.preventDefault()}
      className={`logo-row${className ? ` ${className}` : ""}`}
      aria-label="Fundsmart"
    >
      <img
        src="/fundsmart-logo.webp"
        alt="Fundsmart"
        width={126}
        height={28}
        className={`logo-img ${variant}`}
        decoding="async"
        loading="eager"
      />
    </a>
  );
}
