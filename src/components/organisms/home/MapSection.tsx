import { ArrowRight, Star } from "lucide-react";
import { Link } from "react-router";
import { useReviewFetch } from "@/hooks/useReview";
import MapboxMap from "../Map";

const MapSection = () => {
  const { data, isError, isPending } = useReviewFetch(true, {
    limit: 3,
    offset: 0,
  });

  const reviews = data?.rows ?? [];

  return (
    <section
      aria-labelledby="map-section-title"
      className="px-2 py-20 sm:px-[5.5%] sm:py-28"
      id="explorar"
    >
      <header className="mb-8 flex flex-col justify-between gap-6 sm:mb-11 sm:flex-row sm:items-end">
        <div className="space-y-4">
          <h2
            className="font-sans text-[clamp(2.8rem,6vw,4.6rem)] font-black uppercase leading-[0.88] tracking-[-0.075em]"
            id="map-section-title"
          >
            ENCONTRE CAFÉS
            <br />
            <span className="text-caramel">PERTO DE VOCÊ.</span>
          </h2>
        </div>
      </header>

      <section
        className="grid overflow-hidden rounded-[25px] border-2 border-coffee-border bg-coffee-surface lg:min-h-[365px] lg:grid-cols-[1.55fr_.85fr]"
        id="mapa"
      >
        <div className="relative min-h-[270px] lg:min-h-[365px]">
          <MapboxMap
            aria-label="Preview do mapa real de cafeterias em São Paulo"
            className="size-full min-h-[270px] lg:min-h-[365px]"
            interactive={false}
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#050403CC] via-transparent to-transparent"
          />
          <Link
            aria-label="Abrir o mapa completo de cafeterias"
            className="absolute bottom-5 left-5 flex items-center gap-2 rounded-full bg-[#B76A3D] px-4 py-2.5 text-center text-[10px] font-extrabold tracking-wider text-[#050403] shadow-[3px_3px_0_#050403] transition-colors hover:bg-[#C88758] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C88758]"
            to="/maps"
          >
            VER MAPA COMPLETO <ArrowRight size={14} />
          </Link>
        </div>

        <aside
          aria-label="Cafés próximos"
          className="flex flex-col bg-coffee-surface p-5"
        >
          <header className="flex justify-between border-b border-coffee-muted pb-4 text-[8px] font-extrabold tracking-widest">
            <span>PERTO DE VOCÊ</span>
            <span className="text-coffee-muted">
              {isPending ? "..." : data?.total + " LUGARES"}
            </span>
          </header>

          {isPending && (
            <ul
              aria-label="Carregando cafés próximos"
              className="m-0 list-none p-0"
            >
              {[0, 1, 2].map((item) => (
                <li
                  className="h-[73px] animate-pulse border-b border-coffee-muted/60 py-4"
                  key={item}
                />
              ))}
            </ul>
          )}

          {isError && (
            <p className="py-5 text-[10px] text-coffee-muted">
              Não foi possível carregar os cafés próximos.
            </p>
          )}

          {!isPending && !isError && reviews.length === 0 && (
            <p className="py-5 text-[10px] text-coffee-muted">
              Nenhum café encontrado no momento.
            </p>
          )}

          {!isPending && !isError && reviews.length > 0 && (
            <ul className="m-0 list-none p-0">
              {reviews.map((review, index) => (
                <li key={review.id}>
                  <Link
                    aria-label={"Ver " + review.title + " no mapa"}
                    className="grid grid-cols-[30px_1fr_auto] items-center gap-2.5 border-b border-coffee-muted/60 py-4"
                    to="/maps"
                  >
                    <span className="text-lg font-black text-caramel">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span>
                      <span className="block font-sans text-base font-black tracking-tight">
                        {review.title}
                      </span>
                      <span className="text-[9px] font-semibold text-coffee-muted">
                        {review.address} · {review.drinkType}
                      </span>
                    </span>
                    <span className="flex items-center gap-1 text-[10px] font-extrabold">
                      <Star
                        aria-hidden="true"
                        className="text-caramel"
                        fill="currentColor"
                        size={12}
                      />
                      {review.rating}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}

          <footer>
            <Link
              className="mt-auto flex items-center gap-2 pt-4 text-[9px] font-extrabold tracking-wider hover:text-caramel"
              to="/maps"
            >
              ABRIR MAPA COMPLETO <ArrowRight size={15} />
            </Link>
          </footer>
        </aside>
      </section>
    </section>
  );
};

export default MapSection;
