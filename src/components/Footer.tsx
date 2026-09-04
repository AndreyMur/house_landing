import React, { useState } from "react";
import {
  ArrowIcon,
  CheckIcon,
  LeafIcon,
  PhoneIcon,
  PineLogo,
  Reveal,
  TreeMini,
} from "../ui";

export default function Footer() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "done">("idle");
  const [err, setErr] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim().length < 2 || phone.replace(/\D/g, "").length < 10) {
      setErr("Подскажите имя и телефон — иначе инженер не сможет перезвонить.");
      return;
    }
    setErr("");
    setState("sending");
    window.setTimeout(() => setState("done"), 900);
  };

  return (
    <>
      {/* CTA */}
      <section id="contact" className="relative overflow-hidden bg-honey-400 py-24 text-pine-950 lg:py-28">
        <div className="pointer-events-none absolute inset-0 text-pine-900 opacity-[0.12]">
          <TreeMini className="absolute left-[4%] top-[18%] h-16 w-16" />
          <TreeMini className="absolute left-[22%] bottom-[10%] h-10 w-10" />
          <TreeMini className="absolute right-[30%] top-[8%] h-12 w-12" />
          <TreeMini className="absolute right-[8%] bottom-[16%] h-20 w-20" />
          <TreeMini className="absolute left-[46%] bottom-[6%] h-8 w-8" />
        </div>

        <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
            <Reveal dir="left">
              <p className="flex items-center gap-3 text-[11px] font-extrabold uppercase tracking-[0.32em] text-pine-900/60">
                <LeafIcon className="h-4 w-4" />
                Следующий шаг
              </p>
              <h2 className="font-display mt-5 text-[clamp(1.9rem,4.6vw,3.4rem)] font-extrabold leading-[1.06] tracking-tight">
                Расскажите про участок — вернёмся с проектом и сметой
              </h2>
              <p className="mt-6 max-w-xl text-[16px] font-semibold leading-relaxed text-pine-900/75">
                Инженер перезвонит за 15 минут в рабочее время, задаст пять вопросов и назначит
                бесплатный выезд. Смета — через 3 дня, цена в ней не изменится.
              </p>
              <a
                href="tel:+74951203840"
                className="font-display mt-8 inline-flex items-center gap-3 text-[20px] font-extrabold text-pine-950 underline decoration-pine-950/30 decoration-[3px] underline-offset-8 transition-all hover:decoration-pine-950"
              >
                <PhoneIcon className="h-5 w-5" />
                +7 495 120-38-40
              </a>
            </Reveal>

            <Reveal dir="right">
              <div className="rounded-xl bg-pine-950 p-7 text-paper-50 shadow-[0_50px_100px_-40px_rgba(60,35,5,0.6)] md:p-9">
                {state === "done" ? (
                  <div className="flex min-h-[320px] flex-col items-center justify-center text-center">
                    <span className="grid h-16 w-16 place-items-center rounded-full bg-lime-400 text-pine-950">
                      <CheckIcon className="h-8 w-8" />
                    </span>
                    <p className="font-display mt-6 text-[22px] font-extrabold">Заявка у инженера!</p>
                    <p className="mt-3 max-w-xs text-[14.5px] leading-relaxed text-mint-200/80">
                      {name.trim()}, перезвоним на {phone.trim()} в течение 15 минут. Пока можно
                      полистать каталог — он чуть выше.
                    </p>
                    <button
                      onClick={() => {
                        setState("idle");
                        setName("");
                        setPhone("");
                      }}
                      className="mt-7 text-[13px] font-bold uppercase tracking-[0.14em] text-honey-300 underline decoration-2 underline-offset-4 transition-colors hover:text-lime-300"
                    >
                      Отправить ещё одну
                    </button>
                  </div>
                ) : (
                  <form onSubmit={submit} noValidate>
                    <p className="font-display text-[19px] font-extrabold">Бесплатная смета за 3 дня</p>
                    <p className="mt-2 text-[13.5px] text-mint-200/70">
                      Заполните два поля — остальное обсудим голосом.
                    </p>
                    <label className="mt-7 block">
                      <span className="text-[11px] font-extrabold uppercase tracking-[0.22em] text-mint-200/60">
                        Как к вам обращаться
                      </span>
                      <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Например, Алексей"
                        className="mt-2.5 w-full rounded-lg border border-paper-50/15 bg-pine-900 px-5 py-4 text-[15px] font-semibold text-paper-50 placeholder:text-mint-300/40 transition-colors focus:border-honey-400"
                      />
                    </label>
                    <label className="mt-5 block">
                      <span className="text-[11px] font-extrabold uppercase tracking-[0.22em] text-mint-200/60">
                        Телефон
                      </span>
                      <input
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+7 ___ ___-__-__"
                        inputMode="tel"
                        className="mt-2.5 w-full rounded-lg border border-paper-50/15 bg-pine-900 px-5 py-4 text-[15px] font-semibold text-paper-50 placeholder:text-mint-300/40 transition-colors focus:border-honey-400"
                      />
                    </label>
                    {err && (
                      <p className="mt-4 rounded-lg border border-honey-500/40 bg-honey-500/10 px-4 py-3 text-[13px] font-semibold text-honey-300">
                        {err}
                      </p>
                    )}
                    <button
                      type="submit"
                      disabled={state === "sending"}
                      className="group font-display mt-7 flex w-full items-center justify-center gap-3 rounded-full bg-lime-400 py-4.5 text-[13px] font-bold uppercase tracking-[0.12em] text-pine-950 transition-all duration-300 hover:-translate-y-0.5 hover:bg-honey-300 hover:shadow-[0_16px_36px_-12px_rgba(185,224,92,0.7)] disabled:opacity-60"
                    >
                      {state === "sending" ? "Отправляем…" : "Жду звонок инженера"}
                      {state !== "sending" && (
                        <ArrowIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
                      )}
                    </button>
                    <p className="mt-4 text-center text-[11.5px] leading-relaxed text-mint-300/50">
                      Нажимая кнопку, вы соглашаетесь с политикой обработки персональных данных.
                      Никакого спама — только один звонок.
                    </p>
                  </form>
                )}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* футер */}
      <footer className="bg-pine-950 pb-10 pt-16 text-paper-50">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="grid gap-12 md:grid-cols-[1.2fr_1fr_1fr] lg:gap-20">
            <div>
              <a href="#top" className="flex items-center gap-3">
                <PineLogo className="h-11 w-11" />
                <span className="font-display text-[20px] font-extrabold tracking-[0.14em]">ХВОЯ</span>
              </a>
              <p className="mt-5 max-w-sm text-[14px] leading-relaxed text-mint-200/65">
                Строительная компания полного цикла: проект, фундамент, коробка, инженерия,
                отделка и ландшафт. Работаем в радиусе 150 км от Москвы и в Калужской области.
              </p>
              <p className="mt-6 flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.18em] text-lime-400">
                <LeafIcon className="h-4 w-4" />
                с 2009 года · 340+ домов
              </p>
            </div>

            <div className="grid grid-cols-2 gap-8">
              <div>
                <p className="text-[11px] font-extrabold uppercase tracking-[0.24em] text-mint-300/50">
                  Разделы
                </p>
                <ul className="mt-5 space-y-3 text-[14px] font-semibold">
                  {[
                    ["#projects", "Проекты домов"],
                    ["#tech", "Технологии"],
                    ["#process", "Этапы стройки"],
                    ["#gallery", "Галерея"],
                    ["#calc", "Калькулятор"],
                  ].map(([href, label]) => (
                    <li key={href}>
                      <a href={href} className="text-mint-200/80 transition-colors hover:text-honey-300">
                        {label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-[11px] font-extrabold uppercase tracking-[0.24em] text-mint-300/50">
                  Контакты
                </p>
                <ul className="mt-5 space-y-3 text-[14px] font-semibold text-mint-200/80">
                  <li>
                    <a href="tel:+74951203840" className="flex items-center gap-2.5 transition-colors hover:text-honey-300">
                      <PhoneIcon className="h-4 w-4 text-honey-400" />
                      +7 495 120-38-40
                    </a>
                  </li>
                  <li>
                    <a href="mailto:les@hvoyadom.ru" className="transition-colors hover:text-honey-300">
                      les@hvoyadom.ru
                    </a>
                  </li>
                  <li className="leading-relaxed text-mint-200/60">
                    Офис: Москва, Ленинградское ш., 58, стр. 2 — «Дом леса»
                  </li>
                  <li className="text-mint-200/60">Ежедневно 9:00–21:00</li>
                </ul>
              </div>
            </div>

            <div>
              <p className="text-[11px] font-extrabold uppercase tracking-[0.24em] text-mint-300/50">
                Шоу-площадки
              </p>
              <ul className="mt-5 space-y-3 text-[14px] font-semibold leading-relaxed text-mint-200/70">
                <li>КП «Сосновый берег» — барнхаус «Вейник»</li>
                <li>Истра, д. Покровское — «Кедр» из бруса</li>
                <li>Дмитровское ш., 34 км — «Гранит»</li>
              </ul>
              <a
                href="#contact"
                className="font-display mt-6 inline-block rounded-full border border-paper-50/20 px-5 py-3 text-[11px] font-bold uppercase tracking-[0.14em] transition-all duration-300 hover:border-lime-400 hover:text-lime-300"
              >
                Записаться на экскурсию
              </a>
            </div>
          </div>

          <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-paper-50/10 pt-7 text-[12.5px] font-semibold text-mint-300/45 sm:flex-row">
            <p>© 2009–2026 СК «ХВОЯ». Строим дома, а не обещания.</p>
            <p className="flex items-center gap-2">
              Сделано среди сосен
              <TreeMini className="h-4 w-4 text-lime-500" />
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
