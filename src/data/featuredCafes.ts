export interface FeaturedCafe {
  name: string;
  area: string;
  type: string;
  rating: string;
  note: string;
  color: "cream" | "caramel" | "dark";
  mark: string;
}

export const featuredCafes: FeaturedCafe[] = [
  {
    name: "Coffee Lab",
    area: "Vila Madalena",
    type: "TORRA PRÓPRIA",
    rating: "4.8",
    note: "Ciência, café e curiosidade em cada xícara.",
    color: "cream",
    mark: "01",
  },
  {
    name: "Um Coffee Co.",
    area: "Pinheiros",
    type: "ESPRESSO BAR",
    rating: "4.7",
    note: "Um bom motivo para perder a hora.",
    color: "caramel",
    mark: "02",
  },
  {
    name: "Futuro Refeitório",
    area: "Pinheiros",
    type: "BRUNCH",
    rating: "4.9",
    note: "Café da manhã que vira programa.",
    color: "dark",
    mark: "03",
  },
];
