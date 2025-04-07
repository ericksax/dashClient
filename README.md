# DashClient

Plataforma que possibilita a criação de um perfil e posterior registro de contatos que se relacionan com esse perfil. O back end possibilita o recurso de criação, deleção, update e leitura (CRUD)
Front:

- Login
- Autenticação JWT
- Painel de gerenciamento de contatos (criação, edição, deleção e visualização)
- Proteção de rotas
- Gerenciamento de estado

Back

- CRUD Cliente e Contatos
- JWT Login
- Seriaização e validacões com Zod
- REST

## Tech Stack

**Client:** React(NextJs), Zustand, TailwindCSS

**Server:** Node, Express, TypeOrm, Postgres

## Variaveis de Ambiente

Para rodar o projeto, você vai precisar definir as variaveis de ambiente abaixo no arquivo .env, que deve ser criado na raiz da pasta back.

`API_KEY`

`DATABASE_URL` (postgres://<user>:<pass>@<host>:<port>/dbname)

`SECRET_KEY`

`EXPIRES_IN`

`PORT`

`ANOTHER_API_KEY`

## Rodando local (Front)

Clone o projeto

```bash
  git clone https://github.com/Kenzie-Academy-Brasil-Developers/dash-client.git
```

Vá para a pasta do projeto.

```bash
  cd dash-client/front
```

Instalar dependencias

```bash
  npm install
```

Start app

```bash
  npm run dev
```

## Rodando local (Back)

Vá para a pasta do projeto.

```bash
  cd dash-client/back
```

Instalar dependências

```bash
  npm install
```

Rodar as migrations:

```bash
  npm run typeorm migration:run -- -d src/data-source.ts
```

Start app

```bash
  npm run dev
```

## Authors

Feito com amor por:

- [@ericksax](https://www.github.com/ericksax)
