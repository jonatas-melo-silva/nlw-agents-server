# NLW Agents Server

Este projeto é o backend do NLW Agents Server, desenvolvido durante o evento da Rocketseat.

## Tecnologias e Bibliotecas Principais

- **Node.js** (ESM, TypeScript)
- **Fastify**: Framework web para APIs HTTP
- **Drizzle ORM**: ORM para PostgreSQL
- **Zod**: Validação de esquemas e tipos
- **drizzle-seed**: Seed de dados para banco
- **@biomejs/biome**: Linter e formatter
- **Docker**: Banco de dados PostgreSQL com pgvector

## Estrutura de Pastas

- `src/db/migrations/`: Migrations do Drizzle ORM
- `src/db/schema/`: Schemas das tabelas do banco de dados utilizando `drizzle-orm/pg-core`
- `src/db//connection.ts`: Configuração da conexão com o banco de dados
- `src/db/seed/`: Scripts de seed de dados utilizando `drizzle-seed`
- `src/http/routes/`: Rotas HTTP (ex: `get-rooms.ts`)
- `src/env.ts`: Validação de variáveis de ambiente
- `src/server.ts`: Ponto de entrada do servidor HTTP

## Padrões e Convenções

- Schemas do banco em `src/db/schema/` usando Drizzle ORM
- Validação de ambiente com Zod (`src/env.ts`)
- Rotas Fastify usam Type Provider Zod para validação
- Código formatado com Biome (`biome.json`)
- Migrations gerenciadas pelo Drizzle Kit

## Setup e Execução

1. **Clone o repositório e instale as dependências:**

   ```sh
   pnpm install
   ```

2. **Configure o banco de dados:**

   - Use o Docker Compose para subir o PostgreSQL:

     ```sh
     docker-compose up -d
     ```

   - O banco estará disponível em `postgresql://docker:docker@localhost:5432/agents`

3. **Configure o arquivo `.env`** (exemplo):

   ```env
   PORT=3333
   DATABASE_URL=postgresql://docker:docker@localhost:5432/agents
   ```

4. **Rode as migrations e o seed:**

   ```sh
   npx drizzle-kit generate
   npx drizzle-kit migrate
   pnpm run db:seed
   ```

5. **Inicie o servidor em modo desenvolvimento:**

   ```sh
   pnpm run dev
   ```

## Observações

- O projeto segue padrões Rocketseat para eventos NLW.
- Para novas rotas, siga o padrão de `src/http/routes/` e utilize validação Zod.
- O endpoint `/health` está disponível para checagem de status.
