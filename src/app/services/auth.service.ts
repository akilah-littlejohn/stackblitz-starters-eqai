import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { BehaviorSubject, Observable } from 'rxjs';
import firebase from 'firebase/compat/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userSubject: BehaviorSubject<firebase.User | null>;
  user$: Observable<firebase.User | null>;

  constructor(private afAuth: AngularFireAuth) {
    this.userSubject = new BehaviorSubject<firebase.User | null>(null);
    this.user$ = this.userSubject.asObservable();

    this.afAuth.onAuthStateChanged((user) => {
      this.userSubject.next(user);
    });
  }

  async login(email: string, password: string): Promise<void> {
    try {
      await this.afAuth.signInWithEmailAndPassword(email, password);
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  }

  async logout(): Promise<void> {
    try {
      await this.afAuth.signOut();
    } catch (error) {
      console.error('Logout failed:', error);
      throw error;
    }
  }

  isAuthenticated(): boolean {
    return this.userSubject.value !== null;
  }

  getCurrentUser(): firebase.User | null {
    return this.userSubject.value;
  }
}