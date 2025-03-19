import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { User } from './user';
import { UserRole } from './user-role';
import * as bcrypt from 'bcryptjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'assets/auth/simulateapi/users.json';
  private sessionKey = 'authUser';

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<User | null> {
    return new Observable((observer) => {
      this.http.get<User[]>(this.apiUrl).subscribe((users) => {
        const user = users.find((u) => u.username === username);
        if (user && bcrypt.compareSync(password, user.password)) {
          sessionStorage.setItem(this.sessionKey, JSON.stringify(user));
          observer.next(user);
        } else {
          observer.next(null);
        }
        observer.complete();
      });
    });
  }

  logout(): void {
    sessionStorage.removeItem(this.sessionKey);
  }

  isAuthenticated(): boolean {
    return sessionStorage.getItem(this.sessionKey) !== null;
  }

  getUser(): User | null {
    const userData = sessionStorage.getItem(this.sessionKey);
    return userData ? JSON.parse(userData) : null;
  }
}
