import { 
  signInWithEmailAndPassword, 
  signInWithPopup,
  signOut, 
  onAuthStateChanged,
  User as FirebaseUser,
  createUserWithEmailAndPassword
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db, googleProvider } from '../lib/firebase';
import { User } from '../types';

const USERS_COLLECTION = 'users';

export const authService = {
  // Login com email e senha
  async login(email: string, password: string): Promise<User | null> {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;
      
      return await this.processUserLogin(firebaseUser);
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      throw error;
    }
  },

  // Login com Google
  async loginWithGoogle(): Promise<User | null> {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const firebaseUser = result.user;
      
      return await this.processUserLogin(firebaseUser);
    } catch (error) {
      console.error('Erro ao fazer login com Google:', error);
      throw error;
    }
  },

  // Processar login do usuário (comum para email/senha e Google)
  async processUserLogin(firebaseUser: FirebaseUser): Promise<User | null> {
    try {
      // Buscar dados do usuário no Firestore
      const userDoc = await getDoc(doc(db, USERS_COLLECTION, firebaseUser.uid));
      
      if (userDoc.exists()) {
        const userData = userDoc.data();
        return {
          id: firebaseUser.uid,
          name: userData.name,
          email: firebaseUser.email!,
          role: userData.role
        };
      } else {
        // Se o usuário não existe no Firestore, criar um registro básico
        const newUser: User = {
          id: firebaseUser.uid,
          name: firebaseUser.displayName || 'Usuário',
          email: firebaseUser.email!,
          role: 'user'
        };
        
        try {
          await setDoc(doc(db, USERS_COLLECTION, firebaseUser.uid), {
            name: newUser.name,
            role: newUser.role
          });
        } catch (firestoreError) {
          console.warn('Não foi possível salvar usuário no Firestore:', firestoreError);
          // Retorna o usuário mesmo sem salvar no Firestore
        }
        
        return newUser;
      }
    } catch (error) {
      console.error('Erro ao processar login do usuário:', error);
      throw error;
    }
  },

  // Logout
  async logout(): Promise<void> {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
      throw error;
    }
  },

  // Criar usuário administrador (apenas para setup inicial)
  async createAdminUser(email: string, password: string, name: string): Promise<User> {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;
      
      const adminUser: User = {
        id: firebaseUser.uid,
        name,
        email: firebaseUser.email!,
        role: 'admin'
      };
      
      // Salvar dados do usuário no Firestore
      await setDoc(doc(db, USERS_COLLECTION, firebaseUser.uid), {
        name: adminUser.name,
        role: adminUser.role
      });
      
      return adminUser;
    } catch (error) {
      console.error('Erro ao criar usuário admin:', error);
      throw error;
    }
  },

  // Observar mudanças no estado de autenticação
  onAuthStateChanged(callback: (user: User | null) => void) {
    return onAuthStateChanged(auth, async (firebaseUser: FirebaseUser | null) => {
      if (firebaseUser) {
        // Buscar dados do usuário no Firestore
        const userDoc = await getDoc(doc(db, USERS_COLLECTION, firebaseUser.uid));
        
        if (userDoc.exists()) {
          const userData = userDoc.data();
          const user: User = {
            id: firebaseUser.uid,
            name: userData.name,
            email: firebaseUser.email!,
            role: userData.role
          };
          callback(user);
        } else {
          callback(null);
        }
      } else {
        callback(null);
      }
    });
  },

  // Obter usuário atual
  getCurrentUser(): Promise<User | null> {
    return new Promise((resolve) => {
      const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
        unsubscribe();
        
        if (firebaseUser) {
          const userDoc = await getDoc(doc(db, USERS_COLLECTION, firebaseUser.uid));
          
          if (userDoc.exists()) {
            const userData = userDoc.data();
            resolve({
              id: firebaseUser.uid,
              name: userData.name,
              email: firebaseUser.email!,
              role: userData.role
            });
          } else {
            resolve(null);
          }
        } else {
          resolve(null);
        }
      });
    });
  }
};
