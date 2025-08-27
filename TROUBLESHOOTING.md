# Guia de Solução de Problemas - Firebase

## 🚨 Problemas Comuns e Soluções

### 1. "Missing or insufficient permissions" (Firestore)

#### **Problema:**
```
FirebaseError: Missing or insufficient permissions.
```

#### **Causa:**
As regras do Firestore estão muito restritivas para desenvolvimento.

#### **Solução Imediata:**
1. Acesse o [Firebase Console](https://console.firebase.google.com/)
2. Vá para **Firestore Database** > **Regras**
3. Substitua as regras por estas **temporárias** para desenvolvimento:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // REGRAS TEMPORÁRIAS PARA DESENVOLVIMENTO
    // ⚠️ ALTERE PARA REGRAS MAIS SEGURAS EM PRODUÇÃO ⚠️
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

4. Clique em **Publicar**

#### **Para Produção:**
Use as regras mais seguras que estão comentadas no arquivo `firestore.rules`.

---

### 2. "useAuth must be used within an AuthProvider"

#### **Problema:**
```
Error: useAuth must be used within an AuthProvider
```

#### **Causa:**
O componente está tentando usar o contexto fora do provider.

#### **Solução:**
Verifique se no `src/App.tsx` os providers estão na ordem correta:

```typescript
<AuthProvider>
  <ProductProvider>
    <CartProvider>
      <Router>
        // rotas aqui
      </Router>
    </CartProvider>
  </ProductProvider>
</AuthProvider>
```

---

### 3. "Firebase: Error (auth/internal-error)" (Google Auth)

#### **Problema:**
```
Firebase: Error (auth/internal-error)
```

#### **Causa:**
Google Authentication não está configurado no Firebase Console.

#### **Solução:**
1. Acesse o [Firebase Console](https://console.firebase.google.com/)
2. Vá para **Authentication** > **Sign-in method**
3. Clique em **Google**
4. Ative o **Enable**
5. Configure:
   - **Project support email**: Seu email
   - **Project public-facing name**: "Sua Medicina"
6. Salve

---

### 4. "Cross-Origin-Opener-Policy" (Google Auth)

#### **Problema:**
```
Cross-Origin-Opener-Policy policy would block the window.closed call.
```

#### **Causa:**
Problema de CORS no desenvolvimento local.

#### **Solução:**
1. **Temporário**: Ignore este warning (não afeta funcionalidade)
2. **Permanente**: Configure domínios autorizados:
   - Firebase Console > Authentication > Settings
   - Adicione `localhost` em **Authorized domains**

---

### 5. Dados Não Aparecem na Interface

#### **Problema:**
Landing page vazia ou dashboard sem dados.

#### **Solução:**
1. **Verifique o Console**: Abra F12 e veja erros
2. **Execute Setup Manual**:
   ```typescript
   import { setupFirebase } from './src/scripts/setupFirebase';
   setupFirebase();
   ```
3. **Verifique Firestore**: No Firebase Console, veja se coleções existem

---

### 6. "Acesso Restrito" - Usuário não é Admin

#### **Problema:**
Após login com Google, usuário vê mensagem "Acesso Restrito" em vez de acessar o dashboard.

#### **Causa:**
Usuários criados via Google Login recebem role 'user' por padrão, não 'admin'.

#### **Solução:**

##### **Método 1: Via Firebase Console (Recomendado)**
1. **Faça login** com Google primeiro na aplicação
2. **Acesse** [Firebase Console](https://console.firebase.google.com/) > Firestore Database
3. **Encontre** a coleção `users`
4. **Localize** seu documento (pelo nome/email)
5. **Edite** o campo `role` de `'user'` para `'admin'`
6. **Faça logout e login novamente** na aplicação

##### **Método 2: Via Console do Navegador (Avançado)**
1. **Faça login** com Google primeiro
2. **Abra** F12 > Console
3. **Execute**:
   ```javascript
   // Substitua 'USER_ID' pelo ID real do usuário
   window.promoteToAdmin('USER_ID');
   ```
4. **Faça logout e login novamente**

##### **Como Encontrar o User ID:**
1. Firebase Console > Authentication > Users
2. Encontre o usuário pelo email
3. Copie o "User UID"

---

### 7. "Failed to load resource" (Network)

#### **Problema:**
```
Failed to load resource: net::ERR_NETWORK_CHANGED
```

#### **Causa:**
Problema de conexão ou mudança de rede.

#### **Solução:**
1. Verifique conexão com internet
2. Recarregue a página (F5)
3. Limpe cache do navegador

---

## 🔧 Comandos de Debug

### Verificar Estado da Aplicação:
```javascript
// No console do navegador:
console.log('Auth:', window.firebase?.auth?.currentUser);
console.log('Firestore:', window.firebase?.firestore);
```

### Setup Manual dos Dados:
```typescript
import { setupFirebase, createAdminUser } from './src/scripts/setupFirebase';

// Criar dados iniciais
await setupFirebase();

// Criar usuário admin
await createAdminUser();
```

### Limpar Cache do Firebase:
```javascript
// No console do navegador:
localStorage.clear();
sessionStorage.clear();
location.reload();
```

---

## 📋 Checklist de Verificação

### ✅ Firebase Console:
- [ ] Google Auth habilitado
- [ ] Domínios autorizados configurados
- [ ] Regras do Firestore permissivas para desenvolvimento
- [ ] Projeto ativo e configurado

### ✅ Código:
- [ ] Providers na ordem correta no App.tsx
- [ ] Credenciais do Firebase corretas
- [ ] Imports do Firebase corretos

### ✅ Browser:
- [ ] Console sem erros críticos
- [ ] Network funcionando
- [ ] Cache limpo

---

## 🚀 Solução Rápida (Reset Completo)

Se nada funcionar, faça um reset completo:

1. **Firebase Console:**
   ```
   - Authentication > Settings > Delete project users
   - Firestore > Delete all collections  
   - Firestore > Rules > Use development rules
   - Authentication > Sign-in method > Enable Google
   ```

2. **Aplicação:**
   ```bash
   # Limpar cache
   rm -rf node_modules package-lock.json
   npm install
   
   # Reiniciar
   npm run dev
   ```

3. **Browser:**
   ```
   - F12 > Application > Storage > Clear All
   - Hard Refresh (Ctrl+Shift+R)
   ```

---

## 📞 Ainda com Problemas?

Se após seguir este guia você ainda tiver problemas:

1. **Verifique logs** no console do navegador
2. **Compare com** os exemplos funcionais
3. **Teste com** regras permissivas primeiro
4. **Verifique** se todas as dependências estão instaladas

**Lembre-se**: As regras permissivas são apenas para desenvolvimento. Em produção, use sempre regras de segurança adequadas!
