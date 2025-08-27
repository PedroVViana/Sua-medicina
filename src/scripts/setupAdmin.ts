import { authService } from '../services/authService';

// Script para criar usuário administrador inicial
// Este script deve ser executado apenas uma vez para configurar o primeiro admin

export const setupInitialAdmin = async () => {
  try {
    const adminUser = await authService.createAdminUser(
      'admin@suamedicina.com',
      'admin123',
      'Administrador'
    );
    
    console.log('Usuário administrador criado com sucesso:', adminUser);
    return adminUser;
  } catch (error: any) {
    if (error.code === 'auth/email-already-in-use') {
      console.log('Usuário administrador já existe. Tentando fazer login...');
      const loginSuccess = await authService.login('admin@suamedicina.com', 'admin123');
      if (loginSuccess) {
        console.log('Login do administrador realizado com sucesso');
      }
    } else {
      console.error('Erro ao criar usuário administrador:', error);
      throw error;
    }
  }
};

// Para desenvolvimento: executar automaticamente se necessário
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  // Comentar a linha abaixo após a primeira execução
  // setupInitialAdmin();
}
