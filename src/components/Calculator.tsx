import { useEffect, useMemo, useRef, useState } from "react";
import { fmt } from "../data";
import { ArrowIcon, prefersReduced, Reveal, SectionHead } from "../ui";

const TECHS = [
  { id: "karkas", label: "Каркас", rate: 34000 },
  { id: "gaz", label: "Газобетон", rate: 46000 },
  { id: "brus", label: "Клеёный брус", rate: 63000 },
  { id: "kamen", label: "Камень + брус", rate: 58000 },
];

const FLOORS = [
  { id: "f1", label: "1 этаж", k: 1 },
  { id: "f15", label: "Мансарда", k: 1.18 },
  { id: "f2", label: "2 этажа", k: 1.3 },
];

const OPTIONS = [
  { id: "terrace", label: "Терраса", value: 450000 },
  { id: "garage", label: "Гараж", value: 850000 },
  { id: "sauna", label: "Баня-сауна", value: 720000 },
];

function useAnimatedNumber(target: number) {
  const [val, setVal] = useState(target);
  const fromRef = useRef(target);
  useEffect(() => {
    if (prefersReduced()) {
      setVal(target);
      fromRef.current = target;
      return;
    }
    let raf = 0;
    const from = fromRef.current;
    const t0 = performance.now();
    const dur = 650;
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / dur);
      const e = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(from + (target - from) * e));
      if (p < 1) raf = requestAnimationFrame(tick);
      else fromRef.current = target;
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      fromRef.current = target;
    };
  }, [target]);
  return val;
}

