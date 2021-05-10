# Servidor de imagens simples

Este é um servidor simples de imagens para o trabalho da disciplina de Banco de Dados

## Como utilizar

## Primeiros passos

### SGBD

- Primeiro é necessário ter instalado e configurado o [PostgreSQL](https://www.postgresql.org/)
  - [Link para download](https://www.postgresql.org/download/)

- Depois deve-se ir para [configuracao do banco](database/index.js) e configurar essas variáveis
de acordo com a sua conexão do postgres

```javascript
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: ,
  password: ,
  port: ,
})
```

 > O host normalmente é localhost, a porta normalmente é 5432 ou 5433. Mas verifique suas configurações
 > no psql, pgAdmin ou qual client esteja usando

### Servidor

Instalações necessárias

- [Node](https://nodejs.org/en/)

ps: opcional [Yarn](https://yarnpkg.com/)


## Configurando o projeto

- Se você escolheu usar npm (default do node)
  - Rode  `npm start` na raíz do projeto
- Se você escolheu yarn
  - Rode `yarn` na raíz do projeto

## Rodar

Com tudo configurado você consegue executar utilizando
`npm start` ou `yarn start`

As rotas estão documentadas [aqui](docs/rotas.md)
