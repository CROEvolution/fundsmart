import { mechanism } from "@/lib/copy";

export default function Mechanism() {
  return (
    <section className="relative overflow-hidden bg-[var(--color-navy)]">
      <div
        aria-hidden
        className="absolute inset-0 -z-10 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 75% 30%, rgba(34, 197, 94, 0.14) 0%, transparent 60%), radial-gradient(ellipse 50% 40% at 20% 80%, rgba(34, 197, 94, 0.08) 0%, transparent 70%)",
        }}
      />
      <div className="max-w-5xl mx-auto px-5 md:px-8 py-20 md:py-28">
        <div className="text-center">
          <div className="text-[12.5px] font-bold uppercase tracking-[0.16em] text-[var(--color-green)]">
            The Fundsmart Difference
          </div>
          <h2 className="mt-3 text-[36px] md:text-[52px] leading-[1.02] font-bold tracking-tight text-white">
            Why One Beats{" "}
            <span className="serif-italic text-[var(--color-green)]">Twelve</span>
          </h2>
          <p className="mt-4 text-[15px] md:text-[16px] text-white/70 max-w-2xl mx-auto">
            Applying to twelve lenders is what tanks your credit file. We pick one,
            soft-search once, and stop there.
          </p>
        </div>

        <div className="mt-14 grid md:grid-cols-3 gap-5 md:gap-6">
          {mechanism.bullets.map((b, i) => (
            <div
              key={b.title}
              className="rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur p-6 md:p-7"
            >
              <div className="text-[var(--color-green)] font-bold text-[13px] tracking-wide">
                0{i + 1}
              </div>
              <h3 className="mt-2 text-[17px] md:text-[19px] font-bold leading-snug text-white">
                {b.title}
              </h3>
              <p className="mt-3 text-[14px] text-white/65 leading-relaxed">
                {b.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
