# Facilita
## Configurando o banco de dados 
### Instalação do PostgreSQL
- Baixe e instale o PostgreSQL de acordo com seu sistema operacional (PostgrSQL 11 foi utilizado neste projeto).  
 [Link do PostgreSQL](https://www.postgresql.org/download/)  
- Prossiga com a instalação de maneira que crie um usuário padrão de nome `postgres` e senha `postgres`.  
- Execute no pgAdmin o script DDL localizado na raiz do projeto para criação do nosso banco de dados.

 
## Rodando o projeto

### Instale `concurrently` e `nodemon` globalmente
`npm i -g concurrently`
`npm i -g nodemon`

### Instale as dependências de cada pasta
`cd .\node\`
`npm install`

`cd .\react\`
`npm install`

### Execute o projeto na raiz 
`npm start`
