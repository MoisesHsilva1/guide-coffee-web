import { featuredCafes } from "@/constants/featuredCafes";
import { Link } from "react-router";
import { ArrowRight, MapPin, Star } from "lucide-react";

const MapSection = () => {
  return (
    <section
      aria-labelledby="map-section-title"
      className="px-2 py-20 sm:px-[5.5%] sm:py-28"
      id="explorar"
    >
      <header className="mb-8 flex flex-col justify-between gap-6 sm:mb-11 sm:flex-row sm:items-end">
        <div className="space-y-4">
          <p className="text-[9px] font-extrabold tracking-[0.14em]">
            01 — A CIDADE É SUA
          </p>
          <h2
            className="font-sans text-[clamp(2.8rem,6vw,4.6rem)] font-black uppercase leading-[0.88] tracking-[-0.075em]"
            id="map-section-title"
          >
            ENCONTRE CAFÉS
            <br />
            <span className="text-caramel">PERTO DE VOCÊ.</span>
          </h2>
        </div>
        <p className="max-w-[260px] text-[13px] leading-relaxed">
          São Paulo tem café bom em cada esquina. A gente ajuda você a encontrar
          o próximo.
        </p>
      </header>

      <div
        className="grid overflow-hidden rounded-[25px] border-2 border-coffee-border bg-coffee-surface lg:min-h-[365px] lg:grid-cols-[1.55fr_.85fr]"
        id="mapa"
      >
        <figure
          aria-label="Mapa ilustrativo de cafés em São Paulo"
          className="relative min-h-[270px] overflow-hidden bg-coffee-surface bg-[radial-gradient(#140B071A_1px,transparent_1px)] bg-[size:18px_18px] lg:min-h-[365px]"
        >
          <div className="absolute inset-0 bg-[linear-gradient(30deg,transparent_49.7%,#6076543B_50%,transparent_52%),linear-gradient(120deg,transparent_46%,#6076542B_46.5%,transparent_49%)]" />
          <svg
            className="absolute inset-0 size-full opacity-80"
            viewBox="0 0 800 440"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              d="M-30 100 Q110 160 240 90 T510 110 T830 50 M-40 250 Q130 190 280 270 T560 240 T830 290 M70 -20 Q110 110 160 210 T180 460 M360 -20 Q310 100 390 200 T410 460 M610 -20 Q540 110 600 220 T680 460 M-20 365 Q120 310 280 350 T560 340 T830 390"
              fill="none"
              stroke="var(--coffee-muted)"
              strokeWidth="8"
            />
            <path
              d="M-30 100 Q110 160 240 90 T510 110 T830 50 M-40 250 Q130 190 280 270 T560 240 T830 290"
              fill="none"
              stroke="var(--caramel)"
              strokeWidth="12"
            />
          </svg>
          <span className="absolute left-[44%] top-[26%] -rotate-6 text-[9px] font-extrabold tracking-widest text-coffee-muted">
            PINHEIROS
          </span>
          <span className="absolute left-[13%] top-[40%] -rotate-6 text-[9px] font-extrabold tracking-widest text-coffee-muted">
            VILA MADALENA
          </span>
          <span className="absolute left-[66%] top-[61%] -rotate-6 text-[9px] font-extrabold tracking-widest text-coffee-muted">
            JARDINS
          </span>
          <span className="absolute left-[77%] top-[23%] -rotate-6 text-[9px] font-extrabold tracking-widest text-coffee-muted">
            CENTRO
          </span>
          <MapPin
            className="absolute left-[33%] top-[31%] animate-bounce text-caramel-light drop-shadow-[2px_2px_0_#050403]"
            fill="currentColor"
            size={20}
          />
          <MapPin
            className="absolute left-[63%] top-[48%] animate-bounce text-caramel-light drop-shadow-[2px_2px_0_#050403]"
            fill="currentColor"
            size={20}
          />
          <MapPin
            className="absolute left-[48%] top-[68%] animate-bounce text-caramel-light drop-shadow-[2px_2px_0_#050403]"
            fill="currentColor"
            size={20}
          />
          <span className="absolute right-[7%] top-[7%] grid size-[58px] rotate-12 place-content-center rounded-full border-2 border-coffee-border bg-caramel-light text-center font-black leading-none text-background shadow-[3px_3px_0_#050403]">
            SP
            <br />
            <b className="text-xl">☕</b>
          </span>
          <figcaption className="absolute bottom-[18px] left-5 -rotate-3 text-[9px] font-extrabold leading-tight tracking-wider">
            MAPA AFETIVO
            <br />
            DE CAFÉ ↗
          </figcaption>
        </figure>
        <aside
          aria-label="Cafés próximos"
          className="flex flex-col bg-coffee-surface p-5"
        >
          <header className="flex justify-between border-b border-coffee-muted pb-4 text-[8px] font-extrabold tracking-widest">
            <span>PERTO DE VOCÊ</span>
            <span className="text-coffee-muted">03 LUGARES ↘</span>
          </header>
          <ul className="m-0 list-none p-0">
            {featuredCafes.map((cafe) => (
              <li key={cafe.name}>
                <Link
                  className="grid grid-cols-[30px_1fr_auto] items-center gap-2.5 border-b border-coffee-muted/60 py-4"
                  to="/maps"
                >
                  <span className="text-lg font-black text-caramel">
                    {cafe.mark}
                  </span>
                  <span>
                    <span className="block font-sans text-base font-black tracking-tight">
                      {cafe.name}
                    </span>
                    <span className="text-[9px] font-semibold text-coffee-muted">
                      {cafe.area} · {cafe.type}
                    </span>
                  </span>
                  <span className="flex items-center gap-1 text-[10px] font-extrabold">
                    <Star className="text-caramel" fill="currentColor" size={12} />
                    {cafe.rating}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <footer>
            <Link
              className="mt-auto flex items-center gap-2 pt-4 text-[9px] font-extrabold tracking-wider hover:text-caramel"
              to="/maps"
            >
              ABRIR MAPA COMPLETO <ArrowRight size={15} />
            </Link>
          </footer>
        </aside>
      </div>
    </section>
  );
};

export default MapSection;
