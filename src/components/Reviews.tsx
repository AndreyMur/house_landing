import { useRef, useState } from "react";
import { FAQ, REVIEWS } from "../data";
import {
  ArrowIcon,
  PlusIcon,
  QuoteIcon,
  Reveal,
  SectionHead,
  StarIcon,
} from "../ui";

export default function Reviews() {
  const rail = useRef<HTMLDivElement>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const scrollBy = (dir: number) =>
    rail.current?.scrollBy({ left: dir * 440, behavior: "smooth" });

  return (
    <section id="reviews" className="relative bg-paper-100 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHead
            tone="light"
            overline="Отзывы"
            title={
              <>
                Что говорят те, кто уже <span className="text-honey-500">переехал</span>
              </>
            }
          />
          <Reveal delay={0.15} className="flex gap-3">
            <button
              onClick={() => scrollBy(-1)}
              aria-label="Назад"
              className="grid h-12 w-12 place-items-center rounded-full border border-pine-900/20 text-pine-900 transition-all duration-300 hover:-translate-y-0.5 hover:border-pine-900 hover:bg-pine-900 hover:text-lime-300"
            >
              <ArrowIcon className="h-5 w-5 rotate-180" />
            </button>
            <button
              onClick={() => scrollBy(1)}
              aria-label="Вперёд"
              className="grid h-12 w-12 place-items-center rounded-full border border-pine-900/20 text-pine-900 transition-all duration-300 hover:-translate-y-0.5 hover:border-pine-900 hover:bg-pine-900 hover:text-lime-300"
            >
              <ArrowIcon className="h-5 w-5" />
            </button>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="mt-12">
          <div ref={rail} className="rail -mx-5 flex snap-x snap-mandatory gap-6 overflow-x-auto px-5 pb-5 lg:-mx-8 lg:px-8">
            {REVIEWS.map((r, i) => (
              <article
                key={i}
                className="group flex w-[320px] shrink-0 snap-start flex-col rounded-xl border border-pine-900/10 bg-paper-50 p-7 shadow-[0_14px_36px_-22px_rgba(18,41,26,0.45)] transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_28px_60px_-26px_rgba(18,41,26,0.55)] sm:w-[400px]"
              >
                <div className="flex items-center justify-between">
                  <QuoteIcon className="h-8 w-8 text-lime-500" />
                  <div className="flex gap-1 text-honey-400">
                    {Array.from({ length: r.rating }).map((_, k) => (
                      <StarIcon key={k} className="h-4 w-4" />
                    ))}
                  </div>
                </div>
                <p className="mt-5 flex-1 text-[14.5px] leading-relaxed text-ink-700">«{r.text}»</p>
                <div className="mt-6 border-t border-dashed border-pine-900/15 pt-5">
                  <p className="font-display text-[15px] font-bold text-pine-950">{r.name}</p>
                  <p className="mt-1 text-[12.5px] font-semibold text-ink-500">{r.place}</p>
                  <span className="mt-3 inline-block rounded-full bg-mint-200/70 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.1em] text-pine-800">
                    {r.project}
                  </span>
                </div>
              </article>
            ))}

            {/* карточка-рейтинг */}
            <article className="flex w-[320px] shrink-0 snap-start flex-col items-start justify-center rounded-xl bg-pine-900 p-7 text-paper-50 sm:w-[400px]">
              <p className="font-display text-[52px] font-extrabold leading-none text-lime-400">4,9</p>
              <div className="mt-3 flex gap-1 text-honey-300">
                {Array.from({ length: 5 }).map((_, k) => (
                  <StarIcon key={k} className="h-5 w-5" />
                ))}
              </div>
              <p className="mt-4 text-[14px] leading-relaxed text-mint-200/85">
                средняя оценка на Яндекс.Картах и Отзовике — 214 отзывов за три года. Все адреса
                построенных домов даём посетить вживую.
              </p>
            </article>
          </div>
        </Reveal>

        {/* FAQ */}
        <div className="mt-24 grid gap-12 lg:mt-28 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionHead
              tone="light"
              overline="Вопрос — ответ"
              title={
                <>
                  Спрашивают <br />
                  <span className="text-honey-500">до договора</span>
                </>
              }
            />
            <Reveal delay={0.12} className="mt-6">
              <p className="max-w-sm text-[15px] leading-relaxed text-ink-500">
                Не нашли ответа? Позвоните — инженер на линии, а не менеджер по скрипту:
              </p>
              <a
                href="tel:+74951203840"
                className="font-display mt-4 inline-block text-[20px] font-extrabold text-pine-900 underline decoration-honey-400 decoration-[3px] underline-offset-8 transition-colors hover:text-honey-600"
              >
                +7 495 120-38-40
              </a>
            </Reveal>
          </div>

          <div>
            {FAQ.map((f, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <div
                  className={`border-b border-pine-900/12 transition-colors duration-300 ${
                    openFaq === i ? "bg-paper-50" : ""
                  }`}
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="flex w-full items-center justify-between gap-5 px-1 py-6 text-left"
                    aria-expanded={openFaq === i}
                  >
                    <span className="font-display text-[16px] font-bold leading-snug text-pine-950 md:text-[18px]">
                      {f.q}
                    </span>
                    <span
                      className={`grid h-10 w-10 shrink-0 place-items-center rounded-full border transition-all duration-400 ${
                        openFaq === i
                          ? "rotate-45 border-honey-500 bg-honey-400 text-pine-950"
                          : "border-pine-900/20 text-pine-900"
                      }`}
                    >
                      <PlusIcon className="h-4.5 w-4.5" />
                    </span>
                  </button>
                  <div className={`acc-panel ${openFaq === i ? "open" : ""}`}>
                    <div>
                      <p className="max-w-2xl px-1 pb-7 text-[14.5px] leading-relaxed text-ink-500">
                        {f.a}
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
