import type { CSSProperties } from "react";

type Props = { style?: CSSProperties };

export default function HairDivider({ style }: Props) {
  return <div className="hair" style={style} />;
}
