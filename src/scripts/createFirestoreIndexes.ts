import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { firebaseConfig } from '../lib/firebase';

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

console.log('🚀 Script para criar índices do Firestore');
console.log('');
console.log('Para resolver o erro de índice, você precisa:');
console.log('');
console.log('1. Acessar o Firebase Console:');
console.log('   https://console.firebase.google.com/project/suamedicina-88266/firestore/indexes');
console.log('');
console.log('2. Criar os seguintes índices compostos:');
console.log('');
console.log('📋 ÍNDICE 1:');
console.log('   - Coleção: sellerCoupons');
console.log('   - Campos: sellerId (Ascending), code (Descending)');
console.log('   - Query Scope: Collection');
console.log('');
console.log('📋 ÍNDICE 2:');
console.log('   - Coleção: sellerCoupons');
console.log('   - Campos: sellerId (Ascending), createdAt (Descending)');
console.log('   - Query Scope: Collection');
console.log('');
console.log('📋 ÍNDICE 3:');
console.log('   - Coleção: sellerCoupons');
console.log('   - Campos: code (Ascending), isActive (Ascending)');
console.log('   - Query Scope: Collection');
console.log('');
console.log('3. Aguardar a criação dos índices (pode levar alguns minutos)');
console.log('');
console.log('4. Testar novamente a criação de vendedores');
console.log('');
console.log('💡 Alternativamente, use a versão corrigida do código que não requer índices compostos!');

export {};
