import { MapPin, Star } from "lucide-react";
import { Link } from "react-router";
import type { reviewResponse } from "@/types/interfaces/reviewResponse";
import { formatReviewDate } from "@/lib/reviewUtils";

interface ReviewCardProps {
  review: reviewResponse;
}

export default function ReviewCard({ review }: ReviewCardProps) {
  const rating = Math.max(0, Math.min(5, Math.round(review.rating)));

  return (
    <Link
      aria-label={"Abrir avaliação: " + review.title}
      className="group block h-full min-w-0 max-w-full rounded-[5px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-caramel"
      to={"/reviews/" + review.id}
    >
      <article className="flex h-full min-w-0 max-w-full cursor-pointer flex-col overflow-hidden rounded-[5px] border-2 border-coffee-border bg-coffee-surface shadow-[5px_5px_0_#050403] transition-transform group-hover:-translate-y-1">
        {review.imageUrl ? (
          <img
            src={review.imageUrl}
            alt={review.title}
            className="aspect-[16/10] max-w-full object-cover sm:aspect-auto sm:h-44 sm:w-full"
            loading="lazy"
          />
        ) : (
          <div
            aria-hidden="true"
            className="grid aspect-[16/10] w-full max-w-full place-items-center bg-caramel text-6xl text-coffee-border sm:h-44 sm:text-7xl"
          >
            ☕
          </div>
        )}

        <div className="flex min-w-0 flex-1 flex-col gap-3 p-4 sm:gap-4 sm:p-6">
          <header className="flex items-start justify-between gap-2 sm:items-center sm:gap-3">
            <div
              className="flex shrink-0 gap-0.5 text-caramel"
              aria-label={"Nota " + review.rating + " de 5"}
            >
              {Array.from({ length: 5 }, (_, index) => (
                <Star
                  key={index}
                  size={16}
                  fill={index < rating ? "currentColor" : "none"}
                />
              ))}
            </div>
            <span className="max-w-[55%] min-w-0 truncate rounded-full border border-coffee-border bg-coffee-raised px-2 py-1.5 text-[9px] font-extrabold uppercase tracking-wider sm:max-w-none sm:px-2.5 sm:text-[10px]">
              {review.drinkType}
            </span>
          </header>

          <section
            aria-labelledby={"review-title-" + review.id}
            className="min-w-0 space-y-2"
          >
            <h2
              className="line-clamp-2 break-words font-sans text-lg font-black leading-tight tracking-tight sm:text-xl"
              id={"review-title-" + review.id}
            >
              {review.title}
            </h2>
            <p className="line-clamp-3 break-words text-[13px] leading-relaxed text-coffee-cream/80 sm:line-clamp-2">
              {review.description}
            </p>
          </section>

          <footer className="mt-auto flex items-center justify-between gap-2 border-t border-coffee-border pt-3 text-[10px] font-extrabold tracking-wider text-coffee-muted sm:gap-3 sm:pt-4 sm:text-[11px]">
            <span className="flex min-w-0 items-center gap-1.5">
              <MapPin size={13} className="shrink-0 text-caramel" />
              <span className="truncate break-words">{review.address}</span>
            </span>
            <time className="shrink-0" dateTime={review.createdAt}>
              {formatReviewDate(review.createdAt)}
            </time>
          </footer>

          <span className="flex min-h-11 items-center justify-center text-center text-[10px] font-extrabold tracking-wider text-caramel sm:min-h-11">
            VER AVALIAÇÃO COMPLETA
          </span>
        </div>
      </article>
    </Link>
  );
}
