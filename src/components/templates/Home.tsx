import { ArrowDown, ArrowRight, MapPin, Star } from "lucide-react";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import coffeeHomeImage from "@/assets/coffee-home.png";
import { featuredCafes } from "@/data/featuredCafes";
import type { FeaturedCafe } from "@/data/featuredCafes";

const cafeCardColors: Record<FeaturedCafe["color"], string> = {
  cream: "bg-coffee-surface text-coffee-cream",
  caramel: "bg-coffee-raised text-coffee-cream",
  dark: "bg-espresso text-coffee-cream",
};

function Wordmark({ footer = false }: { footer?: boolean }) {
  return (
    <a
      className={`whitespace-nowrap font-black tracking-[-0.06em] ${footer ? "text-sm" : "text-base"}`}
      href="#top"
      aria-label="Guia do Cafezin, início"
    >
      GUIA
      <span className="mx-1 text-[9px] font-bold tracking-normal text-caramel-light">
        DO
      </span>
      CAFEZIN<i className="ml-0.5 align-top text-[8px] not-italic">®</i>
    </a>
  );
}

function Hero() {
  return (
    <section
      className="relative flex  flex-col overflow-hidden  border-2 border-coffee-border bg-espresso px-6 pt-5 sm:px-10 lg:min-h-[655px] lg:px-[5.5%]"
      id="top"
    >
      <div className="grid flex-1 items-center lg:grid-cols-[1.05fr_.95fr]">
        <div className="z-[1] py-9 lg:py-12">
          <h1 className="font-sans text-[clamp(3.2rem,8vw,6.3rem)] font-black uppercase leading-[0.86] tracking-[-0.075em]">
            DESCUBRA
            <br />
            SEU PRÓXIMO
            <br />
            <span className="text-caramel [text-shadow:3px_3px_0_#050403] [-webkit-text-stroke:1px_#050403]">
              CAFÉ FAVORITO.
            </span>
          </h1>
          <p className="my-5 max-w-[305px] text-[13px] leading-relaxed">
            Encontre cafeterias perto de você, descubra novos lugares e veja o
            que a comunidade está tomando.
          </p>
          <div className="flex flex-wrap gap-2.5">
            <Button
              asChild
              className="h-11 rounded-full border-2 border-coffee-border bg-primary px-4 text-[9px] font-extrabold text-primary-foreground hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-[3px_3px_0_#050403]"
            >
              <Link to="/maps">
                EXPLORAR CAFÉS <ArrowRight />
              </Link>
            </Button>
          </div>
        </div>
        <div className="relative mx-auto grid aspect-square h-[310px] w-full max-w-[470px] place-items-center sm:h-[400px] lg:h-[470px]">
          <div className="absolute inset-[-3%] rotate-[-8deg] rounded-[42%_58%_54%_46%/48%_42%_58%_52%] bg-caramel shadow-[8px_8px_0_#050403]" />
          <div className="absolute inset-[6%] rotate-[5deg] rounded-full border-2 border-dashed border-coffee-cream/50" />
          <img
            alt="Café sendo preparado no filtro V60"
            className="relative z-[1] size-[94%] rotate-[3deg] rounded-[43%_57%_48%_52%/48%_43%_57%_52%] border-[3px] border-coffee-cream object-cover object-[50%_58%] shadow-[7px_8px_0_#050403]"
            src={coffeeHomeImage}
          />
        </div>
      </div>

      <a
        className="flex h-11 items-center justify-between border-t border-coffee-border/40 text-[8px] font-extrabold tracking-[0.11em]"
        href="#explorar"
      >
        <span>ARRASTE PRA DESCOBRIR</span>
        <ArrowDown className="animate-bounce" size={16} />
        <span>CAFÉ BOM MUDA O DIA.</span>
      </a>


    </section>
  );
}

