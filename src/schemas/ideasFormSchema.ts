import { z } from "zod";

export const ideasFormSchema = z.object({
  category: z.string().min(1, "Escolha uma categoria."),
  idea: z
    .string()
    .trim()
    .min(10, "Conte um pouco mais sobre a sua ideia.")
    .max(1000, "A ideia pode ter no máximo 1000 caracteres."),
  context: z
    .string()
    .trim()
    .min(10, "Conte o que motivou essa ideia.")
    .max(1000, "O contexto pode ter no máximo 1000 caracteres."),
  contact: z
    .string()
    .trim()
    .email("Digite um e-mail válido ou deixe o campo vazio.")
    .max(120, "O contato pode ter no máximo 120 caracteres.")
    .or(z.literal("")),
});

export type IdeasFormValues = z.infer<typeof ideasFormSchema>;
