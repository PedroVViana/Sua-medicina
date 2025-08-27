# Configuração do Firebase - Sua Medicina

## Visão Geral

A aplicação agora está integrada com o Firebase, substituindo os dados mockados por dados reais armazenados no Firestore (banco de dados NoSQL) e usando Firebase Auth para autenticação.

## Estrutura Implementada

### 1. Configuração do Firebase (`src/lib/firebase.ts`)
- Configuração das credenciais do Firebase
- Inicialização dos serviços: Firestore, Auth e Analytics

### 2. Serviços de Dados (`src/services/`)

#### `productService.ts`
- **Produtos**: CRUD completo com atualizações em tempo real
- **Vendedores**: CRUD completo com atualizações em tempo real
- Coleções no Firestore: `products` e `sellers`

#### `authService.ts`
- Login/logout com Firebase Auth
- Criação de usuários administradores
- Gerenciamento de estados de autenticação
- Coleção no Firestore: `users`

### 3. Contextos Atualizados

#### `ProductContext.tsx`
- Carregamento inicial dos dados do Firebase
- Criação automática de dados iniciais se não existirem
- Subscriptions para atualizações em tempo real
- Estados de loading e error
- Todas as operações CRUD são assíncronas

#### `AuthContext.tsx`
- Integração com Firebase Auth
- Observador de mudanças de estado de autenticação
- Operações de login/logout assíncronas

## Como Usar

### 1. Primeira Execução

Na primeira vez que a aplicação for executada:

1. **Configuração automática**: Os dados iniciais (produtos e vendedores) serão criados automaticamente no Firestore
2. **Usuário administrador**: Você precisa criar o primeiro usuário admin

### 2. Criando o Usuário Administrador

Para criar o primeiro usuário administrador, você pode:

#### Opção A: Usar o script de setup
```typescript
import { setupInitialAdmin } from './src/scripts/setupAdmin';
setupInitialAdmin();
```

#### Opção B: Criar manualmente via Firebase Console
1. Acesse o Firebase Console
2. Vá para Authentication
3. Crie um usuário com email: `admin@suamedicina.com` e senha: `admin123`
4. Vá para Firestore Database
5. Crie um documento na coleção `users` com:
   ```json
   {
     "name": "Administrador",
     "role": "admin"
   }
   ```

### 3. Estrutura do Banco de Dados (Firestore)

#### Coleção `products`
```json
{
  "name": "string",
  "description": "string", 
  "price": "number",
  "category": "string",
  "active": "boolean",
  "image?": "string"
}
```

#### Coleção `sellers`
```json
{
  "name": "string",
  "email": "string",
  "phone": "string", 
  "active": "boolean",
  "createdAt": "timestamp"
}
```

#### Coleção `users`
```json
{
  "name": "string",
  "role": "admin | user"
}
```

## Funcionalidades

### ✅ Implementado
- ✅ Configuração completa do Firebase
- ✅ CRUD de produtos com Firestore
- ✅ CRUD de vendedores com Firestore  
- ✅ Autenticação com Firebase Auth
- ✅ Atualizações em tempo real
- ✅ Estados de loading e error
- ✅ Criação automática de dados iniciais
- ✅ Interface atualizada para operações assíncronas

### Melhorias Futuras
- [ ] Sistema de notificações toast para feedback ao usuário
- [ ] Paginação para grandes volumes de dados
- [ ] Upload de imagens para produtos
- [ ] Logs de auditoria
- [ ] Backup automático de dados

## Comandos

```bash
# Instalar dependências (já feito)
npm install firebase

# Executar a aplicação
npm run dev

# Build para produção
npm run build
```

## Segurança

### Regras do Firestore (recomendadas)
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Permitir leitura de produtos para todos
    match /products/{productId} {
      allow read: if true;
      allow write: if request.auth != null && 
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
    
    // Permitir leitura de vendedores para todos
    match /sellers/{sellerId} {
      allow read: if true;
      allow write: if request.auth != null && 
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
    
    // Usuários só podem ser lidos/escritos por admins
    match /users/{userId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && 
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
  }
}
```

### Regras do Auth (recomendadas)
```javascript
{
  "rules": {
    "users": {
      "$uid": {
        ".read": "$uid === auth.uid || root.child('users').child(auth.uid).child('role').val() === 'admin'",
        ".write": "root.child('users').child(auth.uid).child('role').val() === 'admin'"
      }
    }
  }
}
```

## Troubleshooting

### Problemas Comuns

1. **Erro de permissão no Firestore**
   - Verifique se as regras de segurança estão configuradas
   - No desenvolvimento, você pode usar regras mais permissivas temporariamente

2. **Usuário não consegue fazer login**
   - Verifique se o usuário existe no Firebase Auth
   - Verifique se o documento do usuário existe na coleção `users`
   - Confirme se o role está definido corretamente

3. **Dados não aparecem**
   - Verifique a conexão com a internet
   - Abra o console do navegador para ver erros
   - Verifique se as coleções existem no Firestore

4. **Operações lentas**
   - O Firestore pode levar alguns segundos na primeira conexão
   - Considere implementar cache local para melhor performance

## Logs e Debug

Para debug, abra o console do navegador (F12) e veja as mensagens de log. Os serviços logam todas as operações importantes.

---

**Nota**: Esta documentação cobre a integração completa com Firebase. A aplicação agora usa dados reais em vez de dados mockados e oferece persistência e sincronização em tempo real.
