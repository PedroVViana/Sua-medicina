import { doc, updateDoc, getDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';

const USERS_COLLECTION = 'users';

/**
 * Promove um usuário comum para administrador
 * @param userId - ID do usuário a ser promovido
 * @returns Promise<boolean> - true se sucesso, false se falhou
 */
export const promoteUserToAdmin = async (userId: string): Promise<boolean> => {
  try {
    console.log(`🔄 Promovendo usuário ${userId} para administrador...`);
    
    // Verificar se o usuário existe
    const userRef = doc(db, USERS_COLLECTION, userId);
    const userDoc = await getDoc(userRef);
    
    if (!userDoc.exists()) {
      console.error('❌ Usuário não encontrado');
      return false;
    }
    
    const userData = userDoc.data();
    console.log('📋 Dados atuais do usuário:', userData);
    
    // Atualizar role para admin
    await updateDoc(userRef, {
      role: 'admin'
    });
    
    console.log('✅ Usuário promovido para administrador com sucesso!');
    console.log('ℹ️ O usuário precisará fazer logout e login novamente para que as alterações tenham efeito.');
    
    return true;
    
  } catch (error) {
    console.error('❌ Erro ao promover usuário:', error);
    return false;
  }
};

/**
 * Busca usuário por email e promove para admin
 * @param email - Email do usuário
 * @returns Promise<boolean> - true se sucesso, false se falhou
 */
export const promoteUserByEmail = async (email: string): Promise<boolean> => {
  try {
    console.log(`🔍 Buscando usuário com email: ${email}`);
    
    // Nota: Esta função seria mais eficiente com um índice no email
    // Por simplicidade, vamos buscar todos os usuários e filtrar
    // Em produção, considere criar um índice ou usar Firebase Admin SDK
    
    console.log('ℹ️ Para promover um usuário por email, você precisa:');
    console.log('1. Ir ao Firebase Console > Authentication');
    console.log('2. Encontrar o usuário pelo email');
    console.log('3. Copiar o User UID');
    console.log('4. Usar a função promoteUserToAdmin(uid)');
    
    return false;
    
  } catch (error) {
    console.error('❌ Erro ao buscar usuário:', error);
    return false;
  }
};

// Função para uso no console do navegador
declare global {
  interface Window {
    promoteToAdmin: (userId: string) => Promise<boolean>;
    promoteByEmail: (email: string) => Promise<boolean>;
  }
}

// Disponibilizar funções globalmente para debug
if (typeof window !== 'undefined') {
  window.promoteToAdmin = promoteUserToAdmin;
  window.promoteByEmail = promoteUserByEmail;
}
