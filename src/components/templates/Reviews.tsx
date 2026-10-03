import { ArrowLeft, LoaderCircle } from "lucide-react";
import { useEffect, useRef } from "react";
import { Link } from "react-router";
import ReviewCard from "@/components/molecules/ReviewCard";
import { useInfiniteReviews } from "@/hooks/useReview";

export default function Reviews() {
  const loadMoreRef = useRef<HTMLDivElement>(null);
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isError,
    isFetchingNextPage,
    isPending,
    refetch,
  } = useInfiniteReviews();

  useEffect(() => {
    const sentinel = loadMoreRef.current;

    if (!sentinel || !hasNextPage || isFetchingNextPage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) fetchNextPage();
      },
      { rootMargin: "240px" },
    );

    observer.observe(sentinel);

    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  const reviews = data?.pages.flatMap((page) => page.rows) ?? [];

  return (
    <main className="dark min-h-screen bg-background px-4 py-12 text-foreground sm:px-[5.5%] sm:py-20">
      <div className="mx-auto max-w-[1260px]">
        <Link
          className="mb-10 inline-flex items-center gap-2 text-[10px] font-extrabold tracking-wider text-coffee-muted hover:text-caramel"
          to="/home"
        >
          <ArrowLeft size={15} /> VOLTAR PARA HOME
        </Link>

        <header className="mb-12 max-w-2xl space-y-4">
          <h1 className="font-sans text-[clamp(3rem,7vw,6rem)] font-black uppercase leading-[0.86] tracking-[-0.075em]">
            GENTE QUE
            <br />
            <span className="text-caramel">AMA CAFÉ.</span>
          </h1>
          <p className="max-w-[470px] text-sm leading-relaxed text-coffee-muted">
            Descubra o que a comunidade está provando e encontre inspiração
            para a sua próxima parada.
          </p>
        </header>

        {isPending && (
          <ul
            aria-label="Carregando avaliações"
            className="grid list-none gap-5 p-0 sm:grid-cols-2 lg:grid-cols-3"
          >
            {[0, 1, 2].map((item) => (
              <li
                className="h-[390px] animate-pulse rounded-[5px] border-2 border-coffee-border bg-coffee-surface"
                key={item}
              />
            ))}
          </ul>
        )}

        {isError && (
          <section
            aria-live="assertive"
            className="rounded-[5px] border-2 border-coffee-border bg-coffee-surface p-7"
          >
            <p className="mb-4 text-sm">
              Não foi possível carregar as avaliações
              {error instanceof Error ? ": " + error.message : "."}
            </p>
            <button
              className="rounded-full bg-primary px-4 py-2 text-[10px] font-extrabold text-primary-foreground hover:bg-primary/90"
              onClick={() => refetch()}
              type="button"
            >
              TENTAR NOVAMENTE
            </button>
          </section>
        )}

        {!isPending && !isError && reviews.length === 0 && (
          <section className="rounded-[5px] border-2 border-coffee-border bg-coffee-surface p-7 text-sm text-coffee-muted">
            Ainda não há avaliações publicadas.
          </section>
        )}

        {!isPending && !isError && reviews.length > 0 && (
          <ul
            aria-label="Avaliações da comunidade"
            className="grid list-none gap-5 p-0 sm:grid-cols-2 lg:grid-cols-3"
          >
            {reviews.map((review) => (
              <li key={review.id}>
                <ReviewCard review={review} />
              </li>
            ))}
          </ul>
        )}

        <footer
          aria-label="Paginação das avaliações"
          ref={loadMoreRef}
          className="flex min-h-20 items-center justify-center"
        >
          {isFetchingNextPage && (
            <LoaderCircle className="animate-spin text-caramel" size={22} />
          )}
          {!hasNextPage && reviews.length > 0 && (
            <p className="text-[9px] font-extrabold tracking-wider text-coffee-muted">
              VOCÊ CHEGOU AO FIM DAS AVALIAÇÕES
            </p>
          )}
        </footer>
      </div>
    </main>
  );
}
