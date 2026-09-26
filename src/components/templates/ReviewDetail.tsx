import { isAxiosError } from "axios";
import { ArrowLeft, MapPin, Star } from "lucide-react";
import { Link, useParams } from "react-router";
import { useReviewById } from "@/hooks/useReview";
import { formatReviewDate } from "@/lib/reviewUtils";

function ReviewImage({
  imageUrl,
  title,
}: {
  imageUrl: string;
  title: string;
}) {
  if (imageUrl) {
    return (
      <img
        alt={title}
        className="h-full min-h-[280px] w-full object-cover"
        src={imageUrl}
      />
    );
  }

  return (
    <span
      aria-hidden="true"
      className="grid min-h-[280px] place-items-center bg-caramel text-9xl text-coffee-border"
    >
      ☕
    </span>
  );
}

export default function ReviewDetail() {
  const { id } = useParams();
  const { data: review, error, isError, isPending, refetch } = useReviewById(id);
  const isNotFound =
    isError && isAxiosError(error) && error.response?.status === 404;

  if (isPending) {
    return (
      <main className="dark min-h-screen bg-background px-4 py-12 text-foreground sm:px-[5.5%] sm:py-20">
        <div className="mx-auto max-w-[1000px]">
          <div className="mb-10 h-4 w-36 animate-pulse rounded bg-coffee-surface" />
          <section
            aria-label="Carregando avaliação"
            className="grid gap-8 overflow-hidden rounded-[8px] border-2 border-coffee-border bg-coffee-surface lg:grid-cols-2"
          >
            <div className="min-h-[280px] animate-pulse bg-coffee-raised" />
            <div className="space-y-5 p-6 sm:p-10">
              <div className="h-5 w-32 animate-pulse rounded bg-coffee-raised" />
              <div className="h-14 w-4/5 animate-pulse rounded bg-coffee-raised" />
              <div className="h-24 w-full animate-pulse rounded bg-coffee-raised" />
            </div>
          </section>
        </div>
      </main>
    );
  }

  if (isNotFound) {
    return (
      <main className="dark min-h-screen bg-background px-4 py-12 text-foreground sm:px-[5.5%] sm:py-20">
        <div className="mx-auto max-w-[1000px]">
          <Link
            className="mb-10 inline-flex items-center gap-2 text-[10px] font-extrabold tracking-wider text-coffee-muted hover:text-caramel"
            to="/reviews"
          >
            <ArrowLeft size={15} /> VOLTAR PARA AVALIAÇÕES
          </Link>
          <section className="rounded-[8px] border-2 border-coffee-border bg-coffee-surface p-8">
            <h1 className="mb-3 font-sans text-3xl font-black uppercase">
              Avaliação não encontrada
            </h1>
            <p className="mb-6 text-sm text-coffee-muted">
              Essa avaliação pode ter sido removida ou não existe mais.
            </p>
            <Link
              className="inline-flex rounded-full bg-primary px-4 py-2 text-[10px] font-extrabold text-primary-foreground"
              to="/reviews"
            >
              VER TODAS AS AVALIAÇÕES
            </Link>
          </section>
        </div>
      </main>
    );
  }

  if (isError || !review) {
    return (
      <main className="dark min-h-screen bg-background px-4 py-12 text-foreground sm:px-[5.5%] sm:py-20">
        <div className="mx-auto max-w-[1000px]">
          <Link
            className="mb-10 inline-flex items-center gap-2 text-[10px] font-extrabold tracking-wider text-coffee-muted hover:text-caramel"
            to="/reviews"
          >
            <ArrowLeft size={15} /> VOLTAR PARA AVALIAÇÕES
          </Link>
          <section aria-live="assertive" className="rounded-[8px] border-2 border-coffee-border bg-coffee-surface p-8">
            <h1 className="mb-3 font-sans text-3xl font-black uppercase">
              Não foi possível carregar a avaliação
            </h1>
            <p className="mb-6 text-sm text-coffee-muted">
              Tente novamente em alguns instantes.
            </p>
            <button
              className="rounded-full bg-primary px-4 py-2 text-[10px] font-extrabold text-primary-foreground"
              onClick={() => refetch()}
              type="button"
            >
              TENTAR NOVAMENTE
            </button>
          </section>
        </div>
      </main>
    );
  }

  const rating = Math.max(0, Math.min(5, Math.round(review.rating)));

  return (
    <main className="dark min-h-screen bg-background px-4 py-12 text-foreground sm:px-[5.5%] sm:py-20">
      <div className="mx-auto max-w-[1000px]">
        <Link
          className="mb-10 inline-flex items-center gap-2 text-[10px] font-extrabold tracking-wider text-coffee-muted hover:text-caramel"
          to="/reviews"
        >
          <ArrowLeft size={15} /> VOLTAR PARA AVALIAÇÕES
        </Link>

        <article className="overflow-hidden rounded-[8px] border-2 border-coffee-border bg-coffee-surface shadow-[6px_6px_0_#050403]">
          <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
            <figure className="bg-coffee-raised">
              <ReviewImage imageUrl={review.imageUrl} title={review.title} />
            <figcaption className="sr-only">{review.title}</figcaption>
            </figure>

            <section
              aria-labelledby="review-detail-title"
              className="flex flex-col gap-6 p-6 sm:p-10"
            >
              <header className="flex flex-wrap items-center justify-between gap-3">
                <div
                  aria-label={"Nota " + review.rating + " de 5"}
                  className="flex gap-1 text-caramel"
                >
                  {Array.from({ length: 5 }, (_, index) => (
                    <Star
                      fill={index < rating ? "currentColor" : "none"}
                      key={index}
                      size={18}
                    />
                  ))}
                </div>
                <span className="rounded-full border border-coffee-border bg-coffee-raised px-3 py-1.5 text-[9px] font-extrabold uppercase tracking-wider">
                  {review.drinkType}
                </span>
              </header>

              <section className="space-y-4">
                <p className="text-[9px] font-extrabold tracking-[0.14em] text-coffee-muted">
                  AVALIAÇÃO DA COMUNIDADE
                </p>
                <h1
                  className="font-sans text-[clamp(2.5rem,6vw,5rem)] font-black uppercase leading-[0.88] tracking-[-0.075em]"
                  id="review-detail-title"
                >
                  {review.title}
                </h1>
                <p className="text-base leading-relaxed text-coffee-cream/85">
                  {review.description}
                </p>
              </section>

              <footer className="mt-auto border-t border-coffee-border pt-5 text-[10px] font-extrabold tracking-wider text-coffee-muted">
                <dl className="space-y-4">
                  <div className="flex items-start gap-2">
                    <dt className="sr-only">Local</dt>
                    <dd className="flex items-start gap-2">
                      <MapPin
                        aria-hidden="true"
                        className="mt-0.5 shrink-0 text-caramel"
                        size={15}
                      />
                      <address className="not-italic">{review.address}</address>
                    </dd>
                  </div>
                  <div>
                    <dt className="sr-only">Data de publicação</dt>
                    <dd>
                      <time dateTime={review.createdAt}>
                        Publicada em {formatReviewDate(review.createdAt)}
                      </time>
                    </dd>
                  </div>
                </dl>
              </footer>
            </section>
          </div>
        </article>
      </div>
    </main>
  );
}
