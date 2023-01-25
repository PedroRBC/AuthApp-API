# Api de autenticação.

<p align="center">
  <img alt="GitHub top language" src="https://img.shields.io/github/languages/top/PedroRBC/AuthApp-API" />
  <img alt="Repository size" src="https://img.shields.io/github/repo-size/PedroRBC/AuthApp-API" />
  <a href="https://github.com/PedroRBC/AuthApp-API/commits/master">
    <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/PedroRBC/AuthApp-API" />
  </a>

## Introdução

Este projeto é uma API de autenticação que utiliza o Prisma para se conectar ao banco de dados. Ele foi desenvolvido em TypeScript e utiliza várias tecnologias como CORS, compression, dotenv, express, helmet, prisma/client, morgan, passport e passport-local.

## Instalação

1. Clone o repositório: `git clone https://github.com/PedroRBC/AuthApp-API.git`

2. Instale as dependências: `npm install` ou `yarn install`

3. Configure as variáveis de ambiente: copie o arquivo `example.env` para o arquivo `.env` na raiz do projeto e adicione suas configurações de banco de dados, Token JWT.

4. Inicie o projeto: `npm start` ou `yarn start`

## Utilização

A API possui as seguintes rotas de autenticação:

- `POST /signup`: cria um novo usuário
- `POST /login`: faz login com um usuário existente
- `GET /profile`: retorna as informações do usuário logado (necessita de autenticação)

## Tecnologias utilizadas

- TypeScript
- Prisma
- CORS
- compression
- dotenv
- express
- helmet
- morgan
- passport
- passport-local
