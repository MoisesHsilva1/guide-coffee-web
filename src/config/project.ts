import Environment from "./env";

export const projectConfig = {
  supportUrl: Environment.VITE_SUPPORT_URL ?? "",
  supportPixCode: Environment.VITE_SUPPORT_PIX ?? "",
  contactEmail: Environment.VITE_CONTACT_EMAIL ?? "",
} as const;
