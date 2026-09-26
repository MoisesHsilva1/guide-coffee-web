import { useEffect, useRef, useState } from "react";
import { LocateFixed } from "lucide-react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import Environment from "@/config/env";
import type { reviewResponse } from "@/types/interfaces/reviewResponse";
import { getMarkerColor, hasValidCoordinates } from "@/lib/mapUtils";
import { DEFAULT_MAP_CENTER, DEFAULT_MAP_ZOOM, GEOLOCATION_OPTIONS, LOCATION_ERROR_MESSAGE, MAPBOX_STYLE, MAP_ERROR_MESSAGE } from "@/constants/mapsConstants";

export type MapCenter = [number, number];

export interface MapboxMapProps {
  center?: MapCenter;
  className?: string;
  interactive?: boolean;
  onLocationChange?: (location: MapCenter | null) => void;
  onSelectReview?: (review: reviewResponse) => void;
  reviews?: reviewResponse[];
  selectedReviewId?: string;
  showLocationPrompt?: boolean;
  useUserLocation?: boolean;
  zoom?: number;
  "aria-label"?: string;
}

const MapView = ({ center = DEFAULT_MAP_CENTER, className = "size-full", interactive = true, onLocationChange, onSelectReview, reviews = [], selectedReviewId, showLocationPrompt = false, useUserLocation = false, zoom = DEFAULT_MAP_ZOOM, "aria-label": ariaLabel = "Mapa de cafeterias" }: MapboxMapProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<mapboxgl.Marker[]>([]);
  const userMarkerRef = useRef<mapboxgl.Marker | null>(null);
  const [location, setLocation] = useState<MapCenter | null>(null);
  const [hasError, setHasError] = useState(false);
  const [isLocating, setIsLocating] = useState(false);
  const [locationError, setLocationError] = useState(false);
  const [isMapReady, setIsMapReady] = useState(false);
  const [locationPromptDismissed, setLocationPromptDismissed] = useState(false);

  const requestUserLocation = () => {
    if (!navigator.geolocation) { setLocationError(true); return; }
    setIsLocating(true);
    setLocationError(false);
    navigator.geolocation.getCurrentPosition(({ coords }) => {
      const nextLocation: MapCenter = [coords.longitude, coords.latitude];
      setLocation(nextLocation);
      onLocationChange?.(nextLocation);
      setIsLocating(false);
    }, () => { setLocationError(true); setIsLocating(false); }, GEOLOCATION_OPTIONS);
  };

  useEffect(() => {
    if (!containerRef.current || !Environment.VITE_MAPBOX_TOKEN) { setHasError(true); return; }
    mapboxgl.accessToken = Environment.VITE_MAPBOX_TOKEN;
    try {
      const map = new mapboxgl.Map({ container: containerRef.current, style: MAPBOX_STYLE, center, zoom, interactive });
      mapRef.current = map;
      map.once("load", () => setIsMapReady(true));
      map.on("error", (event) => {
        const mapError = event.error as Error & { status?: number };
        if ((mapError.status === 401 || mapError.status === 403 || /access token|forbidden|style|unauthorized/i.test(mapError.message ?? "")) && !map.isStyleLoaded()) setHasError(true);
      });
    } catch { setHasError(true); }
    return () => {
      markersRef.current.forEach((marker) => marker.remove());
      markersRef.current = [];
      userMarkerRef.current?.remove();
      userMarkerRef.current = null;
      setIsMapReady(false);
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, [center, interactive, zoom]);

  useEffect(() => {
    if (!isMapReady || !mapRef.current) return;
    markersRef.current.forEach((marker) => marker.remove());
    markersRef.current = reviews.filter(hasValidCoordinates).map((review) => {
      const element = document.createElement("button");
      const selected = review.id === selectedReviewId;
      element.type = "button";
      element.setAttribute("aria-label", `${review.title}, nota ${review.rating} de 5`);
      element.title = `${review.title} · ${review.rating}/5`;
      element.style.backgroundColor = getMarkerColor(review.rating);
      element.style.border = `3px solid ${selected ? "#ECE4DA" : "#050403"}`;
      element.style.borderRadius = "999px";
      element.style.boxShadow = selected ? "0 0 0 5px rgba(236, 228, 218, 0.3), 3px 3px 0 #050403" : "3px 3px 0 #050403";
      element.style.cursor = interactive ? "pointer" : "default";
      element.style.height = selected ? "24px" : "18px";
      element.style.padding = "0";
      element.style.width = selected ? "24px" : "18px";
      if (interactive) {
        element.addEventListener("click", () => {
          onSelectReview?.(review);
          mapRef.current?.flyTo({ center: [review.longitude, review.latitude], duration: 700, zoom: Math.max(mapRef.current.getZoom(), 14) });
        });
      } else { element.disabled = true; element.tabIndex = -1; }
      return new mapboxgl.Marker({ element }).setLngLat([review.longitude, review.latitude]).addTo(mapRef.current as mapboxgl.Map);
    });
  }, [interactive, isMapReady, onSelectReview, reviews, selectedReviewId]);

  useEffect(() => {
    if (!isMapReady || !mapRef.current) return;
    userMarkerRef.current?.remove();
    userMarkerRef.current = null;
    if (!location) return;
    const element = document.createElement("div");
    element.setAttribute("aria-label", "Sua localização");
    element.style.backgroundColor = "#C88758";
    element.style.border = "3px solid #ECE4DA";
    element.style.borderRadius = "999px";
    element.style.boxShadow = "0 0 0 6px rgba(200, 135, 88, 0.3), 2px 2px 0 #050403";
    element.style.height = "16px";
    element.style.width = "16px";
    userMarkerRef.current = new mapboxgl.Marker({ element }).setLngLat(location).addTo(mapRef.current);
  }, [isMapReady, location]);

  useEffect(() => { if (location && mapRef.current) mapRef.current.setCenter(location); }, [location]);

  return <section aria-label={ariaLabel} className={`relative overflow-hidden bg-[#0D0B09] ${className}`} ref={containerRef}>
    {useUserLocation && <button aria-label="Usar minha localização no mapa" className="absolute left-4 top-4 z-10 grid size-10 place-items-center rounded-full bg-[#0D0B09CC] text-[#ECE4DA] shadow-lg transition-colors hover:bg-[#211811] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#C88758] disabled:cursor-wait disabled:opacity-60" disabled={isLocating} onClick={requestUserLocation} type="button"><LocateFixed aria-hidden="true" size={18} /></button>}
    {useUserLocation && showLocationPrompt && !locationPromptDismissed && !location && <div aria-label="Solicitação de localização" className="absolute bottom-4 left-4 right-4 z-10 flex flex-col gap-3 rounded-2xl border border-[#C88758] bg-[#0D0B09F2] p-4 shadow-2xl sm:bottom-6 sm:left-6 sm:right-auto sm:max-w-sm" role="dialog"><div><p className="text-sm font-black text-[#ECE4DA]">Encontre cafés perto de você</p><p className="mt-1 text-xs leading-relaxed text-[#94877D]">Permita sua localização para ordenar os pontos do mapa pela distância.</p></div><div className="flex items-center gap-2"><button className="rounded-full bg-[#B76A3D] px-4 py-2 text-[10px] font-extrabold tracking-wider text-[#050403] transition-colors hover:bg-[#C88758] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#C88758] disabled:cursor-wait disabled:opacity-60" disabled={isLocating} onClick={requestUserLocation} type="button">{isLocating ? "LOCALIZANDO..." : "PERMITIR LOCALIZAÇÃO"}</button><button className="rounded-full px-3 py-2 text-[10px] font-bold text-[#94877D] hover:text-[#ECE4DA] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#C88758]" onClick={() => setLocationPromptDismissed(true)} type="button">Agora não</button></div></div>}
    {hasError && <div aria-atomic="true" aria-live="assertive" className="pointer-events-none absolute inset-0 grid place-items-center bg-[#0D0B09] p-6 text-center" role="alert"><p className="max-w-xs text-xs font-bold leading-relaxed text-[#94877D]">{MAP_ERROR_MESSAGE}</p></div>}
    {locationError && <p aria-live="polite" className="absolute bottom-4 left-4 z-10 rounded-full bg-[#0D0B09CC] px-3 py-2 text-[10px] font-bold text-[#ECE4DA]">{LOCATION_ERROR_MESSAGE}</p>}
  </section>;
};

export default MapView;
