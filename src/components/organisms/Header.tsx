import { ArrowUpRight, MapPin, Menu } from "lucide-react";
import { Link } from "react-router";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { linksHeader } from "@/constants/linksHeader";

export function Header() {
  return (
    <>
      <header className="sticky top-0 left-0 z-40 w-full border-b border-[#211811] bg-[#050403] backdrop-blur-md">
        <main className="mx-auto flex h-16 w-full max-w-[1440px] items-center justify-between px-5 sm:h-18 sm:px-8 lg:px-10">
          <section>
            <a
              className={`whitespace-nowrap font-black tracking-[-0.06em] text-[#ECE4DA]`}
              href="/home"
              aria-label="Guia do Cafezin, início"
            >
              GUIA
              <span className="mx-1 text-[9px] font-bold tracking-normal text-[#C88758]">
                DO
              </span>
              CAFEZIN<i className="ml-0.5 align-top text-[8px] not-italic">®</i>
            </a>
          </section>

          <section className="flex shrink-0 items-center gap-5 lg:gap-7">
            <nav
              aria-label="Navegação principal"
              className="hidden items-center gap-5 text-[#ECE4DA] lg:flex lg:gap-7"
            >
              {linksHeader.map(([label, href]) => (
                <a
                  className="text-[10px] font-extrabold tracking-wider opacity-80 transition-opacity hover:opacity-100"
                  href={href}
                  key={label}
                >
                  {label}
                </a>
              ))}
            </nav>

            <Sheet>
              <SheetTrigger asChild>
                <Button
                  aria-label="Abrir menu de navegação"
                  className="size-11 rounded-full border border-coffee-border bg-coffee-surface text-coffee-cream hover:bg-coffee-raised lg:hidden"
                  size="icon"
                  variant="ghost"
                >
                  <Menu className="size-5" />
                </Button>
              </SheetTrigger>
              <SheetContent
                aria-describedby="mobile-navigation-description"
                className="w-[min(86vw,22rem)] border-coffee-border bg-background p-0 text-foreground"
              >
                <SheetHeader className="border-b border-coffee-border px-6 py-7 pr-16 text-left">
                  <SheetTitle className="font-sans text-lg font-black uppercase tracking-tight">
                    Guia do Cafezin
                  </SheetTitle>
                  <SheetDescription
                    className="text-xs leading-relaxed text-coffee-muted"
                    id="mobile-navigation-description"
                  >
                    Encontre sua próxima parada para tomar café.
                  </SheetDescription>
                </SheetHeader>
                <nav
                  aria-label="Navegação mobile"
                  className="flex flex-col gap-2 px-4 py-6"
                >
                  {linksHeader.map(([label, href]) => (
                    <SheetClose asChild key={label}>
                      <a
                        className="flex min-h-12 items-center rounded-lg px-3 text-sm font-extrabold tracking-wider transition-colors hover:bg-coffee-raised hover:text-caramel focus-visible:outline focus-visible:outline-2 focus-visible:outline-caramel"
                        href={href}
                      >
                        {label}
                      </a>
                    </SheetClose>
                  ))}
                  <SheetClose asChild>
                    <a
                      className="mt-4 flex min-h-12 items-center justify-center gap-2 rounded-full bg-primary px-4 text-sm font-bold text-primary-foreground transition-colors hover:bg-caramel-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-caramel"
                      href="/reviews"
                    >
                      <MapPin className="size-4" />
                      Explorar cafés
                      <ArrowUpRight className="size-4" />
                    </a>
                  </SheetClose>
                </nav>
              </SheetContent>
            </Sheet>
            <Button
              asChild
              className="hidden min-h-11 items-center gap-1.5 rounded-full bg-[#B76A3D] px-4 py-2 text-xs font-bold text-[#050403] shadow-xs transition-all hover:bg-[#C88758] active:scale-[0.98] lg:inline-flex"
            >
              <Link to="/reviews">
                <MapPin className="size-3.5" />
                <span>Explorar cafés</span>
                <ArrowUpRight className="size-3.5" />
              </Link>
            </Button>
          </section>
        </main>
      </header>
    </>
  );
}

export default Header;
