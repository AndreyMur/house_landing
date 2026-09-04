import { useState } from "react";
import Scene3D from "./Scene3D";
import { STATS, TICKER_ITEMS } from "../data";
import {
  ArrowIcon,
  Counter,
  LeafIcon,
  Marquee,
  MoonIcon,
  SunIcon,
} from "../ui";

export default function Hero() {
  const [night, setNight] = useState(false);

  return (
    <section id="top" className="relative overflow-hidden bg-pine-900 text-paper-50">
      {/* фоновые слои */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-40 -top-40 h-[560px] w-[560px] rounded-full bg-moss-600/25 blur-[130px]" />
        <div className="absolute -right-32 top-1/3 h-[480px] w-[480px] rounded-full bg-lime-500/12 blur-[120px]" />
        {/* горизонтали рельефа */}
        <svg
          className="absolute right-[-8%] top-[-6%] h-[620px] w-[620px] text-mint-300/[0.07]"
          viewBox="0 0 600 600"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
        >
          {[70, 110, 150, 195, 240, 290].map((r, i) => (
            <ellipse
              key={i}
              cx="300"
              cy="300"
              rx={r * 1.25}
              ry={r}
              transform={`rotate(${-16 + i * 4} 300 300)`}
            />
          ))}
        </svg>
        <span className="leaf-drift absolute left-[12%] top-[24%]" style={{ ["--d" as string]: "0s" }}>
          <LeafIcon className="h-7 w-7 text-lime-400/40" />
        </span>
        <span className="leaf-drift absolute right-[38%] top-[16%]" style={{ ["--d" as string]: "-4s" }}>
          <LeafIcon className="h-5 w-5 text-mint-300/35" />
        </span>
        <span className="leaf-drift absolute bottom-[18%] left-[30%]" style={{ ["--d" as string]: "-8s" }}>
          <LeafIcon className="h-6 w-6 text-honey-400/35" />
        </span>
      </div>

      <div className="relative mx-auto max-w-7xl px-5 pb-16 pt-32 lg:px-8 lg:pt-36">
        <div className="grid items-center gap-14 lg:grid-cols-[1.04fr_0.96fr] lg:gap-10">
          {/* левая колонка */}
          <div>
            <div className="mask-line" style={{ ["--d" as string]: "0.05s" }}>
              <span>
                <p className="inline-flex items-center gap-3 rounded-full border border-paper-50/15 bg-pine-850/70 px-4 py-2 text-[11px] font-extrabold uppercase tracking-[0.28em] text-mint-200">
                  <span className="pulse-dot relative inline-block h-2 w-2 rounded-full bg-lime-400 text-lime-400" />
                  Строим за городом с 2009 года
                </p>
              </span>
            </div>

            <h1 className="font-display mt-7 text-[clamp(2.35rem,5.6vw,4.3rem)] font-extrabold leading-[1.04] tracking-tight">
              <span className="mask-line" style={{ ["--d" as string]: "0.15s" }}>
                <span>Дом, в котором</span>
              </span>
              <span className="mask-line" style={{ ["--d" as string]: "0.28s" }}>
                <span>
                  слышно, как <em className="not-italic text-lime-400">шумит лес</em>
                </span>
              </span>
            </h1>

            <div className="mask-line mt-7 max-w-xl" style={{ ["--d" as string]: "0.4s" }}>
              <span>
                <p className="text-[16px] leading-relaxed text-mint-200/85 md:text-[17px]">
                  Проектируем и строим загородные дома из клеёного бруса, газобетона и каркаса —
                  с фикс-сметой, еженедельными фотоотчётами и гарантией 10 лет. Участок с соснами
                  не обязателен, но очень желателен.
                </p>
              </span>
            </div>

            <div className="mask-line mt-9" style={{ ["--d" as string]: "0.52s" }}>
              <span className="flex flex-wrap items-center gap-4" style={{ display: "flex" }}>
                <a
                  href="#projects"
                  className="group font-display inline-flex items-center gap-3 rounded-full bg-honey-400 px-7 py-4 text-[13px] font-bold uppercase tracking-[0.12em] text-pine-950 transition-all duration-300 hover:-translate-y-1 hover:bg-honey-300 hover:shadow-[0_16px_40px_-10px_rgba(242,169,59,0.65)]"
                >
                  Смотреть проекты
                  <ArrowIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
                </a>
                <a
                  href="#calc"
                  className="font-display inline-flex items-center gap-3 rounded-full border border-paper-50/25 px-7 py-4 text-[13px] font-bold uppercase tracking-[0.12em] text-paper-50 transition-all duration-300 hover:border-lime-400 hover:text-lime-300"
                >
                  Рассчитать смету
                </a>
              </span>
            </div>

            <div className="mask-line mt-12" style={{ ["--d" as string]: "0.62s" }}>
              <span>
                <dl className="grid max-w-xl grid-cols-3 divide-x divide-paper-50/10">
                  {STATS.map((s, i) => (
                    <div key={i} className={i === 0 ? "pr-5" : "px-5"}>
                      <dt className="sr-only">{s.label}</dt>
                      <dd className="font-display text-[clamp(1.5rem,2.6vw,2.1rem)] font-extrabold text-honey-300">
                        <Counter to={s.value} suffix={s.suffix} />
                      </dd>
                      <dd className="mt-1.5 text-[12px] leading-snug text-mint-200/70">{s.label}</dd>
                    </div>
                  ))}
                </dl>
              </span>
            </div>
          </div>

          {/* 3D сцена */}
          <div className="mask-line" style={{ ["--d" as string]: "0.3s" }}>
            <span>
              <div className="relative">
                <div className="relative h-[400px] overflow-hidden rounded-[26px] border border-paper-50/12 shadow-[0_40px_90px_-30px_rgba(6,20,12,0.9)] sm:h-[500px] lg:h-[540px]">
                  <Scene3D night={night} />

                  {/* верхние чипы */}
                  <div className="pointer-events-none absolute left-4 top-4 flex items-center gap-2">
                    <span className="rounded-full bg-pine-950/65 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.18em] text-paper-50 backdrop-blur-sm">
                      Дом «Сойка» · 72 м²
                    </span>
                  </div>
                  <button
                    onClick={() => setNight(!night)}
                    aria-label="Переключить день и ночь"
                    className="group absolute right-4 top-4 flex h-12 w-12 items-center justify-center rounded-full border border-paper-50/25 bg-pine-950/60 text-honey-300 backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:border-honey-400"
                  >
                    {night ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
                  </button>

                  {/* подсказка и бейдж */}
                  <div className="pointer-events-none absolute bottom-4 left-4 right-4 flex items-end justify-between gap-3">
                    <div className="floaty rounded-xl bg-honey-400 px-4 py-3 text-pine-950 shadow-lg">
                      <p className="font-display text-[15px] font-extrabold leading-none">от 3,9 млн ₽</p>
                      <p className="mt-1.5 text-[11px] font-bold uppercase tracking-[0.14em] opacity-80">
                        под ключ за 3,5 мес
                      </p>
                    </div>
                    <p className="hidden rounded-full bg-pine-950/65 px-4 py-2 text-[11px] font-semibold text-mint-200/90 backdrop-blur-sm sm:block">
                      Потяните — дом можно рассмотреть со всех сторон
                    </p>
                  </div>
                </div>

                {/* подпись под сценой */}
                <p className="mt-4 flex items-center justify-between text-[12px] text-mint-300/60">
                  <span>Интерактивная 3D-модель · {night ? "вечер на участке" : "полдень на участке"}</span>
                  <span className="flex items-center gap-1.5">
                    <LeafIcon className="h-3.5 w-3.5 text-lime-400" />
                    рендер в реальном времени
                  </span>
                </p>
              </div>
            </span>
          </div>
        </div>
      </div>

      {/* бегущая строка */}
      <Marquee
        items={TICKER_ITEMS}
        speed={32}
        className="relative border-y-2 border-pine-950 bg-lime-400 py-3.5 text-pine-950"
      />
    </section>
  );
}
