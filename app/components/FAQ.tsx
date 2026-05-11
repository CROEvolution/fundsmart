"use client";

import { useState } from "react";
import { faq } from "@/lib/copy";

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="bg-white">
      <div className="max-w-3xl mx-auto px-5 md:px-8 py-20 md:py-28">
        <div className="text-center">
          <div className="text-[12.5px] font-bold uppercase tracking-[0.16em] text-[var(--color-green-dark)]">
            FAQ
          </div>
          <h2 className="mt-3 text-[36px] md:text-[52px] leading-[1.02] font-bold tracking-tight text-[var(--color-navy)]">
            Straight{" "}
            <span className="serif-italic text-[var(--color-green)]">Answers</span>
          </h2>
          <p className="mt-4 text-[15px] md:text-[16px] text-[var(--color-ink-soft)] max-w-2xl mx-auto">
            Six things every owner asks before they apply.
          </p>
        </div>

        <ul className="mt-12 space-y-3">
          {faq.map((f, i) => {
            const isOpen = open === i;
            return (
              <li
                key={f.q}
                className={`card overflow-hidden transition ${
                  isOpen ? "border-[var(--color-green)] shadow-[0_8px_24px_rgba(13,37,64,0.06)]" : ""
                }`}
              >
                <button
                  type="button"
                  className="w-full flex items-start justify-between gap-4 px-5 py-5 text-left cursor-pointer"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                >
                  <span className="text-[16px] font-bold text-[var(--color-navy)]">
                    {f.q}
                  </span>
                  <span
                    className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center bg-[var(--color-mint-soft)] text-[var(--color-green-dark)] font-bold text-[18px] leading-none transition-transform ${
                      isOpen ? "rotate-45" : ""
                    }`}
                    aria-hidden
                  >
                    +
                  </span>
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 -mt-1 text-[14.5px] text-[var(--color-ink-soft)] leading-relaxed fade-in">
                    {f.a}
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
