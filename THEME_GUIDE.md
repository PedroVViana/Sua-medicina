# Guia do Sistema de Tema - Sua Medicina

## Visão Geral

Este projeto implementa um sistema de tema completo com cores personalizadas, substituindo o esquema de cores azul padrão por um esquema vermelho mais adequado para a área médica.

## Estrutura do Tema

### 1. Arquivos de Configuração

- **`src/styles/theme.ts`** - Definições TypeScript do tema
- **`src/styles/theme.css`** - Variáveis CSS e classes utilitárias
- **`tailwind.config.js`** - Configuração do Tailwind com cores personalizadas
- **`src/hooks/useTheme.ts`** - Hook React para acessar o tema

### 2. Paleta de Cores

#### Cores Primárias (Vermelho)
```css
--color-primary-50: #fef2f2   /* Vermelho muito claro */
--color-primary-100: #fee2e2   /* Vermelho claro */
--color-primary-200: #fecaca   /* Vermelho suave */
--color-primary-300: #fca5a5   /* Vermelho médio-claro */
--color-primary-400: #f87171   /* Vermelho médio */
--color-primary-500: #ef4444   /* Vermelho principal */
--color-primary-600: #dc2626   /* Vermelho escuro */
--color-primary-700: #b91c1c   /* Vermelho mais escuro */
--color-primary-800: #991b1b   /* Vermelho muito escuro */
--color-primary-900: #7f1d1d   /* Vermelho quase preto */
--color-primary-950: #450a0a   /* Vermelho preto */
```

#### Cores Secundárias (Cinza)
```css
--color-secondary-50: #f8fafc   /* Cinza muito claro */
--color-secondary-100: #f1f5f9  /* Cinza claro */
--color-secondary-200: #e2e8f0  /* Cinza suave */
--color-secondary-300: #cbd5e1  /* Cinza médio-claro */
--color-secondary-400: #94a3b8  /* Cinza médio */
--color-secondary-500: #64748b  /* Cinza principal */
--color-secondary-600: #475569  /* Cinza escuro */
--color-secondary-700: #334155  /* Cinza mais escuro */
--color-secondary-800: #1e293b  /* Cinza muito escuro */
--color-secondary-900: #0f172a  /* Cinza quase preto */
--color-secondary-950: #020617  /* Cinza preto */
```

#### Cores de Acento (Rosa)
```css
--color-accent-50: #fdf4ff   /* Rosa muito claro */
--color-accent-100: #fae8ff   /* Rosa claro */
--color-accent-200: #f5d0fe   /* Rosa suave */
--color-accent-300: #f0abfc   /* Rosa médio-claro */
--color-accent-400: #e879f9   /* Rosa médio */
--color-accent-500: #d946ef   /* Rosa principal */
--color-accent-600: #c026d3   /* Rosa escuro */
--color-accent-700: #a21caf   /* Rosa mais escuro */
--color-accent-800: #86198f   /* Rosa muito escuro */
--color-accent-900: #701a75   /* Rosa quase preto */
--color-accent-950: #4a044e   /* Rosa preto */
```

#### Cores de Estado
- **Sucesso**: Verde (`#22c55e`)
- **Aviso**: Amarelo (`#f59e0b`)
- **Erro**: Vermelho (`#ef4444`)

### 3. Uso no Tailwind CSS

#### Classes de Cores
```jsx
// Fundos
className="bg-primary-500"      // Fundo vermelho principal
className="bg-primary-600"      // Fundo vermelho escuro
className="hover:bg-primary-700" // Hover vermelho mais escuro

// Texto
className="text-primary-500"    // Texto vermelho principal
className="text-primary-600"    // Texto vermelho escuro

// Bordas
className="border-primary-500"  // Borda vermelha principal
className="focus:ring-primary-500" // Anel de foco vermelho
```

#### Classes Utilitárias do Tema
```css
.bg-theme-primary          /* Fundo vermelho principal */
.bg-theme-primary-light    /* Fundo vermelho claro */
.bg-theme-primary-dark     /* Fundo vermelho escuro */

.text-theme-primary        /* Texto vermelho principal */
.text-theme-primary-light  /* Texto vermelho claro */
.text-theme-primary-dark   /* Texto vermelho escuro */

.border-theme-primary      /* Borda vermelha principal */
.hover:bg-theme-primary    /* Hover vermelho */
.focus:ring-theme-primary  /* Foco vermelho */
```

