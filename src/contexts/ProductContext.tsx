import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product, Seller } from '../types';
import { productService, sellerService } from '../services/productService';

interface ProductContextType {
  products: Product[];
  sellers: Seller[];
  loading: boolean;
  error: string | null;
  addProduct: (product: Omit<Product, 'id'>) => Promise<void>;
  updateProduct: (id: string, product: Partial<Product>) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  addSeller: (seller: Omit<Seller, 'id' | 'createdAt'>) => Promise<void>;
  updateSeller: (id: string, seller: Partial<Seller>) => Promise<void>;
  deleteSeller: (id: string) => Promise<void>;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};

interface ProductProviderProps {
  children: ReactNode;
}

export const ProductProvider: React.FC<ProductProviderProps> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [sellers, setSellers] = useState<Seller[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Inicializar dados do Firebase
  useEffect(() => {
    const initializeData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Carregar produtos e vendedores iniciais
        const [initialProducts, initialSellers] = await Promise.all([
          productService.getProducts(),
          sellerService.getSellers()
        ]);

        setProducts(initialProducts);
        setSellers(initialSellers);

        // Se não há dados, tentar criar dados iniciais
        if (initialProducts.length === 0) {
          try {
            await createInitialData();
          } catch (createError) {
            console.warn('Não foi possível criar dados iniciais. Verifique as regras do Firestore:', createError);
            // Não falha a aplicação, apenas continua sem dados iniciais
          }
        }
      } catch (err) {
        console.error('Erro ao carregar dados:', err);
        setError('Erro ao carregar dados. Tente novamente.');
      } finally {
        setLoading(false);
      }
    };

    initializeData();
  }, []);

  // Subscriptions para atualizações em tempo real
  useEffect(() => {
    const unsubscribeProducts = productService.subscribeToProducts((newProducts) => {
      setProducts(newProducts);
    });

    const unsubscribeSellers = sellerService.subscribeToSellers((newSellers) => {
      setSellers(newSellers);
    });

    return () => {
      unsubscribeProducts();
      unsubscribeSellers();
    };
  }, []);

  // Criar dados iniciais se não existirem
  const createInitialData = async () => {
    try {
      // Produtos iniciais
      const initialProducts = [
        // Consultas Médicas
        {
          name: 'Consulta Clínico Geral',
          description: 'Consulta médica online com clínico geral',
          price: 120.00,
          category: 'Consulta',
          active: true
        },
        {
          name: 'Consulta com Especialista',
          description: 'Consulta médica online com especialista',
          price: 180.00,
          category: 'Consulta',
          active: true
        },
        {
          name: 'Acompanhamento Contínuo',
          description: 'Pacote de 3 consultas de acompanhamento',
          price: 300.00,
          category: 'Consulta',
          active: true
        },
        // Exames Laboratoriais e de Imagem
        {
          name: 'Exame de Sangue Completo',
          description: 'Hemograma completo com coleta em domicílio',
          price: 89.90,
          category: 'Exame',
          active: true
        },
        {
          name: 'Ressonância Magnética',
          description: 'Ressonância magnética com laudo especializado',
          price: 450.00,
          category: 'Exame',
          active: true
        },
        {
          name: 'Ultrassonografia',
          description: 'Ultrassonografia com laudo médico',
          price: 180.00,
          category: 'Exame',
          active: true
        },
        {
          name: 'Raio-X',
          description: 'Raio-X com laudo médico',
          price: 120.00,
          category: 'Exame',
          active: true
        },
        // Vacinas
        {
          name: 'Vacina Hepatite B',
          description: 'Vacina contra Hepatite B',
          price: 85.00,
          category: 'Vacina',
          active: true
        },
        {
          name: 'Vacina HPV',
          description: 'Vacina contra HPV (3 doses)',
          price: 280.00,
          category: 'Vacina',
          active: true
        },
        {
          name: 'Vacina Gripe',
          description: 'Vacina contra Influenza',
          price: 65.00,
          category: 'Vacina',
          active: true
        },
        {
          name: 'Vacina Tríplice Viral',
          description: 'Vacina Tríplice Viral (Sarampo, Caxumba, Rubéola)',
          price: 95.00,
          category: 'Vacina',
          active: true
        },
        // Serviços de Bem-Estar e Estética
        {
          name: 'Massagem Relaxante',
          description: 'Sessão de massagem relaxante 60 minutos',
          price: 120.00,
          category: 'Bem-Estar',
          active: true
        },
        {
          name: 'Acupuntura',
          description: 'Sessão de acupuntura com especialista',
          price: 150.00,
          category: 'Bem-Estar',
          active: true
        },
        {
          name: 'RPG',
          description: 'Sessão de RPG (Reeducação Postural Global)',
          price: 180.00,
          category: 'Bem-Estar',
          active: true
        },
        {
          name: 'Peeling Facial',
          description: 'Peeling facial com produtos profissionais',
          price: 200.00,
          category: 'Bem-Estar',
          active: true
        },
        // Atendimento Veterinário
        {
          name: 'Consulta Veterinária Online',
          description: 'Consulta veterinária online 24h',
          price: 80.00,
          category: 'Veterinário',
          active: true
        },
        {
          name: 'Vacina Pet',
          description: 'Vacinação para cães e gatos',
          price: 65.00,
          category: 'Veterinário',
          active: true
        },
        {
          name: 'Emergência Veterinária',
          description: 'Atendimento de emergência 24h para pets',
          price: 150.00,
          category: 'Veterinário',
          active: true
        }
      ];

      // Vendedores iniciais
      const initialSellers = [
        {
          name: 'Dr. João Silva',
          email: 'joao.silva@suamedicina.com',
          phone: '(11) 99999-9999',
          active: true
        },
        {
          name: 'Dra. Maria Santos',
          email: 'maria.santos@suamedicina.com',
          phone: '(11) 88888-8888',
          active: true
        }
      ];

      // Adicionar dados iniciais ao Firebase
      await Promise.all([
        ...initialProducts.map(product => productService.addProduct(product)),
        ...initialSellers.map(seller => sellerService.addSeller(seller))
      ]);
    } catch (err) {
      console.error('Erro ao criar dados iniciais:', err);
    }
  };

  const addProduct = async (product: Omit<Product, 'id'>) => {
    try {
      setError(null);
      await productService.addProduct(product);
    } catch (err) {
      console.error('Erro ao adicionar produto:', err);
      setError('Erro ao adicionar produto. Tente novamente.');
      throw err;
    }
  };

  const updateProduct = async (id: string, product: Partial<Product>) => {
    try {
      setError(null);
      await productService.updateProduct(id, product);
    } catch (err) {
      console.error('Erro ao atualizar produto:', err);
      setError('Erro ao atualizar produto. Tente novamente.');
      throw err;
    }
  };

  const deleteProduct = async (id: string) => {
    try {
      setError(null);
      await productService.deleteProduct(id);
    } catch (err) {
      console.error('Erro ao deletar produto:', err);
      setError('Erro ao deletar produto. Tente novamente.');
      throw err;
    }
  };

  const addSeller = async (seller: Omit<Seller, 'id' | 'createdAt'>) => {
    try {
      setError(null);
      await sellerService.addSeller(seller);
    } catch (err) {
      console.error('Erro ao adicionar vendedor:', err);
      setError('Erro ao adicionar vendedor. Tente novamente.');
      throw err;
    }
  };

  const updateSeller = async (id: string, seller: Partial<Seller>) => {
    try {
      setError(null);
      await sellerService.updateSeller(id, seller);
    } catch (err) {
      console.error('Erro ao atualizar vendedor:', err);
      setError('Erro ao atualizar vendedor. Tente novamente.');
      throw err;
    }
  };

  const deleteSeller = async (id: string) => {
    try {
      setError(null);
      await sellerService.deleteSeller(id);
    } catch (err) {
      console.error('Erro ao deletar vendedor:', err);
      setError('Erro ao deletar vendedor. Tente novamente.');
      throw err;
    }
  };

  const value: ProductContextType = {
    products,
    sellers,
    loading,
    error,
    addProduct,
    updateProduct,
    deleteProduct,
    addSeller,
    updateSeller,
    deleteSeller
  };

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  );
}; 