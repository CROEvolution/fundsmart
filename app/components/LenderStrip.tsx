import { lenderStrip } from "@/lib/copy";

export default function LenderStrip() {
  return (
    <section className="bg-white border-b border-[var(--color-line)]">
      <div className="max-w-6xl mx-auto px-5 md:px-8 py-12 md:py-14">
        <div className="text-center">
          <div className="text-[12px] font-bold uppercase tracking-[0.16em] text-[var(--color-stone)]">
            Trusted by top UK FCA-regulated lenders
          </div>
        </div>
        <div className="mt-7 flex flex-wrap items-center justify-center gap-x-10 md:gap-x-14 gap-y-4">
          {lenderStrip.names.map((n) => (
            <div
              key={n}
              className="text-[16px] md:text-[17px] font-bold tracking-tight text-[var(--color-stone)]/60 hover:text-[var(--color-stone)] transition"
            >
              {n}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
