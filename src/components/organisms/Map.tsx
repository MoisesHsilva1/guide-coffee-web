import { useEffect, useRef, useState } from "react";
import { LocateFixed } from "lucide-react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import Environment from "@/config/env";
import {
  DEFAULT_MAP_CENTER,
  DEFAULT_MAP_ZOOM,
  GEOLOCATION_OPTIONS,
  LOCATION_ERROR_MESSAGE,
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

const MapView = ({
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
  const [isLocating, setIsLocating] = useState(false);
  const [locationError, setLocationError] = useState(false);

  const requestUserLocation = () => {
    if (!navigator.geolocation) {
      setLocationError(true);
      return;
    }

    setIsLocating(true);
    setLocationError(false);
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        setLocation([coords.longitude, coords.latitude]);
        setIsLocating(false);
      },
      () => {
        setLocationError(true);
        setIsLocating(false);
      },
      GEOLOCATION_OPTIONS,
    );
  };

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
      map.on("error", (event) => {
        const mapError = event.error as Error & { status?: number };
        const message = mapError.message ?? "";
        const isCriticalError =
          mapError.status === 401 ||
          mapError.status === 403 ||
          /access token|forbidden|style|unauthorized/i.test(message);

        if (isCriticalError && !map.isStyleLoaded()) {
          setHasError(true);
        }
      });
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
    >
      {useUserLocation && (
        <button
          aria-label="Usar minha localização no mapa"
          className="absolute left-4 top-4 z-10 grid size-10 place-items-center rounded-full bg-[#0D0B09CC] text-[#ECE4DA] shadow-lg transition-colors hover:bg-[#211811] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#C88758] disabled:cursor-wait disabled:opacity-60"
          disabled={isLocating}
          onClick={requestUserLocation}
          type="button"
        >
          <LocateFixed aria-hidden="true" size={18} />
        </button>
      )}
      {hasError && (
        <div
          aria-atomic="true"
          aria-live="assertive"
          className="pointer-events-none absolute inset-0 grid place-items-center bg-[#0D0B09] p-6 text-center"
          role="alert"
        >
          <p className="max-w-xs text-xs font-bold leading-relaxed text-[#94877D]">
            {MAP_ERROR_MESSAGE}
          </p>
        </div>
      )}
      {locationError && (
        <p
          aria-live="polite"
          className="absolute bottom-4 left-4 z-10 rounded-full bg-[#0D0B09CC] px-3 py-2 text-[10px] font-bold text-[#ECE4DA]"
        >
          {LOCATION_ERROR_MESSAGE}
        </p>
      )}
    </section>
  );
};

export default MapView;