function MapSection() {
  return (
    <section className="px-2 py-20 sm:px-[5.5%] sm:py-28" id="explorar">
      <div className="mb-8 flex flex-col justify-between gap-5 sm:mb-11 sm:flex-row sm:items-end">
        <div>
          <p className="mb-4 text-[9px] font-extrabold tracking-[0.14em]">
            01 — A CIDADE É SUA
          </p>
          <h2 className="font-sans text-[clamp(2.8rem,6vw,4.6rem)] font-black uppercase leading-[0.88] tracking-[-0.075em]">
            ENCONTRE CAFÉS
            <br />
            <span className="text-caramel">PERTO DE VOCÊ.</span>
          </h2>
        </div>
        <p className="max-w-[260px] text-[13px] leading-relaxed">
          São Paulo tem café bom em cada esquina. A gente ajuda você a encontrar
          o próximo.
        </p>
      </div>
      <div
        className="grid overflow-hidden rounded-[25px] border-2 border-coffee-border bg-coffee-surface lg:min-h-[365px] lg:grid-cols-[1.55fr_.85fr]"
        id="mapa"
      >
        <div className="relative min-h-[270px] overflow-hidden bg-coffee-surface bg-[radial-gradient(#140B071A_1px,transparent_1px)] bg-[size:18px_18px] lg:min-h-[365px]">
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
          <span className="absolute bottom-[18px] left-5 -rotate-3 text-[9px] font-extrabold leading-tight tracking-wider">
            MAPA AFETIVO
            <br />
            DE CAFÉ ↗
          </span>
        </div>
        <div className="flex flex-col bg-coffee-surface p-5">
          <div className="flex justify-between border-b border-coffee-muted pb-4 text-[8px] font-extrabold tracking-widest">
            <span>PERTO DE VOCÊ</span>
            <span className="text-coffee-muted">03 LUGARES ↘</span>
          </div>
          {featuredCafes.map((cafe) => (
            <Link
              className="grid grid-cols-[30px_1fr_auto] items-center gap-2.5 border-b border-coffee-muted/60 py-4"
              key={cafe.name}
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
          ))}
          <Link
            className="mt-auto flex items-center gap-2 pt-4 text-[9px] font-extrabold tracking-wider hover:text-caramel"
            to="/maps"
          >
            ABRIR MAPA COMPLETO <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </section>
  );
}

