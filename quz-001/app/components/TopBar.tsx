"use client";

import Logo from "./ui/Logo";
import Icon from "./ui/Icon";
import Button from "./ui/Button";

type Props = { onStart: () => void };

export default function TopBar({ onStart }: Props) {
  return (
    <div className="topbar" data-screen-label="Topbar">
      <div className="container topbar-inner">
        <Logo />
        <div className="topbar-meta">
          <span className="row gap-2 small muted" style={{ display: "inline-flex" }}>
            <Icon name="ShieldCheck" size="sm" />
            <span>FCA-regulated · 100+ lenders</span>
          </span>
          <span className="row gap-2 small muted" style={{ display: "inline-flex" }}>
            <Icon name="Phone" size="sm" />
            <span className="num">0203 887 0420</span>
          </span>
          <Button variant="primary" size="lg" onClick={onStart} style={{ padding: "12px 22px" }}>
            Get Started <Icon name="ArrowRight" size="sm" />
          </Button>
        </div>
      </div>
    </div>
  );
}
