import { useEffect, useState } from "react";
import { GALLERY } from "../data";
import { ArrowIcon, CloseIcon, Reveal, SectionHead } from "../ui";

export default function Gallery() {
  const [lightbox, setLightbox] = useState<number | null>(null);

  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowRight") setLightbox((v) => (v === null ? v : (v + 1) % GALLERY.length));
      if (e.key === "ArrowLeft")
        setLightbox((v) => (v === null ? v : (v - 1 + GALLERY.length) % GALLERY.length));
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightbox]);

  return (
    <section id="gallery" className="relative overflow-hidden bg-pine-950 py-24 text-paper-50 lg:py-32">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/3 top-0 h-[420px] w-[420px] rounded-full bg-moss-600/20 blur-[130px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHead
          tone="dark"
          overline="Фото с участков"
          title={
            <>
              Свет, дерево и <span className="text-lime-400">тишина</span> — наши объекты
            </>
          }
          note="Снимаем дома через год после сдачи, когда семья уже живёт: видно, как дерево стареет, а участок становится лесом."
        />

        <div className="mt-14 columns-2 gap-4 md:columns-3 lg:gap-5 [column-fill:balance]">
          {GALLERY.map((g, i) => (
            <Reveal key={i} delay={(i % 3) * 0.08} className="mb-4 break-inside-avoid lg:mb-5">
              <figure
                onClick={() => setLightbox(i)}
                className="group relative cursor-zoom-in overflow-hidden rounded-lg border border-paper-50/10"
              >
                <div className={g.h === "tall" ? "h-72 sm:h-96" : "h-48 sm:h-60"}>
                  <img
                    src={g.src}
                    alt={g.cap}
                    loading="lazy"
                    className="kb h-full w-full object-cover"
                    style={{ animationDelay: `${-(i * 2.1)}s` }}
                  />
                </div>
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-pine-950/85 via-pine-950/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 flex translate-y-3 items-center justify-between gap-3 p-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  <span className="text-[12.5px] font-semibold leading-snug text-paper-50">{g.cap}</span>
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-lime-400 text-pine-950">
                    <ArrowIcon className="h-4 w-4 -rotate-45" />
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>

      {/* лайтбокс */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-[80] flex flex-col items-center justify-center bg-pine-950/95 p-5 backdrop-blur-sm"
          onClick={() => setLightbox(null)}
        >
          <button
            aria-label="Закрыть"
            className="absolute right-5 top-5 grid h-12 w-12 place-items-center rounded-full border border-paper-50/25 text-paper-50 transition-colors hover:bg-pine-800"
          >
            <CloseIcon className="h-5 w-5" />
          </button>
          <button
            aria-label="Предыдущее фото"
            onClick={(e) => {
              e.stopPropagation();
              setLightbox((lightbox - 1 + GALLERY.length) % GALLERY.length);
            }}
            className="absolute left-3 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-paper-50/25 text-paper-50 transition-colors hover:bg-pine-800 sm:left-8"
          >
            <ArrowIcon className="h-5 w-5 rotate-180" />
          </button>
          <button
            aria-label="Следующее фото"
            onClick={(e) => {
              e.stopPropagation();
              setLightbox((lightbox + 1) % GALLERY.length);
            }}
            className="absolute right-3 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-paper-50/25 text-paper-50 transition-colors hover:bg-pine-800 sm:right-8"
          >
            <ArrowIcon className="h-5 w-5" />
          </button>
          <img
            src={GALLERY[lightbox].src}
            alt={GALLERY[lightbox].cap}
            onClick={(e) => e.stopPropagation()}
            className="max-h-[76vh] max-w-full rounded-lg object-contain shadow-2xl"
          />
          <p className="mt-5 text-center text-[13px] font-semibold text-mint-200/80">
            {GALLERY[lightbox].cap}
            <span className="ml-3 text-mint-300/50">
              {lightbox + 1} / {GALLERY.length}
            </span>
          </p>
        </div>
      )}
    </section>
  );
}
