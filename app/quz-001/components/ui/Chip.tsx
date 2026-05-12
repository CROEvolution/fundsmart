"use client";

import type { ReactNode } from "react";

type Props = {
  active?: boolean;
  onClick?: () => void;
  children: ReactNode;
  sublabel?: ReactNode;
  leftIcon?: ReactNode;
  dot?: boolean;
};

export default function Chip({
  active = false,
  onClick,
  children,
  sublabel,
  leftIcon,
  dot = true,
}: Props) {
  return (
    <button
      type="button"
      className={`chip ${active ? "active" : ""}`}
      onClick={onClick}
      aria-checked={active}
    >
      {dot && <span className="dot" aria-hidden="true" />}
      {leftIcon}
      <span className="stack" style={{ gap: 2, flex: 1 }}>
        <span>{children}</span>
        {sublabel && (
          <span className="tiny muted" style={{ fontWeight: 500 }}>
            {sublabel}
          </span>
        )}
      </span>
    </button>
  );
}
