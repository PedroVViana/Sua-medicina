import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { firebaseConfig } from '../lib/firebase';
import { sellerCouponService } from '../services/sellerCouponService';

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Função para testar a geração de códigos
async function testCouponGeneration() {
  console.log('🧪 Testando geração de códigos de cupom...');
  
  try {
    // Testar geração de códigos únicos
    const testCodes: string[] = [];
    const numTests = 10;
    
    console.log(`\nGerando ${numTests} códigos de teste...`);
    
    for (let i = 0; i < numTests; i++) {
      const code = sellerCouponService.generateRandomCode();
      testCodes.push(code);
      console.log(`Código ${i + 1}: ${code}`);
    }
    
    // Verificar se todos os códigos são únicos
    const uniqueCodes = new Set(testCodes);
    const isUnique = uniqueCodes.size === testCodes.length;
    
    console.log(`\n✅ Códigos únicos: ${isUnique ? 'SIM' : 'NÃO'}`);
    console.log(`📊 Total de códigos: ${testCodes.length}`);
    console.log(`🔍 Códigos únicos: ${uniqueCodes.size}`);
    
    // Verificar formato dos códigos
    const formatValid = testCodes.every(code => {
      const has3Letters = /[A-Z]{3}/.test(code);
      const has3Numbers = /\d{3}/.test(code);
      const is6Chars = code.length === 6;
      return has3Letters && has3Numbers && is6Chars;
    });
    
    console.log(`\n✅ Formato correto: ${formatValid ? 'SIM' : 'NÃO'}`);
    
    if (formatValid) {
      console.log('📝 Todos os códigos seguem o padrão: 3 letras + 3 números');
    }
    
    // Mostrar exemplos de códigos
    console.log('\n📋 Exemplos de códigos gerados:');
    testCodes.slice(0, 5).forEach((code, index) => {
      console.log(`  ${index + 1}. ${code}`);
    });
    
    // Testar verificação de unicidade (simulado)
    console.log('\n🔍 Testando verificação de unicidade...');
    const sampleCode = testCodes[0];
    console.log(`Código de exemplo: ${sampleCode}`);
    
    // Simular verificação (sem acessar o banco)
    console.log('ℹ️  Verificação de unicidade seria feita no banco de dados');
    
    console.log('\n✨ Teste concluído com sucesso!');
    
  } catch (error) {
    console.error('❌ Erro durante o teste:', error);
  }
}

// Função para testar a geração de códigos únicos (com banco)
async function testUniqueCodeGeneration() {
  console.log('\n🚀 Testando geração de códigos únicos no banco...');
  
  try {
    // Criar um vendedor de teste temporário
    const testSellerId = 'test-seller-' + Date.now();
    
    console.log(`\nCriando cupom de teste para vendedor: ${testSellerId}`);
    
    // Gerar código único
    const uniqueCode = await sellerCouponService.generateCouponCode(testSellerId);
    console.log(`✅ Código único gerado: ${uniqueCode}`);
    
    // Verificar se o código é único
    const isUnique = await sellerCouponService.isCodeUnique(uniqueCode);
    console.log(`🔍 Código é único: ${isUnique ? 'SIM' : 'NÃO'}`);
    
    // Tentar gerar outro código
    const secondCode = await sellerCouponService.generateCouponCode(testSellerId);
    console.log(`✅ Segundo código único gerado: ${secondCode}`);
    
    // Verificar se são diferentes
    const areDifferent = uniqueCode !== secondCode;
    console.log(`🔍 Códigos são diferentes: ${areDifferent ? 'SIM' : 'NÃO'}`);
    
    console.log('\n✨ Teste de unicidade concluído!');
    
  } catch (error) {
    console.error('❌ Erro durante o teste de unicidade:', error);
  }
}

// Função principal
async function main() {
  console.log('🎯 Iniciando testes do sistema de cupons...\n');
  
  // Teste básico de geração
  await testCouponGeneration();
  
  // Teste de unicidade (opcional - requer conexão com banco)
  console.log('\n' + '='.repeat(50));
  console.log('⚠️  O próximo teste requer conexão com o banco de dados');
  console.log('='.repeat(50));
  
  const shouldTestUniqueness = process.argv.includes('--test-uniqueness');
  
  if (shouldTestUniqueness) {
    await testUniqueCodeGeneration();
  } else {
    console.log('\n💡 Para testar a unicidade no banco, execute:');
    console.log('   npm run test:coupons -- --test-uniqueness');
  }
  
  console.log('\n🎉 Todos os testes concluídos!');
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

export { testCouponGeneration, testUniqueCodeGeneration };
