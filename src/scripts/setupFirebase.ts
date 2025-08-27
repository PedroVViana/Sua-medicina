import { authService } from '../services/authService';
import { productService, sellerService } from '../services/productService';

// Script para configuração inicial do Firebase
export const setupFirebase = async () => {
  console.log('🔥 Iniciando configuração do Firebase...');

  try {
    // 1. Tentar criar dados iniciais de produtos
    console.log('📦 Verificando produtos...');
    const existingProducts = await productService.getProducts();
    
    if (existingProducts.length === 0) {
      console.log('📦 Criando produtos iniciais...');
      const initialProducts = [
        {
          name: 'Consulta de Telemedicina',
          description: 'Consulta médica online com especialista',
          price: 150.00,
          category: 'Consulta',
          active: true
        },
        {
          name: 'Exame de Sangue',
          description: 'Coleta de sangue em domicílio',
          price: 89.90,
          category: 'Exame',
          active: true
        },
        {
          name: 'Prescrição Digital',
          description: 'Prescrição médica online',
          price: 75.00,
          category: 'Prescrição',
          active: true
        }
      ];

      for (const product of initialProducts) {
        await productService.addProduct(product);
      }
      console.log('✅ Produtos criados com sucesso!');
    } else {
      console.log('✅ Produtos já existem no banco de dados');
    }

    // 2. Tentar criar dados iniciais de vendedores
    console.log('👥 Verificando vendedores...');
    const existingSellers = await sellerService.getSellers();
    
    if (existingSellers.length === 0) {
      console.log('👥 Criando vendedores iniciais...');
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

      for (const seller of initialSellers) {
        await sellerService.addSeller(seller);
      }
      console.log('✅ Vendedores criados com sucesso!');
    } else {
      console.log('✅ Vendedores já existem no banco de dados');
    }

    console.log('🎉 Configuração do Firebase concluída!');
    return { success: true };

  } catch (error) {
    console.error('❌ Erro na configuração do Firebase:', error);
    return { success: false, error };
  }
};

// 3. Criar usuário admin (opcional)
export const createAdminUser = async () => {
  try {
    console.log('👤 Criando usuário administrador...');
    const admin = await authService.createAdminUser(
      'admin@suamedicina.com',
      'admin123',
      'Administrador'
    );
    console.log('✅ Usuário admin criado:', admin);
    return admin;
  } catch (error: any) {
    if (error.code === 'auth/email-already-in-use') {
      console.log('ℹ️ Usuário admin já existe');
      return null;
    }
    console.error('❌ Erro ao criar admin:', error);
    throw error;
  }
};
