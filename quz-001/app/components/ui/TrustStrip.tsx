"use client";

import Icon from "./Icon";
import type { icons as LucideIcons } from "lucide-react";

type Item = { icon: keyof typeof LucideIcons; text: string };
type Props = { items: Item[] };

export default function TrustStrip({ items }: Props) {
  return (
    <div className="trust-strip">
      {items.map((t, i) => (
        <span className="ts-item" key={i}>
          <Icon name={t.icon} size="sm" />
          <span>{t.text}</span>
        </span>
      ))}
    </div>
  );
}
