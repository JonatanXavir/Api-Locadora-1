# API da Locadora

Esta é uma API RESTful para gerenciar os recursos de uma locadora de filmes, incluindo clientes, filmes e aluguéis.

## Funcionalidades

- **Autenticação**: Sistema de login seguro com JWT para proteger as rotas.
- **Gerenciamento de Clientes**: Operações CRUD (Criar, Ler, Atualizar, Deletar) para clientes.
- **Gerenciamento de Filmes**: Operações CRUD para o acervo de filmes, com opção de filtrar por disponibilidade.
- **Gerenciamento de Aluguéis**: Sistema completo para registrar e controlar aluguéis, com cálculo automático de valor e data de devolução prevista.

## Tecnologias Utilizadas

- **Backend**: Node.js
- **Framework**: Express.js
- **ORM**: Sequelize
- **Validação de Dados**: AJV
- **Autenticação**: JSON Web Tokens (JWT) e Bcrypt.js
- **Banco de Dados**: (Pode ser configurado para PostgreSQL, MySQL, SQLite, etc., via Sequelize)

## Configuração do Ambiente

Siga os passos abaixo para configurar e executar o projeto localmente.

1.  **Clone o repositório:**
    ```bash
    git clone https://github.com/seu-usuario/Api-Locadora-1.git
    cd Api-Locadora-1
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    ```

3.  **Configure as variáveis de ambiente:**
    Crie um arquivo `.env` na raiz do projeto, seguindo o exemplo do arquivo `.env.example` (se houver). Ele deve conter as credenciais do banco de dados e o segredo do JWT.
    ```
    DB_HOST=localhost
    DB_USER=seu_usuario
    DB_PASS=sua_senha
    DB_NAME=locadora_db
    JWT_SECRET=seu_segredo_super_secreto
    ```

4.  **Inicie o servidor:**
    ```bash
    npm run dev
    ```

## Endpoints da API

A URL base para todos os endpoints é a raiz do servidor (ex: `http://localhost:3000`).

---

### Recursos de Clientes

#### `GET /clientes`
- **Descrição**: Lista todos os clientes cadastrados.
- **Resposta de Sucesso (200 OK)**:
  ```json
  [
    {
      "id": 1,
      "nome": "João da Silva",
      "email": "joao.silva@example.com",
      "cpf": "12345678901",
      "telefone": "11987654321",
      "endereco": "Rua das Flores, 123",
      "createdAt": "2023-10-27T10:00:00.000Z",
      "updatedAt": "2023-10-27T10:00:00.000Z"
    }
  ]
  ```

#### `GET /clientes/{id}`
- **Descrição**: Busca um cliente específico pelo seu ID.
- **Resposta de Sucesso (200 OK)**: Retorna o objeto do cliente.
- **Resposta de Erro (404 Not Found)**: Se o cliente não for encontrado.

#### `POST /clientes`
- **Descrição**: Cadastra um novo cliente.
- **Corpo da Requisição (JSON)**:
  ```json
  {
    "nome": "Maria Oliveira",
    "email": "maria.oliveira@example.com",
    "cpf": "98765432109",
    "telefone": "21912345678",
    "endereco": "Avenida Principal, 456"
  }
  ```
- **Resposta de Sucesso (201 Created)**: Retorna o objeto do cliente recém-criado.
- **Resposta de Erro (400 Bad Request)**: Se os dados forem inválidos.
- **Resposta de Erro (409 Conflict)**: Se o e-mail já estiver cadastrado.

#### `PUT /clientes/{id}`
- **Descrição**: Atualiza os dados de um cliente existente.
- **Corpo da Requisição (JSON)**: Campos a serem atualizados. O CPF não pode ser alterado.
  ```json
  {
    "nome": "Maria Oliveira Santos",
    "telefone": "21988887777"
  }
  ```
- **Resposta de Sucesso (200 OK)**: Retorna o objeto do cliente atualizado.
- **Resposta de Erro (404 Not Found)**: Se o cliente não for encontrado.
- **Resposta de Erro (409 Conflict)**: Se o novo e-mail já pertencer a outro cliente.

