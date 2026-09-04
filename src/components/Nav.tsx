import { useEffect, useState } from "react";
import { BurgerIcon, CloseIcon, PhoneIcon, PineLogo } from "../ui";

const LINKS = [
  { href: "#projects", label: "Проекты" },
  { href: "#tech", label: "Технологии" },
  { href: "#process", label: "Этапы" },
  { href: "#gallery", label: "Галерея" },
  { href: "#calc", label: "Калькулятор" },
  { href: "#reviews", label: "Отзывы" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-[60] transition-all duration-500 ${
        scrolled
          ? "border-b border-paper-50/10 bg-pine-950/85 py-2.5 backdrop-blur-md"
          : "bg-transparent py-5"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 lg:px-8">
        <a href="#top" className="group flex items-center gap-3 text-paper-50">
          <PineLogo className="h-10 w-10 transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-105" />
          <span className="leading-none">
            <span className="font-display block text-lg font-extrabold tracking-[0.14em]">
              ХВОЯ
            </span>
            <span className="mt-1 block text-[10px] font-semibold uppercase tracking-[0.24em] text-mint-300/80">
              загородные дома
            </span>
          </span>
        </a>

        <nav className="hidden items-center gap-7 lg:flex">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="group relative text-[13px] font-bold uppercase tracking-[0.14em] text-paper-50/75 transition-colors hover:text-honey-300"
            >
              {l.label}
              <span className="absolute -bottom-1.5 left-0 h-[2px] w-0 bg-honey-400 transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="tel:+74951203840"
            className="hidden items-center gap-2.5 text-paper-50 transition-colors hover:text-honey-300 md:flex"
          >
            <span className="grid h-9 w-9 place-items-center rounded-full border border-paper-50/20 text-honey-300">
              <PhoneIcon className="h-4 w-4" />
            </span>
            <span className="leading-tight">
              <span className="font-display block text-[13px] font-bold">+7 495 120-38-40</span>
              <span className="block text-[11px] text-mint-300/70">ежедневно 9:00–21:00</span>
            </span>
          </a>
          <a
            href="#contact"
            className="font-display hidden rounded-full bg-lime-400 px-5 py-2.5 text-[12px] font-bold uppercase tracking-[0.12em] text-pine-950 transition-all duration-300 hover:-translate-y-0.5 hover:bg-honey-300 hover:shadow-[0_10px_30px_-8px_rgba(242,169,59,0.6)] md:block"
          >
            Обсудить дом
          </a>
          <button
            onClick={() => setOpen(!open)}
            aria-label="Меню"
            className="grid h-10 w-10 place-items-center rounded-full border border-paper-50/20 text-paper-50 lg:hidden"
          >
            {open ? <CloseIcon className="h-5 w-5" /> : <BurgerIcon className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <div
        className={`overflow-hidden bg-pine-950/95 backdrop-blur-md transition-all duration-400 lg:hidden ${
          open ? "max-h-[420px] border-b border-paper-50/10" : "max-h-0"
        }`}
      >
        <nav className="flex flex-col gap-1 px-6 py-5">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-2.5 text-sm font-bold uppercase tracking-[0.12em] text-paper-50/85 transition-colors hover:bg-pine-800 hover:text-honey-300"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="font-display mt-3 rounded-full bg-lime-400 px-5 py-3 text-center text-[12px] font-bold uppercase tracking-[0.12em] text-pine-950"
          >
            Обсудить дом
          </a>
        </nav>
      </div>
    </header>
  );
}
