import { useMemo, useState } from "react";
import { PROJECTS } from "../data";
import {
  ArrowIcon,
  BedIcon,
  FloorsIcon,
  Reveal,
  RulerIcon,
  SectionHead,
  Tilt,
} from "../ui";

const FILTERS = [
  { id: "all", label: "Все проекты" },
  { id: "s", label: "До 100 м²" },
  { id: "m", label: "100–150 м²" },
  { id: "l", label: "150+ м²" },
] as const;

type FilterId = (typeof FILTERS)[number]["id"];

const match = (area: number, f: FilterId) =>
  f === "all" ? true : f === "s" ? area < 100 : f === "m" ? area >= 100 && area <= 150 : area > 150;

export default function Projects() {
  const [filter, setFilter] = useState<FilterId>("all");
  const list = useMemo(() => PROJECTS.filter((p) => match(p.area, filter)), [filter]);

  return (
    <section id="projects" className="relative bg-paper-100 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHead
          tone="light"
          overline="Каталог 2026"
          title={
            <>
              Дома, которые уже <span className="text-honey-500">стоят в лесу</span>
            </>
          }
          note="47 готовых проектов — от компактного А-фрейма до усадьбы 186 м². Любой адаптируем под ваш участок, рельеф и сторону света за 2 недели."
        />

        <Reveal delay={0.1} className="mt-10 flex flex-wrap items-center gap-2.5">
          {FILTERS.map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={`font-display rounded-full border px-5 py-2.5 text-[12px] font-bold uppercase tracking-[0.1em] transition-all duration-300 ${
                filter === f.id
                  ? "border-pine-900 bg-pine-900 text-lime-300 shadow-[0_10px_24px_-10px_rgba(18,41,26,0.6)]"
                  : "border-pine-900/20 bg-transparent text-ink-700 hover:-translate-y-0.5 hover:border-pine-900/60"
              }`}
            >
              {f.label}
            </button>
          ))}
          <span className="ml-auto hidden text-[13px] font-semibold text-ink-500 sm:block">
            Показано: {list.length} из {PROJECTS.length}
          </span>
        </Reveal>

        <div key={filter} className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7">
          {list.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.07}>
              <Tilt className="h-full">
                <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-pine-900/10 bg-paper-50 shadow-[0_10px_30px_-18px_rgba(18,41,26,0.4)] transition-shadow duration-500 hover:shadow-[0_28px_60px_-24px_rgba(18,41,26,0.5)]">
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={p.img}
                      alt={`Проект дома «${p.name}»`}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.07]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-pine-950/55 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                    {p.tag && (
                      <span className="font-display absolute left-4 top-4 rounded-full bg-honey-400 px-3.5 py-1.5 text-[10px] font-extrabold uppercase tracking-[0.16em] text-pine-950">
                        {p.tag}
                      </span>
                    )}
                    <span className="font-display absolute bottom-4 left-4 translate-y-2 rounded-full bg-paper-50/90 px-3.5 py-1.5 text-[10px] font-extrabold uppercase tracking-[0.16em] text-pine-900 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                      {p.tech}
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col p-6">
                    <div className="flex items-baseline justify-between gap-3">
                      <h3 className="font-display text-[22px] font-bold text-pine-950">
                        «{p.name}»
                      </h3>
                      <span className="rounded-full bg-mint-200/70 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.1em] text-pine-800">
                        {p.floors}
                      </span>
                    </div>

                    <ul className="mt-5 grid grid-cols-3 gap-2 border-y border-dashed border-pine-900/15 py-4 text-[13px] font-semibold text-ink-700">
                      <li className="flex items-center gap-2">
                        <RulerIcon className="h-4 w-4 text-moss-600" />
                        {p.area} м²
                      </li>
                      <li className="flex items-center gap-2">
                        <BedIcon className="h-4 w-4 text-moss-600" />
                        {p.bedrooms} спальн.
                      </li>
                      <li className="flex items-center gap-2">
                        <FloorsIcon className="h-4 w-4 text-moss-600" />
                        {p.tech.split(" ")[0]}
                      </li>
                    </ul>

                    <div className="mt-auto flex items-center justify-between pt-5">
                      <p className="font-display text-[17px] font-extrabold text-pine-900">{p.price}</p>
                      <a
                        href="#contact"
                        aria-label={`Запросить проект «${p.name}»`}
                        className="grid h-11 w-11 place-items-center rounded-full border border-pine-900/20 text-pine-900 transition-all duration-300 group-hover:border-honey-500 group-hover:bg-honey-400"
                      >
                        <ArrowIcon className="h-4.5 w-4.5 transition-transform duration-300 group-hover:translate-x-0.5" />
                      </a>
                    </div>
                  </div>
                </article>
              </Tilt>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.15} className="mt-12 flex justify-center">
          <p className="rounded-full border border-pine-900/15 bg-paper-50 px-6 py-3 text-center text-[13px] font-semibold text-ink-700">
            Не нашли своё? Соберём индивидуальный проект за 3 недели —{" "}
            <a href="#contact" className="font-bold text-honey-600 underline decoration-2 underline-offset-4 transition-colors hover:text-pine-900">
              обсудить с архитектором
            </a>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
