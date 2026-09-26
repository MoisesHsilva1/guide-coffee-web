import { ArrowRight } from "lucide-react";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import coffeeHomeImage from "@/assets/coffee-home.png";
import MapSection from "../organisms/home/MapSection";
import Feed from "./Feed";

function Hero() {
  return (
    <section
      className="relative flex  flex-col overflow-hidden  border-2 border-coffee-border bg-espresso px-6 pt-5 sm:px-10 lg:min-h-[655px] lg:px-[5.5%]"
      id="top"
    >
      <div className="grid flex-1 items-center lg:grid-cols-[1.05fr_.95fr]">
        <div className="z-[1] flex flex-col items-start gap-5 py-9 lg:py-12">
          <h1 className="font-sans text-[clamp(3.2rem,8vw,6.3rem)] font-black uppercase leading-[0.86] tracking-[-0.075em]">
            DESCUBRA
            <br />
            SEU PRÓXIMO
            <br />
            <span className="text-caramel [text-shadow:3px_3px_0_#050403] [-webkit-text-stroke:1px_#050403]">
              CAFÉ FAVORITO.
            </span>
          </h1>
          <p className="max-w-[305px] text-[14px] leading-relaxed">
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
    </section>
  );
}

export default function Home() {
  return (
    <main className="dark overflow-hidden bg-background p-0 font-sans text-foreground">
      <div className="mx-auto max-w-[1440px]">
        <Hero />
        <MapSection />
        <Feed />
      </div>
    </main>
  );
}
