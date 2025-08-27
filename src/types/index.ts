export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image?: string;
  category: string;
  active: boolean;
}

export interface Seller {
  id: string;
  name: string;
  email: string;
  phone: string;
  active: boolean;
  createdAt: Date;
  commissionRate: number; // Taxa de comissão em porcentagem
}

export interface SellerCoupon {
  id: string;
  sellerId: string;
  code: string; // Código aleatório de 6 caracteres (3 letras + 3 números)
  isActive: boolean;
  createdAt: Date;
  usedCount: number; // Quantidade de vezes que foi usado
  totalCommission: number; // Total de comissões geradas
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  products: CartItem[];
  total: number;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  status: 'pending' | 'completed' | 'cancelled';
  sellerCouponCode?: string; // Código do cupom do vendedor
  sellerCommission?: number; // Comissão calculada para o vendedor
  createdAt: Date;
} 