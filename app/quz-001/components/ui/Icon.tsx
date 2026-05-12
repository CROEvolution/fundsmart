"use client";

import { icons, LucideProps } from "lucide-react";

type Size = "sm" | "md" | "lg";
type Props = {
  name: keyof typeof icons;
  size?: Size;
  strokeWidth?: number;
  className?: string;
} & Omit<LucideProps, "ref">;

const sizeClass: Record<Size, string> = {
  sm: "ico",
  md: "ico-20",
  lg: "ico-24",
};

// Thin wrapper around lucide-react. The lucide icon is rendered inside a span
// that carries the size class so CSS spacing rules (.row gap, .stack gap)
// align with text baselines.
export default function Icon({
  name,
  size = "md",
  strokeWidth = 1.75,
  className,
  ...rest
}: Props) {
  const Lucide = icons[name];
  if (!Lucide) return null;
  return (
    <span
      className={[sizeClass[size], className].filter(Boolean).join(" ")}
      style={{ display: "inline-flex", alignItems: "center", justifyContent: "center" }}
    >
      <Lucide strokeWidth={strokeWidth} {...rest} />
    </span>
  );
}
