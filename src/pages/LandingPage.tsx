import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useProducts } from '../contexts/ProductContext';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import CartIcon from '../components/CartIcon';
import GoogleLoginButton from '../components/GoogleLoginButton';

const LandingPage: React.FC = () => {
  const { products, loading } = useProducts();
  const { addToCart } = useCart();
  const { user, logout, isAuthenticated } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);

  // Função para agrupar produtos por categoria
  const getProductsByCategory = (category: string) => {
    return products.filter(product => 
      product.category.toLowerCase().includes(category.toLowerCase()) && product.active
    );
  };

  // Função para renderizar botão de agendamento baseado na categoria
  const getScheduleButton = (category: string) => {
    const categoryLower = category.toLowerCase();
    if (categoryLower.includes('consulta')) return 'AGENDAR CONSULTA AGORA';
    if (categoryLower.includes('exame') || categoryLower.includes('laboratorial') || categoryLower.includes('imagem')) return 'AGENDAR EXAME AGORA';
    if (categoryLower.includes('vacina')) return 'AGENDAR VACINA AGORA';
    if (categoryLower.includes('bem-estar') || categoryLower.includes('estética')) return 'AGENDAR BEM-ESTAR AGORA';
    if (categoryLower.includes('veterinário') || categoryLower.includes('pet')) return 'AGENDAR ATENDIMENTO PET';
    return 'AGENDAR AGORA';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-primary-600">Sua Medicina</h1>
            </div>
            <nav className="flex items-center space-x-8">
              <Link to="/" className="text-gray-700 hover:text-primary-600">Início</Link>
              <Link to="/admin" target="_blank" className="text-gray-700 hover:text-primary-600">Admin</Link>
              
              {isAuthenticated ? (
                <div className="flex items-center space-x-4">
                  <span className="text-gray-700">Olá, {user?.name}</span>
                  <button
                    onClick={() => logout()}
                    className="text-red-600 hover:text-red-700 text-sm"
                  >
                    Sair
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setShowLoginModal(true)}
                  className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                >
                  Entrar
                </button>
              )}
              
              <CartIcon />
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-primary-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">
            Cuide da Saúde com a Sua Medicina
          </h2>
          <p className="text-xl mb-4">
            Rápido, Acessível e Humanizado
          </p>
          <p className="text-lg mb-8">
            👉 Escolha agora o plano ideal e garanta consultas, exames, bem-estar e muito mais com preços justos e atendimento de qualidade.
          </p>
        </div>
      </section>

      {/* Products Section - Copy de Vendas */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl font-bold text-center mb-12">🛍️ Nossos Produtos</h3>
          
          {/* Consultas Médicas */}
          <div className="mb-16">
            <div className="text-center mb-8">
              <h4 className="text-2xl font-bold text-gray-800 mb-4">🔹 Consultas Médicas</h4>
              <p className="text-lg text-gray-600 mb-4">
                Atendimento online e presencial com médicos especializados em diversas áreas.
              </p>
              <p className="text-green-600 font-medium">✅ Clínico geral, especialistas, acompanhamento contínuo.</p>
            </div>
            
            {loading ? (
              <div className="flex justify-center items-center py-8">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {getProductsByCategory('consulta').map((product) => (
                  <div key={product.id} className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow">
                    <div className="p-6">
                      <h5 className="text-xl font-semibold mb-3 text-gray-800">{product.name}</h5>
                      <p className="text-gray-600 mb-4 text-sm">{product.description}</p>
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-2xl font-bold text-primary-600">
                          R$ {product.price.toFixed(2)}
                        </span>
                      </div>
                      <div className="space-y-2">
                        <button
                          onClick={() => addToCart(product)}
                          className="w-full bg-primary-600 text-white px-4 py-3 rounded-lg hover:bg-primary-700 transition-colors font-medium"
                        >
                          Adicionar ao Carrinho
                        </button>
                        <Link
                          to={`/checkout?product=${product.id}`}
                          className="w-full bg-green-600 text-white px-4 py-3 rounded-lg hover:bg-green-700 transition-colors font-medium text-center block"
                        >
                          {getScheduleButton(product.category)}
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Exames Laboratoriais e de Imagem */}
          <div className="mb-16">
            <div className="text-center mb-8">
              <h4 className="text-2xl font-bold text-gray-800 mb-4">🔹 Exames Laboratoriais e de Imagem</h4>
              <p className="text-lg text-gray-600 mb-4">
                Mais praticidade e economia em exames essenciais.
              </p>
              <p className="text-green-600 font-medium">✅ Ressonância magnética, raio-x, ultrassonografia, análises clínicas e muito mais.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {getProductsByCategory('exame').map((product) => (
                <div key={product.id} className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow">
                  <div className="p-6">
                    <h5 className="text-xl font-semibold mb-3 text-gray-800">{product.name}</h5>
                    <p className="text-gray-600 mb-4 text-sm">{product.description}</p>
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-2xl font-bold text-primary-600">
                        R$ {product.price.toFixed(2)}
                      </span>
                    </div>
                    <div className="space-y-2">
                      <button
                        onClick={() => addToCart(product)}
                        className="w-full bg-primary-600 text-white px-4 py-3 rounded-lg hover:bg-primary-700 transition-colors font-medium"
                      >
                        Adicionar ao Carrinho
                      </button>
                      <Link
                        to={`/checkout?product=${product.id}`}
                        className="w-full bg-green-600 text-white px-4 py-3 rounded-lg hover:bg-green-700 transition-colors font-medium text-center block"
                      >
                        {getScheduleButton(product.category)}
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Vacinas */}
          <div className="mb-16">
            <div className="text-center mb-8">
              <h4 className="text-2xl font-bold text-gray-800 mb-4">🔹 Vacinas</h4>
              <p className="text-lg text-gray-600 mb-4">
                Proteja-se e proteja quem você ama com nosso serviço de vacinação.
              </p>
              <p className="text-green-600 font-medium">✅ Hepatite, HPV, Gripe, Tríplice Viral, Tríplice Valente e outras.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {getProductsByCategory('vacina').map((product) => (
                <div key={product.id} className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow">
                  <div className="p-6">
                    <h5 className="text-xl font-semibold mb-3 text-gray-800">{product.name}</h5>
                    <p className="text-gray-600 mb-4 text-sm">{product.description}</p>
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-2xl font-bold text-primary-600">
                        R$ {product.price.toFixed(2)}
                      </span>
                    </div>
                    <div className="space-y-2">
                      <button
                        onClick={() => addToCart(product)}
                        className="w-full bg-primary-600 text-white px-4 py-3 rounded-lg hover:bg-primary-700 transition-colors font-medium"
                      >
                        Adicionar ao Carrinho
                      </button>
                      <Link
                        to={`/checkout?product=${product.id}`}
                        className="w-full bg-green-600 text-white px-4 py-3 rounded-lg hover:bg-green-700 transition-colors font-medium text-center block"
                      >
                        {getScheduleButton(product.category)}
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Serviços de Bem-Estar e Estética */}
          <div className="mb-16">
            <div className="text-center mb-8">
              <h4 className="text-2xl font-bold text-gray-800 mb-4">🔹 Serviços de Bem-Estar e Estética</h4>
              <p className="text-lg text-gray-600 mb-4">
                Saúde também é qualidade de vida!
              </p>
              <p className="text-green-600 font-medium">✅ Massagem, Acupuntura, RPG, Peeling e outros serviços.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {getProductsByCategory('bem-estar').map((product) => (
                <div key={product.id} className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow">
                  <div className="p-6">
                    <h5 className="text-xl font-semibold mb-3 text-gray-800">{product.name}</h5>
                    <p className="text-gray-600 mb-4 text-sm">{product.description}</p>
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-2xl font-bold text-primary-600">
                        R$ {product.price.toFixed(2)}
                      </span>
                    </div>
                    <div className="space-y-2">
                      <button
                        onClick={() => addToCart(product)}
                        className="w-full bg-primary-600 text-white px-4 py-3 rounded-lg hover:bg-primary-700 transition-colors font-medium"
                      >
                        Adicionar ao Carrinho
                      </button>
                      <Link
                        to={`/checkout?product=${product.id}`}
                        className="w-full bg-green-600 text-white px-4 py-3 rounded-lg hover:bg-green-700 transition-colors font-medium text-center block"
                      >
                        {getScheduleButton(product.category)}
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Atendimento Veterinário */}
          <div className="mb-16">
            <div className="text-center mb-8">
              <h4 className="text-2xl font-bold text-gray-800 mb-4">🔹 Atendimento Veterinário (Pet's)</h4>
              <p className="text-lg text-gray-600 mb-4">
                Porque seu pet também merece cuidado de qualidade.
              </p>
              <p className="text-green-600 font-medium">✅ Atendimento completo 24h/dia, 7 dias por semana, em qualquer lugar do Brasil ou do mundo.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {getProductsByCategory('veterinário').map((product) => (
                <div key={product.id} className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow">
                  <div className="p-6">
                    <h5 className="text-xl font-semibold mb-3 text-gray-800">{product.name}</h5>
                    <p className="text-gray-600 mb-4 text-sm">{product.description}</p>
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-2xl font-bold text-primary-600">
                        R$ {product.price.toFixed(2)}
                      </span>
                    </div>
                    <div className="space-y-2">
                      <button
                        onClick={() => addToCart(product)}
                        className="w-full bg-primary-600 text-white px-4 py-3 rounded-lg hover:bg-primary-700 transition-colors font-medium"
                      >
                        Adicionar ao Carrinho
                      </button>
                      <Link
                        to={`/checkout?product=${product.id}`}
                        className="w-full bg-green-600 text-white px-4 py-3 rounded-lg hover:bg-green-700 transition-colors font-medium text-center block"
                      >
                        {getScheduleButton(product.category)}
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Por Que Escolher Section */}
      <section className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl font-bold text-center mb-12">🚀 Por Que Escolher a Sua Medicina?</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl mb-4">📱</div>
              <h4 className="text-xl font-semibold mb-2">Atendimento 24h/dia, 7 dias por semana</h4>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">🧑‍⚕️</div>
              <h4 className="text-xl font-semibold mb-2">Rede de médicos e especialistas de confiança</h4>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">💸</div>
              <h4 className="text-xl font-semibold mb-2">Custos muito mais acessíveis que planos de saúde</h4>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">🌍</div>
              <h4 className="text-xl font-semibold mb-2">Abrangência nacional + teleatendimento de qualquer lugar do mundo</h4>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">🔒</div>
              <h4 className="text-xl font-semibold mb-2">Segurança e confidencialidade garantidas</h4>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-3xl font-bold mb-6">🔑 Comece Agora</h3>
          <p className="text-xl mb-8">
            👉 Escolha o serviço que você precisa, clique no botão e finalize sua compra no checkout seguro.
            Seja consulta, exame, vacina, bem-estar ou cuidado para seu pet — a saúde está a um clique de distância.
          </p>
          <Link
            to="/checkout"
            className="inline-block bg-blue-600 text-white px-8 py-4 rounded-lg text-xl font-bold hover:bg-blue-700 transition-colors"
          >
            🔵 QUERO AGENDAR AGORA
          </Link>
        </div>
      </section>

      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-900">Entrar na Sua Medicina</h3>
              <button
                onClick={() => setShowLoginModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="space-y-4">
              <p className="text-gray-600 text-center">
                Faça login para ter uma experiência personalizada
              </p>
              
              <GoogleLoginButton
                onSuccess={() => setShowLoginModal(false)}
                onError={(error) => {
                  console.error('Erro no login:', error);
                  alert('Erro ao fazer login. Tente novamente.');
                }}
              />
              
              <div className="text-center text-sm text-gray-500">
                <p>Ou acesse como administrador</p>
                <Link
                  to="/admin"
                  className="text-primary-600 hover:text-primary-700 font-medium"
                  onClick={() => setShowLoginModal(false)}
                >
                  Painel Administrativo
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>&copy; 2024 Sua Medicina. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage; 