function FeaturedCafes() {
  return (
    <section
      className="rounded-t-[30px] border-2 border-coffee-border bg-espresso px-5 py-16 text-coffee-cream sm:px-[5.5%] sm:py-[90px]"
      id="cafes"
    >
      <div className="mx-auto max-w-[1260px]">
        <div className="mb-9 flex items-end justify-between gap-4">
          <div>
            <p className="mb-4 text-[9px] font-extrabold tracking-[0.14em] text-coffee-muted">
              02 — ESCOLHIDOS A DEDO
            </p>
            <h2 className="font-sans text-[clamp(2.8rem,6vw,4.6rem)] font-black uppercase leading-[0.88] tracking-[-0.075em]">
              CAFÉS QUE
              <br />
              <span className="text-caramel-light">VALEM A PARADA.</span>
            </h2>
          </div>
          <a
            className="mb-1 flex max-w-[145px] items-center gap-2 text-[9px] font-extrabold tracking-wider hover:text-caramel-light"
            href="#mapa"
          >
            VER TODOS OS CAFÉS <ArrowRight size={15} />
          </a>
        </div>
        <div className="grid gap-4 md:grid-cols-3 md:gap-[18px]">
          {featuredCafes.map((cafe, index) => (
            <article
              className={`relative min-w-0 rounded-[19px] border-2 border-coffee-border p-2.5 pb-4 ${cafeCardColors[cafe.color]} ${index === 1 ? "md:translate-y-[18px]" : ""}`}
              key={cafe.name}
            >
              <div
                className={`relative grid h-[210px] place-items-center overflow-hidden rounded-xl border border-coffee-border sm:h-[225px] ${index === 0 ? "bg-gradient-to-br from-caramel-light via-coffee-border to-espresso" : index === 1 ? "bg-gradient-to-br from-espresso via-caramel to-caramel-light" : "bg-gradient-to-br from-coffee-border via-coffee-raised to-caramel-light"}`}
              >
                <span className="absolute left-2.5 top-2.5 rounded-full border border-coffee-border bg-coffee-surface px-2.5 py-1.5 text-[8px] font-extrabold">
                  {cafe.mark}
                </span>
                <span className="absolute right-2.5 top-2.5 rounded-full border border-coffee-border bg-coffee-surface px-2.5 py-1.5 text-[8px] font-extrabold">
                  {cafe.type}
                </span>
                <span className="grid size-32 place-items-center rounded-full border-2 border-coffee-border bg-coffee-surface/90 text-5xl shadow-[0_8px_0_#140B07]">
                  {index === 1 ? "◉" : "☕"}
                </span>
                <span className="absolute bottom-[18%] right-[20%] text-2xl text-caramel-light [text-shadow:2px_2px_#050403]">
                  ✳
                </span>
              </div>
              <div className="flex items-start justify-between px-1 pt-4">
                <div>
                  <h3 className="font-sans text-xl font-black tracking-tight">
                    {cafe.name}
                  </h3>
                  <p className="mt-1 flex items-center gap-1 text-[10px] font-semibold opacity-75">
                    <MapPin size={13} />
                    {cafe.area}
                  </p>
                </div>
                <span className="flex items-center gap-1 text-[11px] font-extrabold text-caramel-light">
                  <Star size={14} fill="currentColor" />
                  {cafe.rating}
                </span>
              </div>
              <p className="px-1 pb-1 pt-3 pr-10 text-[10px] opacity-75">
                {cafe.note}
              </p>
              <Link
                className="absolute bottom-4 right-4 grid size-[30px] place-items-center rounded-full border-[1.5px] border-current transition hover:-rotate-45 hover:bg-background hover:text-coffee-cream"
                to="/maps"
                aria-label={`Ver ${cafe.name}`}
              >
                <ArrowRight size={18} />
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer
      className="overflow-hidden rounded-t-[30px] border-2 border-coffee-border bg-espresso text-coffee-cream"
      id="sobre"
    >
      <div className="relative flex min-h-[345px] flex-col items-center justify-center px-3 py-12 text-center sm:min-h-[400px] sm:px-5">
        <span className="absolute bottom-[15%] left-[9%] rotate-[-15deg] text-2xl sm:left-1/4 sm:text-[28px]">
          ☕
        </span>
        <p className="mb-5 text-[9px] font-extrabold tracking-[0.14em] text-caramel-light">
          A CIDADE TÁ PASSANDO CAFÉ.
        </p>
        <h2 className="mb-7 font-sans text-[clamp(2.8rem,7vw,5.25rem)] font-black uppercase leading-[0.88] tracking-[-0.075em]">
          SEU PRÓXIMO
          <br />
          <span className="text-caramel-light">CAFÉ ESTÁ AQUI.</span>
        </h2>
        <Button
          asChild
          className="h-11 rounded-full border-2 border-coffee-border bg-primary px-5 text-[9px] font-extrabold text-primary-foreground hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-[3px_3px_0_#050403]"
        >
          <Link to="/maps">
            EXPLORAR CAFÉS <ArrowRight />
          </Link>
        </Button>
        <span className="absolute right-[15%] top-[13%] text-2xl text-sage">
          ✳
        </span>
        <span className="absolute bottom-[14%] right-[4%] text-[43px] text-caramel-light sm:right-[11%] sm:text-[70px]">
          ✳
        </span>
        <span className="absolute left-[4%] top-[17%] text-[50px] text-caramel sm:left-[10%] sm:text-[100px]">
          ✳
        </span>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-3 border-t border-coffee-cream/25 px-3 py-5 text-center sm:justify-between sm:px-7">
        <Wordmark footer />
        <p className="w-full text-[8px] font-extrabold tracking-widest text-coffee-muted sm:w-auto">
          FEITO PRA QUEM LEVA CAFÉ A SÉRIO.
        </p>
        <nav
          aria-label="Links do rodapé"
          className="flex flex-wrap justify-center gap-3 sm:gap-[17px]"
        >
          {[
            ["EXPLORAR", "#explorar"],
            ["MAPA", "#mapa"],
            ["CAFÉS", "#cafes"],
            ["AVALIAÇÕES", "#avaliacoes"],
            ["SOBRE", "#sobre"],
          ].map(([label, href]) => (
            <a
              className="text-[8px] font-extrabold tracking-wider hover:text-caramel-light"
              href={href}
              key={label}
            >
              {label}
            </a>
          ))}
        </nav>
        <span className="w-full text-[8px] font-extrabold tracking-widest text-coffee-muted sm:w-auto">
          © 2025 CAFEZIN
        </span>
      </div>
    </footer>
  );
}

export default function Home() {
  return (
    <main className="dark overflow-hidden bg-background p-0 font-sans text-foreground">
      <div className="mx-auto max-w-[1440px]">
        <Hero />
        <MapSection />
        <FeaturedCafes />
        <Footer />
      </div>
    </main>
  );
}
