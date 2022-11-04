import { Injectable } from '@angular/core';
import {
  Auth,
  signInWithEmailAndPassword,
  authState,
  createUserWithEmailAndPassword,
  updateProfile,
  UserInfo,
  UserCredential,
  sendPasswordResetEmail,
  confirmPasswordReset
} from '@angular/fire/auth';
import { concatMap, from, Observable, of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  currentUser$ = authState(this.auth);

  constructor(private auth: Auth) {}

  register(firstName: string, lastName: string, email: string, password: string): Observable<UserCredential> {
    return from(createUserWithEmailAndPassword(this.auth, email, password))
  }

  login(email: string, password: string): Observable<any> {
    return from(signInWithEmailAndPassword(this.auth, email, password));
  }

  logout(): Observable<any> {
    return from(this.auth.signOut());
  }

  forgotPassword(email: string): Observable<any> {
    return from(sendPasswordResetEmail(this.auth, email));
  }

  resetPassword(code: string, newPassword: string): Observable<any> {
    return from(confirmPasswordReset(this.auth, code, newPassword));
  }
}
