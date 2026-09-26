import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import Environment from "@/config/env";
import {
  DEFAULT_MAP_CENTER,
  DEFAULT_MAP_ZOOM,
  GEOLOCATION_OPTIONS,
  MAPBOX_STYLE,
  MAP_ERROR_MESSAGE,
} from "@/constants/mapsConstants";

export type MapCenter = [number, number];

export interface MapboxMapProps {
  center?: MapCenter;
  className?: string;
  interactive?: boolean;
  useUserLocation?: boolean;
  zoom?: number;
  "aria-label"?: string;
}

const Map = ({
  center = DEFAULT_MAP_CENTER,
  className = "size-full",
  interactive = true,
  useUserLocation = false,
  zoom = DEFAULT_MAP_ZOOM,
  "aria-label": ariaLabel = "Mapa de cafeterias",
}: MapboxMapProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const [location, setLocation] = useState<MapCenter | null>(null);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (!useUserLocation || !navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(
      ({ coords }) => setLocation([coords.longitude, coords.latitude]),
      () => undefined,
      GEOLOCATION_OPTIONS,
    );
  }, [useUserLocation]);

  useEffect(() => {
    if (!containerRef.current || !Environment.VITE_MAPBOX_TOKEN) {
      setHasError(true);
      return;
    }

    mapboxgl.accessToken = Environment.VITE_MAPBOX_TOKEN;

    try {
      const map = new mapboxgl.Map({
        container: containerRef.current,
        style: MAPBOX_STYLE,
        center,
        zoom,
        interactive,
      });

      mapRef.current = map;
      map.on("error", () => setHasError(true));
    } catch {
      setHasError(true);
    }

    return () => {
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, [center, interactive, zoom]);

  useEffect(() => {
    if (location && mapRef.current) {
      mapRef.current.setCenter(location);
    }
  }, [location]);

  return (
    <section
      aria-label={ariaLabel}
      className={`relative overflow-hidden bg-[#0D0B09] ${className}`}
      ref={containerRef}
      role="img"
    >
      {hasError && (
        <span className="absolute inset-0 grid place-items-center bg-[#0D0B09] p-6 text-center">
          <p className="max-w-xs text-xs font-bold leading-relaxed text-[#94877D]">
            {MAP_ERROR_MESSAGE}
          </p>
        </span>
      )}
    </section>
  );
};

export default Map;
