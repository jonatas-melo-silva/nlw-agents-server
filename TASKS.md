# Tarefas para o projeto NLW Agents

## 1. Setup do projeto

- [x] Iniciar o projeto com pnpm
- [x] Configurar ambiente de desenvolvimento
  - [x] instalar `typeScript` e `@types/node`
  - [x] Configurar tsconfig.json - adicionar `noEmit` e `allowImportingTsExtensions`
  - [x] Configurar package.json - adicionar `"type": "module"`
- [x] Instalar dependências do servidor com Fastify
  - [x] Instalar `fastify`
  - [x] Instalar `@fastify/cors`
  - [x] Instalar `@fastify-type-provider-zod`
  - [x] Instalar `zod`
- [x] Criar servidor
  - [x] Criar arquivo `src/server.ts`
  - [x] Configurar CORS
  - [x] Configurar serializerCompiler com Fastify Type Provider Zod
  - [x] Configurar validatorCompiler com Fastify Type Provider Zod
  - [x] Configurar fastify com type provider ZodTypeProvider
  - [x] iniciar servidor na porta 3333
  - [x] Configurar o script de inicialização no package.json
    - [x] Adicionar script `"dev": "node --env-file .env.development --experimental-strip-types --no-warnings --watch src/server.ts"`
    - [x] Adicionar script `"start": "ts-node --env-file .env.production --experimental-strip-types --no-warnings src/server.ts"`
  - [x] Criar variáveis de ambiente
    - [x] Criar arquivo `.env.development` com `PORT=3333`
    - [x] Criar arquivo `.env.production` com `PORT=3333`
  - [x] Criar arquivo `src/env.ts` para validar as variáveis de ambiente
  - [x] Configurar o servidor para usar as variáveis de ambiente
    - [x] Importar `env` do arquivo `src/env.ts`
    - [x] Usar `env.PORT` para definir a porta do servidor
    - [x] Criar rota de health check
      - [x] Criar rota GET `/health` que retorna um status 200 com a mensagem "OK"
  - [x] Configurar o biomejs
    - [x] Usar o comando `pnpm add -D -E @biomejs/biome`
    - [x] Criar arquivo `.biome.json` com o comando `npx biome init`
  - [x] Configurar o arquivo `.biome.json` com as regras desejadas
  - [x] Adicionar essas configurações ao arquivo `vscode/settings.json`

    ```json
    {
      "editor.formatOnSave": true,
      "editor.formatOnPaste": true,
      "editor.defaultFormatter": "biomejs.biome",
      "emmet.showExpandedAbbreviation": "never",
      "editor.codeActionsOnSave": {
      "source.fixAll.biome": "explicit",
      "source.organizeImports.biome": "explicit"
      }
    }
    ```

## 2. Controle de versão

- [x] Iniciar repositório Git com `git init`
- [x] Criar arquivo `.gitignore` com as regras para projeto Node.js
- [x] Comitar as alterações iniciais
- [x] Criar repositório no GitHub
  - [x] Criei com o gh cli: `gh repo create nlw-agents-server --public --source=. --remote=origin`
  - [x] Verificar se o repositório remoto foi criado corretamente com `gh browse`

## 3. Configuração docker

- [x] Criar arquivo `docker-compose.yml` com as serviços e dependências necessárias
  - [x] Adicionar serviço `nlw-agents-pg` com a imagem do PostgreSQL
    - [x] Usar a imagem `pgvector/pgvector:pg17`
    - [x] Configurar variáveis de ambiente para o PostgreSQL
      - [x] `POSTGRES_USER=docker`
      - [x] `POSTGRES_PASSWORD=docker`
      - [x] `POSTGRES_DB=agents`
    - [x] Mapear a porta 5432 do container para a porta 5432 do host
    - [x] Mapear o volume `./docker/setup.sql:/docker-entrypoint-initdb.d/setup.sql` para persistência de dados
  <!-- - [x] Adicionar serviço `nlw-agents-server` com a imagem do servidor
    - [x] Usar a imagem `node:20-alpine`
    - [x] Mapear a porta 3333 do container para a porta 3333 do host
    - [x] Mapear o volume `nlw-agents-server-data` para persistência de dados
    - [x] Mapear o volume `nlw-agents-server-src` para o diretório `src` do servidor -->

## 4. Configuração das variáveis de ambiente

