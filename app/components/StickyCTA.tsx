"use client";

import { useEffect, useState } from "react";
import { stickyCta } from "@/lib/copy";

export default function StickyCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 700);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;
  return (
    <div className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-[var(--color-navy)] border-t border-[var(--color-navy-line)] px-4 py-3 flex items-center gap-3 shadow-[0_-8px_24px_rgba(7,23,43,0.32)]">
      <div className="flex-1 min-w-0">
        <div className="text-[12.5px] font-semibold text-white truncate">
          {stickyCta.bar}
        </div>
      </div>
      <a
        href="#quiz"
        className="btn-primary !py-2.5 !px-4 !text-[13px] shrink-0"
        onClick={(e) => {
          e.preventDefault();
          document.getElementById("quiz")?.scrollIntoView({ behavior: "smooth" });
        }}
      >
        {stickyCta.button}
      </a>
    </div>
  );
}
