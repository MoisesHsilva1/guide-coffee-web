import { ArrowRight } from "lucide-react";
import { Link } from "react-router";
import ReviewCard from "@/components/molecules/ReviewCard";
import { useReviewFetch } from "@/hooks/useReview";

const ReviewsSection = () => {
  const { data, isPending, isError, refetch } = useReviewFetch(true, {
    limit: 2,
    offset: 0,
  });

  return (
    <section
      className="grid items-center gap-8 bg-black px-5 py-16 sm:px-[5.5%] sm:py-28 lg:min-h-[525px] lg:grid-cols-[.85fr_1.15fr] lg:gap-[7%]"
      id="avaliacoes"
    >
      <header className="flex flex-col items-start gap-5">
        <h2 className="font-sans text-[clamp(2.8rem,6vw,4.6rem)] font-black uppercase leading-[0.88] tracking-[-0.075em]">
          CAFÉS QUE
          <br />
          <span className="text-caramel">VALEM A PARADA</span>
        </h2>
        <p className="max-w-[300px] text-[13px] leading-relaxed">
          Um lugar bom fica ainda melhor quando alguém conta pra gente.
        </p>
        <Link
          className="inline-flex min-h-11 items-center gap-2 text-xs font-extrabold tracking-wider hover:text-caramel"
          to="/reviews"
        >
          LEIA AS AVALIAÇÕES <ArrowRight size={15} />
        </Link>
      </header>

      <ul className="mx-auto grid w-full max-w-[560px] min-w-0 list-none grid-cols-[minmax(0,1fr)] gap-4 p-0 sm:grid-cols-[repeat(2,minmax(0,1fr))] lg:max-w-none">
        {isPending &&
          [0, 1].map((item) => (
            <li className="min-w-0 animate-pulse overflow-hidden rounded-[5px] border-2 border-coffee-border bg-coffee-surface" key={item}>
              <div className="aspect-[16/10] w-full bg-coffee-raised" />
              <div className="space-y-4 p-4 sm:p-6">
                <div className="h-4 w-1/3 rounded bg-coffee-raised" />
                <div className="space-y-2">
                  <div className="h-5 w-4/5 rounded bg-coffee-raised" />
                  <div className="h-4 w-full rounded bg-coffee-raised" />
                  <div className="h-4 w-3/4 rounded bg-coffee-raised" />
                </div>
                <div className="h-4 w-2/3 rounded bg-coffee-raised" />
              </div>
            </li>
          ))}
        {isError && (
          <li className="col-span-full min-w-0 rounded-[5px] border-2 border-coffee-border bg-coffee-surface p-6 text-sm">
            Não foi possível carregar as avaliações.{" "}
            <button
              className="font-extrabold text-caramel"
              onClick={() => refetch()}
              type="button"
            >
              Tentar novamente
            </button>
          </li>
        )}
        {!isPending && !isError && data?.rows.length === 0 && (
          <li className="col-span-full min-w-0 text-sm text-coffee-muted">
            Ainda não há avaliações publicadas.
          </li>
        )}
        {!isPending &&
          !isError &&
          data?.rows.map((review) => (
            <li className="min-w-0" key={review.id}>
              <ReviewCard review={review} />
            </li>
          ))}
      </ul>
    </section>
  );
};

export default ReviewsSection;
