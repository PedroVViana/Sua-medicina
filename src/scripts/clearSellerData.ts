import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { firebaseConfig } from '../lib/firebase';

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Função para limpar todos os vendedores
async function clearAllSellers() {
  try {
    console.log('🗑️ Limpando todos os vendedores...');
    
    const sellersSnapshot = await getDocs(collection(db, 'sellers'));
    let deletedCount = 0;
    
    for (const sellerDoc of sellersSnapshot.docs) {
      await deleteDoc(doc(db, 'sellers', sellerDoc.id));
      deletedCount++;
      console.log(`Vendedor deletado: ${sellerDoc.id}`);
    }
    
    console.log(`✅ ${deletedCount} vendedores deletados com sucesso!`);
    return deletedCount;
  } catch (error) {
    console.error('❌ Erro ao deletar vendedores:', error);
    throw error;
  }
}

// Função para limpar todos os cupons
async function clearAllCoupons() {
  try {
    console.log('🗑️ Limpando todos os cupons...');
    
    const couponsSnapshot = await getDocs(collection(db, 'sellerCoupons'));
    let deletedCount = 0;
    
    for (const couponDoc of couponsSnapshot.docs) {
      await deleteDoc(doc(db, 'sellerCoupons', couponDoc.id));
      deletedCount++;
      console.log(`Cupom deletado: ${couponDoc.id}`);
    }
    
    console.log(`✅ ${deletedCount} cupons deletados com sucesso!`);
    return deletedCount;
  } catch (error) {
    console.error('❌ Erro ao deletar cupons:', error);
    throw error;
  }
}

// Função para limpar todos os dados relacionados
async function clearAllSellerData() {
  try {
    console.log('🚀 Iniciando limpeza completa dos dados de vendedores...');
    
    // Primeiro deletar cupons (para evitar problemas de referência)
    await clearAllCoupons();
    
    // Depois deletar vendedores
    await clearAllSellers();
    
    console.log('✨ Limpeza completa concluída!');
    console.log('💡 Agora você pode criar vendedores dinamicamente através da interface!');
    
  } catch (error) {
    console.error('❌ Erro durante a limpeza:', error);
  }
}

// Função principal
async function main() {
  try {
    await clearAllSellerData();
  } catch (error) {
    console.error('Erro fatal:', error);
    process.exit(1);
  }
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

export { clearAllSellerData, clearAllSellers, clearAllCoupons };
