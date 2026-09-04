import { IMG, STEPS } from "../data";
import {
  ArrowIcon,
  CompassIcon,
  DocIcon,
  FoundationIcon,
  KeyIcon,
  Reveal,
  SectionHead,
  WrenchIcon,
} from "../ui";

const STEP_ICONS = [CompassIcon, DocIcon, FoundationIcon, WrenchIcon, KeyIcon];

export default function Process() {
  return (
    <section id="process" className="relative bg-paper-50 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="grid gap-14 lg:grid-cols-[0.92fr_1.08fr] lg:gap-20">
          {/* sticky колонка */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionHead
              tone="light"
              overline="Как мы строим"
              title={
                <>
                  Пять этапов — <br />
                  и <span className="text-honey-500">ни одного</span> сюрприза в смете
                </>
              }
            />
            <Reveal delay={0.14} className="mt-6 max-w-md">
              <p className="text-[15px] leading-relaxed text-ink-500">
                Каждый этап закрывается актом с фотофиксацией. Деньги по договору идут траншами —
                следующий платеж только после подписанного акта. Так было 340 раз, так будет и у вас.
              </p>
            </Reveal>

            <Reveal delay={0.2} className="mt-9">
              <div className="group relative overflow-hidden rounded-xl shadow-[0_30px_70px_-30px_rgba(18,41,26,0.55)]">
                <div className="h-64 overflow-hidden sm:h-72">
                  <img
                    src={IMG.aframe}
                    alt="А-фрейм «Сойка» в утреннем тумане"
                    loading="lazy"
                    className="kb h-full w-full object-cover"
                  />
                </div>
                <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-pine-950/70 px-5 py-4 backdrop-blur-sm">
                  <p className="text-[12px] font-bold uppercase tracking-[0.16em] text-mint-200">
                    «Сойка» · 74-й день стройки
                  </p>
                  <ArrowIcon className="h-4 w-4 -rotate-45 text-honey-300 transition-transform duration-300 group-hover:rotate-0" />
                </div>
              </div>
            </Reveal>
          </div>

          {/* шаги */}
          <ol className="relative">
            <span className="absolute bottom-6 left-[23px] top-6 w-[2px] bg-gradient-to-b from-honey-400 via-moss-500/50 to-mint-300/30 lg:left-[27px]" />
            {STEPS.map((s, i) => {
              const Icon = STEP_ICONS[i];
              return (
                <Reveal as="li" key={s.num} delay={i * 0.05} className="relative">
                  <div className="group flex gap-6 pb-12 pl-0 last:pb-0 lg:gap-8">
                    <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-honey-400 bg-paper-50 text-pine-900 shadow-[0_8px_20px_-8px_rgba(232,145,45,0.6)] transition-transform duration-300 group-hover:scale-110 lg:h-14 lg:w-14">
                      <Icon className="h-5.5 w-5.5 lg:h-6 lg:w-6" />
                    </div>
                    <div className="pt-0.5">
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="font-display text-[13px] font-extrabold tracking-[0.2em] text-honey-600">
                          ЭТАП {s.num}
                        </span>
                        <span className="rounded-full bg-mint-200/70 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.1em] text-pine-800">
                          {s.term}
                        </span>
                      </div>
                      <h3 className="font-display mt-2.5 text-[20px] font-bold text-pine-950 md:text-[23px]">
                        {s.title}
                      </h3>
                      <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-ink-500">{s.text}</p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
