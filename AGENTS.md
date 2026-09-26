# Repository Guidelines

## Estrutura do projeto

Este repositório é uma aplicação SPA construída com Vite, React e TypeScript.

O código da aplicação fica em `src/`:

- `routes/`: definições de rotas.
- `routes/app/`: páginas e telas da aplicação.
- `components/atoms/`: componentes básicos e indivisíveis.
- `components/molecules/`: combinações simples de componentes.
- `components/organisms/`: componentes mais complexos.
- `components/templates/`: estruturas e layouts de páginas.
- `components/ui/`: componentes genéricos de interface.
- `api/`: configuração e comunicação direta com APIs.
- `service/`: serviços e regras de integração.
- `hooks/`: hooks compartilhados.
- `types/`: tipos e interfaces TypeScript compartilhados.
- `data/`: dados estáticos e mocks.
- `assets/`: imagens, ícones e outros arquivos importados pelo código.
- `config/`: configurações da aplicação.

Os pontos de entrada principais são `src/main.tsx` e `index.html`.

Antes de criar uma nova estrutura, componente, hook ou serviço, verifique se já existe algo equivalente que possa ser reutilizado.

## Comandos

Instalar dependências:

```bash
npm install
```

Executar ambiente de desenvolvimento:

```bash
npm run dev
```

Gerar build de produção:

```bash
npm run build
```

Executar ESLint:

```bash
npm run lint
```

Visualizar o build localmente:

```bash
npm run preview
```

Atualmente não existe uma suíte de testes automatizados configurada.

Após alterações relevantes, execute obrigatoriamente:

```bash
npm run build
npm run lint
```

## Padrões de código

Utilize TypeScript e componentes funcionais React.

Siga as regras existentes em `eslint.config.js` e mantenha todas as verificações do TypeScript passando.

Convenções:

- Componentes e arquivos de componentes: `PascalCase`.
- Hooks, funções, utilitários e módulos de dados: `camelCase`.
- Hooks devem começar com `use`.
- Utilize preferencialmente o alias `@/` para imports internos de `src/`.
- Mantenha componentes pequenos e com responsabilidades claras.
- Evite duplicação de código.
- Reutilize componentes existentes antes de criar novos.
- Não introduza novas dependências sem necessidade.
- Evite `any` quando o tipo puder ser definido corretamente.
- Não deixe imports, variáveis ou código morto.
- Não altere arquivos que não estejam relacionados à tarefa atual.

Siga prioritariamente os padrões já existentes no projeto. Não introduza uma nova arquitetura ou padrão apenas por preferência.

## UI e componentes

Respeite a organização atual baseada em:

`atoms → molecules → organisms → templates`

Antes de implementar uma interface:

1. Procure componentes existentes que possam ser reutilizados.
2. Preserve o padrão visual atual da aplicação.
3. Evite criar componentes excessivamente específicos quando uma abstração reutilizável fizer sentido.
4. Evite abstrações prematuras para componentes utilizados apenas uma vez.

Alterações visuais devem ser verificadas manualmente utilizando `npm run dev`.

## Planejamento e implementação

Para features que envolvam múltiplos arquivos ou decisões relevantes, primeiro analise o código existente e produza um plano antes de implementar.

O plano deve identificar:

- objetivo da feature;
- comportamento esperado;
- arquivos provavelmente afetados;
- componentes existentes que podem ser reutilizados;
- alterações necessárias;
- possíveis impactos ou riscos;
- critérios de conclusão.

Não implemente durante a etapa de planejamento quando a solicitação pedir explicitamente apenas análise ou planejamento.

Durante a implementação:

1. Siga o plano aprovado.
2. Faça alterações incrementais e focadas.
3. Preserve comportamentos existentes que não façam parte da feature.
4. Não realize refactors não relacionados sem necessidade.
5. Valide a implementação após concluir.

## Validação

Antes de considerar uma tarefa concluída:

- verifique erros de TypeScript;
- execute `npm run lint`;
- execute `npm run build`;
- revise os arquivos modificados;
- remova código temporário ou não utilizado;
- confirme que a implementação corresponde ao comportamento solicitado.

Para mudanças de UI, também valide manualmente a rota afetada.

## Git e commits

Utilize commits pequenos e focados.

Formato:

```text
feat: descrição
fix: descrição
style: descrição
refactor: descrição
docs: descrição
chore: descrição
```

Exemplo:

```text
feat: add coffee details page
```

Não misture alterações sem relação no mesmo commit.

## Segurança e configuração

Nunca adicione ao repositório:

- credenciais;
- tokens;
- chaves de API privadas;
- senhas;
- arquivos contendo secrets de produção.

Valores específicos de ambiente devem seguir as convenções existentes em `src/config/env.ts` e arquivos locais de ambiente.

Nunca exponha secrets no código do frontend.

## Princípios gerais

Ao trabalhar neste repositório:

- entenda o código existente antes de alterá-lo;
- prefira soluções simples;
- reutilize antes de criar;
- não faça overengineering;
- não invente requisitos;
- não altere comportamento fora do escopo;
- mantenha consistência com o projeto;
- pergunte ou sinalize quando uma decisão importante não puder ser inferida com segurança.

O objetivo é implementar features corretas e simples, mantendo o projeto fácil de entender e evoluir.