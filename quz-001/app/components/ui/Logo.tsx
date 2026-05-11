// Fundsmart bar-chart mark + wordmark. Pass `dark` for light backgrounds.
type Props = { dark?: boolean };

export default function Logo({ dark = false }: Props) {
  return (
    <a
      href="#"
      onClick={(e) => e.preventDefault()}
      className="logo-row"
      aria-label="Fundsmart"
    >
      <span className="logo-mark" aria-hidden="true">
        <span className="bar b1" />
        <span className="bar b2" />
        <span className="bar b3" />
        <span className="arrow">
          <svg
            viewBox="0 0 14 14"
            fill="none"
            stroke="#28C76F"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M2 12 L12 2" />
            <path d="M6 2 L12 2 L12 8" />
          </svg>
        </span>
      </span>
      <span className={`logo-wordmark${dark ? " dark" : ""}`}>Fundsmart</span>
    </a>
  );
}
