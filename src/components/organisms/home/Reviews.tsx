import { ArrowRight } from "lucide-react";

const Reviews = () => {
  return (
    <section
      className="grid items-center gap-8 px-2 py-20 sm:px-[5.5%] sm:py-28 lg:min-h-[525px] lg:grid-cols-[.85fr_1.15fr] lg:gap-[7%]"
      id="avaliacoes"
    >
      <div className="flex flex-col items-start gap-5">
        <p className="text-[9px] font-extrabold tracking-[0.14em]">
          03 — GENTE QUE SABE
        </p>
        <h2 className="font-sans text-[clamp(2.8rem,6vw,4.6rem)] font-black uppercase leading-[0.88] tracking-[-0.075em]">
          FEITO POR
          <br />
          QUEM <span className="text-caramel">AMA CAFÉ.</span>
        </h2>
        <p className="max-w-[300px] text-[13px] leading-relaxed">
          Um lugar bom fica ainda melhor quando alguém conta pra gente.
        </p>
        <a
          className="inline-flex items-center gap-2 text-[9px] font-extrabold tracking-wider hover:text-caramel"
          href="#sobre"
        >
          LEIA AS AVALIAÇÕES <ArrowRight size={15} />
        </a>
      </div>
      <div className="relative mx-auto h-[340px] w-full max-w-[560px] sm:h-[350px]">
        <article className="absolute left-[2%] top-[5%] z-[1] flex w-[72%] flex-col gap-3 rotate-[-5deg] rounded-[5px] border-2 border-coffee-border bg-coffee-surface p-5 shadow-[5px_5px_0_#050403] sm:left-[6%] sm:w-[280px] sm:p-6">
          <div className="text-[17px] tracking-[2px] text-caramel">★★★★★</div>
          <blockquote className="font-sans text-lg font-black leading-[1.06] tracking-tight sm:text-xl">
            “Ambiente incrível e o espresso é absurdo de bom.”
          </blockquote>
          <div className="flex items-center gap-2 text-[9px] font-extrabold tracking-wider">
            <span className="grid size-[29px] place-items-center rounded-full border-[1.5px] border-coffee-border bg-sage text-[13px]">
              J
            </span>
            <span>
              JOÃO M.
              <small className="mt-1 block text-[7px] text-coffee-muted">
                PINHEIROS · HÁ 2 DIAS
              </small>
            </span>
          </div>
          <span className="absolute right-4 top-3 text-[31px] text-sage">
            ✳
          </span>
        </article>
        <article className="absolute bottom-[1%] right-[2%] flex w-[72%] flex-col gap-3 rotate-[5deg] rounded-[5px] border-2 border-coffee-border bg-coffee-raised p-5 shadow-[5px_5px_0_#050403] sm:right-[1%] sm:w-[280px] sm:p-6">
          <span className="absolute -top-2 left-[40%] h-4 w-14 -rotate-6 bg-caramel/80" />
          <div className="text-[17px] tracking-[2px] text-caramel">★★★★★</div>
          <blockquote className="font-sans text-lg font-black leading-[1.06] tracking-tight sm:text-xl">
            “Vim pelo coado. Voltei pelo bolo de laranja.”
          </blockquote>
          <div className="flex items-center gap-2 text-[9px] font-extrabold tracking-wider">
            <span className="grid size-[29px] place-items-center rounded-full border-[1.5px] border-coffee-border bg-coffee-alert text-[13px] text-coffee-cream">
              B
            </span>
            <span>
              BIA R.
              <small className="mt-1 block text-[7px] text-coffee-muted">
                VILA MADALENA · HÁ 1 SEMANA
              </small>
            </span>
          </div>
        </article>
        <span className="absolute right-[6%] top-[1%] z-[2] grid size-[72px] rotate-[11deg] place-content-center rounded-full border-2 border-coffee-border bg-sage text-center font-sans text-[9px] font-black leading-[0.92] shadow-[3px_3px_0_#050403] sm:right-[14%] sm:size-[86px] sm:text-[11px]">
          CLUBE
          <br />
          DO CAFÉ
          <br />
          <b className="text-base">♥</b>
        </span>
      </div>
    </section>
  );
};

export default Reviews;
