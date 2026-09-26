import { cva } from "class-variance-authority";

export const cafeCardStyles = cva(
  "relative min-w-0 rounded-[19px] border-2 border-coffee-border p-2.5 pb-4",
  {
    variants: {
      color: {
        cream: "bg-coffee-surface text-coffee-cream",
        caramel: "bg-coffee-raised text-coffee-cream",
        dark: "bg-espresso text-coffee-cream",
      },
    },
  },
);

export const cafeCardArtStyles = cva(
  "relative grid h-[210px] place-items-center overflow-hidden rounded-xl border border-coffee-border sm:h-[225px]",
  {
    variants: {
      color: {
        cream: "bg-gradient-to-br from-caramel-light via-coffee-border to-espresso",
        caramel: "bg-gradient-to-br from-espresso via-caramel to-caramel-light",
        dark: "bg-gradient-to-br from-coffee-border via-coffee-raised to-caramel-light",
      },
    },
  },
);
