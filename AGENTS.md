# Gestorial

Plataforma de gestão e mensuração de sucesso de projetos de consultoria, construída em torno da metodologia da Matriz de Realização de 6 elementos (Realização, Visão, Direção, Ação, Provisão, Reação), com controle de acesso por papel e dashboard financeiro.

## Stack

- **Linguagem**: TypeScript (strict) + React 18
- **Framework**: Next.js 15.0.3 (App Router)
- **Estilo**: Tailwind CSS 3.4 + ícones lucide-react
- **Tempo real**: socket.io / socket.io-client 4.7 (declarados como dependência)
- **Banco**: Prisma ORM 5.6 (`@prisma/client` + `prisma`) — PostgreSQL recomendado. ATENÇÃO: ainda **não há** diretório `prisma/` nem `schema.prisma` no repo; a autenticação e os dados atuais são **mock** (ver `lib/auth.ts`, `lib/data.ts`). O ORM está previsto, não implementado.
- **Deploy**: Vercel (padrão para Next.js; sem `vercel.json` no repo)
- **Package manager**: npm (`package-lock.json`)

## Comandos

```bash
npm install        # instalar dependências
npm run dev        # servidor de desenvolvimento (localhost:3000)
npm run build      # build de produção
npm run start      # servir o build de produção
npm run lint       # ESLint (next lint)
```

Não há script de testes configurado.

## Estrutura

- `app/` — rotas do App Router
  - `page.tsx`, `layout.tsx`, `loading.tsx`, `not-found.tsx` — raiz
  - `login/` — tela de login (mock)
  - `dashboard/` — área logada: `financial/`, `projects/` (+ `projects/[id]/`), `realization-matrix/`
  - `test/` — página de teste
  - `globals.css` — estilos globais
- `lib/` — lógica compartilhada: `auth.ts` (AuthService mock), `data.ts` (dados mock), `Logo.tsx`, `Navigation.tsx`, `ProjectComments.tsx`, `index.ts`
- `components/` — componentes de UI
- `types/` — tipos TS (User, UserRole etc.)
- `next.config.js`, `tailwind.config.js`, `postcss.config.js`, `tsconfig.json`

## Convenções de código

- TypeScript `strict: true`. Alias de import `@/*` mapeado para a raiz do projeto.
- Componentes React funcionais; UI com Tailwind.
- **Cuidado**: `next.config.js` tem `eslint.ignoreDuringBuilds: true` e `typescript.ignoreBuildErrors: true`. O build **não** barra em erros de lint/type. Rode `npm run lint` e `tsc --noEmit` manualmente antes de abrir PR — não confie no build para pegar erros.
- Papéis do RBAC: `gestorial_admin`, `gestorial_staff`, `client_admin`, `client_user`.

## Variáveis de ambiente

Copie `.env.example` para `.env.local`. Nomes esperados (NUNCA commitar valores):

- `NEXTAUTH_SECRET`, `NEXTAUTH_URL` — autenticação (previsto)
- `DATABASE_URL` — string de conexão PostgreSQL (para uso futuro com Prisma)
- `NODE_ENV`

Em produção, configure essas variáveis no painel da Vercel (Project Settings → Environment Variables), nunca em arquivo versionado.

## CI/CD & Deploy

- **Deploy**: Vercel com auto-deploy da branch `main` (convenção do stack; confirme o projeto na Vercel).
- **CI**: não há workflows em `.github/workflows/`. Recomendação — adicionar em PR um workflow mínimo:
  1. `npm ci`
  2. `npm run lint`
  3. `npx tsc --noEmit` (typecheck — necessário porque o build ignora erros de tipo)
  4. `npm run build`

## Boas práticas de PR

- Branches: `feat/…`, `fix/…`, `chore/…`.
- Commits no padrão Conventional Commits (`feat:`, `fix:`, `docs:`, `chore:`…).
- PRs pequenos e focados. Checklist:
  - [ ] `npm run build` passa localmente
  - [ ] `npm run lint` e `tsc --noEmit` sem erros
  - [ ] Nenhum segredo/`.env` commitado
  - [ ] Screenshots quando houver mudança de UI
  - [ ] Migrations com plano de rollback (quando o Prisma for introduzido)
- Pelo menos 1 review; **squash merge**; `main` sempre deployável.

## Testes

Não há testes no repo. Recomendação proporcional: adicionar Vitest + React Testing Library para componentes de `lib/` e para a lógica de RBAC (`auth.ts`) quando ela deixar de ser mock.

## Segurança & dados

- Nunca commitar `.env`/`.env.local` ou segredos (já ignorados no `.gitignore`).
- A autenticação atual é **mock** com credenciais fixas (`demo123`) — não usar em produção; substituir por auth real antes de qualquer dado sensível.
- Se dados de clientes/projetos passarem a ser reais, tratar como pessoais/comerciais (LGPD): mínimo necessário, acesso por papel, sem PII em logs.
- Revisar dependências periodicamente (`npm audit`).

## Gotchas

- **Prisma declarado mas não configurado**: instalar Prisma nas deps não cria o schema. Antes de usar o banco, criar `prisma/schema.prisma`, gerar o client e adicionar `prisma generate` ao build.
- **Build permissivo**: `ignoreDuringBuilds`/`ignoreBuildErrors` mascaram erros — o CI/typecheck manual é a única rede de segurança.
- socket.io está nas dependências mas verifique se há servidor/handler ativo antes de assumir tempo real funcional (Next.js App Router exige configuração específica para WebSockets).
