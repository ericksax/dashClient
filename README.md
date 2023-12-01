# DashClient

Plataforma que possibilita a criação de um perfil e posterior registro de contatos que se relacionan com esse perfil. A aplicação proporciona o consumo de uma api em NodeJs para o gerenciamento desses contatos. Um CRUD completo.

## Features

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

## Tech Stack

**Client:** React(NextJs), Zustand, TailwindCSS

**Server:** Node, Express, TypeOrm, Postgres

## Environment Variables

Para rodar o projeto, você vai precisar definir as seguintes variaveis de ambiente no arquivo .env

`API_KEY`

`DATABASE_URL` (postgres://<user>:<pass>@<host>:<port>/dbname)

`SECRET_KEY`

`EXPIRES_IN`

`PORT`

`ANOTHER_API_KEY`

## Rodando local (Front)

Clone o projeto

```bash
  git clone https://github.com/dash-client.git
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

Clone o projeto

```bash
  git clone https://github.com/dash-client.git
```

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
