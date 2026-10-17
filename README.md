## Configuração do envio de ideias

O formulário de `/ideias` envia as sugestões para a função server-side
`/api/ideas`. O destinatário nunca é incluído no bundle do frontend.

Configure estas variáveis privadas no ambiente da Vercel:

```text
IDEAS_TO_EMAIL=seu-destinatario@gmail.com
IDEAS_FROM_EMAIL=Guia do Cafezin <ideias@seu-dominio-verificado.com>
RESEND_API_KEY=re_...
```

`IDEAS_FROM_EMAIL` precisa usar um domínio verificado no Resend. Não use o
prefixo `VITE_` nessas variáveis e não versione valores reais no repositório.
