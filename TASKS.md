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

- [x] Iniciar repositório Git com `git init`
- [x] Criar arquivo `.gitignore` com as regras para projeto Node.js
- [x] Comitar as alterações iniciais
- [x] Criar repositório no GitHub
  - [x] Criei com o gh cli: `gh repo create nlw-agents-server --public --source=. --remote=origin`
  - [x] Verificar se o repositório remoto foi criado corretamente com `gh browse`