#### `DELETE /clientes/{id}`
- **Descrição**: Remove um cliente.
- **Resposta de Sucesso (204 No Content)**: Nenhuma resposta no corpo.
- **Resposta de Erro (404 Not Found)**: Se o cliente não for encontrado.
- **Resposta de Erro (409 Conflict)**: Se o cliente tiver aluguéis associados e não puder ser excluído.

---

### Recursos de Aluguéis

#### `GET /alugueis`
- **Descrição**: Lista todos os aluguéis, incluindo informações do cliente e do filme.
- **Resposta de Sucesso (200 OK)**:
  ```json
  [
    {
      "id": 1,
      "dataAluguel": "2023-10-28T03:00:00.000Z",
      "dataDevolucaoPrevista": "2023-11-04T03:00:00.000Z",
      "dataDevolucaoReal": null,
      "valor": "15.00",
      "clienteId": 1,
      "filmeId": 5,
      "cliente": {
        "id": 1,
        "nome": "João da Silva",
        "email": "joao.silva@example.com"
      },
      "filme": {
        "id": 5,
        "titulo": "A Origem",
        "disponivel": false
      }
    }
  ]
  ```

#### `GET /alugueis/{id}`
- **Descrição**: Busca um aluguel específico pelo seu ID.
- **Resposta de Sucesso (200 OK)**: Retorna o objeto do aluguel com os dados do cliente e do filme.
- **Resposta de Erro (404 Not Found)**: Se o aluguel não for encontrado.

#### `POST /alugueis`
- **Descrição**: Registra um novo aluguel.
- **Corpo da Requisição (JSON)**:
  ```json
  {
    "clienteId": 1, 
    "filmeId": 5, 
    "data_aluguel": "2023-10-28" 
  }
  ```

#### `PUT /alugueis/{id}`
- **Descrição**: Atualiza um aluguel (ex: para registrar a `data_devolucao`).
- **Corpo da Requisição (JSON)**: Apenas a data de devolução pode ser alterada.
  ```json
  {
    "data_devolucao": "2023-10-30"
  }
  ```
- **Resposta de Sucesso (200 OK)**: Retorna o objeto do aluguel atualizado.
- **Resposta de Erro (404 Not Found)**: Se o aluguel não for encontrado.

#### `DELETE /alugueis/{id}`
- **Descrição**: Remove um registro de aluguel.
- **Resposta de Sucesso (204 No Content)**.
- **Resposta de Erro (404 Not Found)**: Se o aluguel não for encontrado.

---

### Recursos de Filmes

#### `GET /filmes`
- **Descrição**: Lista todos os filmes.
- **Parâmetros de Query**:
  - `?disponivel=true`: Lista apenas os filmes disponíveis.
  - `?disponivel=false`: Lista apenas os filmes indisponíveis.

#### `GET /filmes/{id}`
- **Descrição**: Busca um filme específico pelo seu ID.

#### `POST /filmes`
- **Descrição**: Cadastra um novo filme no acervo.
- **Corpo da Requisição (JSON)**:
  ```json
  {
    "titulo": "Pulp Fiction",
    "diretor": "Quentin Tarantino",
    "genero": "Crime/Drama",
    "anoLancamento": 1994
  }
  ```

#### `PUT /filmes/{id}`
- **Descrição**: Atualiza os dados de um filme.

#### `DELETE /filmes/{id}`
- **Descrição**: Remove um filme do acervo.
- **Resposta de Erro (409 Conflict)**: Se o filme tiver aluguéis associados.

---

### Recursos de Usuários (Autenticação)

#### `POST /usuarios`
- **Descrição**: Cria um novo usuário.
- **Corpo da Requisição (JSON)**:
  ```json
  {
    "nome": "Usuário Teste",
    "email": "teste@example.com",
    "senha": "uma_senha_forte"
  }
  ```
- **Resposta de Sucesso (201 Created)**: Retorna os dados do usuário e um token de acesso.
- **Resposta de Erro (409 Conflict)**: Se o e-mail já estiver cadastrado.

#### `POST /login`
- **Descrição**: Autentica um usuário e retorna um token de acesso.
- **Corpo da Requisição (JSON)**:
  ```json
  {
    "email": "teste@example.com",
    "senha": "uma_senha_forte"
  }
  ```
- **Resposta de Sucesso (200 OK)**: Retorna um token JWT.
- **Resposta de Erro (401 Unauthorized)**: Se as credenciais forem inválidas.