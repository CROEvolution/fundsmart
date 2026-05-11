"use client";

import type { ReactNode } from "react";

type Props = {
  active?: boolean;
  onClick?: () => void;
  children: ReactNode;
};

// Centered amount chip used in the 6-grid amount picker.
export default function PriceChip({ active = false, onClick, children }: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`chip ${active ? "active" : ""}`}
      style={{ justifyContent: "center", textAlign: "center", padding: "16px 8px", fontSize: 16 }}
    >
      {children}
    </button>
  );
}
