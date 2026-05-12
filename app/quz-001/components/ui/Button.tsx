"use client";

import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "default" | "primary" | "secondary-dark" | "ghost";
type Size = "default" | "lg" | "xl";

type Props = {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const variantClass: Record<Variant, string> = {
  default: "",
  primary: "primary",
  "secondary-dark": "secondary-dark",
  ghost: "ghost",
};

const sizeClass: Record<Size, string> = {
  default: "",
  lg: "lg",
  xl: "xl",
};

export default function Button({
  variant = "default",
  size = "default",
  className,
  children,
  ...rest
}: Props) {
  const cls = ["btn", variantClass[variant], sizeClass[size], className]
    .filter(Boolean)
    .join(" ");
  return (
    <button {...rest} className={cls}>
      {children}
    </button>
  );
}
