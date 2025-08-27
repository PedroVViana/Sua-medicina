import { 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  serverTimestamp,
  Timestamp 
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Seller } from '../types';
import { sellerCouponService } from './sellerCouponService';

const SELLERS_COLLECTION = 'sellers';

export const sellerService = {
  // Criar um novo vendedor
  async createSeller(sellerData: Omit<Seller, 'id' | 'createdAt'>): Promise<string> {
    try {
      const seller = {
        ...sellerData,
        createdAt: serverTimestamp()
      };
      
      const docRef = await addDoc(collection(db, SELLERS_COLLECTION), seller);
      
      // Gerar o primeiro cupom para o vendedor
      await sellerCouponService.createSellerCoupon(docRef.id);
      
      return docRef.id;
    } catch (error) {
      console.error('Erro ao criar vendedor:', error);
      throw error;
    }
  },

  // Buscar todos os vendedores
  async getSellers(): Promise<Seller[]> {
    try {
      const q = query(
        collection(db, SELLERS_COLLECTION),
        orderBy('createdAt', 'desc')
      );
      const querySnapshot = await getDocs(q);
      
      return querySnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          createdAt: data.createdAt instanceof Timestamp ? data.createdAt.toDate() : new Date()
        } as Seller;
      });
    } catch (error) {
      console.error('Erro ao buscar vendedores:', error);
      throw error;
    }
  },

  // Buscar vendedores ativos
  async getActiveSellers(): Promise<Seller[]> {
    try {
      const q = query(
        collection(db, SELLERS_COLLECTION),
        where('active', '==', true),
        orderBy('createdAt', 'desc')
      );
      const querySnapshot = await getDocs(q);
      
      return querySnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          createdAt: data.createdAt instanceof Timestamp ? data.createdAt.toDate() : new Date()
        } as Seller;
      });
    } catch (error) {
      console.error('Erro ao buscar vendedores ativos:', error);
      throw error;
    }
  },

  // Buscar vendedor por ID
  async getSellerById(sellerId: string): Promise<Seller | null> {
    try {
      const sellerDoc = await getDocs(query(
        collection(db, SELLERS_COLLECTION),
        where('__name__', '==', sellerId)
      ));
      
      if (sellerDoc.empty) {
        return null;
      }
      
      const doc = sellerDoc.docs[0];
      const data = doc.data();
      
      return {
        id: doc.id,
        ...data,
        createdAt: data.createdAt instanceof Timestamp ? data.createdAt.toDate() : new Date()
      } as Seller;
    } catch (error) {
      console.error('Erro ao buscar vendedor por ID:', error);
      throw error;
    }
  },

  // Atualizar vendedor
  async updateSeller(sellerId: string, updates: Partial<Omit<Seller, 'id' | 'createdAt'>>): Promise<void> {
    try {
      const sellerRef = doc(db, SELLERS_COLLECTION, sellerId);
      await updateDoc(sellerRef, updates);
    } catch (error) {
      console.error('Erro ao atualizar vendedor:', error);
      throw error;
    }
  },

  // Ativar/desativar vendedor
  async toggleSellerStatus(sellerId: string, active: boolean): Promise<void> {
    try {
      const sellerRef = doc(db, SELLERS_COLLECTION, sellerId);
      await updateDoc(sellerRef, { active });
    } catch (error) {
      console.error('Erro ao alterar status do vendedor:', error);
      throw error;
    }
  },

  // Deletar vendedor (apenas para admin)
  async deleteSeller(sellerId: string): Promise<void> {
    try {
      const sellerRef = doc(db, SELLERS_COLLECTION, sellerId);
      await deleteDoc(sellerRef);
    } catch (error) {
      console.error('Erro ao deletar vendedor:', error);
      throw error;
    }
  },

  // Gerar novo cupom para um vendedor
  async generateNewCoupon(sellerId: string): Promise<string> {
    try {
      return await sellerCouponService.createSellerCoupon(sellerId);
    } catch (error) {
      console.error('Erro ao gerar novo cupom:', error);
      throw error;
    }
  },

  // Buscar estatísticas de comissões de um vendedor
  async getSellerCommissionStats(sellerId: string): Promise<{
    totalCommissions: number;
    totalOrders: number;
    averageCommission: number;
  }> {
    try {
      const coupons = await sellerCouponService.getSellerCoupons(sellerId);
      
      let totalCommissions = 0;
      let totalOrders = 0;
      
      coupons.forEach(coupon => {
        totalCommissions += coupon.totalCommission;
        totalOrders += coupon.usedCount;
      });
      
      const averageCommission = totalOrders > 0 ? totalCommissions / totalOrders : 0;
      
      return {
        totalCommissions,
        totalOrders,
        averageCommission
      };
    } catch (error) {
      console.error('Erro ao buscar estatísticas de comissões:', error);
      throw error;
    }
  }
};
