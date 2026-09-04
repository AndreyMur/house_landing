import { TECHS } from "../data";
import {
  BeamIcon,
  BlockIcon,
  CheckIcon,
  FrameIcon,
  Reveal,
  SectionHead,
  StoneIcon,
} from "../ui";

const ICONS = [FrameIcon, BlockIcon, BeamIcon, StoneIcon];

export default function Technologies() {
  return (
    <section id="tech" className="relative overflow-hidden bg-pine-900 py-24 text-paper-50 lg:py-32">
      <div className="pointer-events-none absolute inset-0">
        <svg
          className="absolute left-[-12%] bottom-[-10%] h-[560px] w-[560px] text-mint-300/[0.06]"
          viewBox="0 0 600 600"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
        >
          {[80, 130, 180, 235, 290].map((r, i) => (
            <ellipse key={i} cx="300" cy="300" rx={r * 1.2} ry={r} transform={`rotate(${14 - i * 5} 300 300)`} />
          ))}
        </svg>
        <div className="absolute right-0 top-0 h-[420px] w-[420px] rounded-full bg-honey-500/10 blur-[130px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHead
          tone="dark"
          overline="Технологии"
          title={
            <>
              Четыре способа жить <span className="text-lime-400">среди сосен</span>
            </>
          }
          note="Работаем только с материалами, у которых есть заводская геометрия и понятный срок службы. Ниже — то, из чего мы строим чаще всего."
        />

        <div className="mt-14 border-t border-paper-50/10">
          {TECHS.map((t, i) => {
            const Icon = ICONS[i];
            return (
              <Reveal key={t.num} delay={i * 0.06}>
                <div className="group grid gap-6 border-b border-paper-50/10 py-9 transition-all duration-500 hover:bg-pine-850/60 hover:pl-4 lg:grid-cols-[90px_64px_1fr_auto] lg:items-start lg:gap-8 lg:py-11">
                  <p className="font-display text-[34px] font-extrabold leading-none text-honey-400/35 transition-colors duration-500 group-hover:text-honey-400 lg:text-[44px]">
                    {t.num}
                  </p>
                  <span className="mt-1 hidden h-12 w-12 place-items-center rounded-full border border-paper-50/15 text-lime-300 transition-all duration-500 group-hover:border-lime-400 group-hover:bg-lime-400 group-hover:text-pine-950 lg:grid">
                    <Icon className="h-6 w-6" />
                  </span>
                  <div>
                    <h3 className="font-display flex items-center gap-3 text-[20px] font-bold md:text-[24px]">
                      <Icon className="h-6 w-6 text-lime-300 lg:hidden" />
                      {t.title}
                    </h3>
                    <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-mint-200/80">
                      {t.desc}
                    </p>
                    <ul className="mt-4 flex flex-wrap gap-2.5">
                      {t.points.map((p) => (
                        <li
                          key={p}
                          className="flex items-center gap-2 rounded-full border border-paper-50/12 bg-pine-950/40 px-3.5 py-1.5 text-[12px] font-semibold text-mint-200/90"
                        >
                          <CheckIcon className="h-3.5 w-3.5 text-lime-400" />
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex shrink-0 flex-row items-center gap-6 lg:flex-col lg:items-end lg:gap-3">
                    <p className="font-display text-[17px] font-extrabold text-honey-300">{t.price}</p>
                    <span className="rounded-full bg-lime-400/15 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-lime-300">
                      срок {t.term}
                    </span>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={0.2} className="mt-10 flex flex-wrap items-center justify-between gap-5 rounded-xl border border-paper-50/10 bg-pine-850/70 px-7 py-6">
          <p className="max-w-2xl text-[15px] leading-relaxed text-mint-200/85">
            <span className="font-bold text-paper-50">Не уверены, что выбрать?</span> Покажем три
            построенных дома каждой технологии вживую — экскурсия по выходным, бесплатно, с инженером.
          </p>
          <a
            href="#contact"
            className="font-display shrink-0 rounded-full bg-lime-400 px-6 py-3.5 text-[12px] font-bold uppercase tracking-[0.12em] text-pine-950 transition-all duration-300 hover:-translate-y-0.5 hover:bg-honey-300"
          >
            Записаться на экскурсию
          </a>
        </Reveal>
      </div>
    </section>
  );
}
