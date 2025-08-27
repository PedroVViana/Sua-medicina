import { 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  updateDoc,
  query,
  where,
  orderBy,
  limit,
  serverTimestamp,
  Timestamp,
  getDoc,
  increment
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import { SellerCoupon, Seller } from '../types';

const SELLER_COUPONS_COLLECTION = 'sellerCoupons';
const SELLERS_COLLECTION = 'sellers';

export const sellerCouponService = {
  // Gerar código aleatório de 6 caracteres (3 letras + 3 números)
  generateRandomCode(): string {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    
    let code = '';
    
    // Gerar 3 letras aleatórias
    for (let i = 0; i < 3; i++) {
      code += letters.charAt(Math.floor(Math.random() * letters.length));
    }
    
    // Gerar 3 números aleatórios
    for (let i = 0; i < 3; i++) {
      code += numbers.charAt(Math.floor(Math.random() * numbers.length));
    }
    
    return code;
  },

  // Verificar se um código já existe
  async isCodeUnique(code: string): Promise<boolean> {
    try {
      const q = query(
        collection(db, SELLER_COUPONS_COLLECTION),
        where('code', '==', code)
      );
      
      const querySnapshot = await getDocs(q);
      return querySnapshot.empty;
    } catch (error) {
      console.error('Erro ao verificar unicidade do código:', error);
      throw error;
    }
  },

  // Gerar código único para um vendedor
  async generateCouponCode(sellerId: string): Promise<string> {
    try {
      let code: string;
      let attempts = 0;
      const maxAttempts = 100; // Evitar loop infinito
      
      do {
        code = this.generateRandomCode();
        attempts++;
        
        if (attempts > maxAttempts) {
          throw new Error('Não foi possível gerar um código único após muitas tentativas');
        }
      } while (!(await this.isCodeUnique(code)));
      
      return code;
    } catch (error) {
      console.error('Erro ao gerar código do cupom:', error);
      throw error;
    }
  },

  // Criar um novo cupom para um vendedor
  async createSellerCoupon(sellerId: string): Promise<string> {
    try {
      const code = await this.generateCouponCode(sellerId);
      
      const couponData: Omit<SellerCoupon, 'id' | 'createdAt'> = {
        sellerId,
        code,
        isActive: true,
        usedCount: 0,
        totalCommission: 0
      };
      
      const docRef = await addDoc(collection(db, SELLER_COUPONS_COLLECTION), {
        ...couponData,
        createdAt: serverTimestamp()
      });
      
      return docRef.id;
    } catch (error) {
      console.error('Erro ao criar cupom do vendedor:', error);
      throw error;
    }
  },

  // Buscar todos os cupons de um vendedor
  async getSellerCoupons(sellerId: string): Promise<SellerCoupon[]> {
    try {
      const q = query(
        collection(db, SELLER_COUPONS_COLLECTION),
        where('sellerId', '==', sellerId)
      );
      
      const querySnapshot = await getDocs(q);
      
      // Ordenar localmente por data de criação
      const coupons = querySnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          createdAt: data.createdAt instanceof Timestamp ? data.createdAt.toDate() : new Date()
        } as SellerCoupon;
      });
      
      // Ordenar por data de criação (mais recente primeiro)
      return coupons.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    } catch (error) {
      console.error('Erro ao buscar cupons do vendedor:', error);
      throw error;
    }
  },

  // Buscar cupom por código
  async getCouponByCode(code: string): Promise<SellerCoupon | null> {
    try {
      const q = query(
        collection(db, SELLER_COUPONS_COLLECTION),
        where('code', '==', code),
        where('isActive', '==', true)
      );
      
      const querySnapshot = await getDocs(q);
      
      if (querySnapshot.empty) {
        return null;
      }
      
      const doc = querySnapshot.docs[0];
      const data = doc.data();
      
      return {
        id: doc.id,
        ...data,
        createdAt: data.createdAt instanceof Timestamp ? data.createdAt.toDate() : new Date()
      } as SellerCoupon;
    } catch (error) {
      console.error('Erro ao buscar cupom por código:', error);
      throw error;
    }
  },

  // Atualizar estatísticas do cupom após uma venda
  async updateCouponStats(couponId: string, commission: number): Promise<void> {
    try {
      const couponRef = doc(db, SELLER_COUPONS_COLLECTION, couponId);
      
      await updateDoc(couponRef, {
        usedCount: increment(1),
        totalCommission: increment(commission)
      });
    } catch (error) {
      console.error('Erro ao atualizar estatísticas do cupom:', error);
      throw error;
    }
  },

  // Desativar cupom
  async deactivateCoupon(couponId: string): Promise<void> {
    try {
      const couponRef = doc(db, SELLER_COUPONS_COLLECTION, couponId);
      await updateDoc(couponRef, { isActive: false });
    } catch (error) {
      console.error('Erro ao desativar cupom:', error);
      throw error;
    }
  },

  // Ativar cupom
  async activateCoupon(couponId: string): Promise<void> {
    try {
      const couponRef = doc(db, SELLER_COUPONS_COLLECTION, couponId);
      await updateDoc(couponRef, { isActive: true });
    } catch (error) {
      console.error('Erro ao ativar cupom:', error);
      throw error;
    }
  },

  // Buscar informações do vendedor
  async getSeller(sellerId: string): Promise<Seller | null> {
    try {
      const sellerDoc = await getDoc(doc(db, SELLERS_COLLECTION, sellerId));
      
      if (!sellerDoc.exists()) {
        return null;
      }
      
      const data = sellerDoc.data();
      return {
        id: sellerDoc.id,
        ...data,
        createdAt: data.createdAt instanceof Timestamp ? data.createdAt.toDate() : new Date()
      } as Seller;
    } catch (error) {
      console.error('Erro ao buscar vendedor:', error);
      throw error;
    }
  },

  // Calcular comissão baseada na taxa do vendedor
  calculateCommission(orderTotal: number, commissionRate: number): number {
    return (orderTotal * commissionRate) / 100;
  }
};
