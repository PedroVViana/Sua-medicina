# Configuração do Google Authentication - Firebase

## Visão Geral

Este documento explica como configurar o Google Authentication no Firebase Console para permitir que os usuários façam login com suas contas Google na aplicação Sua Medicina.

## Implementação Realizada

### ✅ Funcionalidades Adicionadas

1. **Login com Google** na página administrativa
2. **Login com Google** na landing page (modal)
3. **Componente reutilizável** `GoogleLoginButton`
4. **Gerenciamento automático** de usuários no Firestore
5. **Interface integrada** com estado de autenticação

## Configuração no Firebase Console

### 1. Habilitar Google Authentication

1. Acesse o [Firebase Console](https://console.firebase.google.com/)
2. Selecione seu projeto `suamedicina-88266`
3. Vá para **Authentication** > **Sign-in method**
4. Clique em **Google** na lista de provedores
5. Ative o **Enable**
6. Configure os campos obrigatórios:

#### Configurações Básicas:
- **Project support email**: Seu email de contato
- **Project public-facing name**: "Sua Medicina"

#### Configurações Web SDK:
- **Web SDK configuration**: Será preenchido automaticamente
- **OAuth 2.0 client IDs**: Serão criados automaticamente

### 2. Configurar Domínios Autorizados

1. Ainda em **Authentication** > **Settings**
2. Na seção **Authorized domains**, adicione:
   - `localhost` (para desenvolvimento)
   - Seu domínio de produção (quando fizer deploy)

### 3. Configurações Adicionais (Opcional)

#### Para Personalizar a Experiência:
1. **Authentication** > **Templates**
2. Personalize os templates de email se necessário

#### Para Analytics:
1. **Authentication** > **Settings** > **User actions**
2. Configure eventos personalizados se desejar

## Estrutura Implementada

### Arquivos Criados/Modificados:

#### `src/lib/firebase.ts`
- Adicionado `GoogleAuthProvider`
- Configuração personalizada do prompt

#### `src/services/authService.ts`
- Novo método `loginWithGoogle()`
- Método `processUserLogin()` para unificar o processamento
- Criação automática de usuários no Firestore

#### `src/contexts/AuthContext.tsx`
- Novo método `loginWithGoogle`
- Interface atualizada

#### `src/components/GoogleLoginButton.tsx`
- Componente reutilizável
- Design consistente com Google Guidelines
- Tratamento de erros integrado

#### `src/pages/AdminLogin.tsx`
- Botão "Continuar com Google"
- Interface melhorada com separador

#### `src/pages/LandingPage.tsx`
- Modal de login
- Estado de autenticação no header
- Botão de logout

## Como Funciona

### Fluxo de Autenticação:

1. **Usuário clica** no botão "Continuar com Google"
2. **Pop-up do Google** é aberto para seleção de conta
3. **Firebase autentica** e retorna dados do usuário
4. **Sistema verifica** se usuário existe no Firestore:
   - Se existe: carrega dados salvos
   - Se não existe: cria novo registro com role 'user'
5. **Usuário é redirecionado** conforme seu role

### Tipos de Usuário:

- **Admin**: Role 'admin' - Acesso ao dashboard administrativo
- **User**: Role 'user' - Acesso a funcionalidades de cliente

## Regras de Firestore Atualizadas

As regras já estão configuradas para suportar autenticação Google. O arquivo `firestore.rules` já inclui:

```javascript
// Usuários podem ler seus próprios dados ou admins podem ler qualquer um
allow read: if request.auth != null && 
  (request.auth.uid == userId || 
   (exists(/databases/$(database)/documents/users/$(request.auth.uid)) &&
    get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin'));
```

## Interface do Usuário

### Landing Page:
- **Header**: Mostra "Entrar" ou "Olá, [Nome]" + "Sair"
- **Modal de Login**: Pop-up com botão Google
- **Experiência Personalizada**: Nome do usuário exibido após login

### Admin Login:
- **Duas opções**: Email/senha OU Google
- **Separador visual**: "Ou" entre os métodos
- **Redirecionamento**: Dashboard após login bem-sucedido

## Testes

### Para Testar o Google Auth:

1. **Execute a aplicação**: `npm run dev`
2. **Acesse**: `http://localhost:5173`
3. **Clique em "Entrar"** no header
4. **Teste o login** com sua conta Google
5. **Verifique**:
   - Nome aparece no header
   - Usuário é criado no Firestore
   - Role definido como 'user'

### Para Admin via Google:

1. **Faça login** com Google primeiro
2. **No Firestore**, edite o documento do usuário
3. **Altere** `role: 'user'` para `role: 'admin'`
4. **Faça logout e login novamente**
5. **Acesse** `/admin/dashboard` - deve funcionar

## Segurança

### Medidas Implementadas:

1. **Validação de domínio** no Firebase
2. **Regras de Firestore** específicas por role
3. **Criação automática** de usuários com role 'user'
4. **Verificação de autenticação** em todas as operações

### Produção:

- ✅ Configure domínios autorizados reais
- ✅ Revise regras de Firestore
- ✅ Configure templates de email personalizados
- ✅ Monitore logs de autenticação

## Troubleshooting

### Problemas Comuns:

#### "Error: This domain is not authorized"
- **Solução**: Adicione o domínio em **Authorized domains**

#### "Error: PopupClosedByUser"
- **Solução**: Normal - usuário fechou o pop-up

#### "Error: Permission denied"
- **Solução**: Verifique regras do Firestore

#### Usuário não aparece no Firestore
- **Solução**: Verifique se as regras permitem criação de documentos

### Debug:

1. **Console do navegador**: Veja logs detalhados
2. **Firebase Console**: Monitore Authentication > Users
3. **Firestore**: Verifique coleção `users`

## Próximos Passos

### Melhorias Futuras:

- [ ] **Login social adicional** (Facebook, Apple)
- [ ] **Perfil do usuário** expandido
- [ ] **Histórico de pedidos** por usuário
- [ ] **Preferências personalizadas**
- [ ] **Notificações push**

---

**Nota**: O Google Authentication está totalmente integrado e funcional. Os usuários agora podem fazer login facilmente com suas contas Google em qualquer parte da aplicação! 🚀
