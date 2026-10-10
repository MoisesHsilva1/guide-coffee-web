import { useState } from "react";
import { Check, Send } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ideasFormSchema, type IdeasFormValues } from "@/schemas/ideasFormSchema";

const categories = [
  "Cafés",
  "Avaliações",
  "Mapa e localização",
  "Comunidade",
  "Outro",
];

const defaultValues: IdeasFormValues = {
  category: "",
  idea: "",
  context: "",
  contact: "",
};

function Ideas() {
  const [feedback, setFeedback] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const form = useForm<IdeasFormValues>({
    resolver: zodResolver(ideasFormSchema),
    defaultValues,
    mode: "onTouched",
  });

  const handleSubmit = (values: IdeasFormValues) => {
    setFeedback("");
    setIsSubmitted(false);

    return fetch("/api/ideas", {
      body: JSON.stringify({ ...values, website: "" }),
      headers: { "Content-Type": "application/json" },
      method: "POST",
    })
      .then(async (response) => {
        const result = (await response.json()) as { error?: string };

        if (!response.ok) {
          throw new Error(result.error ?? "Não foi possível enviar sua ideia.");
        }

        setIsSubmitted(true);
        setFeedback("Ideia enviada! Obrigado por ajudar a construir o Guia.");
        form.reset(defaultValues);
      })
      .catch((error: unknown) => {
        setFeedback(
          error instanceof Error
            ? error.message
            : "Não foi possível enviar sua ideia agora. Tente novamente.",
        );
      });
  };

  return (
    <main className="dark min-h-[calc(100vh-4rem)] overflow-x-hidden bg-background font-sans text-foreground">
      <div className="mx-auto w-full max-w-[1440px] px-3 pb-10 sm:px-[5.5%] sm:pb-24">
        <section className="min-w-0 border-2 border-coffee-border bg-espresso px-4 py-9 sm:px-10 sm:py-14 lg:px-[8%] lg:py-20">
          <p className="mb-5 text-[10px] font-extrabold tracking-[0.22em] text-caramel-light">
            CONSTRUA COM A GENTE
          </p>
          <h1 className="max-w-full break-words text-[clamp(2.55rem,12vw,7rem)] font-black uppercase leading-[0.86] tracking-[-0.075em]">
            QUAL IDEIA
            <br />
            DEIXARIA O GUIA
            <br />
            <span className="text-caramel [text-shadow:3px_3px_0_#050403] [-webkit-text-stroke:1px_#050403]">
              AINDA MELHOR?
            </span>
          </h1>
          <p className="mt-7 max-w-2xl text-sm leading-relaxed text-coffee-cream/80 sm:text-base">
            Pode ser uma melhoria pequena, um lugar que está faltando ou algo
            que você sente falta quando procura um café. Não precisa se
            identificar: queremos ouvir a ideia primeiro.
          </p>
        </section>

        <section className="mx-auto grid min-w-0 max-w-5xl gap-8 pt-8 sm:pt-16 lg:grid-cols-[.7fr_1.3fr] lg:gap-14">
          <div className="min-w-0">
            <p className="text-[10px] font-extrabold tracking-[0.2em] text-caramel-light">
              É RÁPIDO
            </p>
            <h2 className="mt-4 break-words text-[clamp(2.2rem,9vw,3.75rem)] font-black uppercase leading-[0.9] tracking-[-0.06em]">
              Uma ideia por vez.
            </h2>
            <p className="mt-5 text-sm leading-relaxed text-coffee-muted">
              Conte o que você imaginou e o que motivou a sugestão. Nome e
              e-mail são opcionais — o contato só serve se você quiser receber
              um retorno.
            </p>
          </div>

          <Card className="min-w-0 overflow-hidden rounded-[22px] border-2 border-coffee-border bg-coffee-surface shadow-none">
            <CardContent className="p-3 sm:p-7">
              <Form {...form}>
                <form
                  className="min-w-0 space-y-5"
                  noValidate
                  onSubmit={form.handleSubmit(handleSubmit)}
                >
                  <input
                    aria-hidden="true"
                    autoComplete="off"
                    className="absolute -left-[9999px] h-px w-px opacity-0"
                    name="website"
                    tabIndex={-1}
                    type="text"
                  />
                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-bold">Categoria</FormLabel>
                        <FormControl>
                          <select
                            {...field}
                            className="h-12 w-full min-w-0 rounded-md border border-input bg-background px-3 text-base text-foreground outline-none transition-[color,box-shadow] focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
                            aria-label="Categoria da ideia"
                          >
                            <option disabled value="">
                              Escolha um tema
                            </option>
                            {categories.map((category) => (
                              <option key={category} value={category}>
                                {category}
                              </option>
                            ))}
                          </select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="idea"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-bold">Sua ideia</FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                            aria-label="Sua ideia"
                            placeholder="O que você gostaria de ver por aqui?"
                            rows={4}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="context"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-bold">
                          O que motivou essa ideia?
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                            aria-label="O que motivou essa ideia"
                            placeholder="Em que situação isso faria diferença?"
                            rows={4}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="contact"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-bold">
                          Contato <span className="font-normal text-coffee-muted">(opcional)</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            autoComplete="email"
                            aria-label="Contato opcional"
                            placeholder="voce@email.com"
                            type="email"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    className="min-h-12 w-full rounded-full bg-primary text-sm font-extrabold text-primary-foreground hover:bg-caramel-light"
                    disabled={form.formState.isSubmitting}
                    type="submit"
                  >
                    {form.formState.isSubmitting ? "ABRINDO E-MAIL..." : "ENVIAR IDEIA"}
                    <Send />
                  </Button>
                  {feedback && (
                    <p
                      aria-live="polite"
                      className={
                        isSubmitted
                          ? "flex items-start gap-2 text-xs leading-relaxed text-sage"
                          : "text-xs leading-relaxed text-coffee-muted"
                      }
                      role="status"
                    >
                      {isSubmitted && <Check className="mt-0.5 size-4 shrink-0" />}
                      <span>{feedback}</span>
                    </p>
                  )}
                </form>
              </Form>
            </CardContent>
          </Card>
        </section>
      </div>
    </main>
  );
}

export default Ideas;
