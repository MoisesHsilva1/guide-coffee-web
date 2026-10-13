import { LoaderCircle } from "lucide-react";
import { useEffect, useRef } from "react";
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
    <main className="dark min-h-screen overflow-x-hidden bg-background px-5 py-10 text-foreground sm:px-[5.5%] sm:py-20">
      <div className="mx-auto max-w-[1260px]">
        <header className="mb-12 max-w-2xl space-y-4">
          <h1 className="font-sans text-[clamp(2.8rem,12vw,6rem)] font-black uppercase leading-[0.86] tracking-[-0.075em]">
            GENTE QUE
            <br />
            <span className="text-caramel">AMA CAFÉ.</span>
          </h1>
          <p className="max-w-[470px] text-sm leading-relaxed text-coffee-muted">
            Descubra o que a comunidade está provando e encontre inspiração para
            a sua próxima parada.
          </p>
        </header>

        {isPending && (
          <ul
            aria-label="Carregando avaliações"
            className="grid list-none grid-cols-[minmax(0,1fr)] gap-5 p-0 sm:grid-cols-[repeat(2,minmax(0,1fr))] lg:grid-cols-[repeat(3,minmax(0,1fr))]"
          >
            {[0, 1, 2].map((item) => (
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
              className="min-h-11 rounded-full bg-primary px-5 py-2 text-xs font-extrabold text-primary-foreground hover:bg-primary/90"
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
            className="grid list-none grid-cols-[minmax(0,1fr)] gap-5 p-0 sm:grid-cols-[repeat(2,minmax(0,1fr))] lg:grid-cols-[repeat(3,minmax(0,1fr))]"
          >
            {reviews.map((review) => (
              <li className="min-w-0" key={review.id}>
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
