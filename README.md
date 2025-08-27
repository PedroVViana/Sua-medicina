# Sua Medicina - Aplicação de Telemedicina

## Descrição

Aplicação web para empresa de serviços de telemedicina, desenvolvida com React, TypeScript e Tailwind CSS. A aplicação permite gerenciar produtos, vendedores e realizar vendas através de um sistema de checkout.

## Funcionalidades

### 🏠 Landing Page
- Exibição dos serviços de telemedicina
- Catálogo de produtos com preços
- Adição de produtos ao carrinho
- Compra direta de produtos

### 🔐 Área Administrativa
- Login seguro para administradores
- Gerenciamento de produtos (CRUD)
- Gerenciamento de vendedores (CRUD)
- Painel de controle intuitivo

### 🛒 Sistema de Checkout
- Carrinho de compras funcional
- Formulário de dados do cliente
- Resumo do pedido
- Simulação de processamento de pagamento

## Tecnologias Utilizadas

- **Frontend**: React 18 + TypeScript
- **Estilização**: Tailwind CSS
- **Roteamento**: React Router DOM
- **Gerenciamento de Estado**: Context API (React)
- **Build Tool**: Vite
- **Backend**: Firebase (Firestore Database + Authentication)

## Estrutura do Projeto

```
src/
├── components/          # Componentes reutilizáveis
├── contexts/           # Contextos React (Auth, Products, Cart)
├── lib/                # Configuração do Firebase
├── pages/              # Páginas da aplicação
├── scripts/            # Scripts de configuração
├── services/           # Serviços para Firebase (Auth, Firestore)
├── types/              # Definições TypeScript
├── App.tsx            # Componente principal com rotas
└── main.tsx           # Ponto de entrada
```

## Instalação e Execução

### Pré-requisitos
- Node.js 16+ 
- npm ou yarn

### Passos para instalação

1. Clone o repositório:
```bash
git clone <url-do-repositorio>
cd project
```

2. Instale as dependências:
```bash
npm install
```

3. Configure o Firebase:
   - As credenciais já estão configuradas em `src/lib/firebase.ts`
   - Na primeira execução, dados iniciais serão criados automaticamente
   - Consulte `FIREBASE_SETUP.md` para detalhes completos

4. Execute a aplicação em modo de desenvolvimento:
```bash
npm run dev
```

5. Acesse a aplicação em: `http://localhost:5173`

## Credenciais de Teste

### Login Administrativo
- **Email**: admin@suamedicina.com
- **Senha**: admin123

## Rotas da Aplicação

- `/` - Landing page com produtos
- `/admin` - Página de login administrativo
- `/admin/dashboard` - Painel administrativo (protegido)
- `/checkout` - Página de finalização de compra

## Funcionalidades Implementadas

### ✅ Completas
- [x] Sistema de roteamento
- [x] Autenticação com Firebase Auth
- [x] Gerenciamento de produtos com Firestore
- [x] Gerenciamento de vendedores com Firestore
- [x] Carrinho de compras
- [x] Sistema de checkout com Firebase
- [x] Proteção de rotas administrativas
- [x] Interface responsiva com Tailwind CSS
- [x] Integração completa com Firebase
- [x] Atualizações em tempo real
- [x] Persistência de dados

### 🔄 Em Desenvolvimento
- [ ] Sistema de pagamentos
- [ ] Notificações por email
- [ ] Dashboard com métricas de vendas
- [ ] Sistema de usuários expandido
- [ ] Upload de imagens para produtos

## Como Usar

### Para Clientes
1. Acesse a página inicial
2. Visualize os serviços disponíveis
3. Adicione produtos ao carrinho ou compre diretamente
4. Preencha seus dados no checkout
5. Confirme a compra

### Para Administradores
1. Acesse `/admin`
2. Faça login com as credenciais
3. Gerencie produtos e vendedores
4. Monitore vendas e pedidos

## Desenvolvimento

### Scripts Disponíveis
- `npm run dev` - Executa em modo de desenvolvimento
- `npm run build` - Gera build de produção
- `npm run preview` - Visualiza build de produção
- `npm run lint` - Executa linter

### Estrutura de Dados

#### Produto
```typescript
interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  active: boolean;
}
```

#### Vendedor
```typescript
interface Seller {
  id: string;
  name: string;
  email: string;
  phone: string;
  active: boolean;
  createdAt: Date;
}
```

## Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request

## Licença

Este projeto está sob a licença MIT.

## Contato

Para dúvidas ou suporte, entre em contato através do email: admin@suamedicina.com 