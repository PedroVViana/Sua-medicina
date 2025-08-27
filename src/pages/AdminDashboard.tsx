import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useProducts } from '../contexts/ProductContext';
import { Product } from '../types';
import { SellerManagement } from '../components/SellerManagement';

const AdminDashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const { products, loading, error, addProduct, updateProduct, deleteProduct } = useProducts();
  const navigate = useNavigate();
  
  const [activeTab, setActiveTab] = useState<'products' | 'sellers'>('products');
  const [showProductForm, setShowProductForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/admin');
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  const handleProductSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const productData = {
      name: formData.get('name') as string,
      description: formData.get('description') as string,
      price: parseFloat(formData.get('price') as string),
      category: formData.get('category') as string,
      active: true
    };

    try {
      if (editingProduct) {
        await updateProduct(editingProduct.id, productData);
        setEditingProduct(null);
      } else {
        await addProduct(productData);
      }
      
      setShowProductForm(false);
      e.currentTarget.reset();
    } catch (error) {
      console.error('Erro ao salvar produto:', error);
      // Aqui você pode adicionar uma notificação de erro para o usuário
    }
  };

  const startEditProduct = (product: Product) => {
    setEditingProduct(product);
    setShowProductForm(true);
  };

  const handleDeleteProduct = async (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir este produto?')) {
      try {
        await deleteProduct(id);
      } catch (error) {
        console.error('Erro ao excluir produto:', error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-primary-600">Sua Medicina - Admin</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">Olá, {user?.name}</span>
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                Sair
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Error Message */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
          </div>
        )}

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('products')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'products'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Produtos
            </button>
            <button
              onClick={() => setActiveTab('sellers')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'sellers'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Vendedores e Cupons
            </button>
          </nav>
        </div>

        {/* Products Tab */}
        {activeTab === 'products' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Gerenciar Produtos</h2>
              <button
                onClick={() => setShowProductForm(true)}
                className="bg-primary-600 text-white px-4 py-2 rounded hover:bg-primary-700"
              >
                Adicionar Produto
              </button>
            </div>

            {/* Product Form */}
            {showProductForm && (
              <div className="bg-white p-6 rounded-lg shadow mb-6">
                <h3 className="text-lg font-semibold mb-4">
                  {editingProduct ? 'Editar Produto' : 'Novo Produto'}
                </h3>
                <form onSubmit={handleProductSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      name="name"
                      placeholder="Nome do produto"
                      defaultValue={editingProduct?.name}
                      required
                      className="border border-gray-300 rounded px-3 py-2"
                    />
                    <input
                      name="price"
                      type="number"
                      step="0.01"
                      placeholder="Preço"
                      defaultValue={editingProduct?.price}
                      required
                      className="border border-gray-300 rounded px-3 py-2"
                    />
                    <input
                      name="category"
                      placeholder="Categoria"
                      defaultValue={editingProduct?.category}
                      required
                      className="border border-gray-300 rounded px-3 py-2"
                    />
                    <textarea
                      name="description"
                      placeholder="Descrição"
                      defaultValue={editingProduct?.description}
                      required
                      className="border border-gray-300 rounded px-3 py-2"
                      rows={3}
                    />
                  </div>
                  <div className="flex space-x-2">
                    <button
                      type="submit"
                      className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                    >
                      {editingProduct ? 'Atualizar' : 'Criar'}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setShowProductForm(false);
                        setEditingProduct(null);
                      }}
                      className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
                    >
                      Cancelar
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Products List */}
            <div className="bg-white shadow rounded-lg">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-medium">Lista de Produtos</h3>
              </div>
              <div className="divide-y divide-gray-200">
                {products.map((product) => (
                  <div key={product.id} className="px-6 py-4 flex justify-between items-center">
                    <div>
                      <h4 className="font-medium">{product.name}</h4>
                      <p className="text-gray-600">{product.description}</p>
                      <p className="text-sm text-gray-500">R$ {product.price.toFixed(2)} - {product.category}</p>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => startEditProduct(product)}
                        className="bg-primary-600 text-white px-3 py-1 rounded text-sm hover:bg-primary-700"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleDeleteProduct(product.id)}
                        className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700"
                      >
                        Excluir
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Sellers Tab */}
        {activeTab === 'sellers' && (
          <SellerManagement isAdmin={true} />
        )}
      </div>
    </div>
  );
};

export default AdminDashboard; 