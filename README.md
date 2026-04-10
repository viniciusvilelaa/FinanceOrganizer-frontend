#Finance App - Frontend

Frontend de uma aplicação web de controle financeiro pessoal, permitindo que usuários gerenciem suas transações, acompanhem saldo e visualizem seu histórico financeiro.

---

## 🚀 Tecnologias Utilizadas

- React (com Vite)
- TypeScript *(opcional)*
- React Router DOM
- Axios
- LocalStorage (autenticação JWT)

---

## 🎯 Funcionalidades

- Autenticação de usuário (Login e Registro)
- Dashboard com resumo financeiro:
- Total de receitas
- Total de despesas
- Saldo atual
- Cadastro de transações
- Histórico de transações
- Rotas protegidas (Private Routes)

---

## 🧠 Arquitetura do Projeto

src/
├── assets/            # Imagens e ícones
├── components/        # Componentes reutilizáveis
├── pages/             # Páginas da aplicação
├── services/          # Comunicação com API (backend)
├── routes/            # Configuração de rotas
├── context/           # Estado global (auth)
├── hooks/             # Hooks customizados
├── utils/             # Funções auxiliares
├── App.tsx
└── main.tsx

---

## 🔗 Integração com Backend

Este frontend consome uma API desenvolvida com Node.js, Express e Prisma.

https://github.com/viniciusvilelaa/FinaceOrganizer
