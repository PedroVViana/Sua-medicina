import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { firebaseConfig } from '../lib/firebase';
import { sellerCouponService } from '../services/sellerCouponService';

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Dados de exemplo para vendedores
const sampleSellers = [
  {
    name: 'João Silva',
    email: 'joao.silva@suamedicina.com',
    phone: '(11) 99999-1111',
    commissionRate: 15,
    active: true
  },
  {
    name: 'Maria Santos',
    email: 'maria.santos@suamedicina.com',
    phone: '(11) 99999-2222',
    commissionRate: 12,
    active: true
  },
  {
    name: 'Pedro Oliveira',
    email: 'pedro.oliveira@suamedicina.com',
    phone: '(11) 99999-3333',
    commissionRate: 18,
    active: true
  }
];

// Função para criar vendedores de exemplo
async function createSampleSellers() {
  try {
    console.log('Criando vendedores de exemplo...');
    
    for (const sellerData of sampleSellers) {
      const sellerRef = await addDoc(collection(db, 'sellers'), {
        ...sellerData,
        createdAt: serverTimestamp()
      });
      
      console.log(`Vendedor criado: ${sellerData.name} (ID: ${sellerRef.id})`);
      
      // Criar cupom inicial para o vendedor usando o serviço
      try {
        const couponId = await sellerCouponService.createSellerCoupon(sellerRef.id);
        console.log(`Cupom inicial criado para ${sellerData.name}: ${couponId}`);
      } catch (couponError) {
        console.error(`Erro ao criar cupom para ${sellerData.name}:`, couponError);
      }
    }
    
    console.log('✅ Vendedores e cupons criados com sucesso!');
  } catch (error) {
    console.error('❌ Erro ao criar vendedores:', error);
  }
}

// Função para verificar se as coleções existem
async function checkCollections() {
  try {
    console.log('Verificando coleções...');
    
    // Tentar acessar as coleções
    const sellersCollection = collection(db, 'sellers');
    const couponsCollection = collection(db, 'sellerCoupons');
    
    console.log('✅ Coleções acessíveis');
    return true;
  } catch (error) {
    console.error('❌ Erro ao acessar coleções:', error);
    return false;
  }
}

// Função principal
async function main() {
  console.log('🚀 Configurando sistema de vendedores e cupons...');
  
  try {
    // Verificar se as coleções estão acessíveis
    const collectionsOk = await checkCollections();
    
    if (collectionsOk) {
      // Criar vendedores de exemplo
      await createSampleSellers();
    } else {
      console.log('❌ Não foi possível configurar as coleções');
    }
  } catch (error) {
    console.error('❌ Erro durante a configuração:', error);
  }
  
  console.log('✨ Configuração concluída!');
}

// Executar se o script for chamado diretamente
if (require.main === module) {
  main().then(() => {
    process.exit(0);
  }).catch((error) => {
    console.error('Erro fatal:', error);
    process.exit(1);
  });
}

export { createSampleSellers, checkCollections };
