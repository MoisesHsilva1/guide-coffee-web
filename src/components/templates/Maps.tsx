import { useMemo, useState } from "react";
import { Link } from "react-router";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, LocateFixed, MapPin, Star, X } from "lucide-react";
import { useReviewFetch } from "@/hooks/useReview";
import { formatDistance, getDistanceInKm, hasValidCoordinates } from "@/lib/mapUtils";
import type { reviewResponse } from "@/types/interfaces/reviewResponse";
import { Button } from "../ui/button";
import Map, { type MapCenter } from "../organisms/Map";

function Maps() {
  const { data, isError, isPending } = useReviewFetch(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedReview, setSelectedReview] = useState<reviewResponse | null>(null);
  const [userLocation, setUserLocation] = useState<MapCenter | null>(null);
  const reviews = useMemo(() => (data?.rows ?? []).filter(hasValidCoordinates), [data?.rows]);
  const sortedReviews = useMemo(() => {
    if (!userLocation) return reviews;
    return [...reviews].sort((first, second) =>
      getDistanceInKm(userLocation, [first.longitude, first.latitude]) -
      getDistanceInKm(userLocation, [second.longitude, second.latitude]),
    );
  }, [reviews, userLocation]);
  const selectReview = (review: reviewResponse) => {
    setSelectedReview(review);
    setSidebarOpen(true);
  };

  return (
    <div className="relative flex h-[calc(100dvh-4.5rem)] w-full overflow-hidden bg-[#050403] text-[#ECE4DA]">
      <Map aria-label="Mapa interativo de cafeterias" className="absolute inset-0 z-0 size-full" onLocationChange={setUserLocation} onSelectReview={selectReview} reviews={reviews} selectedReviewId={selectedReview?.id} showLocationPrompt useUserLocation />
      <div className="absolute left-20 top-4 z-10 flex items-center gap-2 rounded-full bg-[#0D0B09E6] px-3 py-2 text-[10px] font-extrabold tracking-wider text-[#ECE4DA] shadow-lg sm:left-20 sm:top-6">
        <MapPin aria-hidden="true" className="text-[#C88758]" size={14} />
        {isPending ? "CARREGANDO CAFÉS..." : `${reviews.length} CAFÉS NO MAPA`}
      </div>
      {!sidebarOpen && <button aria-label="Abrir cafés no mapa" className="absolute bottom-6 right-4 z-20 inline-flex items-center gap-2 rounded-full bg-[#B76A3D] px-5 py-3 text-sm font-semibold text-[#ECE4DA] shadow-lg transition-all hover:bg-[#C88758] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#C88758] sm:right-6 sm:top-6 sm:bottom-auto" onClick={() => setSidebarOpen(true)} type="button"><LocateFixed aria-hidden="true" size={16} />Ver cafés</button>}

      <AnimatePresence>
        {sidebarOpen && <motion.aside aria-label="Cafés avaliados" className="absolute right-0 top-0 z-20 flex h-full w-full max-w-full flex-col overflow-y-auto border-l border-[#211811] bg-[#050403] px-5 py-6 shadow-2xl sm:w-[420px] sm:rounded-l-3xl sm:px-6 sm:py-8" initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", stiffness: 300, damping: 30 }}>
          <div className="mb-6 flex items-start justify-between gap-4"><div><p className="text-[10px] font-extrabold tracking-[0.2em] text-[#C88758]">{userLocation ? "ORDENADOS POR DISTÂNCIA" : "PONTOS NO MAPA"}</p><h1 className="mt-2 text-2xl font-black tracking-tight">Cafés avaliados</h1></div><button aria-label="Fechar cafés no mapa" className="rounded-full bg-[#0D0B09] p-2 transition-colors hover:bg-[#211811] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#C88758]" onClick={() => setSidebarOpen(false)} type="button"><X aria-hidden="true" size={20} /></button></div>
          {isError && <p className="rounded-xl border border-[#211811] bg-[#0D0B09] p-4 text-xs text-[#94877D]">Não foi possível carregar os cafés agora.</p>}
          {!isPending && !isError && sortedReviews.length === 0 && <p className="rounded-xl border border-[#211811] bg-[#0D0B09] p-4 text-xs text-[#94877D]">Nenhum café com localização válida foi encontrado.</p>}
          {selectedReview && <section aria-label="Café selecionado" className="mb-6 rounded-2xl border border-[#C88758] bg-[#0D0B09] p-4"><div className="mb-3 flex items-start justify-between gap-3"><div><p className="text-[9px] font-extrabold tracking-widest text-[#C88758]">SELECIONADO</p><h2 className="mt-1 text-xl font-black">{selectedReview.title}</h2></div><span className="flex items-center gap-1 text-sm font-extrabold text-[#C88758]"><Star aria-hidden="true" fill="currentColor" size={14} />{selectedReview.rating.toFixed(1)}</span></div><p className="text-xs leading-relaxed text-[#94877D]">{selectedReview.description}</p><p className="mt-3 text-xs text-[#ECE4DA]">{selectedReview.address}</p><p className="mt-1 text-[10px] font-bold uppercase tracking-wider text-[#94877D]">{selectedReview.drinkType}</p><Link className="mt-4 inline-flex items-center gap-2 text-[10px] font-extrabold tracking-wider text-[#C88758] hover:text-[#ECE4DA] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#C88758]" to={`/reviews/${selectedReview.id}`}>VER AVALIAÇÃO COMPLETA <ArrowRight size={14} /></Link></section>}
          {!isError && sortedReviews.length > 0 && <ul aria-label="Lista de cafés" className="m-0 list-none divide-y divide-[#211811] p-0">{sortedReviews.map((review) => { const distance = userLocation ? getDistanceInKm(userLocation, [review.longitude, review.latitude]) : null; return <li key={review.id}><button className="flex w-full items-center gap-3 py-4 text-left transition-colors hover:text-[#C88758] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#C88758]" onClick={() => selectReview(review)} type="button"><span className="grid size-9 shrink-0 place-items-center rounded-full bg-[#B76A3D] text-xs font-black text-[#050403]">{review.title.slice(0, 1).toUpperCase()}</span><span className="min-w-0 flex-1"><span className="block truncate text-sm font-black">{review.title}</span><span className="block truncate text-[10px] text-[#94877D]">{review.address}</span></span><span className="flex shrink-0 flex-col items-end gap-1 text-[10px] font-extrabold"><span className="flex items-center gap-1 text-[#C88758]"><Star aria-hidden="true" fill="currentColor" size={11} />{review.rating.toFixed(1)}</span>{distance !== null && <span className="text-[#94877D]">{formatDistance(distance)}</span>}</span></button></li>; })}</ul>}
          <Button className="mt-auto bg-[#B76A3D] text-[#ECE4DA] hover:bg-[#C88758]" onClick={() => setSidebarOpen(false)}>FECHAR</Button>
        </motion.aside>}
      </AnimatePresence>
    </div>
  );
}

export default Maps;