### 4. Hook useTheme

```tsx
import { useTheme } from '../hooks/useTheme';

const MyComponent = () => {
  const { colors, getColor, spacing } = useTheme();
  
  return (
    <div style={{ 
      backgroundColor: getColor('primary', '500'),
      padding: spacing.lg 
    }}>
      Conteúdo
    </div>
  );
};
```

### 5. Variáveis CSS

#### Espaçamentos
```css
--spacing-xs: 0.25rem;    /* 4px */
--spacing-sm: 0.5rem;     /* 8px */
--spacing-md: 1rem;       /* 16px */
--spacing-lg: 1.5rem;     /* 24px */
--spacing-xl: 2rem;       /* 32px */
--spacing-2xl: 3rem;      /* 48px */
--spacing-3xl: 4rem;      /* 64px */
```

#### Bordas
```css
--border-radius-sm: 0.125rem;   /* 2px */
--border-radius-md: 0.375rem;   /* 6px */
--border-radius-lg: 0.5rem;     /* 8px */
--border-radius-xl: 0.75rem;    /* 12px */
--border-radius-2xl: 1rem;      /* 16px */
--border-radius-full: 9999px;   /* Circular */
```

#### Sombras
```css
--shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
--shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
--shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
--shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
```

### 6. Tipografia

#### Tamanhos de Fonte
```css
--font-size-xs: 0.75rem;    /* 12px */
--font-size-sm: 0.875rem;   /* 14px */
--font-size-base: 1rem;     /* 16px */
--font-size-lg: 1.125rem;   /* 18px */
--font-size-xl: 1.25rem;    /* 20px */
--font-size-2xl: 1.5rem;    /* 24px */
--font-size-3xl: 1.875rem;  /* 30px */
--font-size-4xl: 2.25rem;   /* 36px */
--font-size-5xl: 3rem;      /* 48px */
--font-size-6xl: 3.75rem;   /* 60px */
```

#### Pesos de Fonte
```css
--font-weight-thin: 100;
--font-weight-extralight: 200;
--font-weight-light: 300;
--font-weight-normal: 400;
--font-weight-medium: 500;
--font-weight-semibold: 600;
--font-weight-bold: 700;
--font-weight-extrabold: 800;
--font-weight-black: 900;
```

## Migração de Cores

### Antes (Azul)
```jsx
className="bg-blue-600 hover:bg-blue-700"
className="text-blue-600"
className="border-blue-500"
className="focus:ring-blue-500"
```

### Depois (Vermelho)
```jsx
className="bg-primary-600 hover:bg-primary-700"
className="text-primary-600"
className="border-primary-500"
className="focus:ring-primary-500"
```

## Componentes Atualizados

✅ **GoogleLoginButton** - Foco vermelho
✅ **CheckoutPage** - Botões, texto, bordas e fundos vermelhos
✅ **AdminLogin** - Campos de formulário e botão vermelhos
✅ **LandingPage** - Cabeçalho, botões e texto vermelhos
✅ **AdminDashboard** - Navegação, botões e indicadores vermelhos
✅ **CartIcon** - Hover vermelho
✅ **ProtectedRoute** - Loading e botões vermelhos

## Benefícios do Novo Tema

1. **Identidade Visual**: Vermelho é mais adequado para área médica
2. **Consistência**: Sistema de cores padronizado em toda aplicação
3. **Manutenibilidade**: Mudanças de cor centralizadas
4. **Flexibilidade**: Fácil criação de variações de tema
5. **Acessibilidade**: Contraste adequado entre cores
6. **Escalabilidade**: Sistema preparado para futuras expansões

## Próximos Passos

1. **Testes**: Verificar contraste e acessibilidade
2. **Dark Mode**: Implementar tema escuro
3. **Variantes**: Criar temas para diferentes contextos
4. **Documentação**: Adicionar exemplos visuais
5. **Storybook**: Integrar com sistema de design

## Comandos Úteis

```bash
# Verificar se todas as cores azuis foram substituídas
grep -r "blue-" src/ --include="*.tsx" --include="*.ts"

# Verificar uso das novas cores primárias
grep -r "primary-" src/ --include="*.tsx" --include="*.ts"

# Verificar variáveis CSS
grep -r "var(--color-primary" src/ --include="*.css"
```
