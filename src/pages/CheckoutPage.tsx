import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useProducts } from '../contexts/ProductContext';
import { orderService } from '../services/orderService';
import { Product } from '../types';
import { SellerCouponInput } from '../components/SellerCouponInput';

const CheckoutPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { items, total, clearCart, addToCart } = useCart();
  const { products } = useProducts();
  
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState<string>('');
  const [sellerCommission, setSellerCommission] = useState<number>(0);

  // Se um produto específico foi selecionado, adicionar ao carrinho
  useEffect(() => {
    const productId = searchParams.get('product');
    if (productId && items.length === 0) {
      const product = products.find(p => p.id === productId);
      if (product) {
        // Adicionar o produto ao carrinho automaticamente
        addToCart(product);
      }
    }
  }, [searchParams, items.length, products, addToCart]);

  const handleCouponApplied = (couponCode: string, commissionRate: number) => {
    setAppliedCoupon(couponCode);
    const commission = (total * commissionRate) / 100;
    setSellerCommission(commission);
  };

  const handleCouponRemoved = () => {
    setAppliedCoupon('');
    setSellerCommission(0);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Criar o pedido no Firebase
      const orderData = {
        products: items,
        total,
        customerName,
        customerEmail,
        customerPhone,
        status: 'pending' as const,
        sellerCouponCode: appliedCoupon || undefined,
        sellerCommission: sellerCommission || undefined
      };

      const orderId = await orderService.createOrder(orderData);

      console.log('Pedido criado com sucesso:', orderId);

      // Limpar carrinho e redirecionar
      clearCart();
      alert('Pedido realizado com sucesso! Você receberá um email com os detalhes.');
      navigate('/');
    } catch (error) {
      console.error('Erro ao processar pedido:', error);
      alert('Erro ao processar pedido. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Carrinho Vazio</h2>
          <p className="text-gray-600 mb-6">Adicione produtos ao carrinho para continuar.</p>
          <button
            onClick={() => navigate('/')}
            className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700"
          >
            Voltar para Produtos
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-primary-600">Sua Medicina</h1>
            </div>
            <nav className="flex space-x-8">
              <button
                onClick={() => navigate('/')}
                className="text-gray-700 hover:text-primary-600"
              >
                Voltar para Produtos
              </button>
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-3xl font-bold text-center mb-8">Finalizar Compra</h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Order Summary */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-4">Resumo do Pedido</h3>
            
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.product.id} className="flex justify-between items-center py-2 border-b border-gray-200">
                  <div>
                    <h4 className="font-medium">{item.product.name}</h4>
                    <p className="text-sm text-gray-600">Qtd: {item.quantity}</p>
                  </div>
                  <span className="font-semibold">
                    R$ {(item.product.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
              
              {/* Cupom aplicado */}
              {appliedCoupon && (
                <div className="pt-4 border-t border-gray-200">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-green-600">Cupom aplicado: {appliedCoupon}</span>
                    <span className="text-green-600">-R$ {sellerCommission.toFixed(2)}</span>
                  </div>
                </div>
              )}
              
              <div className="pt-4 border-t border-gray-200">
                <div className="flex justify-between items-center text-lg font-bold">
                  <span>Total:</span>
                  <span className="text-primary-600">R$ {total.toFixed(2)}</span>
                </div>
                {appliedCoupon && (
                  <div className="text-sm text-gray-600 mt-1">
                    O vendedor receberá R$ {sellerCommission.toFixed(2)} de comissão
                  </div>
                )}
              </div>
            </div>

            {/* Cupom de vendedor */}
            <div className="mt-6">
              <SellerCouponInput
                onCouponApplied={handleCouponApplied}
                onCouponRemoved={handleCouponRemoved}
                appliedCoupon={appliedCoupon}
              />
            </div>
          </div>

          {/* Customer Information Form */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-4">Informações do Cliente</h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Nome Completo *
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="Digite seu nome completo"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email *
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="seu@email.com"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Telefone *
                </label>
                <input
                  id="phone"
                  type="tel"
                  required
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="(11) 99999-9999"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-green-600 text-white py-3 px-4 rounded-md font-medium hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Processando...' : 'Finalizar Compra'}
              </button>
            </form>

            <div className="mt-6 p-4 bg-primary-50 rounded-md">
              <h4 className="font-medium text-primary-900 mb-2">Informações Importantes:</h4>
              <ul className="text-sm text-primary-800 space-y-1">
                <li>• Após a confirmação, você receberá um email com os detalhes</li>
                <li>• Nossa equipe entrará em contato para agendar o serviço</li>
                <li>• Pagamento será realizado no momento do atendimento</li>
                {appliedCoupon && (
                  <li>• Cupom de vendedor aplicado - comissão será paga ao vendedor</li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage; 