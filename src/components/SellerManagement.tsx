import React, { useState, useEffect } from 'react';
import { sellerService } from '../services/sellerService';
import { sellerCouponService } from '../services/sellerCouponService';
import { Seller, SellerCoupon } from '../types';

interface SellerManagementProps {
  isAdmin: boolean;
}

export const SellerManagement: React.FC<SellerManagementProps> = ({ isAdmin }) => {
  const [sellers, setSellers] = useState<Seller[]>([]);
  const [coupons, setCoupons] = useState<{ [sellerId: string]: SellerCoupon[] }>({});
  const [loading, setLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingSeller, setEditingSeller] = useState<Seller | null>(null);
  const [message, setMessage] = useState<{ type: 'success' | 'error' | 'info'; text: string } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Form states
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    commissionRate: 10,
    active: true
  });

  useEffect(() => {
    if (isAdmin) {
      loadSellers();
    }
  }, [isAdmin]);

  const showMessage = (type: 'success' | 'error' | 'info', text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 5000);
  };

  const loadSellers = async () => {
    try {
      setLoading(true);
      const sellersData = await sellerService.getSellers();
      setSellers(sellersData);
      
      // Carregar cupons para cada vendedor
      const couponsData: { [sellerId: string]: SellerCoupon[] } = {};
      for (const seller of sellersData) {
        couponsData[seller.id] = await sellerCouponService.getSellerCoupons(seller.id);
      }
      setCoupons(couponsData);
    } catch (error) {
      console.error('Erro ao carregar vendedores:', error);
      showMessage('error', 'Erro ao carregar vendedores');
    } finally {
      setLoading(false);
    }
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      showMessage('error', 'Nome é obrigatório');
      return false;
    }
    if (!formData.email.trim()) {
      showMessage('error', 'Email é obrigatório');
      return false;
    }
    if (!formData.phone.trim()) {
      showMessage('error', 'Telefone é obrigatório');
      return false;
    }
    if (formData.commissionRate < 0 || formData.commissionRate > 100) {
      showMessage('error', 'Taxa de comissão deve estar entre 0% e 100%');
      return false;
    }
    return true;
  };

  const handleCreateSeller = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    try {
      await sellerService.createSeller(formData);
      
      showMessage('success', 'Vendedor criado com sucesso!');
      setFormData({
        name: '',
        email: '',
        phone: '',
        commissionRate: 10,
        active: true
      });
      setShowCreateForm(false);
      await loadSellers();
    } catch (error) {
      console.error('Erro ao criar vendedor:', error);
      showMessage('error', 'Erro ao criar vendedor. Verifique o console para mais detalhes.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdateSeller = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSeller) return;
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    try {
      await sellerService.updateSeller(editingSeller.id, formData);
      
      showMessage('success', 'Vendedor atualizado com sucesso!');
      setEditingSeller(null);
      setFormData({
        name: '',
        email: '',
        phone: '',
        commissionRate: 10,
        active: true
      });
      await loadSellers();
    } catch (error) {
      console.error('Erro ao atualizar vendedor:', error);
      showMessage('error', 'Erro ao atualizar vendedor. Verifique o console para mais detalhes.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleToggleStatus = async (sellerId: string, currentStatus: boolean) => {
    try {
      await sellerService.toggleSellerStatus(sellerId, !currentStatus);
      showMessage('success', `Vendedor ${!currentStatus ? 'ativado' : 'desativado'} com sucesso!`);
      await loadSellers();
    } catch (error) {
      console.error('Erro ao alterar status:', error);
      showMessage('error', 'Erro ao alterar status do vendedor');
    }
  };

  const handleGenerateCoupon = async (sellerId: string) => {
    try {
      await sellerService.generateNewCoupon(sellerId);
      showMessage('success', 'Novo cupom gerado com sucesso!');
      await loadSellers();
    } catch (error) {
      console.error('Erro ao gerar cupom:', error);
      showMessage('error', 'Erro ao gerar novo cupom');
    }
  };

  const handleDeleteSeller = async (sellerId: string) => {
    if (window.confirm('Tem certeza que deseja excluir este vendedor? Esta ação não pode ser desfeita.')) {
      try {
        await sellerService.deleteSeller(sellerId);
        showMessage('success', 'Vendedor excluído com sucesso!');
        await loadSellers();
      } catch (error) {
        console.error('Erro ao excluir vendedor:', error);
        showMessage('error', 'Erro ao excluir vendedor');
      }
    }
  };

  const handleEditSeller = (seller: Seller) => {
    setEditingSeller(seller);
    setFormData({
      name: seller.name,
      email: seller.email,
      phone: seller.phone,
      commissionRate: seller.commissionRate,
      active: seller.active
    });
  };

  const handleCancelEdit = () => {
    setEditingSeller(null);
    setFormData({
      name: '',
      email: '',
      phone: '',
      commissionRate: 10,
      active: true
    });
  };

  if (!isAdmin) {
    return <div className="text-center p-4">Acesso negado</div>;
  }

  if (loading) {
    return <div className="text-center p-4">Carregando...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Mensagens de feedback */}
      {message && (
        <div className={`mb-4 p-4 rounded-lg ${
          message.type === 'success' ? 'bg-green-100 text-green-800 border border-green-200' :
          message.type === 'error' ? 'bg-red-100 text-red-800 border border-red-200' :
          'bg-blue-100 text-blue-800 border border-blue-200'
        }`}>
          {message.text}
        </div>
      )}

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Gerenciamento de Vendedores</h2>
        <button
          onClick={() => setShowCreateForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Novo Vendedor
        </button>
      </div>

      {/* Formulário de criação/edição */}
      {(showCreateForm || editingSeller) && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h3 className="text-lg font-semibold mb-4">
            {editingSeller ? 'Editar Vendedor' : 'Novo Vendedor'}
          </h3>
          <form onSubmit={editingSeller ? handleUpdateSeller : handleCreateSeller}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nome *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                  placeholder="Nome completo do vendedor"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email *
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                  placeholder="email@exemplo.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Telefone *
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                  placeholder="(11) 99999-9999"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Taxa de Comissão (%) *
                </label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  step="0.1"
                  value={formData.commissionRate}
                  onChange={(e) => setFormData({ ...formData, commissionRate: parseFloat(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                  placeholder="10"
                />
              </div>
            </div>
            <div className="flex items-center mt-4 mb-4">
              <input
                type="checkbox"
                id="active"
                checked={formData.active}
                onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                className="mr-2"
              />
              <label htmlFor="active" className="text-sm font-medium text-gray-700">
                Vendedor Ativo
              </label>
            </div>
            <div className="flex gap-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Salvando...' : (editingSeller ? 'Atualizar' : 'Criar')}
              </button>
              <button
                type="button"
                onClick={editingSeller ? handleCancelEdit : () => setShowCreateForm(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Lista de vendedores */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium">Lista de Vendedores ({sellers.length})</h3>
        </div>
        {sellers.length === 0 ? (
          <div className="px-6 py-8 text-center text-gray-500">
            <p>Nenhum vendedor cadastrado ainda.</p>
            <p className="text-sm mt-2">Clique em "Novo Vendedor" para começar!</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Vendedor
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contato
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Comissão
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Cupons
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {sellers.map((seller) => (
                  <tr key={seller.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{seller.name}</div>
                        <div className="text-sm text-gray-500">ID: {seller.id}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm text-gray-900">{seller.email}</div>
                        <div className="text-sm text-gray-500">{seller.phone}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-900">{seller.commissionRate}%</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {coupons[seller.id]?.length || 0} cupons
                      </div>
                      <div className="text-xs text-gray-500">
                        {coupons[seller.id]?.filter(c => c.isActive).length || 0} ativos
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        seller.active 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {seller.active ? 'Ativo' : 'Inativo'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEditSeller(seller)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => handleToggleStatus(seller.id, seller.active)}
                          className={`${
                            seller.active ? 'text-red-600 hover:text-red-900' : 'text-green-600 hover:text-green-900'
                          }`}
                        >
                          {seller.active ? 'Desativar' : 'Ativar'}
                        </button>
                        <button
                          onClick={() => handleGenerateCoupon(seller.id)}
                          className="text-green-600 hover:text-green-900"
                        >
                          Novo Cupom
                        </button>
                        <button
                          onClick={() => handleDeleteSeller(seller.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Excluir
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Lista de cupons por vendedor */}
      {sellers.length > 0 && (
        <div className="mt-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Cupons dos Vendedores</h3>
          {sellers.map((seller) => (
            <div key={seller.id} className="bg-white rounded-lg shadow-md p-6 mb-4">
              <h4 className="text-lg font-medium text-gray-800 mb-3">{seller.name}</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {coupons[seller.id]?.map((coupon) => (
                  <div
                    key={coupon.id}
                    className={`border rounded-lg p-4 ${
                      coupon.isActive ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-lg font-mono font-bold text-gray-800">
                        {coupon.code}
                      </span>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        coupon.isActive 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {coupon.isActive ? 'Ativo' : 'Inativo'}
                      </span>
                    </div>
                    <div className="text-sm text-gray-600">
                      <div>Usado: {coupon.usedCount} vezes</div>
                      <div>Comissão total: R$ {coupon.totalCommission.toFixed(2)}</div>
                      <div>Criado: {coupon.createdAt.toLocaleDateString()}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