export default function Calculator() {
  const [area, setArea] = useState(128);
  const [tech, setTech] = useState(TECHS[0]);
  const [floor, setFloor] = useState(FLOORS[0]);
  const [opts, setOpts] = useState<string[]>(["terrace"]);

  const calc = useMemo(() => {
    const base = Math.round(area * tech.rate * floor.k);
    const box = Math.round(base * 0.58);
    const eng = base - box;
    const options = OPTIONS.filter((o) => opts.includes(o.id)).reduce((s, o) => s + o.value, 0);
    const total = base + options;
    return { base, box, eng, options, total };
  }, [area, tech, floor, opts]);

  const shown = useAnimatedNumber(calc.total);
  const fill = ((area - 60) / (240 - 60)) * 100;

  const toggleOpt = (id: string) =>
    setOpts((v) => (v.includes(id) ? v.filter((x) => x !== id) : [...v, id]));

  const bar = (v: number) => `${Math.max(2, Math.round((v / calc.total) * 100))}%`;

  return (
    <section id="calc" className="relative overflow-hidden bg-pine-900 py-24 text-paper-50 lg:py-32">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -right-40 bottom-[-20%] h-[560px] w-[560px] rounded-full bg-honey-500/12 blur-[140px]" />
        <div className="absolute -left-24 top-[-10%] h-[420px] w-[420px] rounded-full bg-moss-600/25 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHead
          tone="dark"
          overline="Калькулятор"
          title={
            <>
              Прикиньте бюджет <span className="text-honey-300">за 20 секунд</span>
            </>
          }
          note="Цены — средние по нашим стройкам за 2025 год. Точность ±7%: фикс-смету зафиксируем после бесплатного выезда инженера."
        />

        <div className="mt-14 grid gap-7 lg:grid-cols-[1.08fr_0.92fr] lg:gap-9">
          {/* панель управления */}
          <Reveal dir="left" className="rounded-xl border border-paper-50/10 bg-pine-850/80 p-7 md:p-9">
            {/* площадь */}
            <div>
              <div className="flex items-end justify-between gap-4">
                <label htmlFor="area" className="text-[12px] font-extrabold uppercase tracking-[0.22em] text-mint-200/70">
                  Площадь дома
                </label>
                <p className="font-display text-[26px] font-extrabold leading-none text-honey-300">
                  {area} м²
                </p>
              </div>
              <input
                id="area"
                type="range"
                min={60}
                max={240}
                step={2}
                value={area}
                onChange={(e) => setArea(Number(e.target.value))}
                className="hvo-range mt-5"
                style={{ ["--fill" as string]: `${fill}%` }}
              />
              <div className="mt-2.5 flex justify-between text-[11px] font-bold text-mint-300/50">
                <span>60 м²</span>
                <span>150 м²</span>
                <span>240 м²</span>
              </div>
            </div>

            {/* технология */}
            <div className="mt-9">
              <p className="text-[12px] font-extrabold uppercase tracking-[0.22em] text-mint-200/70">
                Технология
              </p>
              <div className="mt-4 grid grid-cols-2 gap-2.5">
                {TECHS.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setTech(t)}
                    className={`rounded-lg border px-4 py-3.5 text-left transition-all duration-300 ${
                      tech.id === t.id
                        ? "border-honey-400 bg-honey-400/10 shadow-[0_0_0_1px_var(--color-honey-400)]"
                        : "border-paper-50/12 hover:border-paper-50/35"
                    }`}
                  >
                    <span className={`font-display block text-[13px] font-bold ${tech.id === t.id ? "text-honey-300" : "text-paper-50"}`}>
                      {t.label}
                    </span>
                    <span className="mt-1 block text-[11.5px] font-semibold text-mint-300/60">
                      {(t.rate / 1000).toLocaleString("ru-RU")} тыс ₽/м²
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* этажность */}
            <div className="mt-9">
              <p className="text-[12px] font-extrabold uppercase tracking-[0.22em] text-mint-200/70">
                Этажность
              </p>
              <div className="mt-4 grid grid-cols-3 gap-2.5">
                {FLOORS.map((f) => (
                  <button
                    key={f.id}
                    onClick={() => setFloor(f)}
                    className={`font-display rounded-lg border px-3 py-3.5 text-[12.5px] font-bold uppercase tracking-[0.06em] transition-all duration-300 ${
                      floor.id === f.id
                        ? "border-lime-400 bg-lime-400 text-pine-950 shadow-[0_12px_28px_-12px_rgba(185,224,92,0.7)]"
                        : "border-paper-50/12 text-paper-50 hover:border-paper-50/35"
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>

            {/* опции */}
            <div className="mt-9">
              <p className="text-[12px] font-extrabold uppercase tracking-[0.22em] text-mint-200/70">
                Что добавить
              </p>
              <div className="mt-4 flex flex-wrap gap-2.5">
                {OPTIONS.map((o) => {
                  const on = opts.includes(o.id);
                  return (
                    <button
                      key={o.id}
                      onClick={() => toggleOpt(o.id)}
                      aria-pressed={on}
                      className={`rounded-full border px-5 py-3 text-[13px] font-bold transition-all duration-300 ${
                        on
                          ? "border-honey-400 bg-honey-400 text-pine-950"
                          : "border-paper-50/15 text-mint-200 hover:border-paper-50/40"
                      }`}
                    >
                      {o.label} · +{fmt(o.value / 1000)} тыс ₽
                    </button>
                  );
                })}
              </div>
            </div>
          </Reveal>

          {/* результат */}
          <Reveal dir="right" className="flex flex-col">
            <div className="flex flex-1 flex-col rounded-xl bg-honey-400 p-7 text-pine-950 shadow-[0_40px_90px_-35px_rgba(242,169,59,0.55)] md:p-9">
              <p className="text-[12px] font-extrabold uppercase tracking-[0.22em] text-pine-900/60">
                Предварительная стоимость
              </p>
              <p className="font-display mt-4 text-[clamp(2rem,4.4vw,3.2rem)] font-extrabold leading-none tabular-nums tracking-tight">
                {fmt(shown)} ₽
              </p>
              <p className="mt-3 text-[13.5px] font-semibold text-pine-900/70">
                {tech.label}, {floor.label.toLowerCase()}, {area} м² · под ключ с отделкой
              </p>

              <div className="mt-8 space-y-5">
                {[
                  { label: "Коробка, кровля, окна", v: calc.box, c: "bg-pine-900" },
                  { label: "Инженерия и отделка", v: calc.eng, c: "bg-moss-600" },
                  { label: "Опции (терраса, гараж, баня)", v: calc.options, c: "bg-lime-500" },
                ].map((row) => (
                  <div key={row.label}>
                    <div className="flex items-baseline justify-between gap-3 text-[13px] font-bold">
                      <span>{row.label}</span>
                      <span className="tabular-nums">{fmt(row.v)} ₽</span>
                    </div>
                    <div className="mt-2 h-2 overflow-hidden rounded-full bg-pine-950/15">
                      <div
                        className={`h-full rounded-full ${row.c} transition-[width] duration-700 ease-out`}
                        style={{ width: row.v > 0 ? bar(row.v) : "0%" }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-auto pt-9">
                <a
                  href="#contact"
                  className="group font-display flex w-full items-center justify-center gap-3 rounded-full bg-pine-950 py-4.5 text-[13px] font-bold uppercase tracking-[0.12em] text-lime-300 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_40px_-14px_rgba(11,29,18,0.9)]"
                >
                  Получить точную смету
                  <ArrowIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
                </a>
                <p className="mt-4 text-center text-[12px] font-semibold text-pine-900/55">
                  Выезд инженера и смета — бесплатно, ни к чему не обязывает
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
