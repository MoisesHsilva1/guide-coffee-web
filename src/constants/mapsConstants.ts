export const DEFAULT_MAP_CENTER: [number, number] = [-46.64102, -23.55445];
export const DEFAULT_MAP_ZOOM = 12.9;
export const MAPBOX_STYLE = "mapbox://styles/mapbox/dark-v10";
export const MAP_ERROR_MESSAGE = "O mapa está temporariamente indisponível.";
export const LOCATION_ERROR_MESSAGE = "Não foi possível acessar sua localização.";

export const GEOLOCATION_OPTIONS: PositionOptions = {
  enableHighAccuracy: false,
  maximumAge: 300_000,
  timeout: 5_000,
};
