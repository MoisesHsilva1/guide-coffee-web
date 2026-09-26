import { ArrowRight, MapPin, Star } from "lucide-react";
import { Link } from "react-router";
import { featuredCafes } from "@/constants/featuredCafes";
import { cafeCardArtStyles, cafeCardStyles } from "@/lib/cafeStyles";

const Feed = () => {
  return (
    <section
      className="rounded-t-[30px] border-2 border-coffee-border bg-espresso px-5 py-16 text-coffee-cream sm:px-[5.5%] sm:py-[90px]"
      id="cafes"
    >
      <div className="mx-auto max-w-[1260px]">
        <div className="mb-9 flex items-end justify-between gap-5">
          <div className="space-y-4">
            <p className="text-[9px] font-extrabold tracking-[0.14em] text-coffee-muted">
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
              className={`${cafeCardStyles({ color: cafe.color })} ${index === 1 ? "md:translate-y-[18px]" : ""}`}
              key={cafe.name}
            >
              <div
                className={cafeCardArtStyles({ color: cafe.color })}
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

export default Feed;
