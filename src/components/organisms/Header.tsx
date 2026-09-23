import { useNavigate,  } from "react-router";
import { ArrowUpRight, MapPin } from "lucide-react";

export function Header() {
  const navigate = useNavigate();

  const links = [
    ["EXPLORAR", "#explorar"],
    ["CAFÉS", "#cafes"],
    ["AVALIAÇÕES", "#avaliacoes"],
    ["SOBRE", "#sobre"],
  ];

  return (
    <>
      <header className="sticky top-0 left-0 w-full bg-[#050403]  backdrop-blur-md  border-[#211811] z-40">
        <main className="flex items-center justify-between px-4 sm:px-6 lg:px-8 h-18 ">
          <section>
            <a
              className={`whitespace-nowrap font-black tracking-[-0.06em] text-[#ECE4DA]`}
              href="#top"
              aria-label="Guia do Cafezin, início"
              onClick={() => {
                navigate("/");
              }}
            >
              GUIA
              <span className="mx-1 text-[9px] font-bold tracking-normal text-[#C88758]">
                DO
              </span>
              CAFEZIN<i className="ml-0.5 align-top text-[8px] not-italic">®</i>
            </a>
          </section>
          
          <section
            onClick={() => {}}
            className="flex items-center gap-2.5 cursor-pointer select-none group shrink-0"
          >
            <nav
              aria-label="Navegação principal"
              className="hidden text-[#ECE4DA] items-center gap-5 md:flex lg:gap-7"
            >
              {links.map(([label, href]) => (
                <a
                  className="text-[9px] font-extrabold tracking-wider opacity-80 transition-opacity hover:opacity-100"
                  href={href}
                  key={label}
                >
                  {label}
                </a>
              ))}
            </nav>
          </section>

          <section className="flex items-center gap-2.5 shrink-0">
            <button
              type="button"
              onClick={() => navigate("/maps")}
              className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-[#B76A3D] px-4 py-2 text-xs font-bold text-[#050403] transition-all hover:bg-[#C88758] active:scale-[0.98] cursor-pointer shadow-xs"
            >
              <MapPin className="w-3.5 h-3.5" />
              <span>Explorar cafés</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </section>
        </main>
      </header>
    </>
  );
}

export default Header;
