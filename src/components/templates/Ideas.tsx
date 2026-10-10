import { useState, type FormEvent } from "react";
import { ArrowLeft, Check, Send } from "lucide-react";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { projectConfig } from "@/config/project";

const categories = [
  "Cafés",
  "Avaliações",
  "Mapa e localização",
  "Comunidade",
  "Outro",
];

type FormState = {
  category: string;
  idea: string;
  context: string;
  contact: string;
};

const initialForm: FormState = {
  category: "",
  idea: "",
  context: "",
  contact: "",
};

function Ideas() {
  const [formState, setFormState] = useState(initialForm);
  const [feedback, setFeedback] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const updateField = (field: keyof FormState, value: string) => {
    setFormState((current) => ({ ...current, [field]: value }));
    setFeedback("");
    setIsSubmitted(false);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!projectConfig.contactEmail) {
      setFeedback(
        "O canal de contato ainda não está configurado. Tente novamente quando o e-mail do projeto estiver disponível.",
      );
      setIsSubmitted(false);
      return;
    }

    const subject = encodeURIComponent(
      `Ideia para o Guia do Cafezin — ${formState.category}`,
    );
    const body = encodeURIComponent(
      `Categoria: ${formState.category}\n\nIdeia:\n${formState.idea}\n\nProblema ou contexto:\n${formState.context}\n\nContato opcional: ${formState.contact || "Não informado"}`,
    );

    window.location.href = `mailto:${projectConfig.contactEmail}?subject=${subject}&body=${body}`;
    setIsSubmitted(true);
    setFeedback("Abrindo seu aplicativo de e-mail para finalizar o envio.");
  };

  return (
    <main className="dark min-h-[calc(100vh-4rem)] overflow-hidden bg-background font-sans text-foreground">
      <div className="mx-auto max-w-[1440px] px-5 pb-14 sm:px-[5.5%] sm:pb-24">
        <section className="border-2 border-coffee-border bg-espresso px-5 py-10 sm:px-10 sm:py-14 lg:px-[8%] lg:py-20">
          <Link
            className="mb-8 inline-flex min-h-11 items-center gap-2 text-xs font-extrabold tracking-wider text-coffee-muted transition-colors hover:text-caramel focus-visible:outline focus-visible:outline-2 focus-visible:outline-caramel"
            to="/home"
          >
            <ArrowLeft className="size-4" /> VOLTAR PARA HOME
          </Link>
          <p className="mb-5 text-[10px] font-extrabold tracking-[0.22em] text-caramel-light">
            CONSTRUA COM A GENTE
          </p>
          <h1 className="max-w-4xl text-[clamp(2.8rem,12vw,7rem)] font-black uppercase leading-[0.86] tracking-[-0.075em]">
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

        <section className="mx-auto grid max-w-5xl gap-8 pt-10 sm:pt-16 lg:grid-cols-[.7fr_1.3fr] lg:gap-14">
          <div>
            <p className="text-[10px] font-extrabold tracking-[0.2em] text-caramel-light">
              É RÁPIDO
            </p>
            <h2 className="mt-4 text-[clamp(2.2rem,9vw,3.75rem)] font-black uppercase leading-[0.9] tracking-[-0.06em]">
              Uma ideia por vez.
            </h2>
            <p className="mt-5 text-sm leading-relaxed text-coffee-muted">
              Conte o que você imaginou e o que motivou a sugestão. Nome e
              e-mail são opcionais — o contato só serve se você quiser receber
              um retorno.
            </p>
          </div>

          <Card className="rounded-[22px] border-2 border-coffee-border bg-coffee-surface shadow-none">
            <CardContent className="p-4 sm:p-7">
              <form className="space-y-5" onSubmit={handleSubmit}>
                <label className="block space-y-2 text-sm font-bold" htmlFor="idea-category">
                  Categoria
                  <select
                    className="h-12 w-full rounded-md border border-input bg-background px-3 text-base text-foreground outline-none transition-[color,box-shadow] focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
                    id="idea-category"
                    name="category"
                    onChange={(event) => updateField("category", event.target.value)}
                    required
                    value={formState.category}
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
                </label>

                <label className="block space-y-2 text-sm font-bold" htmlFor="idea-description">
                  Sua ideia
                  <Textarea
                    id="idea-description"
                    name="idea"
                    onChange={(event) => updateField("idea", event.target.value)}
                    placeholder="O que você gostaria de ver por aqui?"
                    required
                    rows={4}
                    value={formState.idea}
                  />
                </label>

                <label className="block space-y-2 text-sm font-bold" htmlFor="idea-context">
                  O que motivou essa ideia?
                  <Textarea
                    id="idea-context"
                    name="context"
                    onChange={(event) => updateField("context", event.target.value)}
                    placeholder="Em que situação isso faria diferença?"
                    required
                    rows={4}
                    value={formState.context}
                  />
                </label>

                <label className="block space-y-2 text-sm font-bold" htmlFor="idea-contact">
                  Contato <span className="font-normal text-coffee-muted">(opcional)</span>
                  <Input
                    autoComplete="email"
                    id="idea-contact"
                    name="contact"
                    onChange={(event) => updateField("contact", event.target.value)}
                    placeholder="voce@email.com"
                    type="email"
                    value={formState.contact}
                  />
                </label>

                <Button
                  className="min-h-12 w-full rounded-full bg-primary text-sm font-extrabold text-primary-foreground hover:bg-caramel-light"
                  type="submit"
                >
                  ENVIAR IDEIA <Send />
                </Button>
                {feedback && (
                  <p
                    aria-live="polite"
                    className={isSubmitted ? "flex items-start gap-2 text-xs leading-relaxed text-sage" : "text-xs leading-relaxed text-coffee-muted"}
                    role="status"
                  >
                    {isSubmitted && <Check className="mt-0.5 size-4 shrink-0" />}
                    <span>{feedback}</span>
                  </p>
                )}
              </form>
            </CardContent>
          </Card>
        </section>
      </div>
    </main>
  );
}

export default Ideas;
