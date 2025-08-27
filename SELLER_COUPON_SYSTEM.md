# Sistema de Cupons de Vendedores - Sua Medicina

## Visão Geral

O sistema de cupons de vendedores permite que cada vendedor tenha códigos sequenciais únicos para rastrear vendas e receber comissões. Cada vendedor recebe automaticamente um cupom inicial quando é criado, e novos cupons podem ser gerados conforme necessário.

## Funcionalidades Principais

### 1. Gerenciamento de Vendedores
- **Criação**: Adicione novos vendedores com nome, email, telefone e taxa de comissão
- **Edição**: Modifique informações dos vendedores existentes
- **Status**: Ative/desative vendedores conforme necessário
- **Comissões**: Configure taxas de comissão personalizadas (0-100%)

### 2. Sistema de Cupons
- **Códigos Sequenciais**: Cada vendedor recebe cupons com códigos sequenciais (001, 002, 003...)
- **Geração Automática**: Primeiro cupom é criado automaticamente ao criar o vendedor
- **Novos Cupons**: Administradores podem gerar novos cupons para vendedores ativos
- **Rastreamento**: Sistema rastreia uso e comissões geradas por cada cupom

### 3. Aplicação de Cupons
- **Validação**: Clientes podem inserir códigos de cupom durante o checkout
- **Verificação**: Sistema valida cupom e vendedor automaticamente
- **Comissão**: Calcula e registra comissão baseada na taxa do vendedor
- **Transparência**: Cliente vê quanto o vendedor receberá de comissão

## Estrutura do Banco de Dados

### Coleção: `sellers`
```typescript
interface Seller {
  id: string;
  name: string;
  email: string;
  phone: string;
  active: boolean;
  commissionRate: number; // Taxa em porcentagem
  createdAt: Date;
}
```

### Coleção: `sellerCoupons`
```typescript
interface SellerCoupon {
  id: string;
  sellerId: string;
  code: string; // Código sequencial (001, 002, etc.)
  isActive: boolean;
  createdAt: Date;
  usedCount: number;
  totalCommission: number;
}
```

### Coleção: `orders` (atualizada)
```typescript
interface Order {
  // ... campos existentes ...
  sellerCouponCode?: string; // Código do cupom aplicado
  sellerCommission?: number; // Comissão calculada
}
```

## Como Usar

### Para Administradores

#### 1. Criar um Vendedor
1. Acesse o painel administrativo
2. Vá para a aba "Vendedores e Cupons"
3. Clique em "Novo Vendedor"
4. Preencha as informações:
   - Nome completo
   - Email
   - Telefone
   - Taxa de comissão (%)
   - Status ativo/inativo
5. Clique em "Criar"

**Nota**: O primeiro cupom (001) será criado automaticamente.

#### 2. Gerar Novos Cupons
1. Na lista de vendedores, clique em "Novo Cupom"
2. O sistema gerará automaticamente o próximo código sequencial
3. O cupom ficará ativo e disponível para uso

#### 3. Gerenciar Vendedores
- **Editar**: Clique em "Editar" para modificar informações
- **Status**: Use "Ativar/Desativar" para controlar acesso
- **Cupons**: Visualize todos os cupons e estatísticas de cada vendedor

### Para Clientes

#### 1. Aplicar Cupom Durante o Checkout
1. Adicione produtos ao carrinho
2. Prossiga para o checkout
3. Na seção "Cupom de Vendedor":
   - Digite o código fornecido pelo vendedor
   - Clique em "Aplicar"
4. O sistema validará o cupom e mostrará:
   - Nome do vendedor
   - Taxa de comissão
   - Valor da comissão que será paga

#### 2. Finalizar Compra
- O cupom aplicado será registrado no pedido
- A comissão será calculada automaticamente
- O vendedor receberá crédito pela venda

## Serviços Disponíveis

### `sellerService`
- `createSeller()`: Criar novo vendedor
- `getSellers()`: Listar todos os vendedores
- `getActiveSellers()`: Listar vendedores ativos
- `updateSeller()`: Atualizar informações
- `toggleSellerStatus()`: Ativar/desativar vendedor
- `generateNewCoupon()`: Gerar novo cupom
- `getSellerCommissionStats()`: Estatísticas de comissões

### `sellerCouponService`
- `createSellerCoupon()`: Criar novo cupom
- `generateCouponCode()`: Gerar código sequencial
- `getSellerCoupons()`: Listar cupons de um vendedor
- `getCouponByCode()`: Buscar cupom por código
- `updateCouponStats()`: Atualizar estatísticas após venda
- `validateSellerCoupon()`: Validar cupom para uso

### `orderService` (atualizado)
- `validateSellerCoupon()`: Validar cupom durante checkout
- `getOrdersBySellerCoupon()`: Buscar pedidos por cupom
- Integração automática com sistema de comissões

## Configuração Inicial

### 1. Executar Script de Configuração
```bash
npm run setup:sellers
# ou
node src/scripts/setupSellerCollections.ts
```

### 2. Verificar Regras do Firestore
As regras já incluem as novas coleções:
- `sellers`: Leitura pública, escrita apenas para admins
- `sellerCoupons`: Leitura pública, escrita apenas para admins

### 3. Testar Sistema
1. Crie alguns vendedores de teste
2. Gere cupons para eles
3. Teste aplicação de cupons durante checkout
4. Verifique rastreamento de comissões

## Benefícios do Sistema

### Para a Empresa
- **Rastreabilidade**: Saiba exatamente quem vendeu cada produto
- **Motivação**: Vendedores são recompensados por suas vendas
- **Análise**: Dados detalhados sobre performance de vendas
- **Controle**: Gestão centralizada de vendedores e comissões

### Para Vendedores
- **Comissões**: Recebem automaticamente por vendas realizadas
- **Códigos Únicos**: Cada vendedor tem seus próprios códigos
- **Transparência**: Veem exatamente quanto ganharam
- **Facilidade**: Sistema automatizado de rastreamento

### Para Clientes
- **Benefícios**: Podem apoiar vendedores específicos
- **Transparência**: Sabem quanto o vendedor receberá
- **Simplicidade**: Aplicação fácil de cupons durante checkout

## Manutenção e Monitoramento

### Relatórios Disponíveis
- Total de comissões por vendedor
- Número de vendas por cupom
- Performance de vendas por período
- Status de cupons ativos/inativos

### Limpeza de Dados
- Cupons inativos podem ser removidos
- Histórico de vendas é mantido para auditoria
- Estatísticas são atualizadas em tempo real

## Suporte e Troubleshooting

### Problemas Comuns
1. **Cupom não encontrado**: Verificar se o código está correto
2. **Vendedor inativo**: Cupons de vendedores inativos não funcionam
3. **Erro de validação**: Verificar conectividade com Firebase

### Logs e Debug
- Console do navegador mostra erros de validação
- Firebase Console mostra operações de banco
- Logs de erro são registrados para análise

## Próximas Funcionalidades

- **Dashboard do Vendedor**: Área para vendedores acompanharem suas vendas
- **Relatórios Avançados**: Análises detalhadas de performance
- **Notificações**: Alertas automáticos para novas vendas
- **API Externa**: Integração com sistemas de terceiros
- **Multi-moedas**: Suporte para diferentes moedas
- **Comissões por Categoria**: Taxas diferentes por tipo de produto

---

**Desenvolvido para Sua Medicina**  
*Sistema de Cupons de Vendedores v1.0*
