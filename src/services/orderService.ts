import { 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  limit,
  where,
  serverTimestamp,
  Timestamp 
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Order } from '../types';
import { sellerCouponService } from './sellerCouponService';

const ORDERS_COLLECTION = 'orders';

export const orderService = {
  // Criar um novo pedido
  async createOrder(orderData: Omit<Order, 'id' | 'createdAt'>): Promise<string> {
    try {
      let sellerCommission = 0;
      
      // Se houver um cupom de vendedor, validar e calcular comissão
      if (orderData.sellerCouponCode) {
        const coupon = await sellerCouponService.getCouponByCode(orderData.sellerCouponCode);
        
        if (coupon) {
          const seller = await sellerCouponService.getSeller(coupon.sellerId);
          
          if (seller) {
            sellerCommission = sellerCouponService.calculateCommission(orderData.total, seller.commissionRate);
            
            // Atualizar estatísticas do cupom
            await sellerCouponService.updateCouponStats(coupon.id, sellerCommission);
          }
        }
      }
      
      const order = {
        ...orderData,
        sellerCommission,
        createdAt: serverTimestamp()
      };
      
      const docRef = await addDoc(collection(db, ORDERS_COLLECTION), order);
      return docRef.id;
    } catch (error) {
      console.error('Erro ao criar pedido:', error);
      throw error;
    }
  },

  // Validar cupom de vendedor
  async validateSellerCoupon(couponCode: string): Promise<{ isValid: boolean; sellerName?: string; commissionRate?: number }> {
    try {
      const coupon = await sellerCouponService.getCouponByCode(couponCode);
      
      if (!coupon) {
        return { isValid: false };
      }
      
      const seller = await sellerCouponService.getSeller(coupon.sellerId);
      
      if (!seller || !seller.active) {
        return { isValid: false };
      }
      
      return {
        isValid: true,
        sellerName: seller.name,
        commissionRate: seller.commissionRate
      };
    } catch (error) {
      console.error('Erro ao validar cupom:', error);
      return { isValid: false };
    }
  },

  // Buscar pedidos por cupom de vendedor
  async getOrdersBySellerCoupon(couponCode: string): Promise<Order[]> {
    try {
      const q = query(
        collection(db, ORDERS_COLLECTION),
        where('sellerCouponCode', '==', couponCode),
        orderBy('createdAt', 'desc')
      );
      const querySnapshot = await getDocs(q);
      
      return querySnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          createdAt: data.createdAt instanceof Timestamp ? data.createdAt.toDate() : new Date()
        } as Order;
      });
    } catch (error) {
      console.error('Erro ao buscar pedidos por cupom:', error);
      throw error;
    }
  },

  // Buscar todos os pedidos
  async getOrders(): Promise<Order[]> {
    try {
      const q = query(
        collection(db, ORDERS_COLLECTION), 
        orderBy('createdAt', 'desc')
      );
      const querySnapshot = await getDocs(q);
      
      return querySnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          createdAt: data.createdAt instanceof Timestamp ? data.createdAt.toDate() : new Date()
        } as Order;
      });
    } catch (error) {
      console.error('Erro ao buscar pedidos:', error);
      throw error;
    }
  },

  // Buscar pedidos recentes (últimos 50)
  async getRecentOrders(): Promise<Order[]> {
    try {
      const q = query(
        collection(db, ORDERS_COLLECTION), 
        orderBy('createdAt', 'desc'),
        limit(50)
      );
      const querySnapshot = await getDocs(q);
      
      return querySnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          createdAt: data.createdAt instanceof Timestamp ? data.createdAt.toDate() : new Date()
        } as Order;
      });
    } catch (error) {
      console.error('Erro ao buscar pedidos recentes:', error);
      throw error;
    }
  },

  // Buscar pedidos por email do cliente
  async getOrdersByCustomerEmail(email: string): Promise<Order[]> {
    try {
      const q = query(
        collection(db, ORDERS_COLLECTION),
        where('customerEmail', '==', email),
        orderBy('createdAt', 'desc')
      );
      const querySnapshot = await getDocs(q);
      
      return querySnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          createdAt: data.createdAt instanceof Timestamp ? data.createdAt.toDate() : new Date()
        } as Order;
      });
    } catch (error) {
      console.error('Erro ao buscar pedidos do cliente:', error);
      throw error;
    }
  },

  // Atualizar status do pedido
  async updateOrderStatus(orderId: string, status: Order['status']): Promise<void> {
    try {
      const orderRef = doc(db, ORDERS_COLLECTION, orderId);
      await updateDoc(orderRef, { status });
    } catch (error) {
      console.error('Erro ao atualizar status do pedido:', error);
      throw error;
    }
  },

  // Deletar pedido (apenas para admin)
  async deleteOrder(orderId: string): Promise<void> {
    try {
      const orderRef = doc(db, ORDERS_COLLECTION, orderId);
      await deleteDoc(orderRef);
    } catch (error) {
      console.error('Erro ao deletar pedido:', error);
      throw error;
    }
  }
};
