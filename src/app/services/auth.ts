// Archivo: src/app/services/auth.service.ts

import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  User
} from 'firebase/auth';
import { environment } from '../../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth: any;
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser: Observable<User | null>;

  constructor() {
    // Inicializar Firebase
    const app = initializeApp(environment.firebaseConfig);
    this.auth = getAuth(app);

    // Inicializar el observable del usuario actual
    this.currentUserSubject = new BehaviorSubject<User | null>(null);
    this.currentUser = this.currentUserSubject.asObservable();

    // Escuchar cambios en el estado de autenticación
    onAuthStateChanged(this.auth, (user) => {
      this.currentUserSubject.next(user);
    });
  }

  // Obtener el valor actual del usuario
  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  // Registrar nuevo usuario
  async register(email: string, password: string, displayName: string) {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        this.auth, 
        email, 
        password
      );

      // Actualizar el perfil con el nombre
      if (userCredential.user) {
        await updateProfile(userCredential.user, {
          displayName: displayName
        });
      }

      return {
        success: true,
        user: userCredential.user
      };
    } catch (error: any) {
      return {
        success: false,
        error: this.getErrorMessage(error.code)
      };
    }
  }

  // Iniciar sesión
  async login(email: string, password: string) {
    try {
      const userCredential = await signInWithEmailAndPassword(
        this.auth,
        email,
        password
      );

      return {
        success: true,
        user: userCredential.user
      };
    } catch (error: any) {
      return {
        success: false,
        error: this.getErrorMessage(error.code)
      };
    }
  }

  // Cerrar sesión
  async logout() {
    try {
      await signOut(this.auth);
      return { success: true };
    } catch (error: any) {
      return {
        success: false,
        error: this.getErrorMessage(error.code)
      };
    }
  }

  // Verificar si el usuario está autenticado
  isAuthenticated(): boolean {
    return this.currentUserValue !== null;
  }

  // Mensajes de error personalizados
  private getErrorMessage(errorCode: string): string {
    const errorMessages: { [key: string]: string } = {
      'auth/email-already-in-use': 'Este correo ya está registrado',
      'auth/invalid-email': 'Correo electrónico inválido',
      'auth/operation-not-allowed': 'Operación no permitida',
      'auth/weak-password': 'La contraseña debe tener al menos 6 caracteres',
      'auth/user-disabled': 'Esta cuenta ha sido deshabilitada',
      'auth/user-not-found': 'Usuario no encontrado',
      'auth/wrong-password': 'Contraseña incorrecta',
      'auth/invalid-credential': 'Credenciales inválidas',
      'auth/too-many-requests': 'Demasiados intentos. Intenta más tarde',
      'auth/network-request-failed': 'Error de conexión. Verifica tu internet'
    };

    return errorMessages[errorCode] || 'Error desconocido. Intenta nuevamente';
  }
}