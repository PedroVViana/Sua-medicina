import React, { useState } from 'react';
import { orderService } from '../services/orderService';

interface SellerCouponInputProps {
  onCouponApplied: (couponCode: string, commission: number) => void;
  onCouponRemoved: () => void;
  appliedCoupon?: string;
}

export const SellerCouponInput: React.FC<SellerCouponInputProps> = ({
  onCouponApplied,
  onCouponRemoved,
  appliedCoupon
}) => {
  const [couponCode, setCouponCode] = useState('');
  const [isValidating, setIsValidating] = useState(false);
  const [validationMessage, setValidationMessage] = useState('');
  const [validationType, setValidationType] = useState<'success' | 'error' | ''>('');

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) {
      setValidationMessage('Por favor, insira um código de cupom');
      setValidationType('error');
      return;
    }

    setIsValidating(true);
    setValidationMessage('');

    try {
      const validation = await orderService.validateSellerCoupon(couponCode.trim());
      
      if (validation.isValid) {
        setValidationMessage(`Cupom válido! Vendedor: ${validation.sellerName} (${validation.commissionRate}% de comissão)`);
        setValidationType('success');
        onCouponApplied(couponCode.trim(), validation.commissionRate || 0);
        setCouponCode('');
      } else {
        setValidationMessage('Cupom inválido ou vendedor inativo');
        setValidationType('error');
      }
    } catch (error) {
      setValidationMessage('Erro ao validar cupom. Tente novamente.');
      setValidationType('error');
    } finally {
      setIsValidating(false);
    }
  };

  const handleRemoveCoupon = () => {
    onCouponRemoved();
    setValidationMessage('');
    setValidationType('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleApplyCoupon();
    }
  };

  return (
    <div className="bg-gray-50 p-4 rounded-lg">
      <h3 className="text-lg font-medium text-gray-800 mb-3">Cupom de Vendedor</h3>
      
      {appliedCoupon ? (
        <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-3">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-green-800 font-medium">Cupom aplicado: {appliedCoupon}</p>
              <p className="text-green-600 text-sm">O vendedor receberá sua comissão</p>
            </div>
            <button
              onClick={handleRemoveCoupon}
              className="text-red-600 hover:text-red-800 text-sm font-medium"
            >
              Remover
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          <div className="flex gap-2">
            <input
              type="text"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
              onKeyPress={handleKeyPress}
              placeholder="Digite o código do cupom"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              maxLength={10}
            />
            <button
              onClick={handleApplyCoupon}
              disabled={isValidating || !couponCode.trim()}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              {isValidating ? 'Validando...' : 'Aplicar'}
            </button>
          </div>
          
          {validationMessage && (
            <div className={`text-sm p-2 rounded ${
              validationType === 'success' 
                ? 'bg-green-100 text-green-800' 
                : 'bg-red-100 text-red-800'
            }`}>
              {validationMessage}
            </div>
          )}
          
          <p className="text-xs text-gray-600">
            Digite o código do cupom fornecido pelo vendedor para que ele receba sua comissão
          </p>
        </div>
      )}
    </div>
  );
};
