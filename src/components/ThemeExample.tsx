import React from 'react';
import { useTheme } from '../hooks/useTheme';

const ThemeExample: React.FC = () => {
  const { colors, getColor, spacing, typography } = useTheme();

  return (
    <div className="p-8 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-primary-600 mb-6">
        Demonstração do Sistema de Tema
      </h2>
      
      {/* Cores Primárias */}
      <section className="mb-8">
        <h3 className="text-xl font-semibold text-secondary-700 mb-4">
          Cores Primárias (Vermelho)
        </h3>
        <div className="grid grid-cols-5 gap-4">
          {Object.entries(colors.primary).map(([shade, color]) => (
            <div key={shade} className="text-center">
              <div 
                className="w-16 h-16 rounded-lg mb-2 mx-auto shadow-md"
                style={{ backgroundColor: color }}
              />
              <p className="text-xs font-mono text-secondary-600">{shade}</p>
              <p className="text-xs font-mono text-secondary-500">{color}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Cores Secundárias */}
      <section className="mb-8">
        <h3 className="text-xl font-semibold text-secondary-700 mb-4">
          Cores Secundárias (Cinza)
        </h3>
        <div className="grid grid-cols-5 gap-4">
          {Object.entries(colors.secondary).slice(0, 10).map(([shade, color]) => (
            <div key={shade} className="text-center">
              <div 
                className="w-16 h-16 rounded-lg mb-2 mx-auto shadow-md border border-gray-200"
                style={{ backgroundColor: color }}
              />
              <p className="text-xs font-mono text-secondary-600">{shade}</p>
              <p className="text-xs font-mono text-secondary-500">{color}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Cores de Estado */}
      <section className="mb-8">
        <h3 className="text-xl font-semibold text-secondary-700 mb-4">
          Cores de Estado
        </h3>
        <div className="grid grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-20 h-20 bg-success-500 rounded-lg mb-2 mx-auto shadow-md flex items-center justify-center">
              <span className="text-white font-bold">✓</span>
            </div>
            <p className="font-medium text-success-700">Sucesso</p>
            <p className="text-sm text-secondary-500">#22c55e</p>
          </div>
          
          <div className="text-center">
            <div className="w-20 h-20 bg-warning-500 rounded-lg mb-2 mx-auto shadow-md flex items-center justify-center">
              <span className="text-white font-bold">⚠</span>
            </div>
            <p className="font-medium text-warning-700">Aviso</p>
            <p className="text-sm text-secondary-500">#f59e0b</p>
          </div>
          
          <div className="text-center">
            <div className="w-20 h-20 bg-error-500 rounded-lg mb-2 mx-auto shadow-md flex items-center justify-center">
              <span className="text-white font-bold">✗</span>
            </div>
            <p className="font-medium text-error-700">Erro</p>
            <p className="text-sm text-secondary-500">#ef4444</p>
          </div>
        </div>
      </section>

      {/* Botões de Exemplo */}
      <section className="mb-8">
        <h3 className="text-xl font-semibold text-secondary-700 mb-4">
          Botões com Tema
        </h3>
        <div className="flex flex-wrap gap-4">
          <button className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
            Botão Primário
          </button>
          
          <button className="bg-secondary-600 hover:bg-secondary-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
            Botão Secundário
          </button>
          
          <button className="bg-accent-600 hover:bg-accent-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
            Botão de Acento
          </button>
          
          <button className="bg-success-600 hover:bg-success-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
            Botão de Sucesso
          </button>
          
          <button className="bg-warning-600 hover:bg-warning-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
            Botão de Aviso
          </button>
          
          <button className="bg-error-600 hover:bg-error-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
            Botão de Erro
          </button>
        </div>
      </section>

      {/* Tipografia */}
      <section className="mb-8">
        <h3 className="text-xl font-semibold text-secondary-700 mb-4">
          Sistema de Tipografia
        </h3>
        <div className="space-y-2">
          <h1 className="text-6xl font-black text-primary-600">Título H1</h1>
          <h2 className="text-5xl font-bold text-primary-700">Título H2</h2>
          <h3 className="text-4xl font-semibold text-primary-800">Título H3</h3>
          <h4 className="text-3xl font-medium text-secondary-700">Título H4</h4>
          <h5 className="text-2xl font-normal text-secondary-600">Título H5</h5>
          <h6 className="text-xl font-light text-secondary-500">Título H6</h6>
          <p className="text-base text-secondary-700">
            Texto base com tamanho padrão e cor secundária.
          </p>
          <p className="text-sm text-secondary-600">
            Texto pequeno para informações secundárias.
          </p>
        </div>
      </section>

      {/* Espaçamentos */}
      <section className="mb-8">
        <h3 className="text-xl font-semibold text-secondary-700 mb-4">
          Sistema de Espaçamentos
        </h3>
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <div className="w-4 h-4 bg-primary-500 rounded"></div>
            <span className="text-sm text-secondary-600">xs: 4px</span>
          </div>
          <div className="flex items-center space-x-4">
            <div className="w-8 h-8 bg-primary-500 rounded"></div>
            <span className="text-sm text-secondary-600">sm: 8px</span>
          </div>
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-primary-500 rounded"></div>
            <span className="text-sm text-secondary-600">md: 16px</span>
          </div>
          <div className="flex items-center space-x-4">
            <div className="w-24 h-24 bg-primary-500 rounded"></div>
            <span className="text-sm text-secondary-600">lg: 24px</span>
          </div>
        </div>
      </section>

      {/* Uso do Hook */}
      <section className="mb-8">
        <h3 className="text-xl font-semibold text-secondary-700 mb-4">
          Uso do Hook useTheme
        </h3>
        <div className="bg-secondary-50 p-4 rounded-lg">
          <p className="text-sm text-secondary-700 mb-2">
            <strong>Cor primária 500:</strong> {getColor('primary', '500')}
          </p>
          <p className="text-sm text-secondary-700 mb-2">
            <strong>Espaçamento lg:</strong> {spacing.lg}
          </p>
          <p className="text-sm text-secondary-700 mb-2">
            <strong>Tamanho de fonte 2xl:</strong> {typography.fontSizes['2xl']}
          </p>
          <p className="text-sm text-secondary-700">
            <strong>Peso de fonte bold:</strong> {typography.fontWeights.bold}
          </p>
        </div>
      </section>

      {/* Classes Utilitárias */}
      <section>
        <h3 className="text-xl font-semibold text-secondary-700 mb-4">
          Classes Utilitárias do Tema
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-theme-primary p-4 rounded-lg text-white text-center">
            .bg-theme-primary
          </div>
          <div className="bg-theme-primary-light p-4 rounded-lg text-primary-900 text-center">
            .bg-theme-primary-light
          </div>
          <div className="bg-theme-primary-dark p-4 rounded-lg text-white text-center">
            .bg-theme-primary-dark
          </div>
          <div className="border-2 border-theme-primary p-4 rounded-lg text-primary-700 text-center">
            .border-theme-primary
          </div>
        </div>
      </section>
    </div>
  );
};

export default ThemeExample;
