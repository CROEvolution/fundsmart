import type { ReactNode, CSSProperties } from "react";

type Variant = "default" | "emerald" | "blue" | "amber" | "on-dark";
type Props = {
  variant?: Variant;
  dot?: boolean;
  children: ReactNode;
  style?: CSSProperties;
};

const variantClass: Record<Variant, string> = {
  default: "",
  emerald: "emerald",
  blue: "blue",
  amber: "amber",
  "on-dark": "on-dark",
};

export default function Badge({
  variant = "default",
  dot = false,
  children,
  style,
}: Props) {
  const cls = ["badge", variantClass[variant], dot ? "dot" : ""]
    .filter(Boolean)
    .join(" ");
  return (
    <span className={cls} style={style}>
      {children}
    </span>
  );
}
