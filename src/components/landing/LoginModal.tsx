import React from 'react';
import { Link } from 'react-router-dom';
import GoogleLoginButton from '../GoogleLoginButton';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full mx-4">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-gray-900">Entrar na Sua Medicina</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="space-y-4">
          <p className="text-gray-600 text-center">
            Faça login para ter uma experiência personalizada
          </p>
          
          <GoogleLoginButton
            onSuccess={onClose}
            onError={(error) => {
              console.error('Erro no login:', error);
              alert('Erro ao fazer login. Tente novamente.');
            }}
          />
          
          <div className="text-center text-sm text-gray-500">
            <p>Ou acesse como administrador</p>
            <Link
              to="/admin"
              className="text-primary-600 hover:text-primary-700 font-medium"
              onClick={onClose}
            >
              Painel Administrativo
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
