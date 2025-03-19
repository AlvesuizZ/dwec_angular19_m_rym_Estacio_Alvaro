import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import * as bcrypt from 'bcryptjs';
import { User } from './user';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private usersUrl = 'assets/auth/simulateapi/users.json';
  private sessionKey = 'authenticatedUser';
  
  constructor(private http: HttpClient) {}
  
  login(email: string, password: string): Observable<User | null> {
    console.log('Intentando obtener JSON:', this.usersUrl);
    return new Observable(subscriber => {
      this.http.get<User[]>(this.usersUrl).subscribe({
        next: (users) => {
          console.log('Usuarios obtenidos:', users);
          const user = users.find(u => u.email === email);
          if (user && bcrypt.compareSync(password, user.password)) {
            console.log('Autenticación exitosa:', user);
            sessionStorage.setItem('user', JSON.stringify(user));
            subscriber.next(user);
          } else {
            console.error('Usuario o contraseña incorrectos');
            subscriber.error(new Error('Usuario o contraseña incorrectos'));
          }
        },
        error: (err) => {
          console.error('Error al obtener el JSON', err);
          subscriber.error(err);
        }
      });
    });
  }

  logout() {
    sessionStorage.removeItem('user');
  }

  getAuthenticatedUser(): User | null {
    const userJson = sessionStorage.getItem(this.sessionKey);
    return userJson ? JSON.parse(userJson) : null;
  }

  isAuthenticated(): boolean {
    return sessionStorage.getItem('user') !== null;
  }
}