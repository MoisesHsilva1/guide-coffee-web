const allowedCategories = new Set([
  "Cafés",
  "Avaliações",
  "Mapa e localização",
  "Comunidade",
  "Outro",
]);

type IdeasPayload = {
  category?: unknown;
  context?: unknown;
  contact?: unknown;
  idea?: unknown;
  website?: unknown;
};

function json(body: Record<string, string | boolean>, status = 200) {
  return new Response(JSON.stringify(body), {
    headers: {
      "Cache-Control": "no-store",
      "Content-Type": "application/json",
    },
    status,
  });
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request: Request): Promise<Response> {
  try {
    const payload = (await request.json()) as IdeasPayload;

    if (typeof payload.website === "string" && payload.website.trim()) {
      return json({ ok: true });
    }

    const category = typeof payload.category === "string" ? payload.category : "";
    const idea = typeof payload.idea === "string" ? payload.idea.trim() : "";
    const context =
      typeof payload.context === "string" ? payload.context.trim() : "";
    const contact =
      typeof payload.contact === "string" ? payload.contact.trim() : "";

    if (
      !allowedCategories.has(category) ||
      idea.length < 10 ||
      idea.length > 1000 ||
      context.length < 10 ||
      context.length > 1000 ||
      (contact && (contact.length > 120 || !isValidEmail(contact)))
    ) {
      return json({ error: "Revise os campos e tente novamente." }, 400);
    }

    const apiKey = process.env.RESEND_API_KEY;
    const from = process.env.IDEAS_FROM_EMAIL;
    const to = process.env.IDEAS_TO_EMAIL;

    if (!apiKey || !from || !to) {
      console.error("Ideas email is not configured.");
      return json(
        { error: "O envio está temporariamente indisponível. Tente novamente mais tarde." },
        503,
      );
    }

    const resendResponse = await fetch("https://api.resend.com/emails", {
      body: JSON.stringify({
        from,
        subject: `Nova ideia para o Guia do Cafezin — ${category}`,
        text: [
          `Categoria: ${category}`,
          "",
          "Ideia:",
          idea,
          "",
          "Problema ou contexto:",
          context,
          "",
          `Contato opcional: ${contact || "Não informado"}`,
        ].join("\n"),
        to: [to],
      }),
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      method: "POST",
    });

    if (!resendResponse.ok) {
      console.error("Ideas email provider rejected the request.", {
        status: resendResponse.status,
      });
      return json(
        { error: "Não foi possível enviar sua ideia agora. Tente novamente." },
        502,
      );
    }

    return json({ ok: true });
  } catch (error) {
    console.error("Ideas endpoint failed.", error);
    return json({ error: "Não foi possível processar sua ideia." }, 400);
  }
}
