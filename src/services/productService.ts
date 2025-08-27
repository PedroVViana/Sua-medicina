import { 
  collection, 
  doc, 
  getDocs, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  onSnapshot,
  serverTimestamp,
  Timestamp 
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Product, Seller } from '../types';

// Coleções do Firestore
const PRODUCTS_COLLECTION = 'products';
const SELLERS_COLLECTION = 'sellers';

// Serviços para Produtos
export const productService = {
  // Buscar todos os produtos
  async getProducts(): Promise<Product[]> {
    const querySnapshot = await getDocs(collection(db, PRODUCTS_COLLECTION));
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Product));
  },

  // Adicionar produto
  async addProduct(product: Omit<Product, 'id'>): Promise<string> {
    const docRef = await addDoc(collection(db, PRODUCTS_COLLECTION), product);
    return docRef.id;
  },

  // Atualizar produto
  async updateProduct(id: string, product: Partial<Product>): Promise<void> {
    const productRef = doc(db, PRODUCTS_COLLECTION, id);
    await updateDoc(productRef, product);
  },

  // Deletar produto
  async deleteProduct(id: string): Promise<void> {
    const productRef = doc(db, PRODUCTS_COLLECTION, id);
    await deleteDoc(productRef);
  },

  // Escutar mudanças em tempo real
  subscribeToProducts(callback: (products: Product[]) => void) {
    return onSnapshot(collection(db, PRODUCTS_COLLECTION), (snapshot) => {
      const products = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as Product));
      callback(products);
    });
  }
};

// Serviços para Vendedores
export const sellerService = {
  // Buscar todos os vendedores
  async getSellers(): Promise<Seller[]> {
    const querySnapshot = await getDocs(collection(db, SELLERS_COLLECTION));
    return querySnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        createdAt: data.createdAt instanceof Timestamp ? data.createdAt.toDate() : new Date()
      } as Seller;
    });
  },

  // Adicionar vendedor
  async addSeller(seller: Omit<Seller, 'id' | 'createdAt'>): Promise<string> {
    const sellerData = {
      ...seller,
      createdAt: serverTimestamp()
    };
    const docRef = await addDoc(collection(db, SELLERS_COLLECTION), sellerData);
    return docRef.id;
  },

  // Atualizar vendedor
  async updateSeller(id: string, seller: Partial<Seller>): Promise<void> {
    const sellerRef = doc(db, SELLERS_COLLECTION, id);
    await updateDoc(sellerRef, seller);
  },

  // Deletar vendedor
  async deleteSeller(id: string): Promise<void> {
    const sellerRef = doc(db, SELLERS_COLLECTION, id);
    await deleteDoc(sellerRef);
  },

  // Escutar mudanças em tempo real
  subscribeToSellers(callback: (sellers: Seller[]) => void) {
    return onSnapshot(collection(db, SELLERS_COLLECTION), (snapshot) => {
      const sellers = snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          createdAt: data.createdAt instanceof Timestamp ? data.createdAt.toDate() : new Date()
        } as Seller;
      });
      callback(sellers);
    });
  }
};
