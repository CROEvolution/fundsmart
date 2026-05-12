"use client";

import Logo from "./ui/Logo";
import Icon from "./ui/Icon";

export default function TopBar() {
  return (
    <div className="topbar" data-screen-label="Topbar">
      <div className="container topbar-inner">
        <Logo />
        <a href="tel:02038870420" className="topbar-meta-info">
          <Icon name="Phone" size="sm" />
          <span className="num">0203 887 0420</span>
        </a>
      </div>
    </div>
  );
}
