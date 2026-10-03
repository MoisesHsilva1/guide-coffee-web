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
      className="group block h-full rounded-[5px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-caramel"
      to={"/reviews/" + review.id}
    >
      <article className="flex h-full cursor-pointer flex-col overflow-hidden rounded-[5px] border-2 border-coffee-border bg-coffee-surface shadow-[5px_5px_0_#050403] transition-transform group-hover:-translate-y-1">
        {review.imageUrl ? (
          <img
            src={review.imageUrl}
            alt={review.title}
            className="h-44 w-full object-cover"
            loading="lazy"
          />
        ) : (
          <div
            aria-hidden="true"
            className="grid h-44 place-items-center bg-caramel text-7xl text-coffee-border"
          >
            ☕
          </div>
        )}

        <div className="flex flex-1 flex-col gap-4 p-5 sm:p-6">
        <header className="flex items-center justify-between gap-3">
            <div
              className="flex gap-0.5 text-caramel"
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
            <span className="rounded-full border border-coffee-border bg-coffee-raised px-2.5 py-1 text-[8px] font-extrabold uppercase tracking-wider">
              {review.drinkType}
            </span>
        </header>

          <section
            aria-labelledby={"review-title-" + review.id}
            className="space-y-2"
          >
            <h2
              className="font-sans text-xl font-black leading-tight tracking-tight"
              id={"review-title-" + review.id}
            >
              {review.title}
            </h2>
            <p className="line-clamp-2 text-[13px] leading-relaxed text-coffee-cream/80">
              {review.description}
            </p>
          </section>

          <footer className="mt-auto flex flex-wrap items-center justify-between gap-3 border-t border-coffee-border pt-4 text-[9px] font-extrabold tracking-wider text-coffee-muted">
            <span className="flex min-w-0 items-center gap-1.5">
              <MapPin size={13} className="shrink-0 text-caramel" />
              <span className="truncate">{review.address}</span>
            </span>
            <time dateTime={review.createdAt}>
              {formatReviewDate(review.createdAt)}
            </time>
          </footer>

          <span className="text-center text-[8px] font-extrabold tracking-wider text-caramel">
            VER AVALIAÇÃO COMPLETA
          </span>
        </div>
      </article>
    </Link>
  );
}
