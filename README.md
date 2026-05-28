# Finance App - Frontend

Frontend de uma aplicação web de controle financeiro pessoal, permitindo que usuários gerençam suas transações, acompanhem saldo, visualizem gráficos interativos e controlem seu histórico financeiro.

---

## Tecnologias Utilizadas

- React 19 (com Vite)
- TypeScript
- Tailwind CSS v4 (estilização moderna e responsiva)
- React Router DOM v7 (gerenciamento de rotas)
- Axios (comunicação HTTP)
- React Query (TanStack Query v5) (gerenciamento e cache de dados da API)
- Recharts (exibição de gráficos de pizza e de barra)
- Sonner (notificações flutuantes e elegantes)
- Use-debounce (otimização de buscas em tempo real)

---

## Funcionalidades

- Autenticação Segura: Registro e Login de usuários utilizando cookies HttpOnly (sem armazenamento de dados sensíveis no localStorage).
- Dashboard com Resumo Financeiro:
  - Saldo total consolidado
  - Total de receitas (entradas)
  - Total de despesas (saídas)
  - Gráfico de pizza interativo mostrando despesas por categoria
  - Gráfico de barras demonstrando a evolução de receitas e despesas
- Cadastro de Transações: Registro prático de novas receitas e despesas.
- Histórico de Transações Completo:
  - Filtro avançado por período (30d, 3m, 1y), tipo de transação (receita/despesa) e categoria.
  - Busca inteligente com debounce por termo na descrição da transação.
  - Paginação sob demanda integrada ao backend.
- Rotas Protegidas (Private Routes): Proteção automática de telas restritas a usuários logados.

---

## Arquitetura do Projeto

```text
src/
├── assets/            # Imagens e ícones
├── components/        # Componentes reutilizáveis (gráficos, cards, filtros, paginação, etc.)
├── context/           # Provedores de contexto global (como o AuthProvider para controle de sessão)
├── hooks/             # Hooks customizados
├── pages/             # Páginas principais da aplicação
├── routes/            # Configurações de rotas públicas e privadas
├── services/          # Integração e comunicação com a API backend
├── utils/             # Funções utilitárias e formatadores
├── App.tsx            # Componente raiz
└── main.tsx           # Ponto de entrada do aplicativo
```

---

## Integração com Backend e Autenticação

Este frontend foi desenvolvido para se conectar de forma integrada à API do FinanceOrganizer. 

### Comunicação com a API
Toda a comunicação é realizada através de requisições Axios com o parâmetro `withCredentials: true` ativado. Isso garante a transmissão automática e segura dos cookies de sessão entre o cliente e o servidor.

### Fluxo de Autenticação
- O login e registro enviam as credenciais do usuário para a API.
- O servidor valida os dados e responde definindo um cookie HttpOnly (`auth_token`).
- O token JWT não é exposto ou salvo no localStorage do navegador, fornecendo proteção robusta contra ataques do tipo XSS (Cross-Site Scripting).
- Rotas protegidas são verificadas consultando o endpoint `/users/me` na inicialização do aplicativo.

---

## Execução Local

1. Instale as dependências do projeto:
   ```bash
   npm install
   ```

2. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

O servidor local geralmente roda em `http://localhost:5173`. Para que a autenticação com cookies funcione perfeitamente em ambiente de desenvolvimento local, certifique-se de que o proxy do Vite está configurado para redirecionar as chamadas de `/api` para a porta em que o backend está executando (por padrão `http://localhost:3000`).

---

## Status do Projeto

Em desenvolvimento ativo