- [x] Criar arquivo `.env.development` com as variáveis de ambiente para desenvolvimento
  - [x] `DATABASE_URL=postgresql://user:senha@localhost:5432/db`
  - [x] `PORT=3333`
- [x] Criar arquivo `.env.production` com as variáveis de ambiente para produção
  - [x] `DATABASE_URL=postgresql://user:senha@localhost:5432/db`
  - [x] `PORT=3333`

## 5. Configuração da conexão com o banco de dados

- [x] Criar arquivo `src/db/connection.ts` para configurar a conexão com o banco de dados
- [x] Instalar a biblioteca `postgres` para conectar ao PostgreSQL com `pnpm add postgres`
- [x] Importar a variável de ambiente `DATABASE_URL` do arquivo `src/env.ts`
- [x] Exportar a conexão `sql` usando a biblioteca `postgres` e a variável de ambiente `DATABASE_URL`
- [x] Testar a conexão com o banco de dados
  - [x] Criar um script de teste que execute uma consulta simples no banco de dados
  - [x] Executar o script de teste para verificar se a conexão está funcionando

## 6. Configuração do drizzle ORM

- [x] Instalar a biblioteca `drizzle-orm` e `drizzle-kit`
  - [x] `pnpm add drizzle-orm`
  - [x] `pnpm add -D drizzle-kit`
<!-- - [x] Criar um arquivo `drizzle.config.ts` para configurar o drizzle ORM -->
- [x] Criar as pastas `src/db/schema` e `src/db/migrations`
- [x] Criar o arquivo `src/db/schema/rooms.ts` para definir a tabela salas
- [x] Criar o arquivo `src/db/schema/index.ts` para exportar as tabelas (Barrel file)
- [x] Configurar o arquivo para criar as tabelas no banco de dados
  - [x] Criar uma variável de ambiente `.env` com a URL de conexão do banco de dados `DATABASE_URL=postgresql://user:senha@localhost:5432/db`
  - [x] Criar o arquivo `drizzle.config.ts` para configurar o drizzle ORM

    ```ts
    import { defineConfig } from 'drizzle-kit'
    import { env } from './src/env.ts'

    export default defineConfig({
      dialect: 'postgresql',
      casing: 'snake_case',
      schema: './src/db/schema/**.ts',
      out: './src/db/migrations',
      dbCredentials: {
        url: env.DATABASE_URL,
      },
    })
    ```

- [x] Criar as migrations iniciais
  - [x] Executar o comando `npx drizzle-kit generate` para gerar as migrations iniciais
  - [x] Executar o comando `npx drizzle-kit migrate` para aplicar as migrations no banco de dados
  - [x] Verificar se as tabelas foram criadas corretamente no banco de dados com: `npx drizzle-kit studio`
- [x] Configurar o drizzle-seed para popular o banco de dados com dados iniciais
  - [x] Instalar a biblioteca `drizzle-seed` com `pnpm add -D drizzle-seed`
  - [x] Criar o arquivo `seed.ts` na pasta `src/db/seed.ts`
  - [x] Configurar o arquivo `seed.ts` para popular a tabela `rooms` com dados iniciais
  - [x] Criar o script de seed no package.json
    - [x] Adicionar o script `"db:seed": "node --env-file .env --experimental-strip-types --no-warnings src/db/seed.ts"`
  - [x] Executar o comando `pnpm db:seed` para popular o banco de dados com os dados iniciais
  - [x] Verificar se os dados foram inseridos corretamente na tabela `rooms` com: `npx drizzle-kit studio`

## 7. Criação da rota para listar as salas

- [x] Criar a rota `GET /rooms` para listar as salas
  - [x] Criar o arquivo `src/http/routes/get-rooms.ts`
  - [x] Importar o `FastifyPluginCallbackZod` do pacote `fastify-type-provider-zod`
  - [x] Importar o `db` do arquivo `src/db/connection.ts`
  - [x] Importar as tabelas do arquivo `src/db/schema/index.ts`
  - [x] Criar a rota que retorna todas as salas do banco de dados
- [x] Registrar a rota no servidor
  - [x] Importar a rota `get-rooms` no arquivo `src/server.ts`
  - [x] Registrar a rota usando o método `fastify.register()`
- [x] Testar a rota usando o Insomnia ou Postman
  - [x] Fazer uma requisição GET para `http://localhost:3333/rooms`
  - [x] Verificar se a resposta contém um array de salas
  - [x] Verificar se o status da resposta é 200 OK
