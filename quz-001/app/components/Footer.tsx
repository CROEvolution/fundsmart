"use client";

import Logo from "./ui/Logo";

export default function Footer() {
  return (
    <footer data-screen-label="Footer">
      <div className="container">
        <div className="row between" style={{ marginBottom: 24 }}>
          <Logo />
          <div className="row gap-3 small muted">
            <span>FCA-regulated brokerage</span>
            <span>·</span>
            <span>Reg. England &amp; Wales</span>
          </div>
        </div>
        <hr className="hair" />
        <p className="small muted" style={{ marginTop: 16, maxWidth: "78ch" }}>
          Fundsmart AI is an independent UK credit broker, not a lender. We connect SMEs with
          FCA-regulated lenders. A soft credit search has no impact on your credit score. Indicative
          offers are not binding; the matched lender confirms final terms. We do not sell or share
          your data with third-party marketers. © 2026 Fundsmart AI Ltd.
        </p>
      </div>
    </footer>
  );
}
