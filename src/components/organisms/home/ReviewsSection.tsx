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
      className="grid items-center bg-espresso gap-8 px-2 py-20 sm:px-[5.5%] sm:py-28 lg:min-h-[525px] lg:grid-cols-[.85fr_1.15fr] lg:gap-[7%]"
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
          className="inline-flex items-center gap-2 text-[9px] font-extrabold tracking-wider hover:text-caramel"
          to="/reviews"
        >
          LEIA AS AVALIAÇÕES <ArrowRight size={15} />
        </Link>
      </header>

      <ul className="mx-auto grid w-full max-w-[560px] list-none gap-4 p-0 sm:grid-cols-2 lg:max-w-none">
        {isPending &&
          [0, 1].map((item) => (
            <li
              className="h-[300px] animate-pulse rounded-[5px] border-2 border-coffee-border bg-coffee-surface"
              key={item}
            />
          ))}
        {isError && (
          <li className="col-span-full rounded-[5px] border-2 border-coffee-border bg-coffee-surface p-6 text-sm">
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
          <li className="col-span-full text-sm text-coffee-muted">
            Ainda não há avaliações publicadas.
          </li>
        )}
        {!isPending &&
          !isError &&
          data?.rows.map((review) => (
            <li key={review.id}>
              <ReviewCard review={review} />
            </li>
          ))}
      </ul>
    </section>
  );
};

export default ReviewsSection;
