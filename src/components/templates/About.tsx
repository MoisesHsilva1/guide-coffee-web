import { useState, type FormEvent } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { projectConfig } from "@/config/project";

function About() {
  const [formState, setFormState] = useState({ name: "", email: "", idea: "" });
  const [feedback, setFeedback] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!projectConfig.contactEmail) {
      setFeedback(
        "O contato ainda não foi configurado. Você pode deixar sua ideia por aqui assim que o e-mail estiver disponível.",
      );
      return;
    }

    const subject = encodeURIComponent("Ideia para o Guia do Cafezin");
    const body = encodeURIComponent(
      `Nome: ${formState.name}\nE-mail: ${formState.email}\n\nIdeia:\n${formState.idea}`,
    );

    window.location.href = `mailto:${projectConfig.contactEmail}?subject=${subject}&body=${body}`;
    setFeedback("Abrindo seu aplicativo de e-mail para enviar a ideia.");
  };

  return (
    <main className="dark overflow-hidden bg-background font-sans text-foreground">
      <div className="mx-auto max-w-[1440px] px-5 pb-14 sm:px-[5.5%] sm:pb-24">
        <section className="border-2 border-coffee-border bg-espresso px-5 py-10 sm:px-10 lg:px-[5.5%] lg:py-20">
          <div>
            <p className="mb-5 text-[10px] font-extrabold tracking-[0.22em] text-caramel-light">
              SOBRE O PROJETO
            </p>
            <h1 className="text-[clamp(2.8rem,12vw,8rem)] font-black uppercase leading-[0.86] tracking-[-0.075em]">
              UM GUIA FEITO
              <br />
              POR QUEM AMA
              <br />
              <span className="text-caramel [text-shadow:3px_3px_0_#050403] [-webkit-text-stroke:1px_#050403]">
                CAFÉ.
              </span>
            </h1>
            <p className="mt-7 max-w-4xl text-sm leading-relaxed text-coffee-cream/80 sm:text-base">
              O Guia do Cafezin nasceu para deixar mais fácil encontrar uma boa
              cafeteria, descobrir lugares novos e compartilhar aquilo que torna
              cada xícara especial.
            </p>
          </div>
        </section>

        <section
          className="mx-auto grid max-w-5xl gap-10 pt-14 sm:pt-24 lg:grid-cols-[.8fr_1.2fr] lg:gap-14"
          id="contato"
        >
          <div>
            <p className="text-[10px] font-extrabold tracking-[0.2em] text-caramel-light">
              VAMOS CONVERSAR
            </p>
            <h2 className="mt-4 text-[clamp(2.5rem,11vw,3.75rem)] font-black uppercase leading-[0.9] tracking-[-0.06em] sm:text-6xl">
              Tem uma ideia?
            </h2>
            <p className="mt-5 text-sm leading-relaxed text-coffee-muted">
              O que você gostaria de ver por aqui? Envie uma sugestão de
              feature, conte um problema ou simplesmente mande um oi.
            </p>
            {projectConfig.contactEmail && (
              <a
                className="mt-6 inline-flex items-center gap-2 text-xs font-extrabold tracking-wider text-caramel-light hover:text-coffee-cream"
                href={`mailto:${projectConfig.contactEmail}`}
              ></a>
            )}
          </div>

          <Card className="rounded-[22px] border-2 border-coffee-border bg-coffee-surface shadow-none">
            <CardContent className="p-4 sm:p-7">
              <form className="space-y-5" onSubmit={handleSubmit}>
                <div className="grid gap-5 sm:grid-cols-2">
                  <label
                    className="space-y-2 text-sm font-bold"
                    htmlFor="contact-name"
                  >
                    Nome
                    <Input
                      id="contact-name"
                      name="name"
                      onChange={(event) =>
                        setFormState({ ...formState, name: event.target.value })
                      }
                      placeholder="Como podemos te chamar?"
                      required
                      value={formState.name}
                    />
                  </label>
                  <label
                    className="space-y-2 text-sm font-bold"
                    htmlFor="contact-email"
                  >
                    E-mail
                    <Input
                      id="contact-email"
                      name="email"
                      onChange={(event) =>
                        setFormState({
                          ...formState,
                          email: event.target.value,
                        })
                      }
                      placeholder="voce@email.com"
                      required
                      type="email"
                      value={formState.email}
                    />
                  </label>
                </div>
                <label
                  className="block space-y-2 text-sm font-bold"
                  htmlFor="contact-idea"
                >
                  Sua ideia
                  <Textarea
                    id="contact-idea"
                    name="idea"
                    onChange={(event) =>
                      setFormState({ ...formState, idea: event.target.value })
                    }
                    placeholder="O que poderia deixar o Guia ainda melhor?"
                    required
                    rows={5}
                    value={formState.idea}
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
                    className="text-xs leading-relaxed text-coffee-muted"
                    role="status"
                  >
                    {feedback}
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

export default About;
